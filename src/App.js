// react States
import React from 'react';
import { Routes, Route } from 'react-router-dom'


// components
import IstScreen from './components/istScreen.jsx';
import SndScreen from './components/sndScreen.js';
import WhichWallet from './components/WhichWallet.js';
import NetworkVideos from './components/networkVideos.js';
import SelectNetwork from './components/SelectNetwork.js';
import Assets from './components/assets.jsx';
import StakedTokens from './components/stakedTokens.js';
import RecentTx from './components/recentTx.js';
import SwapPage from './components/SwapPage.js';
import SelectToken from './components/SelectToken.js';
import StakePage from './components/stakePage.js';
import StakePageFromSwap from './components/stakePageFromSwap.js';
import SelectPeriod from './components/SelectPeriod.js';
import WhatIsStaking from './components/WhatIsStaking.js';
import Web3Test from './components/web3Test.js';
import Graph from './components/Graph';

// css
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<IstScreen />} />
        <Route path='/IstScreen' element={<IstScreen />} />
        <Route path='/SndScreen' element={<SndScreen />} />
        <Route path='/WhichWallet' element={<WhichWallet />} />
        <Route path='/NetworkVideos' element={<NetworkVideos />} />
        <Route path='/SelectNetwork' element={<SelectNetwork />} />
        <Route path='/Assets' element={<Assets />} />
        <Route path='/StakedTokens' element={<StakedTokens />} />
        <Route path='/RecentTx' element={<RecentTx />} />
        <Route path='/SwapPage' element={<SwapPage />} />
        <Route path='/SelectToken' element={<SelectToken />} />
        <Route path='/StakePage' element={<StakePage />} />
        <Route path='/StakePage_,_' element={<StakePageFromSwap />} />
        <Route path='/SelectPeriod' element={<SelectPeriod />} />
        <Route path='/WhatIsStaking' element={<WhatIsStaking />} />
        <Route path='/Web3Test' element={<Web3Test />} />
        <Route path='/Graph' element={<Graph />} />
      </Routes>
    </>
  );
}
// }

export default App;
