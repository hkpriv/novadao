import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk'
import { defaultModules } from '@creit-tech/stellar-wallets-kit/modules/utils'
import { useStore } from './store.tsx'
import './App.css'

// Initialize Stellar Wallets Kit
StellarWalletsKit.init({ modules: defaultModules() })

/* ============================================================
   Simulated user data (wallet-connected experience)
   ============================================================ */
const SIMULATED_BALANCE = '1,250 XLM'
const SIMULATED_POSITIONS: Record<string, { tokens: number; value: string }> = {
  StellarPay: { tokens: 7520, value: '$6,196' },
  LumenSwap: { tokens: 3100, value: '$1,414' },
}

/* ============================================================
   Testimonials data
   ============================================================ */
const testimonials = [
  { text: 'Decision markets harness the predictive power of financial markets and asset prices to guide decision-making, with participants placing real monetary stakes behind their forecasts.', author: 'Stellar Research' },
  { text: 'NovaDAO brings real accountability to crypto fundraising. The bid wall mechanism gives me confidence that teams are incentivized to deliver.', author: 'Early Participant' },
  { text: 'Finally a platform where token holders have genuine oversight through market-based governance rather than plutocratic voting.', author: 'DeFi Analyst' },
]

/* ============================================================
   SVG Icon Components — clean outline style, blue accent
   ============================================================ */

const IconTarget = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
)

const IconEye = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const IconTrendingUp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconHandshake = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 11.5L17 8l-4 1-3-3L2 14l4 4 6-1 3 3 5.5-5.5z" />
    <path d="M6 14l3 3" /><path d="M14 6l3 3" />
  </svg>
)

const IconHelpCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const IconDollarSign = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const IconBarChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
  </svg>
)

const IconClipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
)

const IconSend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const IconRefreshCw = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

const IconAnchor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
)

const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A7A9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconSparkles = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4589FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
  </svg>
)

const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {/* Core nova burst */}
    <circle cx="20" cy="20" r="5" fill="#4589FF"/>
    <circle cx="20" cy="20" r="3" fill="#78A9FF"/>
    <circle cx="20" cy="20" r="1.5" fill="#FFFFFF"/>
    {/* Outer glow ring */}
    <circle cx="20" cy="20" r="14" stroke="#0F62FE" strokeWidth="1" fill="none" opacity="0.5"/>
    <circle cx="20" cy="20" r="18" stroke="#0F62FE" strokeWidth="0.5" fill="none" opacity="0.25"/>
    {/* 8-point starburst rays */}
    <path d="M20 2 L20 10" stroke="#4589FF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 30 L20 38" stroke="#4589FF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 20 L10 20" stroke="#4589FF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 20 L38 20" stroke="#4589FF" strokeWidth="2" strokeLinecap="round"/>
    {/* Diagonal rays */}
    <path d="M7.3 7.3 L12.7 12.7" stroke="#4589FF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M27.3 27.3 L32.7 32.7" stroke="#4589FF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7.3 32.7 L12.7 27.3" stroke="#4589FF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M27.3 12.7 L32.7 7.3" stroke="#4589FF" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Short accent rays between main rays */}
    <path d="M10 5.5 L13.5 11" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M5.5 10 L11 13.5" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M30 5.5 L26.5 11" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M34.5 10 L29 13.5" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M5.5 30 L11 26.5" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M10 34.5 L13.5 29" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M34.5 30 L29 26.5" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M30 34.5 L26.5 29" stroke="#0F62FE" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
  </svg>
)

const StellarIcon = () => (
  <svg width="120" height="120" viewBox="0 0 40 40" fill="currentColor" opacity="0.06" style={{ position: 'absolute', top: 20, right: 20 }}>
    <path d="M34.3 6.2L7 19.5l-.3-.5L33.8 5.4c.2-.1.4 0 .5.2v.6zM5.4 21.9l28.2-13.7.3.5L5.7 22.4c-.2.1-.4 0-.5-.2l.2-.3zm0 3.2L33.2 11.7c.3-.1.5 0 .6.3v.5L6 25.8l-.3-.4-.3-.3zm28.9-9.8L5.4 28.8c-.2.1-.5 0-.6-.3v-.5l29-13.5.3.4.2.4z"/>
  </svg>
)

