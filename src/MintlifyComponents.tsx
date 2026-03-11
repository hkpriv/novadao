import type { ReactNode } from 'react'

/* Stub components that replicate Mintlify's MDX components for local rendering */

export const Card = ({ title, icon: _icon, href, children }: { title?: string; icon?: string; href?: string; children?: ReactNode }) => (
  <a href={href ? `/docs${href}` : '#'} style={{
    display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: 12, padding: '20px 24px', textDecoration: 'none', color: 'inherit',
    transition: 'border-color 0.2s',
  }}
  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
  >
    {title && <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</div>}
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{children}</div>
  </a>
)

export const CardGroup = ({ cols, children }: { cols?: number; children?: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols || 2}, 1fr)`, gap: 16, margin: '20px 0' }}>
    {children}
  </div>
)

export const Steps = ({ children }: { children?: ReactNode }) => (
  <div style={{ margin: '24px 0', paddingLeft: 24, borderLeft: '2px solid var(--accent)' }}>{children}</div>
)

export const Step = ({ title, children }: { title?: string; children?: ReactNode }) => (
  <div style={{ marginBottom: 24 }}>
    {title && <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-light)', marginBottom: 8 }}>{title}</div>}
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{children}</div>
  </div>
)

const CalloutBox = ({ children, color, label }: { children?: ReactNode; color: string; label: string }) => (
  <div style={{
    margin: '20px 0', padding: '16px 20px', borderRadius: 8,
    borderLeft: `3px solid ${color}`, background: `${color}10`,
  }}>
    <div style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>{label}</div>
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{children}</div>
  </div>
)

export const Tip = ({ children }: { children?: ReactNode }) => <CalloutBox color="#42BE65" label="Tip">{children}</CalloutBox>
export const Note = ({ children }: { children?: ReactNode }) => <CalloutBox color="#4589FF" label="Note">{children}</CalloutBox>
export const Warning = ({ children }: { children?: ReactNode }) => <CalloutBox color="#FF832B" label="Warning">{children}</CalloutBox>
export const Info = ({ children }: { children?: ReactNode }) => <CalloutBox color="#4589FF" label="Info">{children}</CalloutBox>

export const Tabs = ({ children }: { children?: ReactNode }) => (
  <div style={{ margin: '20px 0' }}>{children}</div>
)

export const Tab = ({ title, children }: { title?: string; children?: ReactNode }) => (
  <details style={{ margin: '8px 0', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8 }}>
    <summary style={{ padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{title}</summary>
    <div style={{ padding: '0 16px 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{children}</div>
  </details>
)
