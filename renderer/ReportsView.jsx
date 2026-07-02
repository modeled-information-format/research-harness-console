/* global React */
// ReportsView -- the synthesized markdown reports (reports/<topic>/<slug>.md),
// the human-reading destination the harness's own bundled Astro/Starlight
// site renders; this gives the same content inside the console without a
// second process. Rendered with window.marked (served from node_modules,
// see server/bridge.js's /vendor/marked.umd.js) so this stays fully offline.

const reportsRailLabel = {
  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--muted)', padding: '0 0.4rem 0.6rem',
};

function ReportsView(props) {
  const NS = props.NS;
  const apiBase = props.apiBase;
  const topics = props.topics;
  const refreshToken = props.refreshToken;
  const pendingReport = props.pendingReport;
  const Badge = NS.Badge;

  const [reports, setReports] = React.useState([]);
  const [active, setActive] = React.useState(null); // { topic, slug }
  const [doc, setDoc] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const bodyRef = React.useRef(null);

  React.useEffect(function () {
    setLoading(true);
    fetch(apiBase + '/api/reports').then(function (r) { return r.json(); }).then(function (list) {
      setReports(list);
      setLoading(false);
      setActive(function (prev) {
        if (prev) return prev;
        return list.length ? { topic: list[0].topic, slug: list[0].slug } : null;
      });
    }).catch(function () { setLoading(false); });
  }, [refreshToken, apiBase]);

  const [openTopics, setOpenTopics] = React.useState(function () { return new Set(); });

  React.useEffect(function () {
    if (!pendingReport) return;
    const slug = pendingReport.slug || (reports.filter(function (r) { return r.topic === pendingReport.topic; })[0] || {}).slug;
    if (slug) setActive({ topic: pendingReport.topic, slug: slug });
    setOpenTopics(function (prev) { return new Set(prev).add(pendingReport.topic); });
    // eslint-disable-next-line
  }, [pendingReport, reports]);

  React.useEffect(function () {
    if (active) setOpenTopics(function (prev) { return new Set(prev).add(active.topic); });
  }, [active]);

  // Syntax-highlight fenced code blocks (marked already emits <code class="language-xxx">,
  // which is exactly what Prism's class convention expects) and render ```mermaid blocks
  // into actual diagrams, after the markdown HTML paints.
  React.useEffect(function () {
    const container = bodyRef.current;
    if (!container || !doc) return;
    if (window.Prism) {
      Array.prototype.forEach.call(
        container.querySelectorAll('pre > code[class*="language-"]:not(.language-mermaid)'),
        function (el) { window.Prism.highlightElement(el); }
      );
    }
    if (!window.mermaid) return;
    const blocks = container.querySelectorAll('pre > code.language-mermaid');
    if (!blocks.length) return;
    if (!window.__mifMermaidInit) {
      window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict' });
      window.__mifMermaidInit = true;
    }
    Array.prototype.forEach.call(blocks, function (code, i) {
      const source = code.textContent;
      const id = 'mif-mermaid-' + (active ? active.topic + '-' + active.slug : 'doc') + '-' + i;
      window.mermaid.render(id, source).then(function (result) {
        const wrap = document.createElement('div');
        wrap.className = 'mif-mermaid';
        wrap.innerHTML = result.svg;
        code.parentElement.replaceWith(wrap);
      }).catch(function () { /* leave the code block as-is if the diagram fails to parse */ });
    });
  }, [doc, active]);

  function toggleTopic(id) {
    setOpenTopics(function (prev) {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  React.useEffect(function () {
    if (!active) { setDoc(null); return; }
    fetch(apiBase + '/api/reports/' + encodeURIComponent(active.topic) + '/' + encodeURIComponent(active.slug))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(setDoc)
      .catch(function () { setDoc(null); });
  }, [active, apiBase]);

  function handleReportClick(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    if (/^[a-z]+:\/\//i.test(href) || href.indexOf('//') === 0) {
      window.open(href, '_blank', 'noopener');
      return;
    }
    // Relative link to another report in the same topic (harness reports
    // cross-link by filename, e.g. "2026-06-27-some-report.md") -- resolve
    // it within the app instead of letting the browser navigate the whole
    // window to a path Express doesn't serve.
    const slug = href.replace(/^\.?\//, '').replace(/\.md$/, '').replace(/#.*$/, '');
    if (active && slug) setActive({ topic: active.topic, slug: slug });
  }

  function topicTitle(id) {
    const t = topics.find(function (t) { return t.id === id; });
    return (t && t.title) || id;
  }

  const grouped = React.useMemo(function () {
    const byTopic = new Map();
    reports.forEach(function (r) {
      if (!byTopic.has(r.topic)) byTopic.set(r.topic, []);
      byTopic.get(r.topic).push(r);
    });
    return Array.from(byTopic.entries()).map(function (entry) {
      return { topic: entry[0], reports: entry[1] };
    }).sort(function (a, b) { return topicTitle(a.topic).localeCompare(topicTitle(b.topic)); });
    // eslint-disable-next-line
  }, [reports]);

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <aside style={{ width: '22rem', flex: 'none', background: 'var(--void)', borderRight: '1px solid var(--hairline)', overflowY: 'auto', minHeight: 0, padding: '1.1rem 0.9rem' }}>
        <div style={reportsRailLabel}>Reports ({reports.length})</div>
        {loading && <div style={{ color: 'var(--muted)', fontSize: '0.82rem', padding: '0 0.4rem' }}>Loading…</div>}
        {!loading && reports.length === 0 && (
          <div style={{ color: 'var(--muted)', fontSize: '0.82rem', padding: '0 0.4rem', lineHeight: 1.6 }}>
            No synthesized reports on disk yet. They land at reports/&lt;topic&gt;/&lt;slug&gt;.md as the harness completes dimensions.
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {grouped.map(function (group) {
            const isOpen = openTopics.has(group.topic);
            return (
              <div key={group.topic}>
                <button
                  onClick={function () { toggleTopic(group.topic); }}
                  style={{
                    width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
                    cursor: 'pointer', font: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.3rem 0.4rem', color: 'var(--text)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', width: '0.7rem', display: 'inline-block' }}>{isOpen ? '▾' : '▸'}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.03em', flex: 1 }}>{topicTitle(group.topic)}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>{group.reports.length}</span>
                </button>
                {isOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingLeft: '1.1rem', marginTop: '0.3rem' }}>
                    {group.reports.map(function (r) {
                      const isActive = active && active.topic === r.topic && active.slug === r.slug;
                      return (
                        <button
                          key={r.topic + '/' + r.slug}
                          onClick={function () { setActive({ topic: r.topic, slug: r.slug }); }}
                          style={{
                            textAlign: 'left', border: '1px solid ' + (isActive ? 'var(--machine)' : 'var(--border)'),
                            background: isActive ? 'var(--elevated)' : 'transparent', borderRadius: 'var(--radius-md)',
                            padding: '0.5rem 0.65rem', cursor: 'pointer', color: 'var(--text)',
                            font: 'inherit', fontSize: '0.82rem', lineHeight: 1.4,
                          }}
                        >
                          {r.slug.replace(/-/g, ' ')}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0, minHeight: 0, overflowY: 'auto', padding: '1.5rem 2rem' }}>
        {!doc ? (
          <div style={{ margin: '3rem auto', width: 'fit-content', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Select a report.</div>
        ) : (
          <article style={{ maxWidth: '52rem', margin: '0 auto', color: 'var(--text)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <Badge tone="machine">{doc.topic}</Badge>
              {doc.frontmatter && doc.frontmatter.conceptType && <Badge tone="human">{doc.frontmatter.conceptType}</Badge>}
            </div>
            <div
              ref={bodyRef}
              className="mif-report-body"
              onClick={handleReportClick}
              dangerouslySetInnerHTML={{ __html: window.marked.parse(doc.content || '') }}
            />
          </article>
        )}
      </main>
    </div>
  );
}

window.ReportsView = ReportsView;
