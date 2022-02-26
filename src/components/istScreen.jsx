// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Web3 from 'web3'

import toggleBtn from '../Images/toggleBtn.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/swapImg.png';
import stakeImg from '../Images/stakeImg.png';
import tradeImg from '../Images/tradeImg.png';
import networkImg from '../Images/networkImg.png';
import connectImg from '../Images/connectImg.png';
import networkDropdown from '../Images/networkDropdown.png';
import networkDropdown1 from '../Images/networkDropdown1.png';
import darkSetting1 from '../Images/darkSetting1.png';
import darkInfo1 from '../Images/darkInfo1.png';
import darkRefresh1 from '../Images/darkRefresh1.png';
import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';

// components
import Graph from '../components/Graph.jsx'

// css
import '../App.css';

function App() {

  const navigate = useNavigate();

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('IstScreen');
  const [userAccount, setuserAccount] = useState('');

  useEffect(() => {
    setuserAccount(localStorage.getItem('userAccount'))
    setCurrentUserNetwork(localStorage.getItem('userNetwork'))
  }, [])


  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     activePage: 'IstScreen',
  //     // account: '',
  //     // token: {},
  //     // ethSwap: {},
  //     // ethBalance: '0',
  //     // tokenBalance: '0',
  //     // loading: true
  //   }
  // }

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 'Binance') {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = 'Networks'
  }

  let userAccountContent
  if (userAccount != '' && userAccount != null) {
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    setTimeout(() => {
      localStorage.setItem('userAccount', userAccount)
    }, 1);
    navigate('/NetworkVideos')
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px', color: 'white' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>{fullResult}</span>
      {/* Connect */}
    </div>
  } else {
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px', color: 'white' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>Connect</span>
      {/* Connect */}
    </div>
  }


  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className='MainDivDesktop'>
        <div className='headerNav'>
          <div className='row'>
            <div className='col-4'>
              <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
            </div>
            <div className="col-8 headerLinks">
              <span style={{ display: "inline", float: "right" }}>
                <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
              </span>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/WhichWallet' }}>
                  {userAccountContent}
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/SelectNetwork' }}>
                  <div className='headerBtns sndHeaderBtn networkBtn'>
                    {/* <img src={networkImg} alt="connectImg" /> */}
                    <span style={{ color: '#1DCBFE', marginLeft: '10px',marginRight: '20px', fontWeight: 'bold' }} className='networksTxt'>{userNetworkContent}</span>
                    <img src={networkDropdown1} className='sndHeaderBtnsnd' alt="networkDropdown" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="desktopBlueDiv">
          <hr className='hrr' />
          <div className="row MainDivMain">
            <div className="col-8">
              <h1 className='HelpTxt' style={{ display: 'inline' }}>Help</h1>
              <Link to={{ pathname: '/NetworkVideos' }}>
                <h1 className='HelpTxt VideoTxt' style={{ display: 'inline', marginLeft: '30px' }}>Video</h1>
              </Link>
              <div style={{ width: '106%' }}>
                <Graph />
              </div>

            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-3">
                  <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Buy
                  </h1>
                </div>
                <div className="col-3">
                  <Link to={{ pathname: '/SwapPage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Swap
                  </h1></Link>
                </div>
                <div className="col-3">
                  <Link to={{ pathname: '/StakePage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Stake
                  </h1></Link>
                </div>
                <div className="col-3">
                  <a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x32151D601f6578399136c57030890FbB48eDE685"><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Trade
                  </h1></a>
                </div>
              </div>
              <div className="bottomHeaderr bottomHeaderIstScreen">
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={darkInfo1} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxt blackConnectTxtIstScreen'>Connect Wallet</p></div>
                  <div className="col-2">
                    <img className='blackDivBtns ' style={{ marginLeft: '20px' }} src={darkSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={()=> {window.location.reload()}} style={{cursor: 'pointer'}} src={darkRefresh1} alt="settingIcon" />
                  </div>

                </div>

                <hr className='hr' />
                <div className='DeskContentDiv'>
                  <br />
                  <div className="greyDiv greyDivIstscreen">
                    <h4>Please connect your wallet and select your Network (ERC20 or BEP20)</h4>
                  </div>

                  <div className="greyDiv greyDivIstscreen" style={{ marginTop: '10px' }}>
                    <h4 style={{ color: '#1DCCFF' }}>Note: your FTP token will appear as bFTP on Binance Smart Chain</h4>
                  </div>
                  <br />
                  <p className='blackBottomBtn'>
                    <Link to={{ pathname: '/WhichWallet' }}>
                      <button>Connect Wallet</button>
                    </Link>
                  </p>

                </div><br /><br />
                <hr className='hr' />
                <br />
                <div className="row">
                  <div className="col-6">
                    <Link to={{ pathname: '/Assets' }} ><h1 style={{ textAlign: 'center', color: '#1FEEF4', fontWeight: 'bold' }}>Assets</h1></Link>
                  </div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} ><h1 style={{ textAlign: 'center', color: '#1FEEF4', fontWeight: 'bold' }}>Activity</h1></Link>
                  </div>
                </div>
              </div>
              <br /><br /><br /><br />
            </div>
          </div>
        </div>
        <div className='foooterDiv'>
          <div className="footerInerDiv">
            <div className="row">
              <div className="col-3">
                <br />
                <br />
                <img src={laExchange} alt="laExchange" />
              </div>
              <div className="col-9">
                <div className='footerDivCol9'>
                  <h2>Fair Trader will be soon listed on LATOKEN Exchange</h2>
                  <p>Fair Trader has partnered with LATOKEN exchange where you will be able to buy and sell FTP tokens with a credit card in just a few minutes.</p>
                  <p>LATOKEN is a rapidly growing crypto exchange focussing on liquidity for new tokens. LATOKEN entered CoinmarketCap's Top-20 in March 2019 and has over 1.5 million registered traders.</p>
                  <h6>Initial Exchange Offering (IEO)</h6>
                  <p>LATOKEN has approved the FTP token to be listen for the upcoming IEO on its launch pad, LATOKEN will notify all the users of its platform about the uniqueness of the Fair Trader Applications and ability to resolve disputes between Buyer and Sellers using the revolutionary App that will be release in the middle of 20022.</p>
                  <p>The Initial Exchange Offering will be the first international exposure for Fair Trader and will significantly increase the number of FTP token holders and future users of FTP platform</p>
                  <p>For more information on LATOKEN Exchange or to open an account please visit <a href="https://www.Latoken.com" target="_blank">www.Latoken.com</a></p>
                  <br /><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ border: '5px solid #1dccff', backgroundColor: '#1dccff', marginTop: '-1px' }} />
        <div className='footerBottom'>
          <img style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0' }} src={footerLogo} alt="footerLogo" />
          <img style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 220px' }} src={footerBubbles} alt="footerLogo" />

          <div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="footer_terms row" style={{ color: '#1296B9', fontWeight: 'bold' }}>
              <div className="col-6" style={{ fontSize: '17px' }}>Home <span style={{ color: 'black' }}>__</span> Partnerships</div>
              <div className="col-6" style={{ fontSize: '17px', textAlign: 'right' }}>Privacy Policy <span style={{ color: 'black' }}>__</span> Terms & Conditions</div>
            </div>
          </div>
        </div>
        <div className='hrOfBottom'>
          <div className='hr' style={{ marginTop: '10px', borderColor: '#1dccff' }}></div>
          <br />
          <p>Please note that the FTP Platform and applications as well as innovations set out in this website and whitepaper are in development stage and are not currently in deployment. Please check the Fair Trader road map for the latest updates on product development on www.fairtrader.io</p>
          <p>No person should use the information contained in this website or the white paper as financial advice. Fair Trader FTP disclaims all liability for any loss or damage whatsoever relating to FTP token price fluctuation.</p>
          <br />
          <h2 style={{ textAlign: 'center', color: '#1296B9', fontWeight: 'bold' }}>Copyright @ 2021 FairTrader.io All rights reserved</h2>
          <br />
          <br />
        </div>
      </div>

      <div className='MainDivMob'>
        <div className='blackWholeDiv'>
          <div className='row headerLogoBtns'>
            <div className='col-4'>
              <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
            </div>
            <div className="col-8 headerLinks">
              <span style={{ display: "inline", float: "right" }}>
                <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
              </span>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/WhichWallet' }}>
                  {userAccountContent}
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/SelectNetwork' }}>
                  <div className='headerBtns sndHeaderBtn'>
                    {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                    <span style={{ color: '#1DCBFE', marginLeft: '10px',marginRight: '20px', fontWeight: 'bold' }}>
                      {userNetworkContent}
                    </span>
                    <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Graph />
        </div>
        <div className="blueDiv">
          <div className="MainLinks" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <div className='row'>
              <div className='mainLinksPics col-3'>
                <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/SwapPage' }}>
                  <img className='mainLinksPics1' src={swapImg} alt="swapImg" />
                </Link>
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/StakePage' }}>
                  <img className='mainLinksPics2' src={stakeImg} alt="stakeImg" />
                </Link>
              </div>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x32151D601f6578399136c57030890FbB48eDE685"><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
              </div>
            </div>
          </div>
          <div className="blueBlackMainDiv">
            <div className="row">
              <div className="col-2">
                <Link to={{ pathname: '/SndScreen' }}>
                  <img className='blackDivBtns blackDivBtnsIst' src={darkInfo1} alt="infoIcon" />
                </Link>
              </div>
              <div className="col-6">
                <p className='blackConnectTxt blackConnectTxtIstScreen'>Connect<span style={{ color: 'black', fontSize: '12px' }}>_</span>Wallet</p></div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={darkSetting1} alt="settingIcon" />
              </div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={()=> {window.location.reload()}} style={{cursor: 'pointer'}} src={darkRefresh1} alt="settingIcon" />
              </div>
            </div>
            <hr className='hr' />
            <div className="greyDiv">
              <h4>Please connect your wallet and select your Network (ERC20 or BEP20)</h4>
            </div>
            <div className="greyDiv" style={{ marginTop: '15px' }}>
              <h4 style={{ color: '#1DCCFF' }}>Note: your FTP token will appear as bFTP on Binance Smart Chain</h4>
            </div>
            <br />
            <p className='blackBottomBtn istScreenBtn'>
              <Link to={{ pathname: '/WhichWallet' }}>
                <button style={{ color: 'white' }}>Connect Wallet</button>
              </Link>
            </p>
          </div>
          {/* {content} */}
          {/* <IstScreen></IstScreen> */}
          {/* <SndScreen></SndScreen> */}
          {/* <WhichWallet></WhichWallet> */}
          {/* <NetworkVideos></NetworkVideos> */}
          {/* <SelectNetwork></SelectNetwork> */}
          {/* <Assets></Assets> */}
          {/* <StakedTokens></StakedTokens> */}
          {/* <RecentTx></RecentTx> */}
          {/* <SwapPage></SwapPage> */}
          {/* <SelectToken></SelectToken> */}
          {/* <StakePage></StakePage> */}
          {/* <SelectPeriod></SelectPeriod> */}
          {/* <WhatIsStaking></WhatIsStaking> */}
          {/* <Web3Test></Web3Test> */}
        </div>
      </div>
    </div>
  );
}
// }

export default App;
