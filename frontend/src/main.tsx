import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RecoilRoot>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <App />
    </RecoilRoot>

  </StrictMode>
);
