# NovaDAO — Smart Contract Integration Spec

This document describes exactly what the frontend needs from the Soroban smart contracts to connect the NovaDAO website.

---

## 1. Contract Addresses & Network

**Please provide:**
- [ ] Contract address for **ICO Vault** (handles commitments, distribution, refunds)
- [ ] Contract address for **Decision Market** (proposals, staking, resolution)
- [ ] Contract address for **TWAP Oracle** (time-weighted average price)
- [ ] Contract address for **Treasury** (fund management)
- [ ] Contract address for **Bid Wall / NAV** (price floor, token burning)
- [ ] **Network**: Testnet or Mainnet (or both)?
- [ ] **Soroban RPC endpoint URL** (e.g. `https://soroban-testnet.stellar.org`)
- [ ] **Network passphrase** (e.g. `Test SDF Network ; September 2015`)

---

## 2. Required Function Signatures

### ICO Vault Contract

```rust
// User commits XLM to a project sale
fn commit(env: Env, user: Address, sale_id: u32, amount: i128) -> Result<(), Error>;

// Get a user's commitment for a specific sale
fn get_commitments(env: Env, user: Address, sale_id: u32) -> i128;

// Get current sale status (total committed, participant count, is_complete, etc.)
fn get_sale_status(env: Env, sale_id: u32) -> SaleStatus;

// List all active/past sales
fn get_sales(env: Env) -> Vec<Sale>;

// Admin: Create a new ICO sale
fn create_sale(env: Env, admin: Address, params: SaleParams) -> u32; // returns sale_id

// Trigger token distribution after successful sale
fn distribute_tokens(env: Env, sale_id: u32) -> Result<(), Error>;

// Refund user if minimum not met
fn process_refund(env: Env, sale_id: u32, user: Address) -> Result<i128, Error>;
```

### Decision Market Contract

```rust
// Create a new governance proposal
fn create_proposal(env: Env, creator: Address, org: Address, title: String, description: String) -> u32; // returns proposal_id

// Stake tokens on PASS or FAIL outcome
fn stake_on_proposal(env: Env, user: Address, proposal_id: u32, direction: PassFail, amount: i128) -> Result<(), Error>;

// Get proposal details
fn get_proposal(env: Env, proposal_id: u32) -> Proposal;

// List all proposals (optionally filtered by org/status)
fn get_proposals(env: Env) -> Vec<Proposal>;

// Get a user's stakes across all proposals
fn get_user_stakes(env: Env, user: Address) -> Vec<UserStake>;

// Finalize proposal based on TWAP resolution
fn finalize_proposal(env: Env, proposal_id: u32) -> Result<ProposalOutcome, Error>;
```

### TWAP Oracle Contract

```rust
// Record current price for TWAP calculation
fn record_twap(env: Env, token: Address) -> i128;

// Get TWAP over a period (in seconds)
fn get_twap(env: Env, token: Address, period: u32) -> i128;
```

### Bid Wall / NAV Contract

```rust
// Calculate current NAV (Net Asset Value) for a token
fn calculate_nav(env: Env, token: Address) -> i128;

// User sells tokens back at bid wall price
fn accept_bid_wall_sale(env: Env, user: Address, token: Address, amount: i128) -> Result<i128, Error>;

// Get current floor price
fn get_floor_price(env: Env, token: Address) -> i128;

// Burn tokens (reducing supply)
fn burn_tokens(env: Env, token: Address, amount: i128) -> Result<(), Error>;
```

---

## 3. Data Types / Structs

**Please confirm or adjust these struct definitions:**

