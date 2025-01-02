import { useWallet } from '@solana/wallet-adapter-react'
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const wallet=useWallet();
    const navigate=useNavigate()
    useEffect(()=>{
        if(!wallet.publicKey){
            navigate('/')
        }
    },[wallet,wallet.publicKey])
    return (
        <>
            <div className=' flex justify-between items-center py-6'>
                <div className='flex items-center'>
                    <img src='wlogo.png' alt='' width={100} height={100} className='' />
                    <p className='text-5xl px-5 font-bebas'>Solana Wallet Adapter</p>
                </div>
                {
                    wallet.publicKey && <WalletDisconnectButton/>
                }
            </div>
            <div className=' border border-gray-700 border-b-0' />
        </>
    )
}

export default Header