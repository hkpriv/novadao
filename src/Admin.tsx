import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk'
import { useStore } from './store.tsx'

// Admin addresses — add your Stellar public key here to grant admin access
const ADMIN_ADDRESSES = [
  'GBSD4YJPKUH6DO5G5ZMDOZAC5Y3J4D7WFVNXBJYOATIEAZA5YRBJVV6U',
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)', borderRadius: 8, color: 'white',
  fontSize: 14, fontFamily: 'inherit', outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, color: 'var(--text-muted)',
  marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
}

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
  borderRadius: 16, padding: 24, marginBottom: 24,
}

export default function Admin() {
  const store = useStore()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [tab, setTab] = useState<'projects' | 'create' | 'proposals'>('projects')

  useEffect(() => {
    try {
      StellarWalletsKit.getAddress().then(({ address }) => {
        if (address) setWalletAddress(address)
      }).catch(() => {})
    } catch {}
  }, [])

  const handleAdminConnect = async () => {
    setConnecting(true)
    try {
      const { address } = await StellarWalletsKit.authModal()
      setWalletAddress(address)
    } catch {}
    setConnecting(false)
  }

  const isAdmin = walletAddress && ADMIN_ADDRESSES.includes(walletAddress)

  // Gate: must connect wallet first
  if (!walletAddress) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#128274;</div>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            Connect your wallet to access the admin dashboard. Only authorized addresses can manage projects and proposals.
          </p>
          <button onClick={handleAdminConnect} disabled={connecting} style={{
            padding: '12px 32px', borderRadius: 10, border: 'none',
            background: 'var(--accent)', color: 'white', fontWeight: 600,
            fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
          }}>{connecting ? 'Connecting...' : 'Connect Wallet'}</button>
          <div style={{ marginTop: 16 }}>
            <Link to="/" style={{ color: 'var(--accent-light)', fontSize: 14 }}>&larr; Back to site</Link>
          </div>
        </div>
      </div>
    )
  }

  // Gate: must be admin address
  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#9940;</div>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Access Denied</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>
            Your address is not authorized for admin access.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 24, fontFamily: 'monospace' }}>
            {walletAddress}
          </p>
          <Link to="/" style={{ color: 'var(--accent-light)', fontSize: 14 }}>&larr; Back to site</Link>
        </div>
      </div>
    )
  }
  const [form, setForm] = useState({ name: '', ticker: '', description: '', tokenSupply: '10,000,000', minRaise: '', maxRaise: '', duration: 4 })
  const [proposalForm, setProposalForm] = useState({ projectId: '', title: '', description: '', votingDays: 7 })
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const createProject = () => {
    if (!form.name || !form.ticker || !form.minRaise) return
    store.addProject({
      name: form.name, ticker: form.ticker.toUpperCase(),
      description: form.description, tokenSupply: form.tokenSupply,
      minRaise: form.minRaise, maxRaise: form.maxRaise,
      duration: form.duration, status: 'draft', visible: false,
      iconBg: '#1A3050',
    })
    setForm({ name: '', ticker: '', description: '', tokenSupply: '10,000,000', minRaise: '', maxRaise: '', duration: 4 })
    setTab('projects')
    showToast(`Project "${form.name}" created as draft`)
  }

  const createProposal = () => {
    if (!proposalForm.projectId || !proposalForm.title) return
    const project = store.projects.find(p => p.id === proposalForm.projectId)
    store.addProposal({
      projectId: proposalForm.projectId,
      org: project?.name.toUpperCase() || 'UNKNOWN',
      title: proposalForm.title,
      description: proposalForm.description,
      votingDays: proposalForm.votingDays,
      status: 'active',
    })
    setProposalForm({ projectId: '', title: '', description: '', votingDays: 7 })
    showToast(`Proposal "${proposalForm.title}" created`)
  }

  const statusColor = (s: string) => {
    if (s === 'raised' || s === 'passed') return 'var(--success)'
    if (s === 'live' || s === 'active') return 'var(--accent-light)'
    if (s === 'refunding' || s === 'failed') return 'var(--error)'
    return 'var(--text-muted)'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 300,
          background: 'var(--success)', color: 'white', padding: '12px 24px',
          borderRadius: 10, fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>{toast}</div>
      )}

      {/* Header */}
      <div style={{
        padding: '16px 24px', borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ color: 'var(--accent-light)', fontSize: 14 }}>&larr; Back to site</Link>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Admin Dashboard</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 12px', borderRadius: 20 }}>
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {(['projects', 'create', 'proposals'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
              background: tab === t ? 'var(--accent)' : 'var(--bg-card)',
              color: tab === t ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}>
              {t === 'projects' ? 'Manage Projects' : t === 'create' ? 'Create ICO' : 'Proposals'}
            </button>
          ))}
        </div>

        {/* Projects Table */}
        {tab === 'projects' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>All Projects ({store.projects.length})</h2>
            {store.projects.map(p => (
              <div key={p.id} style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: statusColor(p.status) }}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.ticker} &middot; Supply: {p.tokenSupply} &middot; Min: {p.minRaise}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => store.updateProject(p.id, { visible: !p.visible })} style={{
                    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-color)',
                    background: p.visible ? 'rgba(66,190,101,0.15)' : 'var(--bg-secondary)',
                    color: p.visible ? 'var(--success)' : 'var(--text-muted)',
                    cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
                  }}>
                    {p.visible ? 'Visible' : 'Hidden'}
                  </button>
                  {p.status === 'draft' && (
                    <button onClick={() => store.updateProject(p.id, { status: 'live' })} style={{
                      padding: '6px 14px', borderRadius: 6, border: 'none',
                      background: 'var(--accent)', color: 'white',
                      cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
                    }}>Go Live</button>
                  )}
                  {p.status === 'live' && (
                    <button onClick={() => store.updateProject(p.id, { status: 'raised' })} style={{
                      padding: '6px 14px', borderRadius: 6, border: 'none',
                      background: 'var(--success)', color: 'white',
                      cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
                    }}>Mark Raised</button>
                  )}
                  <button onClick={() => store.deleteProject(p.id)} style={{
                    padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(250,77,86,0.3)',
                    background: 'rgba(250,77,86,0.1)', color: 'var(--error)',
                    cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create ICO */}
        {tab === 'create' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Create New ICO Campaign</h2>
            <div style={cardStyle}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Project Name *</label>
                  <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. StellarPay" />
                </div>
                <div>
                  <label style={labelStyle}>Ticker Symbol *</label>
                  <input style={inputStyle} value={form.ticker} onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))} placeholder="e.g. SPAY" maxLength={5} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief project description" />
                </div>
                <div>
                  <label style={labelStyle}>Token Supply</label>
                  <input style={inputStyle} value={form.tokenSupply} onChange={e => setForm(f => ({ ...f, tokenSupply: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>Sale Duration (days)</label>
                  <input type="number" style={inputStyle} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))} min={1} max={30} />
                </div>
                <div>
                  <label style={labelStyle}>Minimum Raise *</label>
                  <input style={inputStyle} value={form.minRaise} onChange={e => setForm(f => ({ ...f, minRaise: e.target.value }))} placeholder="$2,500,000" />
                </div>
                <div>
                  <label style={labelStyle}>Maximum Raise</label>
                  <input style={inputStyle} value={form.maxRaise} onChange={e => setForm(f => ({ ...f, maxRaise: e.target.value }))} placeholder="$5,000,000" />
                </div>
              </div>

              {/* Preview */}
              {form.name && (
                <div style={{ marginTop: 24, padding: 20, background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Preview</div>
                  <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{form.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{form.description || 'No description'}</div>
                  <div style={{ display: 'flex', gap: 24, fontSize: 13, flexWrap: 'wrap' }}>
                    <span><strong>{form.ticker.toUpperCase() || '???'}</strong></span>
                    <span style={{ color: 'var(--text-muted)' }}>Supply: {form.tokenSupply}</span>
                    <span style={{ color: 'var(--text-muted)' }}>Duration: {form.duration} days</span>
                    <span style={{ color: 'var(--text-muted)' }}>Min: {form.minRaise || 'TBD'}</span>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                <button onClick={createProject} style={{
                  padding: '12px 32px', borderRadius: 10, border: 'none',
                  background: 'var(--accent)', color: 'white', fontWeight: 600,
                  fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                }}>Create Campaign</button>
                <button onClick={() => setForm({ name: '', ticker: '', description: '', tokenSupply: '10,000,000', minRaise: '', maxRaise: '', duration: 4 })} style={{
                  padding: '12px 32px', borderRadius: 10,
                  border: '1px solid var(--border-color)', background: 'transparent',
                  color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                }}>Reset</button>
              </div>
            </div>
          </div>
        )}

        {/* Proposals */}
        {tab === 'proposals' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Create Governance Proposal</h2>
            <div style={cardStyle}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Project *</label>
                  <select style={inputStyle} value={proposalForm.projectId} onChange={e => setProposalForm(f => ({ ...f, projectId: e.target.value }))}>
                    <option value="">Select project...</option>
                    {store.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Voting Period (days)</label>
                  <input type="number" style={inputStyle} value={proposalForm.votingDays} onChange={e => setProposalForm(f => ({ ...f, votingDays: Number(e.target.value) }))} min={1} max={30} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Proposal Title *</label>
                  <input style={inputStyle} value={proposalForm.title} onChange={e => setProposalForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Q2 Marketing Budget Allocation" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={proposalForm.description} onChange={e => setProposalForm(f => ({ ...f, description: e.target.value }))} placeholder="Explain the proposal..." />
                </div>
              </div>
              <button onClick={createProposal} style={{
                marginTop: 20, padding: '12px 32px', borderRadius: 10, border: 'none',
                background: 'var(--accent)', color: 'white', fontWeight: 600,
                fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
              }}>Create Proposal</button>
            </div>

            {store.proposals.length > 0 && (
              <>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>All Proposals ({store.proposals.length})</h3>
                {store.proposals.map(pr => (
                  <div key={pr.id} style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>
                        {pr.org}
                      </div>
                      <div style={{ fontWeight: 600 }}>{pr.title}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: statusColor(pr.status), textTransform: 'uppercase' }}>{pr.status}</span>
                      <button onClick={() => store.deleteProposal(pr.id)} style={{
                        padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(250,77,86,0.3)',
                        background: 'rgba(250,77,86,0.1)', color: 'var(--error)',
                        cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
