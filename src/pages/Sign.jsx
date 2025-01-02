import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from "bs58";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Sign() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const wallet = useWallet();
  const [open, setOpen] = useState(false); 
  const [sign,setSign]=useState();
  const signMessage = async (e) => {
    e.preventDefault();
    try {
      const encodedMessage = new TextEncoder().encode(msg);
      const signature = await wallet.signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, wallet.publicKey.toBytes())) {
        alert("Message signature invalid!");
        return;
      }
      setSign(signature);
      setOpen(true);
      setMsg(''); 
    } catch (error) {
      console.error(error);
      alert("An error occurred while signing the message.");
    }
  }

  return (
    <>
      <Button variant='primary'>
        <span className='font-bold flex gap-2' onClick={() => navigate('/account')}>
          <ArrowBackIcon /> Back
        </span>
      </Button>
      
      <div className='flex items-center justify-evenly'>
        <div className='text-white my-24 w-1/2 border-[1px] border-gray-700 rounded-[5px] p-5'>
          <p className='text-2xl font-bold'>Securely Sign Messages with SOLMATE</p>
          <form className='my-7' onSubmit={signMessage}>
            <Input
              type="text"
              placeholder="Message"
              className='rounded-[5px] py-6 text-3xl border-[1px] border-gray-700 my-4'
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              className='border-[1px] border-gray-700 rounded-[5px] py-3 text-black font-audio bg-slate-50 mt-4 w-full hover:text-white'
              type='submit'
            >
              Confirm Sign
            </Button>
          </form>
        </div>
        <div>
          <img src="solana.png" alt="Solana" width={500} />
        </div>
      </div>

      {open && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)} // Close the alert
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Message successfully signed!<br/>
          Signature of the Message : {bs58.encode(sign)}
        </Alert>
      )}
    </>
  );
}

export default Sign;
