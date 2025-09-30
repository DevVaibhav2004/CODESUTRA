Added README.md with blockchain identification details

# CODESUTRA 🔗  
_A Blockchain-based Identity Verification System (SIH Project)_

## 🌟 Overview
CODESUTRA is a decentralized identity verification platform powered by blockchain.  
It ensures **security, transparency, and tamper-proof storage** of user identities.  

This project was developed as part of **Smart India Hackathon (SIH)** to address challenges in identity management.

---

## 🚀 Features
- ✅ Blockchain-backed **Identity Verification**  
- ✅ **React DApp** frontend for user interaction  
- ✅ **Node.js Backend** APIs for off-chain logic  
- ✅ **Hardhat Smart Contracts** with Solidity  
- ✅ Supports multiple EVM-compatible blockchains  

---

## 🛠️ Tech Stack
- **Smart Contracts**: Solidity, Hardhat  
- **Frontend**: React.js  
- **Backend**: Node.js, Express  
- **Blockchain Interaction**: Ethers.js  
- **Wallet**: MetaMask  

---

## 🌐 Blockchain Identification
The app automatically detects the connected blockchain using **Chain ID**.

**Supported Networks:**
- Ethereum Mainnet — `1`  
- Goerli Testnet — `5`  
- Polygon Mainnet — `137`  
- Mumbai Testnet — `80001`  

**Example (Ethers.js):**
```js
import { ethers } from "ethers";

async function detectNetwork() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  console.log("Connected to:", network.name, "Chain ID:", network.chainId);
}

