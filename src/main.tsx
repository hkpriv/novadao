import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import './index.css'
import App from './App.tsx'
import DocsLayout from './DocsLayout.tsx'
import { Card, CardGroup, Steps, Step, Tip, Note, Warning, Info, Tabs, Tab } from './MintlifyComponents.tsx'

// MDX pages
import DocsIndex from '../docs/index.mdx'
import BenefitsFounders from '../docs/benefits/founders.mdx'
import BenefitsInvestors from '../docs/benefits/investors.mdx'
import GovOverview from '../docs/governance/overview.mdx'
import GovMarkets from '../docs/governance/markets.mdx'
import GovProposals from '../docs/governance/proposals.mdx'
import GovTwaps from '../docs/governance/twaps.mdx'
import LaunchReady from '../docs/how-launches-work/are-you-ready.mdx'
import LaunchBidWall from '../docs/how-launches-work/bid-wall.mdx'
import LaunchCreate from '../docs/how-launches-work/create.mdx'
import LaunchSale from '../docs/how-launches-work/sale.mdx'
import LaunchStamp from '../docs/how-launches-work/stamp.mdx'
import TokenDetails from '../docs/token/details.mdx'
import TokenMechanics from '../docs/token/mechanics.mdx'
import ProtocolAnalytics from '../docs/protocol/analytics.mdx'

const components = { Card, CardGroup, Steps, Step, Tip, Note, Warning, Info, Tabs, Tab }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MDXProvider components={components}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path="benefits/founders" element={<BenefitsFounders />} />
            <Route path="benefits/investors" element={<BenefitsInvestors />} />
            <Route path="governance/overview" element={<GovOverview />} />
            <Route path="governance/markets" element={<GovMarkets />} />
            <Route path="governance/proposals" element={<GovProposals />} />
            <Route path="governance/twaps" element={<GovTwaps />} />
            <Route path="how-launches-work/are-you-ready" element={<LaunchReady />} />
            <Route path="how-launches-work/bid-wall" element={<LaunchBidWall />} />
            <Route path="how-launches-work/create" element={<LaunchCreate />} />
            <Route path="how-launches-work/sale" element={<LaunchSale />} />
            <Route path="how-launches-work/stamp" element={<LaunchStamp />} />
            <Route path="token/details" element={<TokenDetails />} />
            <Route path="token/mechanics" element={<TokenMechanics />} />
            <Route path="protocol/analytics" element={<ProtocolAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MDXProvider>
  </StrictMode>,
)
