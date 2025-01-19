import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
// import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';

function Account() {
  const navigate=useNavigate();
  const wallet=useWallet();
  const publicKey=wallet.publicKey?.toBase58();

  const connection=new Connection('https://api.devnet.solana.com');
  const [balance,setBalance]=useState('0');
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balanceInLamports = await connection.getBalance(wallet.publicKey);
        setBalance(balanceInLamports / 1e9); 
      }
    };
    fetchBalance();
  }, [publicKey, connection, wallet.publicKey]);
  
  // const handleClick=async()=>{
  //   try {
  //     // Get all parsed token accounts associated with the wallet
  //     const response = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
  //         programId: TOKEN_PROGRAM_ID, // Only fetch token accounts
  //     });

  //     // Log out the associated token accounts
  //     console.log("Token Accounts Associated with Wallet:");
  //     response.value.forEach((account) => {
  //         const tokenAddress = account.pubkey.toBase58();
  //         const tokenData = account.account.data.parsed.info;
  //         console.log(`Token Address: ${tokenAddress}`);
  //         console.log(`Amount: ${tokenData.tokenAmount.uiAmount}`);
  //         console.log(`Mint Address: ${tokenData.mint}`);
  //         console.log('---');
  //     });
  // } catch (error) {
  //     console.error('Error fetching token accounts:', error);
  // }
  // }
  return (
    <div className=' border border-gray-600 mt-20 w-[50%] mx-auto py-4 rounded-[14px]'>
      <div className='flex justify-center items-center gap-3'>
        <img src="coin.png" alt="" width={50} />
        <p className=' text-gray-300'>{publicKey?.slice(0,12)}<span className=' font-extrabold text-2xl'>{'.'.repeat(10)}</span>{publicKey?.slice(30)}</p>
        <img src="copy.png" alt="" width={20} onClick={() => publicKey && navigator.clipboard.writeText(publicKey).then(toast.success('Public Key Copied Successfully!'))} className=' cursor-pointer'/>
      </div>
      <div className=' flex justify-center items-center'>
        <p className=' text-3xl my-5 font-extrabold text-white'>{balance} SOL</p>
      </div>
      <div className=' grid grid-cols-3 text-white justify-items-center'>
        <div className=' flex flex-col w-16 ml-28' onClick={()=>navigate('/send')}>
          <div className=' bg-white p-4 rounded-full hover:bg-gray-300'><img src="send.svg" alt="" /></div>
          <p className='my-2 text-center'>Send</p>
        </div>
        <div className=' flex flex-col w-16' onClick={()=>navigate('/airdrop')}>
          <div className=' bg-white p-4 rounded-full hover:bg-gray-300'><img src="economyGrow.svg" alt="" /></div>
          <p className='my-2 text-center'>Airdrop</p>
        </div>
        <div className=' flex flex-col mr-20' onClick={()=>navigate('/sign')}>
          <div className=' bg-white p-4 w-16 rounded-full hover:bg-gray-300'><img src="sign.svg" alt="" /></div>
          <p className='my-2 text-center'>Sign Message</p>
        </div>
      </div>
      <img src="image.png" alt="" width={600}/>
      {/* <Button onClick={handleClick}>Click</Button> */}
      <Toaster position='top-right'/>

    </div>
  )
}

export default Account