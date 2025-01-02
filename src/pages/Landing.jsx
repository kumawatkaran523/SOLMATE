import React, { useEffect } from 'react'
import "@solana/wallet-adapter-react-ui/styles.css";
import {
    WalletMultiButton
  } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
function Landing() { 
    const wallet=useWallet();
    const navigate=useNavigate();
    useEffect(()=>{
        if(wallet.publicKey) navigate('/account')
    },[wallet.publicKey])
    return (
        <>
            <p className=' font-extrabold text-5xl text-center my-10 bg-gradient-to-l from-purple-300 to-cyan-500 bg-clip-text text-transparent'>Empower Your Solana Journey <br/>Connect, Sign, and Secure with SolMate!</p>
            <div className=' my-10 flex justify-center'>
                <img src="solWallet.png" alt="Solana wallet Adapter" width={600} height={600} />
            </div>
            <div className='text-center text-xl font-audio'>
                <p className='font-audio text-gray-500'>Connect your wallet to get started on your journey!</p>
                <WalletMultiButton style={{margin:'20px'}}/>
            </div>
        </>
    )
}

export default Landing