// Icon map for dynamic project rendering
const PROJECT_ICONS: Record<string, React.ReactNode> = {
  StellarPay: <IconSend />,
  LumenSwap: <IconRefreshCw />,
  AnchorFi: <IconAnchor />,
}
const DEFAULT_ICON = <IconDollarSign />

function App() {
  const { projects, proposals } = useStore()
  const visibleProjects = projects.filter(p => p.visible)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [commitModal, setCommitModal] = useState<string | null>(null)
  const [commitAmount, setCommitAmount] = useState('')
  const [commitSuccess, setCommitSuccess] = useState<string | null>(null)
  const [votes, setVotes] = useState<Record<string, string>>({})
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    try {
      StellarWalletsKit.getAddress().then(({ address }) => {
        if (address) setWalletAddress(address)
      }).catch(() => {})
    } catch {}
  }, [])

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const { address } = await StellarWalletsKit.authModal()
      setWalletAddress(address)
    } catch {}
    setConnecting(false)
  }

  const handleDisconnect = async () => {
    await StellarWalletsKit.disconnect()
    setWalletAddress(null)
    setMobileMenuOpen(false)
  }

  const handleProfile = () => { StellarWalletsKit.profileModal() }

  const truncateAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }, [])

  const handleCommit = (projectName: string) => {
    setCommitModal(projectName)
    setCommitAmount('')
    setCommitSuccess(null)
  }

  const confirmCommit = () => {
    if (!commitAmount || isNaN(Number(commitAmount))) return
    setCommitSuccess(commitModal)
    setTimeout(() => { setCommitModal(null); setCommitSuccess(null) }, 2000)
  }

  const handleVote = (title: string, direction: string) => {
    setVotes(v => ({ ...v, [title]: direction }))
  }

  return (
    <>
      <div className="grid-bg" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-logo">
            <Logo />
            NovaDAO
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
          <div className={`navbar-links${mobileMenuOpen ? ' open' : ''}`}>
            <button className="btn btn-outline" onClick={() => scrollTo('projects')}>All projects</button>
            {walletAddress ? (
              <div className="wallet-connected">
                <Link to="/dashboard" className="btn btn-outline btn-sm" style={{ fontSize: 13 }}>Dashboard</Link>
                <span style={{ fontSize: 13, color: 'var(--accent-light)', fontWeight: 600 }}>{SIMULATED_BALANCE}</span>
                <button className="btn btn-wallet" onClick={handleProfile}>
                  <span className="wallet-dot" />
                  {truncateAddress(walletAddress)}
                </button>
                <button className="btn btn-outline btn-sm" onClick={handleDisconnect}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleConnect} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Sign in'}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="fade-in">
            <h1 className="hero-title">
              Launch an<br />
              <span className="serif-italic accent">ownership coin</span>
            </h1>
            <p className="hero-subtitle">
              Raise XLM while putting ownership into the hands of your early users and believers.
            </p>
          </div>
          <div className="hero-stat-card fade-in">
            <StellarIcon />
            <div className="hero-stat-label">Cumulative Raised</div>
            <div className="hero-stat-value">$12,745,000</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section fade-in">
        <div className="container">
          <div className="features-header">
            <h3>We built a better fundraising system</h3>
            <a href="/docs/governance/overview">Read more →</a>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Raise XLM</h4>
              <p>Anyone can participate over four days</p>
              <p>If the raise doesn't reach its minimum, everyone gets their money back</p>
              <div className="feature-arrow">›</div>
            </div>
            <div className="feature-card">
              <h4>Spend it responsibly</h4>
              <p>The team gets a monthly budget to build & grow</p>
              <p>Bigger spends and new token issuance need to be approved by decision markets</p>
              <div className="feature-arrow">›</div>
            </div>
            <div className="feature-card">
              <h4>Win together</h4>
              <p>Legal structuring aligns tokenholders and teams</p>
              <p>Decision market oversight over IP and revenue links the business to the token</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commit Modal */}
      {commitModal && (
        <div className="modal-overlay" onClick={() => setCommitModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {commitSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
                <h3 style={{ marginBottom: 8 }}>Commitment Successful!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                  You committed {commitAmount} XLM to {commitSuccess}
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ marginBottom: 16 }}>Commit to {commitModal}</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Amount (XLM)</label>
                  <input
                    type="number"
                    value={commitAmount}
                    onChange={e => setCommitAmount(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%', padding: '12px 16px', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', borderRadius: 10, color: 'white',
                      fontSize: 16, fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                </div>
                {commitAmount && !isNaN(Number(commitAmount)) && Number(commitAmount) > 0 && (
                  <div style={{
                    padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 10,
                    marginBottom: 16, fontSize: 14, color: 'var(--text-secondary)',
                  }}>
                    Estimated tokens: <strong style={{ color: 'white' }}>{Math.floor(Number(commitAmount) * 121.35).toLocaleString()}</strong>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setCommitModal(null)}>Cancel</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={confirmCommit}>Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      <section id="projects" className="projects-section fade-in" ref={el => { if (el) sectionsRef.current.set('projects', el) }}>
        <div className="container">
          <div className="projects-header">
            <h3>Join a community</h3>
            <span className="count">{visibleProjects.length} LAUNCHED TO-DATE</span>
          </div>
          <div className="projects-grid">
            {visibleProjects.map((p) => (
              <div className="project-card" key={p.id}>
                <div className="project-card-header">
                  <div className="project-icon" style={{ background: p.iconBg }}>
                    {PROJECT_ICONS[p.name] || DEFAULT_ICON}
                  </div>
                  {p.status === 'raised' && <span className="badge badge-raised">RAISED</span>}
                  {p.status === 'live' && <span className="badge badge-live">LIVE</span>}
                  {p.status === 'draft' && <span className="badge" style={{ background: 'rgba(90,122,158,0.15)', color: 'var(--text-muted)', border: '1px solid rgba(90,122,158,0.3)' }}>DRAFT</span>}
                </div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.description}</div>

                {p.status === 'raised' ? (
                  <>
                    <div className="project-stats">
                      <div>
                        <div className="project-stat-value">{p.raised || p.maxRaise}</div>
                        <div className="project-stat-label">raised</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="project-stat-value">{p.target || p.minRaise}</div>
                        <div className="project-stat-label">target</div>
                      </div>
                    </div>
                    <div className="project-price-row">
                      <span className="project-price-label">Price</span>
                      <span className="project-price-value">{p.price || '$0.100'}</span>
                    </div>
                    {walletAddress && SIMULATED_POSITIONS[p.name] ? (
                      <div style={{
                        padding: '10px 16px', background: 'rgba(66,190,101,0.1)', border: '1px solid rgba(66,190,101,0.3)',
                        borderRadius: 10, marginBottom: 12, fontSize: 13, display: 'flex', justifyContent: 'space-between',
                      }}>
                        <span style={{ color: 'var(--success)' }}>Your position</span>
                        <span style={{ color: 'white', fontWeight: 600 }}>{SIMULATED_POSITIONS[p.name].tokens.toLocaleString()} {p.ticker}</span>
                      </div>
                    ) : null}
                    <button className="btn-buy" onClick={() => walletAddress ? handleCommit(p.name) : handleConnect()}>
                      {walletAddress ? `Buy ${p.ticker}` : 'Connect to Buy'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.progress || 0}%` }} />
                    </div>
                    <div className="project-stats">
                      <div>
                        <div className="project-stat-value">{p.committed || '$0'}</div>
                        <div className="project-stat-label">committed</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="project-stat-value">{p.minRaise}</div>
                        <div className="project-stat-label">min. raise</div>
                      </div>
                    </div>
                    <button className="btn-buy" onClick={() => walletAddress ? handleCommit(p.name) : handleConnect()}
                      style={!walletAddress ? { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' } : {}}>
                      {walletAddress ? 'Commit XLM' : 'Connect to Participate'}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch section */}
      <section id="launch" className="launch-section">
        <div className="container">
          <div>
            <h2 className="launch-title serif">
              Launch a project<br />
              the <span className="serif-italic accent">right way</span>
            </h2>
            <p className="launch-subtitle">
              Skip the low float / high FDV playbook and get funded by your community on Stellar.
            </p>
          </div>
          <div className="launch-features">
            <div className="launch-feature">
              <div className="icon-circle"><IconTarget /></div>
              <h4>Fair launch early</h4>
              <p>Everyone gets the same price, anyone can participate</p>
            </div>
            <div className="launch-feature">
              <div className="icon-circle"><IconEye /></div>
              <h4>Transparent</h4>
              <p>Avoid the backroom token deals that plague crypto</p>
            </div>
            <div className="launch-feature">
              <div className="icon-circle"><IconTrendingUp /></div>
              <h4>Raise more</h4>
              <p>Through rug protection for your holders</p>
            </div>
            <div className="launch-feature">
              <div className="icon-circle"><IconHandshake /></div>
              <h4>Real alignment</h4>
              <p>Legal structuring keeps the business and the token aligned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Banner */}
      <div className="container">
        <div className="guide-banner">
          <p><span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 8 }}><IconClipboard /></span>We wrote a guide for why founders should choose NovaDAO.</p>
          <a href="/docs/benefits/founders">Read now →</a>
        </div>
      </div>

      {/* Market Oversight */}
      <section id="oversight" className="oversight-section">
        <div className="container">
          <div className="oversight-label">
            <IconSparkles /> USED BY REAL PROJECTS <IconSparkles />
          </div>
          <h2 className="oversight-title serif">Market Oversight</h2>
          <p className="oversight-desc">
            Decision markets oversee raised funds, reducing risk of rugs and providing confidence to participants.
          </p>

          <div className="oversight-grid">
            <div className="oversight-features">
              <div className="oversight-feature">
                <div className="oversight-feature-icon"><IconHelpCircle /></div>
                <div>
                  <h4>Conditional markets</h4>
                  <p>Traders bet on whether an action would increase the value of a project</p>
                </div>
              </div>
              <div className="oversight-feature">
                <div className="oversight-feature-icon"><IconDollarSign /></div>
                <div>
                  <h4>Price-based resolution</h4>
                  <p>Proposals are accepted if the market thinks they would create value</p>
                </div>
              </div>
              <div className="oversight-feature">
                <div className="oversight-feature-icon"><IconBarChart /></div>
                <div>
                  <h4>Skin in the game</h4>
                  <p>You grow your portfolio when you help projects make better decisions</p>
                </div>
              </div>
            </div>

            <div className="oversight-proposals">
              {proposals.map((prop) => (
                <div className="proposal-item" key={prop.id}>
                  <div className="proposal-left">
                    <span className="proposal-org">{prop.org}</span>
                    <span className="proposal-title">{prop.title}</span>
                  </div>
                  <div className="proposal-actions">
                    <span className="proposal-status">{prop.status.toUpperCase()}</span>
                    {walletAddress && prop.status === 'active' && !votes[prop.title] ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="proposal-view" style={{ background: 'rgba(66,190,101,0.15)', color: 'var(--success)', border: '1px solid rgba(66,190,101,0.3)' }}
                          onClick={() => handleVote(prop.title, 'PASS')}>Pass</button>
                        <button className="proposal-view" style={{ background: 'rgba(250,77,86,0.15)', color: 'var(--error)', border: '1px solid rgba(250,77,86,0.3)' }}
                          onClick={() => handleVote(prop.title, 'FAIL')}>Fail</button>
                      </div>
                    ) : votes[prop.title] ? (
                      <span style={{ fontSize: 12, fontWeight: 600, color: votes[prop.title] === 'PASS' ? 'var(--success)' : 'var(--error)' }}>
                        Voted {votes[prop.title]}
                      </span>
                    ) : (
                      <button className="proposal-view">View</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio (wallet connected only) */}
      {walletAddress && (
        <section className="portfolio-section fade-in" style={{ padding: '0 0 80px' }}>
          <div className="container">
            <div style={{
              padding: '20px 0', borderTop: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)' }}>Your Portfolio</h3>
              <span style={{ fontSize: 14, color: 'var(--accent-light)' }}>Total: $7,610</span>
            </div>
            <div className="projects-grid">
              {Object.entries(SIMULATED_POSITIONS).map(([name, pos]) => (
                <div className="project-card" key={name}>
                  <div className="project-name" style={{ fontSize: 18 }}>{name}</div>
                  <div className="project-stats" style={{ marginTop: 12 }}>
                    <div>
                      <div className="project-stat-value">{pos.tokens.toLocaleString()}</div>
                      <div className="project-stat-label">tokens</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="project-stat-value">{pos.value}</div>
                      <div className="project-stat-label">value</div>
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(votes).length > 0 && (
                <div className="project-card">
                  <div className="project-name" style={{ fontSize: 18 }}>Voting History</div>
                  {Object.entries(votes).map(([title, dir]) => (
                    <div key={title} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: 13,
                    }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{title.slice(0, 30)}...</span>
                      <span style={{ fontWeight: 600, color: dir === 'PASS' ? 'var(--success)' : 'var(--error)' }}>{dir}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="testimonials-section fade-in">
        <div className="container">
          <div className="testimonial-card">
            <p className="testimonial-text serif">
              {testimonials[testimonialIdx].text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div className="testimonial-author">
                <div className="testimonial-avatar"><IconStar /></div>
                <span className="testimonial-name">{testimonials[testimonialIdx].author}</span>
              </div>
              <div className="testimonial-controls">
                {testimonials.map((_, i) => (
                  <div key={i} className={`testimonial-dot${i === testimonialIdx ? ' active' : ''}`}
                    onClick={() => setTestimonialIdx(i)} style={{ cursor: 'pointer' }} />
                ))}
                <button className="testimonial-nav-btn" style={{ marginLeft: 12 }}
                  onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}>&#8249;</button>
                <button className="testimonial-nav-btn"
                  onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}>&#8250;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <div className="footer-group">
              <h4>NovaDAO</h4>
              <a href="/docs/how-launches-work/sale">Launches</a>
              <a href="/docs/governance/overview">Decisions</a>
              <a href="/docs/protocol/analytics">Transparency</a>
            </div>
            <div className="footer-group">
              <h4>Resources</h4>
              <a href="/docs/governance/overview">How it works</a>
              <a href="/docs">Documentation</a>
            </div>
            <div className="footer-group">
              <h4>Community</h4>
              <a href="https://t.me/novadao">Telegram</a>
              <a href="https://x.com/NovaDAO_net">Twitter</a>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-cta">
              <div className="footer-cta-content">
                <div className="footer-cta-icon">
                  <Logo size={24} />
                </div>
                <div>
                  <h4>Raise today</h4>
                  <p>Launch a market-governed organization using NovaDAO's platform.</p>
                </div>
              </div>
              <button className="btn btn-primary">Start</button>
            </div>

            <div className="footer-version">
              <p className="footer-version-text serif">
                The blueprint for next generation decentralized organizations on Stellar.
              </p>
              <div className="footer-version-number">0.1.0</div>
              <div className="footer-hash"><span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 4 }}><IconLink /></span> A3F721 MANY DAYS AGO</div>
            </div>
          </div>

          <p className="footer-copyright">© 2024–2026. NOVADAO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </>
  )
}

export default App
