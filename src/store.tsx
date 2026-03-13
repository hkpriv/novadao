import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Project {
  id: string
  name: string
  ticker: string
  description: string
  tokenSupply: string
  minRaise: string
  maxRaise: string
  duration: number
  status: 'draft' | 'live' | 'raised' | 'refunding'
  visible: boolean
  raised?: string
  target?: string
  price?: string
  committed?: string
  progress?: number
  iconBg: string
}

export interface Proposal {
  id: string
  projectId: string
  org: string
  title: string
  description: string
  votingDays: number
  status: 'draft' | 'active' | 'passed' | 'failed'
}

interface Store {
  projects: Project[]
  proposals: Proposal[]
  addProject: (p: Omit<Project, 'id'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  addProposal: (p: Omit<Proposal, 'id'>) => void
  updateProposal: (id: string, updates: Partial<Proposal>) => void
  deleteProposal: (id: string) => void
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1', name: 'StellarPay', ticker: 'SPAY',
    description: 'Cross-border payments powered by Stellar network',
    tokenSupply: '10,000,000', minRaise: '$5,000,000', maxRaise: '$8,000,000',
    duration: 4, status: 'raised', visible: true, iconBg: '#1A3050',
    raised: '$6.2M', target: '$5.0M', price: '$0.824',
  },
  {
    id: '2', name: 'LumenSwap', ticker: 'LSWP',
    description: 'Decentralized exchange for Stellar assets',
    tokenSupply: '10,000,000', minRaise: '$3,000,000', maxRaise: '$5,000,000',
    duration: 4, status: 'raised', visible: true, iconBg: '#1A3050',
    raised: '$4.5M', target: '$3.0M', price: '$0.456',
  },
  {
    id: '3', name: 'AnchorFi', ticker: 'ANFI',
    description: 'Anchor services for fiat on/off ramps',
    tokenSupply: '10,000,000', minRaise: '$2,500,000', maxRaise: '$4,000,000',
    duration: 4, status: 'live', visible: true, iconBg: '#1A3050',
    committed: '$1.8M', progress: 72,
  },
]

const DEFAULT_PROPOSALS: Proposal[] = [
  { id: '1', projectId: '1', org: 'STELLARPAY', title: 'Q2 Marketing Budget Allocation', description: '', votingDays: 7, status: 'passed' },
  { id: '2', projectId: '2', org: 'LUMENSWAP', title: 'Liquidity Pool Expansion Proposal', description: '', votingDays: 7, status: 'passed' },
  { id: '3', projectId: '3', org: 'ANCHORFI', title: 'New Fiat Corridor: EUR/XLM', description: '', votingDays: 7, status: 'active' },
]

const STORAGE_KEY = 'novadao_store'

function loadFromStorage(): { projects: Project[]; proposals: Proposal[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { projects: DEFAULT_PROJECTS, proposals: DEFAULT_PROPOSALS }
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage().projects)
  const [proposals, setProposals] = useState<Proposal[]>(() => loadFromStorage().proposals)

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects, proposals }))
  }, [projects, proposals])

  const addProject = (p: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...p, id: String(Date.now()) }])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  const addProposal = (p: Omit<Proposal, 'id'>) => {
    setProposals(prev => [...prev, { ...p, id: String(Date.now()) }])
  }

  const updateProposal = (id: string, updates: Partial<Proposal>) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProposal = (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id))
  }

  return (
    <StoreContext.Provider value={{ projects, proposals, addProject, updateProject, deleteProject, addProposal, updateProposal, deleteProposal }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