```rust
pub struct SaleParams {
    pub name: String,
    pub ticker: String,
    pub token_supply: i128,
    pub min_raise: i128,      // in stroops (1 XLM = 10^7 stroops)
    pub max_raise: i128,
    pub duration_days: u32,    // typically 4
    pub description: String,
}

pub struct Sale {
    pub id: u32,
    pub params: SaleParams,
    pub total_committed: i128,
    pub participant_count: u32,
    pub start_time: u64,
    pub end_time: u64,
    pub status: SaleStatus,
}

pub enum SaleStatus {
    Active,
    Successful,    // min raise met
    Failed,        // min raise not met
    Distributed,   // tokens sent
    Refunding,
}

pub struct Proposal {
    pub id: u32,
    pub org: Address,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub pass_stake: i128,
    pub fail_stake: i128,
    pub twap_start_price: i128,
    pub created_at: u64,
    pub voting_end: u64,
    pub status: ProposalStatus,
}

pub enum ProposalStatus {
    Active,
    Passed,
    Failed,
    Expired,
}

pub enum PassFail {
    Pass,
    Fail,
}

pub struct UserStake {
    pub proposal_id: u32,
    pub direction: PassFail,
    pub amount: i128,
}

pub enum ProposalOutcome {
    Passed,
    Failed,
}
```

---

## 4. Authentication & Transaction Flow

**Questions for the dev:**

1. **User identification**: Is the Stellar public key (from wallet) sufficient to identify users, or is there an additional registration step?

2. **Transaction signing**: We use `@creit-tech/stellar-wallets-kit` for wallet connection. The standard flow would be:
   ```ts
   // 1. Build transaction with contract call
   // 2. Sign with wallet
   // 3. Submit to network
   ```
   Is there anything non-standard about the signing flow?

3. **Gas/fees**: What's the typical resource estimate for each operation? Should we use simulation first?

4. **Admin operations**: How is admin access controlled? Is it a hardcoded address in the contract, or a role-based system?

5. **Token standard**: Are project tokens Stellar Classic assets (SEP-41) or Soroban token contracts?

---

## 5. Events / Subscriptions

**Does the contract emit events? If so, please provide the event format for:**

- `CommitmentMade { sale_id, user, amount }`
- `SaleCreated { sale_id, name, ticker }`
- `SaleFinalized { sale_id, status }`
- `ProposalCreated { proposal_id, org, title }`
- `VoteCast { proposal_id, user, direction, amount }`
- `ProposalFinalized { proposal_id, outcome }`
- `BidWallSale { user, token, amount, price }`
- `TokensBurned { token, amount }`

---

## 6. What the Frontend Already Has

- **Wallet connection**: Working via Stellar Wallets Kit (Freighter, xBull, Albedo, etc.)
- **UI for all flows**: ICO commitment, voting, portfolio, admin dashboard
- **Simulated data**: Currently using hardcoded data — ready to swap with real contract calls
- **Route structure**: `/` (home), `/admin` (dashboard), `/docs/*` (documentation)

### Missing (will add once we have contract info):

1. `npm install @stellar/stellar-sdk` — Soroban SDK
2. `src/lib/soroban.ts` — Contract client initialization
3. `src/contracts/*.ts` — Typed wrappers for each contract
4. `.env` — Contract addresses + RPC URL:
   ```
   VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
   VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
   VITE_ICO_VAULT_CONTRACT=C...
   VITE_DECISION_MARKET_CONTRACT=C...
   VITE_TWAP_ORACLE_CONTRACT=C...
   VITE_TREASURY_CONTRACT=C...
   VITE_BID_WALL_CONTRACT=C...
   ```

---

## 7. Integration Checklist

Once we receive the contract details:

- [ ] Install `@stellar/stellar-sdk`
- [ ] Create `src/lib/soroban.ts` with contract client setup
- [ ] Create typed wrappers in `src/contracts/` for each contract
- [ ] Add contract addresses to `.env`
- [ ] Replace simulated data with real contract reads
- [ ] Wire commit/vote/create actions to contract transactions
- [ ] Add transaction signing via wallet kit
- [ ] Add loading states and error handling for network calls
- [ ] Test on Testnet
- [ ] Deploy to Mainnet
