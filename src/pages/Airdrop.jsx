import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

function Airdrop() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const [amount, setAmount] = useState();
  const [loader, setLoader] = useState(false);
  const connection = new Connection('https://api.devnet.solana.com');
  const requestAirdrop = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
      toast.success(`${amount} SOL Airdropped Successfully!`)
      console.log(response);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error("You've either reached your airdrop limit today or the airdrop faucet has run dry")
    }
  }
  return (
    <>
      <Button variant='primary'> <span className='font-bold flex gap-2' onClick={() => navigate('/account')}><ArrowBackIcon /> Back</span></Button>
      <div className=' flex items-center justify-evenly'>
        <div className='text-white my-24 w-1/2 border-[1px] border-gray-700 rounded-[5px] p-5'>
          <p className='text-2xl font-bold'>Request Airdrop</p>
          <p className='text-gray-400'>Maximum of 2 requests per hour</p>
          <form action="" className='my-7' onSubmit={requestAirdrop}>
            <div className=" flex items-center gap-3">
              <Input type="text" value={wallet?.publicKey} className='rounded-[5px] py-6 text-3xl border-[1px] border-gray-700' disabled />
              <Select className='border-[1px] border-gray-700 rounded-[5px] py-6' onValueChange={(value) => setAmount(value)}>
                <SelectTrigger className="w-[130px] border-[1px] border-gray-700 rounded-[5px] py-6">
                  <SelectValue placeholder="Amount" />
                </SelectTrigger>
                <SelectContent className='border-[1px] border-gray-700 rounded-[5px] py-6 text-gray-400 font-audio bg-slate-950'>
                  <SelectItem value="0.5">0.5 SOL</SelectItem>
                  <SelectItem value="1">1 SOL</SelectItem>
                  <SelectItem value="2.5">2.5 SOL</SelectItem>
                  <SelectItem value="5">5 SOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button type='submit' className='border-[1px] flex justify-center gap-3 items-center border-gray-700 rounded-[5px] py-3 text-black font-audio bg-slate-50 mt-4 w-full hover:text-white hover:bg-black cursor-pointer'>
            {loader &&
              <CircularProgress color="inherit" sx={{width:'2px'}} size={'20px'} />
            }
              Confirm Airdrop
            </button>
          </form>
        </div>
        <div>
          <img src="solana.png" alt="" width={500} />
        </div>
      </div>
      <Toaster position='top-right' />
    </>
  )
}

export default Airdrop