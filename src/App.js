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
import SelectPeriodNew from './components/SelectPeriodNew.js';
import WhatIsStaking from './components/WhatIsStaking.js';
import Graph from './components/Graph';
import AdminPannel from './components/adminPannel';
import TransakIframe from './components/transakIframe';



import StakedTokensUnstakeFirst from './components/StakedTokensUnstakeFirst';

// css
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SndScreen />} />
        <Route path='/IstScreen' element={<IstScreen />} />
        <Route path='/SndScreen' element={<SndScreen />} />
        <Route path='/WhichWallet' element={<WhichWallet />} />
        <Route path='/NetworkVideos' element={<NetworkVideos />} />
        <Route path='/SelectNetwork' element={<IstScreen />} />
        <Route path='/Assets' element={<Assets />} />
        <Route path='/StakedTokens' element={<StakedTokens />} />
        <Route path='/RecentTx' element={<RecentTx />} />
        <Route path='/SwapPage' element={<SwapPage />} />
        <Route path='/SelectToken' element={<SelectToken />} />
        <Route path='/StakePage' element={<StakePage />} />
        <Route path='/StakePage_,_' element={<StakePageFromSwap />} />
        <Route path='/SelectPeriod' element={<SelectPeriod />} />
        <Route path='/SelectPeriodNew' element={<SelectPeriodNew />} />
        <Route path='/WhatIsStaking' element={<WhatIsStaking />} />
        <Route path='/Graph' element={<Graph />} />
        <Route path='/AdminPannel' element={<AdminPannel />} />
        <Route path='/TransakIframe' element={<TransakIframe />} />

        {/* TrubleShooting */}
        <Route path='/StakedTokensUnstakeFirst' element={<StakedTokensUnstakeFirst />} />
      </Routes>
    </>
  );
}
// }

export default App;
