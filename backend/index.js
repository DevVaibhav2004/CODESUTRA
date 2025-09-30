const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const IdentityABI = [
  "function register(bytes32,bytes32)",
  "function verify(address)",
  "function isVerified(address) view returns (bool)",
  "event Registered(address, bytes32, uint256)",
  "event Verified(address, address, uint256)"
];

const app = express();
app.use(bodyParser.json());

const RPC = process.env.RPC_URL || 'http://127.0.0.1:8545';
const PRIVATE_KEY = process.env.ADMIN_KEY || '';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '<PASTE_CONTRACT_ADDRESS>';

const provider = new ethers.providers.JsonRpcProvider(RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, IdentityABI, signer);

app.post('/verify', async (req, res) => {
  try {
    const { user } = req.body;
    const tx = await contract.verify(user);
    await tx.wait();
    res.json({ ok: true, txHash: tx.hash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/isVerified/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const v = await contract.isVerified(user);
    res.json({ user, verified: v });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(3001, () => console.log('Backend listening on 3001'));
