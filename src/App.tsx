import { useState, useEffect } from 'react'
import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk'
import { defaultModules } from '@creit-tech/stellar-wallets-kit/modules/utils'
import './App.css'

// Initialize Stellar Wallets Kit
StellarWalletsKit.init({ modules: defaultModules() })

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

const projects = [
  {
    name: 'StellarPay',
    iconEl: <IconSend />,
    iconBg: '#1A3050',
    desc: 'Cross-border payments powered by Stellar network',
    status: 'raised' as const,
    raised: '$6.2M',
    target: '$5.0M',
    price: '$0.824',
    ticker: 'SPAY',
  },
  {
    name: 'LumenSwap',
    iconEl: <IconRefreshCw />,
    iconBg: '#1A3050',
    desc: 'Decentralized exchange for Stellar assets',
    status: 'raised' as const,
    raised: '$4.5M',
    target: '$3.0M',
    price: '$0.456',
    ticker: 'LSWP',
  },
  {
    name: 'AnchorFi',
    iconEl: <IconAnchor />,
    iconBg: '#1A3050',
    desc: 'Anchor services for fiat on/off ramps',
    status: 'live' as const,
    committed: '$1.8M',
    minRaise: '$2.5M',
    progress: 72,
  },
]

const proposals = [
  { org: 'STELLARPAY', title: 'Q2 Marketing Budget Allocation', status: 'PASSED' },
  { org: 'LUMENSWAP', title: 'Liquidity Pool Expansion Proposal', status: 'PASSED' },
  { org: 'ANCHORFI', title: 'New Fiat Corridor: EUR/XLM', status: 'ACTIVE' },
]

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    // Try to restore previous session
    try {
      StellarWalletsKit.getAddress().then(({ address }) => {
        if (address) setWalletAddress(address)
      }).catch(() => {})
    } catch {}
  }, [])

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const { address } = await StellarWalletsKit.authModal()
      setWalletAddress(address)
    } catch {
      // User closed modal or connection failed
    }
    setConnecting(false)
  }

  const handleDisconnect = async () => {
    await StellarWalletsKit.disconnect()
    setWalletAddress(null)
  }

  const handleProfile = () => {
    StellarWalletsKit.profileModal()
  }

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 4)}...${addr.slice(-4)}`

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
          <div className="navbar-links">
            <button className="btn btn-outline">All projects</button>
            {walletAddress ? (
              <div className="wallet-connected">
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
          <div>
            <h1 className="hero-title">
              Launch an<br />
              <span className="serif-italic accent">ownership coin</span>
            </h1>
            <p className="hero-subtitle">
              Raise XLM while putting ownership into the hands of your early users and believers.
            </p>
          </div>
          <div className="hero-stat-card">
            <StellarIcon />
            <div className="hero-stat-label">Cumulative Raised</div>
            <div className="hero-stat-value">$12,745,000</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
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

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-header">
            <h3>Join a community</h3>
            <span className="count">3 LAUNCHED TO-DATE</span>
          </div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div className="project-card" key={p.name}>
                <div className="project-card-header">
                  <div className="project-icon" style={{ background: p.iconBg }}>
                    {p.iconEl}
                  </div>
                  {p.status === 'raised' && <span className="badge badge-raised">RAISED</span>}
                  {p.status === 'live' && <span className="badge badge-live">LIVE</span>}
                </div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>

                {p.status === 'raised' ? (
                  <>
                    <div className="project-stats">
                      <div>
                        <div className="project-stat-value">{p.raised}</div>
                        <div className="project-stat-label">raised</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="project-stat-value">{p.target}</div>
                        <div className="project-stat-label">target</div>
                      </div>
                    </div>
                    <div className="project-price-row">
                      <span className="project-price-label">Price</span>
                      <span className="project-price-value">{p.price}</span>
                    </div>
                    <button className="btn-buy">Buy {p.ticker}</button>
                  </>
                ) : (
                  <>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="project-stats">
                      <div>
                        <div className="project-stat-value">{p.committed}</div>
                        <div className="project-stat-label">committed</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="project-stat-value">{p.minRaise}</div>
                        <div className="project-stat-label">min. raise</div>
                      </div>
                    </div>
                    <button className="btn-buy" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      Minimum not met
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
                <div className="proposal-item" key={prop.title}>
                  <div className="proposal-left">
                    <span className="proposal-org">{prop.org}</span>
                    <span className="proposal-title">{prop.title}</span>
                  </div>
                  <div className="proposal-actions">
                    <span className="proposal-status">{prop.status}</span>
                    <button className="proposal-view">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonial-card">
            <p className="testimonial-text serif">
              Decision markets harness the predictive power of financial markets and asset prices to guide decision-making, with participants placing real monetary stakes behind their forecasts.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="testimonial-author">
                <div className="testimonial-avatar"><IconStar /></div>
                <span className="testimonial-name">Stellar Research</span>
              </div>
              <div className="testimonial-controls">
                <div className="testimonial-dot active" />
                <div className="testimonial-dot" />
                <div className="testimonial-dot" />
                <button className="testimonial-nav-btn" style={{ marginLeft: 12 }}>‹</button>
                <button className="testimonial-nav-btn">›</button>
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
              <a href="https://x.com/NovaDAO_xyz">Twitter</a>
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
