// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import infoIcon from '../Images/darkInfo.png';
import whichWalletCross from '../Images/lightCross.png';
import greenArrow from '../Images/greenArrow.png';
import toggleBtn from '../Images/toggleBtn.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/swapImg.png';
import stakeImg from '../Images/stakeImg.png';
import tradeImg from '../Images/tradeImg.png';
import networkImg from '../Images/networkImg.png';
import connectImg from '../Images/connectImg.png';
import networkDropdown from '../Images/networkDropdown.png';
import networkDropdown1 from '../Images/networkDropdown1.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';
import testPeriodBlueLock from '../Images/testPeriodBlueLock.png';
import testPeriodGreenLock from '../Images/testPeriodGreenLock.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import coinImg from '../Images/coinImg.png';

// components
import Graph from '../components/Graph.jsx'


// css
import './css/selectPeriod.css'
function App() {

  const navigate = useNavigate();

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Networks');
  const [userAccount, setuserAccount] = useState('');

  useEffect(() => {
    setuserAccount(localStorage.getItem('userAccount'))
    setCurrentUserNetwork(localStorage.getItem('userNetwork'))
  }, [])

  const handleSelectSwapToken = async (e) => {
    console.log(e);
    localStorage.setItem('StakePeriod', e)
    navigate(-1)
  }


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
    console.log('111111111111111111111111', userAccount);
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    setTimeout(() => {
      localStorage.setItem('userAccount', userAccount)
    }, 1);
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>{fullResult}</span>
      {/* Connect */}
    </div>
  } else {
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>Connect</span>
      {/* Connect */}
    </div>
  }
  return (
    // [content]
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
                    <span style={{ color: '#1DCBFE', marginLeft: '10px',marginRight: '20px', fontWeight: 'bold' }}>
                      {userNetworkContent}
                    </span>
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
              <div className="blueBlackMainDiv3" style={{ backgroundColor: '#91d8f7' }}>
                <div className="row" style={{ marginBottom: '7px', marginTop: '-10px' }}>
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px' }}>Stake FTP?</p>
                    {/* <p className='blackConnectTxt blackConnectTxtIstScreen'>Swap to FTP</p> */}
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns ' style={{ marginLeft: '20px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={()=> {window.location.reload()}} src={lightRefresh} style={{ width: '30px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>

                </div>
                <div style={{ backgroundColor: '#91d8f7', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                  <hr className='hr' style={{ marginTop: '-7px', marginBottom: '-12px' }} />

                  <div className="networksDivvDesktop selectPeriodDIv"
                    style={{ marginBottom: '-30px', textAlign: 'start', marginTop: '24px' }}
                    onClick={() => handleSelectSwapToken('1 Day')}>
                    <div style={{ width: '90%', margin: '0 auto' }}>
                      {/* <h4 style={{marginTop: '-10px'}}><img src={testPeriodBlueLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>__</span> Test Stake Feature</h4> */}
                      {/* <p style={{marginTop: '-10px', marginBottom: '0px', fontSize: '15px'}}><img src={testPeriodGreenLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>___</span>your tokens will be locked and released in 2 minutes.</p> */}
                      <div className="row">
                        <div className="col-2">
                          <img src={testPeriodBlueLock} alt="testPeriodBlueLock" />
                        </div>
                        <div className="col-10">
                          <h2 style={{ marginTop: '5px' }}><b>Test Stake Feature</b></h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: '5px' }}>
                        <div className="col-2">
                          <img src={testPeriodGreenLock} alt="testPeriodGreenLock" />
                        </div>
                        <div className="col-10">
                          <p style={{ fontSize: '15px' }}>your tokens will be locked and released in 2 minutes.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="networksDivvDesktop selectPeriodDIv" style={{ marginBottom: '0px' }}>
                    <h4 onClick={() => handleSelectSwapToken('06 Months')}>
                      06 Months @ 20%, 07% Per Annum</h4>
                    <hr className='selectPeriodHR' />
                    <h4 onClick={() => handleSelectSwapToken('12 Months')}>
                      <span style={{ color: 'gold' }}>12 Months</span> @ 25%, 10% Per Annum</h4>
                    <hr className='selectPeriodHR' />
                    <h4 onClick={() => handleSelectSwapToken('24 Months')}>
                      24 Months @ 30%, 15% Per Annum</h4>
                  </div>
                  <br />
                </div>
              </div>

              <div className='bottomBtns' style={{ marginTop: '10px' }}>
                <div className="row">
                  <div className="col-6">
                    <Link to={{ pathname: '/Assets' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                      Assets
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                      Activity
                    </Link>
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
          <div className="MainLinks">
            <div className='row'>
              <div className='mainLinksPics col-3'>
                <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} alt="stakeImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x32151D601f6578399136c57030890FbB48eDE685"><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
              </div>
            </div>
          </div>
          <div>
            <div className="blueBlackMainDiv2" style={{ backgroundColor: '#91d8f7' }}>
              <div className="row">
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img className='blackDivBtns blackDivBtnsIst' src={lightInfo} alt="infoIcon" />
                  </Link>
                </div>
                <div className="col-6">
                  {/* <p className='blackConnectTxtSwap'>Swap to bFTP</p> */}
                  <p style={{ color: 'black', fontSize: '22px', textAlign: 'center', fontWeight: 'bold' }}>Stake<span style={{ color: '#91D8F7', fontSize: '12px' }}>_</span>FTP?</p>
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={()=> {window.location.reload()}} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                </div>
              </div>
              <div style={{ backgroundColor: '#91d8f7', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <hr className='hr' style={{ marginTop: '-7px', marginBottom: '-12px' }} />

                <div className="networksDivv" style={{ backgroundColor: '#182E2C', marginBottom: '-22px', textAlign: 'start', marginTop: '18px' }}>
                  <div style={{ width: '100%', margin: '0 auto', marginTop: '-5px', marginBottom: '-17px' }} onClick={() => handleSelectSwapToken('1 Day')}>
                    {/* <h4 style={{marginTop: '-10px'}}><img src={testPeriodBlueLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>__</span> Test Stake Feature</h4> */}
                    {/* <p style={{marginTop: '-10px', marginBottom: '0px', fontSize: '15px'}}><img src={testPeriodGreenLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>___</span>your tokens will be locked and released in 2 minutes.</p> */}
                    <div className="row">
                      <div className="col-2">
                        <img src={testPeriodBlueLock} alt="testPeriodBlueLock" style={{ width: '35px' }} />
                      </div>
                      <div className="col-10">
                        <h3 style={{ marginTop: '5px' }}><b>Test Stake Feature</b></h3>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: '5px' }}>
                      <div className="col-2">
                        <img src={testPeriodGreenLock} alt="testPeriodGreenLock" style={{ width: '35px' }} />
                      </div>
                      <div className="col-10">
                        <p style={{ fontSize: '13px' }}>your tokens will be locked and released in 2 minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="networksDivv" style={{ backgroundColor: '#182E2C' }}>
                  <h4 onClick={() => handleSelectSwapToken('06 Months')}>
                    06 Months @ 20%, 07% Per Annum</h4>
                  <hr className='selectPeriodHR' />
                  <h4 onClick={() => handleSelectSwapToken('12 Months')}>
                    <span style={{ color: 'gold' }}>12 Months</span> @ 25%, 10% Per Annum</h4>
                  <hr className='selectPeriodHR' />
                  <h4 onClick={() => handleSelectSwapToken('24 Months')}>
                    24 Months @ 30%, 15% Per Annum</h4>
                </div>
                <br />
              </div>
            </div>

            <div className='bottomBtns' style={{ marginTop: '10px' }}>
              <div className="row">
                <div className="col-6">
                  <Link to={{ pathname: '/Assets' }} style={{ color: '#1FE2FA' }}>
                    Assets
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA' }}>
                    Activity
                  </Link>
                </div>
              </div>
            </div>
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

export default App;
