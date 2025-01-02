import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

function Send() {
  const navigate = useNavigate();
  const [recepeintAdd, setRecepientAdd] = useState();
  const [amount, setAmount] = useState();
  const wallet = useWallet()
  const [loader, setLoader] = useState(false);

  const connection = new Connection('https://api.devnet.solana.com')
  const sendSol = async (e) => {
    try {
      setLoader(true);
      e.preventDefault();
      const transaction = new Transaction();
      console.log(recepeintAdd);
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(recepeintAdd),
          lamports: amount * LAMPORTS_PER_SOL
        }
        )
      );
      await wallet.sendTransaction(transaction, connection);
      setAmount('')
      setRecepientAdd('')
      toast.success('SOL Sends Successfully!')
      setLoader(false)
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <>
      <Button variant='primary'> <span className='font-bold flex gap-2' onClick={() => navigate('/account')}><ArrowBackIcon /> Back</span></Button>
      <div className=' flex items-center justify-evenly'>
        <div className='text-white my-24 w-1/2 border-[1px] border-gray-700 rounded-[5px] p-5'>
          <p className='text-2xl font-bold'>Send SOL through SOLMATE</p>
          <form action="" className='my-7' onSubmit={sendSol}>
            <Input type="text" placeholder="Recepient's Solana Address" className='rounded-[5px] py-6 text-3xl border-[1px] border-gray-700 my-4' value={recepeintAdd} onChange={(e) => setRecepientAdd(e.target.value)} />
            <Input type="text" placeholder="Amount" className='rounded-[5px] py-6 text-3xl border-[1px] border-gray-700' value={amount} onChange={(e) => setAmount(e.target.value)} />
            {/* <Button type='submit' className='border-[1px] border-gray-700 rounded-[5px] py-3 text-black font-audio bg-slate-50 mt-4 w-full hover:text-white' >Confirm Send</Button> */}
            <button type='submit' className='border-[1px] flex justify-center gap-3 items-center border-gray-700 rounded-[5px] py-3 text-black font-audio bg-slate-50 mt-4 w-full hover:text-white hover:bg-black cursor-pointer'>
              {loader &&
                <CircularProgress color="inherit" sx={{ width: '2px' }} size={'20px'} />
              }
              Confirm Send
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

export default Send;