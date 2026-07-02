/* global React, ReactDOM */
// App -- the console shell: header (mark, live/offline SSE indicator, section
// nav, theme toggle, folder picker), and the three modules (Graph / Reports /
// Search) that make up v1. Nav is intentionally a flat list of sections, not
// nested -- adding a fourth module later is: write a View, add one NAV entry,
// add one `{section === 'x' && <XView .../>}` line.

function App() {
  const DS = window.MIFDesignSystem_831149;
  const ThemeToggle = DS.ThemeToggle, MemoryRecord = DS.MemoryRecord;

  const [theme, setTheme] = React.useState('dark');
  const [config, setConfig] = React.useState(null);
  const [section, setSection] = React.useState('graph');
  const [refreshToken, setRefreshToken] = React.useState(0);
  const [pendingReport, setPendingReport] = React.useState(null);
  const [globalRecord, setGlobalRecord] = React.useState(null);
  const [connected, setConnected] = React.useState(false);

  const isElectron = !!(window.harnessConsole && window.harnessConsole.isElectron);

  function loadConfig() {
    fetch('/api/config').then(function (r) { return r.json(); }).then(setConfig)
      .catch(function () { setConfig({ harnessRoot: null, topics: [] }); });
  }
  React.useEffect(loadConfig, []);

  React.useEffect(function () {
    const es = new EventSource('/api/events');
    // A harness actively writing findings/reports can fire many "changed" events per
    // second (e.g. a live research session landing dozens of files in a burst). Bumping
    // refreshToken on every single one used to reset the graph's filters, clustering,
    // and selection state that often -- the view never held still. Throttle ordinary
    // file-change refreshes to at most once per REFRESH_INTERVAL_MS during continuous
    // activity (so progress is still visible, just not flapping), plus a trailing
    // refresh shortly after things go quiet so the last burst isn't lost. A deliberate
    // folder switch (config-changed) still refreshes immediately.
    const REFRESH_INTERVAL_MS = 30000;
    let lastFire = 0;
    let trailingTimer = null;
    es.onopen = function () { setConnected(true); };
    es.onerror = function () { setConnected(false); };
    es.onmessage = function (e) {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'config-changed') {
          loadConfig();
          setRefreshToken(function (t) { return t + 1; });
          return;
        }
        const now = Date.now();
        if (trailingTimer) clearTimeout(trailingTimer);
        if (now - lastFire >= REFRESH_INTERVAL_MS) {
          lastFire = now;
          trailingTimer = null;
          setRefreshToken(function (t) { return t + 1; });
        } else {
          trailingTimer = setTimeout(function () {
            trailingTimer = null;
            lastFire = Date.now();
            setRefreshToken(function (t) { return t + 1; });
          }, REFRESH_INTERVAL_MS - (now - lastFire));
        }
      } catch (err) { /* ignore malformed event */ }
    };
    return function () {
      es.close();
      if (trailingTimer) clearTimeout(trailingTimer);
    };
  }, []);

  function chooseFolder() {
    if (isElectron) window.harnessConsole.chooseFolder().then(loadConfig);
  }

  function openRecord(id) {
    fetch('/api/record?id=' + encodeURIComponent(id))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rec) { if (rec) setGlobalRecord(rec); });
  }
  function openReport(topic, slug) {
    setSection('reports');
    setPendingReport({ topic: topic, slug: slug, at: Date.now() });
  }
  function openTopicReports(topic) {
    setSection('reports');
    setPendingReport({ topic: topic, slug: null, at: Date.now() });
  }

  const topics = (config && config.topics) || [];
  const harnessRoot = config && config.harnessRoot;

  const NAV = [
    { id: 'graph', label: 'Graph' },
    { id: 'reports', label: 'Reports' },
    { id: 'search', label: 'Search' },
  ];

  return (
    <div data-theme={theme} style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--base)', color: 'var(--text)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flex: 'none', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--hairline)', background: 'var(--void)' }}>
        <img src="vendor/mif-ds/assets/mif-mark.svg" alt="" style={{ width: 26, height: 26 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.98rem', letterSpacing: '0.02em' }}>Research Harness Console</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {harnessRoot || 'no harness folder selected'} · <span style={{ color: connected ? 'var(--machine)' : 'var(--muted)' }}>{connected ? 'live' : 'offline'}</span>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '0.3rem', background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.2rem' }}>
          {NAV.map(function (n) {
            const isActive = section === n.id;
            return (
              <button
                key={n.id}
                onClick={function () { setSection(n.id); }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '0.35rem 0.8rem',
                  borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                  background: isActive ? 'var(--machine)' : 'transparent',
                  color: isActive ? 'var(--void)' : 'var(--text-2)',
                }}
              >{n.label}</button>
            );
          })}
        </nav>
        {isElectron && (
          <button
            onClick={chooseFolder}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.4rem 0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
          >Change folder</button>
        )}
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      {!harnessRoot ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '28rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700 }}>No harness folder configured</div>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.6, fontSize: '0.92rem' }}>
              Point this console at a research-harness clone — the folder with harness.config.json and reports/.
            </p>
            {isElectron ? (
              <button
                onClick={chooseFolder}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--machine)', color: 'var(--void)', cursor: 'pointer' }}
              >Choose folder…</button>
            ) : (
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                Running in server mode — restart with the harness path:<br />
                <code style={{ fontFamily: 'var(--font-mono)' }}>node server/start.js /path/to/research-harness</code>
              </p>
            )}
          </div>
        </div>
      ) : (
        <React.Fragment>
          {section === 'graph' && <GraphView NS={DS} apiBase="" topics={topics} refreshToken={refreshToken} onOpenTopicReports={openTopicReports} />}
          {section === 'reports' && <ReportsView NS={DS} apiBase="" topics={topics} refreshToken={refreshToken} pendingReport={pendingReport} />}
          {section === 'search' && <SearchView NS={DS} apiBase="" onOpenRecord={openRecord} onOpenReport={openReport} />}
        </React.Fragment>
      )}

      {globalRecord && <MemoryRecord record={globalRecord} onClose={function () { setGlobalRecord(null); }} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
