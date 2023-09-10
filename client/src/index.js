import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { CreateContext } from './context';
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: '6g7MzPYfqmCroVbaqsrVtqIrWFbBwkOG' }), publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),

  ],
  publicClient,
  webSocketPublicClient,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <CreateContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CreateContext>
    </WagmiConfig>
  </React.StrictMode>
);
