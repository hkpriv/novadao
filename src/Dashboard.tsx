import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk'
import { useStore } from './store.tsx'

const SIMULATED_BALANCE = { xlm: '1,250.00', usd: '$412.50' }

const SIMULATED_POSITIONS: Record<string, { tokens: number; avgPrice: number }> = {
  StellarPay: { tokens: 7520, avgPrice: 0.664 },
  LumenSwap: { tokens: 3100, avgPrice: 0.300 },
}

const SIMULATED_ACTIVITY = [
  { date: '2026-03-10', action: 'Committed 500 XLM', project: 'AnchorFi', type: 'commit' },
  { date: '2026-03-08', action: 'Voted PASS', project: 'StellarPay', type: 'vote' },
  { date: '2026-03-05', action: 'Bought 3,100 LSWP', project: 'LumenSwap', type: 'buy' },
  { date: '2026-02-28', action: 'Bought 7,520 SPAY', project: 'StellarPay', type: 'buy' },
  { date: '2026-02-20', action: 'Voted FAIL', project: 'LumenSwap', type: 'vote' },
]

export default function Dashboard() {
  const { projects } = useStore()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [tab, setTab] = useState<'portfolio' | 'activity' | 'votes'>('portfolio')

  useEffect(() => {
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
    } catch {}
    setConnecting(false)
  }

  if (!walletAddress) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#128640;</div>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Your Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            Connect your Stellar wallet to view your portfolio, track investments, and manage your positions.
          </p>
          <button onClick={handleConnect} disabled={connecting} style={{
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

  // Calculate portfolio
  const holdings = Object.entries(SIMULATED_POSITIONS).map(([name, pos]) => {
    const project = projects.find(p => p.name === name)
    const currentPrice = project?.price ? parseFloat(project.price.replace('$', '')) : pos.avgPrice
    const value = pos.tokens * currentPrice
    const pnl = (currentPrice - pos.avgPrice) * pos.tokens
    const pnlPct = ((currentPrice - pos.avgPrice) / pos.avgPrice) * 100
    return { name, ticker: project?.ticker || '???', tokens: pos.tokens, avgPrice: pos.avgPrice, currentPrice, value, pnl, pnlPct }
  })
  const totalValue = holdings.reduce((s, h) => s + h.value, 0)

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: 16, padding: 24,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px', borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(5, 13, 26, 0.85)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ color: 'var(--accent-light)', fontSize: 14 }}>&larr; Back</Link>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Dashboard</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 12px', borderRadius: 20, fontFamily: 'monospace' }}>
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        {/* Balance overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Wallet Balance</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{SIMULATED_BALANCE.xlm}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>XLM</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Portfolio Value</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            <div style={{ fontSize: 13, color: 'var(--success)' }}>+{holdings.reduce((s, h) => s + h.pnl, 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USD</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Investments</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{holdings.length}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Active positions</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['portfolio', 'activity', 'votes'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
              background: tab === t ? 'var(--accent)' : 'var(--bg-card)',
              color: tab === t ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s', textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>

        {/* Portfolio */}
        {tab === 'portfolio' && (
          <div>
            {holdings.map(h => (
              <div key={h.name} style={{
                ...cardStyle, marginBottom: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
              }}>
                <div style={{ minWidth: 150 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{h.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{h.tokens.toLocaleString()} {h.ticker}</div>
                </div>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Avg. Price</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>${h.avgPrice.toFixed(3)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Current</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>${h.currentPrice.toFixed(3)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Value</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>${h.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>P&L</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: h.pnl >= 0 ? 'var(--success)' : 'var(--error)' }}>
                      {h.pnl >= 0 ? '+' : ''}{h.pnlPct.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {holdings.length === 0 && (
              <div style={{ ...cardStyle, textAlign: 'center', padding: 48 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>&#128230;</div>
                <p style={{ color: 'var(--text-secondary)' }}>No positions yet. Browse projects to start investing.</p>
                <Link to="/" style={{ color: 'var(--accent-light)', fontSize: 14, marginTop: 12, display: 'inline-block' }}>Browse Projects &rarr;</Link>
              </div>
            )}
          </div>
        )}

        {/* Activity */}
        {tab === 'activity' && (
          <div style={cardStyle}>
            {SIMULATED_ACTIVITY.map((a, i) => (
              <div key={i} style={{
                padding: '16px 0',
                borderBottom: i < SIMULATED_ACTIVITY.length - 1 ? '1px solid var(--border-color)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{a.action}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.project}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.date}</div>
              </div>
            ))}
          </div>
        )}

        {/* Votes */}
        {tab === 'votes' && (
          <div style={cardStyle}>
            <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>STELLARPAY</div>
                <div style={{ fontWeight: 600 }}>Q2 Marketing Budget Allocation</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)', padding: '4px 12px', background: 'rgba(66,190,101,0.15)', borderRadius: 20 }}>PASS</span>
            </div>
            <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>LUMENSWAP</div>
                <div style={{ fontWeight: 600 }}>Liquidity Pool Expansion Proposal</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--error)', padding: '4px 12px', background: 'rgba(250,77,86,0.15)', borderRadius: 20 }}>FAIL</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
