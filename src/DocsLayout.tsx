import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const nav = [
  { group: 'Getting Started', items: [{ path: '/docs', label: 'Welcome' }] },
  { group: 'Benefits', items: [
    { path: '/docs/benefits/founders', label: 'For Founders' },
    { path: '/docs/benefits/investors', label: 'For Investors' },
  ]},
  { group: 'Governance', items: [
    { path: '/docs/governance/overview', label: 'Overview' },
    { path: '/docs/governance/markets', label: 'Markets' },
    { path: '/docs/governance/proposals', label: 'Proposals' },
    { path: '/docs/governance/twaps', label: 'TWAPs' },
  ]},
  { group: 'How Launches Work', items: [
    { path: '/docs/how-launches-work/are-you-ready', label: 'Are You Ready?' },
    { path: '/docs/how-launches-work/bid-wall', label: 'Bid Wall' },
    { path: '/docs/how-launches-work/create', label: 'Create a Launch' },
    { path: '/docs/how-launches-work/sale', label: 'The Sale' },
    { path: '/docs/how-launches-work/stamp', label: 'STAMP' },
  ]},
  { group: 'Token', items: [
    { path: '/docs/token/details', label: 'Details' },
    { path: '/docs/token/mechanics', label: 'Mechanics' },
  ]},
  { group: 'Protocol', items: [
    { path: '/docs/protocol/analytics', label: 'Analytics' },
  ]},
]

export default function DocsLayout() {
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 40, display: 'none',
        }} className="docs-sidebar-overlay" />
      )}

      {/* Sidebar */}
      <aside className={`docs-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: 260, flexShrink: 0, padding: '24px 16px',
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)', overflowY: 'auto',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
          color: 'var(--text-primary)', fontWeight: 700, fontSize: 16, marginBottom: 32, padding: '0 8px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to site
        </Link>

        {nav.map(group => (
          <div key={group.group} style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'var(--text-muted)', padding: '0 8px', marginBottom: 8,
            }}>
              {group.group}
            </div>
            {group.items.map(item => {
              const active = pathname === item.path
              return (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} style={{
                  display: 'block', padding: '8px 12px', borderRadius: 6,
                  fontSize: 14, textDecoration: 'none',
                  color: active ? 'var(--accent-light)' : 'var(--text-secondary)',
                  background: active ? 'rgba(15, 98, 254, 0.1)' : 'transparent',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s',
                }}>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </aside>

      {/* Content */}
      <main className="docs-content" style={{
        flex: 1, padding: '40px 60px', maxWidth: 800, lineHeight: 1.8,
      }}>
        <Outlet />
      </main>

      {/* Mobile toggle */}
      <button className="docs-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle docs menu">
        {sidebarOpen ? '\u2715' : '\u2630'}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .docs-sidebar {
            position: fixed !important; left: -280px; top: 0; z-index: 50;
            height: 100vh !important; transition: left 0.3s ease;
            box-shadow: none;
          }
          .docs-sidebar.open { left: 0; box-shadow: 4px 0 20px rgba(0,0,0,0.3); }
          .docs-sidebar-overlay { display: block !important; }
          .docs-content { padding: 24px 16px !important; }
        }
      `}</style>
    </div>
  )
}
