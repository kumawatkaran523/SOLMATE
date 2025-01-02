import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import AppLayout from './pages/AppLayout'
import Account from './pages/Account'
import Send from './pages/Send'
import Airdrop from './pages/Airdrop'
import Sign from './pages/Sign'

import {
  WalletModalProvider,
  // WalletDisconnectButton,
  // WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '',
          element: <Landing />
        },
        {
          path: 'account',
          element: <Account />
        },
        {
          path: 'send',
          element: <Send />
        },
        {
          path: 'airdrop',
          element: <Airdrop />
        },
        {
          path: 'sign',
          element: <Sign />
        }
      ]
    }
  ]);

  return (
    <ConnectionProvider endpoint='https://api.devnet.solana.com'>
      <WalletProvider wallets={[new UnsafeBurnerWalletAdapter()]} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton /> */}
          {/* <WalletDisconnectButton /> */}
          <RouterProvider router={router} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
