/* global React */
// SearchView -- keyword search across finding titles/summaries/tags and
// report slugs (server/mif-graph.js's search()), debounced client-side.

function SearchView(props) {
  const NS = props.NS;
  const apiBase = props.apiBase;
  const onOpenRecord = props.onOpenRecord;
  const onOpenReport = props.onOpenReport;
  const Input = NS.Input, Badge = NS.Badge;

  const [q, setQ] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(function () {
    if (timer.current) clearTimeout(timer.current);
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    timer.current = setTimeout(function () {
      fetch(apiBase + '/api/search?q=' + encodeURIComponent(q)).then(function (r) { return r.json(); }).then(function (data) {
        setResults(data);
        setLoading(false);
      }).catch(function () { setLoading(false); });
    }, 250);
    return function () { clearTimeout(timer.current); };
  }, [q, apiBase]);

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '1.5rem 2rem' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          mono
          placeholder="Search findings and reports…"
          value={q}
          onChange={function (e) { setQ(e.target.value); }}
          leadingIcon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
        />
        {loading && <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Searching…</div>}
        {!loading && q.trim() && results.length === 0 && <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>No matches.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {results.map(function (r, i) {
            return (
              <button
                key={i}
                onClick={function () { r.kind === 'finding' ? onOpenRecord(r.id) : onOpenReport(r.topic, r.slug); }}
                style={{
                  textAlign: 'left', border: '1px solid var(--border)', background: 'var(--elevated)',
                  borderRadius: 'var(--radius-md)', padding: '0.75rem 0.9rem', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: '0.35rem', font: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Badge tone={r.kind === 'finding' ? 'machine' : 'human'}>{r.kind}</Badge>
                  <span style={{ color: 'var(--text)', fontSize: '0.88rem' }}>{r.title}</span>
                </div>
                {r.summary && <span style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{r.summary}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.SearchView = SearchView;
