import React, { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ABI = [
  "function register(bytes32,bytes32)",
  "function isVerified(address) view returns (bool)"
];
const CONTRACT_ADDRESS = '<PASTE_CONTRACT_ADDRESS>';

function hashUtf8(str) {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str));
}

export default function App(){
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');

  async function connect(){
    const [acc] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(acc);
  }

  async function register(){
    if(!account) return setStatus('Connect wallet first');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const metadataHash = hashUtf8(name + '|' + dob);
    const govIdHash = hashUtf8('govid-placeholder');

    const tx = await contract.register(govIdHash, metadataHash);
    setStatus('Waiting for tx... ' + tx.hash);
    await tx.wait();
    setStatus('Registered!');
  }

  async function check(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const v = await contract.isVerified(account);
    setStatus(v ? 'Verified' : 'Not Verified');
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Identity Prototype</h2>
      {!account ? <button onClick={connect}>Connect MetaMask</button> : <div>Connected: {account}</div>}

      <div style={{ marginTop: 10 }}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="DOB (YYYY-MM-DD)" value={dob} onChange={e=>setDob(e.target.value)} />
        <button onClick={register}>Register (hash PII locally)</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={check}>Check Verified</button>
      </div>

      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
}
