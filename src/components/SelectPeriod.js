// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Web3 from 'web3'

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
import testPeriodBlueLock from '../Images/lockedIcon2.png';
import testPeriodGreenLock from '../Images/unlockedIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import coinImg from '../Images/coinImg.png';

// components
import Graph from '../components/Graph.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// css
import './css/selectPeriod.css'
function App() {

  const navigate = useNavigate();

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Networks');
  const [userAccount, setuserAccount] = useState('');

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)
    // setCurrentUserNetwork(localStorage.getItem('userNetwork'))

    asyncFunc()

  }, [])

  const networkChanged = (chainId) => {
    console.log('chain_changed', chainId);
    window.location.reload()
  };
  const accountChanged = (account) => {
    console.log('account_changed', account);
    window.location.reload()
  }


  const asyncFunc = async () => {

    // load WEB3
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum)
    //   await window.ethereum.enable()
    // }
    // else if (window.web3) {
    //   window.web3 = new Web3(window.web3.currentProvider)
    // }
    // else {
    //   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    // }
    // // load Blockchain Data
    // const web3 = window.web3

    let metamaskStatus;
    if (window.ethereum) {
      metamaskStatus = await window.ethereum._metamask.isUnlocked()
      console.log('metamaskStatus :', metamaskStatus);
    }
    else if (window.web3) {
      metamaskStatus = await window.ethereum._metamask.isUnlocked()
      console.log('metamaskStatus :', metamaskStatus);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    if (metamaskStatus === false) {
      toast.error("Please first connect your wallet", {
        position: 'top-right'
      })
      setCurrentUserNetwork(null)

    } else if (metamaskStatus === true) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      // console.log('First accounts', accounts[0]);
      setuserAccount(accounts[0])

      setCurrentUserNetwork(window.ethereum.networkVersion)
    }
  }
  const handleSelectSwapToken = async (e) => {
    console.log(e);
    localStorage.setItem('StakePeriod', e)
    navigate(-1)
  }


  let assetsTxt
  let activityTxt
  if (userAccount === '' || userAccount === ' ' || userAccount === userAccount === undefined) {
    assetsTxt = <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} onClick={() => {
      toast.error("Please first connect your wallet", {
        position: 'top-right'
      })
    }}>Assets</h1>
    activityTxt = <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} onClick={() => {
      toast.error("Please first connect your wallet", {
        position: 'top-right'
      })
    }}>Activity</h1>
  } else {
    assetsTxt = <Link to={{ pathname: '/Assets' }}>
      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Assets</h1>
    </Link>
    activityTxt = <Link to={{ pathname: '/recentTx' }}>
      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Activity</h1>
    </Link>
  }


  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 'Binance' || CurrentUserNetwork === '56' || CurrentUserNetwork === '97') {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
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
        <HeaderNav />

        <div className="desktopBlueDiv">
          <hr className='hrr' />
          <div className="row MainDivMain">
            <div className="col-8">
              <h1 style={{ color: 'black', marginLeft: '30px' }}><b><a target="_blank"
                style={{ color: 'black', textDecoration: 'none' }} href="https://www.youtube.com/watch?v=xAvmFY4qIQY">What is Fair Trader?</a></b></h1>
              {/* <h1 className='HelpTxt' style={{ display: 'inline' }}>Help</h1>
              <Link to={{ pathname: '/NetworkVideos' }}>
                <h1 className='HelpTxt VideoTxt' style={{ display: 'inline', marginLeft: '30px' }}>Video</h1>
              </Link> */}
              <div style={{ width: '110%' }} className='graphDiv'>
                <Graph />
              </div>

            </div>
            <div className="col-4">
              <div className="row functionalityDiv">
                <div className="col-3">
                  <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    {/* <Link style={{ fontWeight: 'bold', color: 'black' }} to={{ pathname: '/TransakIframe' }}> */}
                    <a target="_blank" href="https://buy.ftp.indacoin.io/" style={{ fontWeight: 'bold', color: 'black' }} >
                      Buy
                    </a>
                    {/* </Link> */}
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
                  <a target="_blank" href="https://latoken.com/"><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Trade
                  </h1></a>
                </div>
              </div>
              <div className="bottomHeaderr functionalityDiv">
                <div className="row" style={{ marginBottom: '7px' }}>
                  <div className="col-2">
                    <Link to={{ pathname: '/WhatIsStaking' }}>
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px' }}>Stake FTP?</p>
                    {/* <p className='blackConnectTxt blackConnectTxtIstScreen'>Swap to FTP</p> */}
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns bigScreenIssue' style={{ marginLeft: '20px', paddingTop: '2px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ width: '30px', paddingTop: '3px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>
                </div>
                <div style={{ backgroundColor: '#91d8f7', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                  <hr className='hr' />

                  <div className="networksDivvDesktop twoMntStakeCrsrPointr"
                    style={{ marginBottom: '-30px', textAlign: 'start', marginTop: '12px', backgroundColor: 'black' }}
                    onClick={() => handleSelectSwapToken('2 Mnts')}>
                    <div style={{ width: '90%', margin: '0 auto' }}>
                      {/* <h4 style={{marginTop: '-10px'}}><img src={testPeriodBlueLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>__</span> Test Stake Feature</h4> */}
                      {/* <p style={{marginTop: '-10px', marginBottom: '0px', fontSize: '15px'}}><img src={testPeriodGreenLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>___</span>your tokens will be locked and released in 2 minutes.</p> */}
                      <div className="row">
                        <div className="col-2">
                          <img src={testPeriodBlueLock} alt="testPeriodBlueLock" />
                        </div>
                        <div className="col-10">
                          <h2 className='testStakeHeading' style={{ marginTop: '5px' }}><b>Test Stake Feature</b></h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: '5px' }}>
                        <div className="col-2">
                          <img src={testPeriodGreenLock} alt="testPeriodGreenLock" />
                        </div>
                        <div className="col-10">
                          <p className='testStakeSubHeading' style={{ fontSize: '15px' }}>your tokens will be locked and released in 2 minutes.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="networksDivvDesktop" style={{ marginBottom: '0px', backgroundColor: 'black' }}>
                    <h4 onClick={() => handleSelectSwapToken('06 Months')}>
                      06 Months @ 50% per year</h4>
                    <hr className='selectPeriodHR' />
                    <h4 onClick={() => handleSelectSwapToken('12 Months')}>
                      {/* <span style={{ color: 'gold' }}>12 Months</span> @ 100% per year</h4> */}
                      <span>12 Months</span> @ 100% per year</h4>
                    <hr className='selectPeriodHR' />
                    <h4 onClick={() => handleSelectSwapToken('24 Months')}>
                      24 Months @ 100% per year</h4>
                  </div>
                  <br />
                </div>
                {/* <hr className='hr' style={{ marginTop: '7px' }} />
                <div className="row" style={{ marginTop: '15px' }}>
                  <div className="col-6">
                    {assetsTxt}
                  </div>
                  <div className="col-6">
                    {activityTxt}

                  </div>
                </div> */}
              </div>

              <div className='bottomBtns functionalityDiv' style={{ marginTop: '-53px', marginBottom: '113px' }}>
                <hr className='hr' />
                <div className="row" style={{ marginTop: '15px' }}>
                  <div className="col-6">
                    {assetsTxt}
                  </div>
                  <div className="col-6">
                    {activityTxt}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='foooterDiv'>
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
        </div> */}        <FooterBottom />

      </div>

      <div className='MainDivMob'>
        <div className='blackWholeDiv'>
          <div className='row headerLogoBtns'>
            <div className='col-4'>
              <a href="http://fairtrader.io/">
                <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
              </a>
            </div>
            <div className="col-8 headerLinks">
              <span style={{ display: "inline", float: "right" }}>
                <a href="http://fairtrader.io/">
                  <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
                </a>
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
                    <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                      {userNetworkContent}
                    </span>
                    <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ width: '110%' }} className='graphDiv'>
            <Graph />
          </div>

        </div>
        <div className="blueDiv">
          <div className="MainLinks">
            <div className='row'>
              <div className='mainLinksPics col-3'>
                {/* <a target='_blank' href="https://global.transak.com?apiKey=9432f9ba-8128-4786-9da0-e5ce8c08db33"> */}
                <a target="_blank" href="https://buy.ftp.indacoin.io/">
                  <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
                </a>                                    </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} style={{ marginTop: '2px' }} alt="stakeImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://latoken.com/"><img className='mainLinksPics2' style={{ marginTop: '1px' }} src={tradeImg} alt="tradeImg" /></a>
              </div>
            </div>
          </div>
          <div>
            <div className="bottomHeaderrr" style={{ paddingTop: '5px' }}>
              <div className="row">
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img className='blackDivBtns blackDivBtnsIst marginMinus5 firstLightInfoMob' src={lightInfo} alt="infoIcon" />
                    {/* <img style={{ paddingTop: '5px' }} className='blackDivBtns blackDivBtnsIst' src={lightInfo} alt="infoIcon" /> */}
                  </Link>
                </div>
                <div className="col-6">
                  {/* <p className='blackConnectTxtSwap'>Swap to bFTP</p> */}
                  <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Stake FTP?</p>
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                </div>
              </div>
              <div style={{ backgroundColor: '#91d8f7', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <hr className='hrSwap' style={{ marginBottom: '-4px' }} />

                <div className="networksDivv twoMntStakeCrsrPointr" style={{ backgroundColor: 'black', borderRadius: '10px', marginBottom: '-22px', textAlign: 'start', marginTop: '18px' }}>
                  <div style={{ width: '100%', margin: '0 auto', marginTop: '-5px', marginBottom: '-17px' }} onClick={() => handleSelectSwapToken('2 Mnts')}>
                    {/* <h4 style={{marginTop: '-10px'}}><img src={testPeriodBlueLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>__</span> Test Stake Feature</h4> */}
                    {/* <p style={{marginTop: '-10px', marginBottom: '0px', fontSize: '15px'}}><img src={testPeriodGreenLock} alt="testPeriodBlueLock" /><span style={{color: '#182E2C'}}>___</span>your tokens will be locked and released in 2 minutes.</p> */}
                    <div className="row">
                      <div className="col-2">
                        <img src={testPeriodBlueLock} alt="testPeriodBlueLock" style={{ width: '35px' }} />
                      </div>
                      <div className="col-10">
                        <h3 style={{ marginTop: '5px', color: '#00C7F9' }}><b>Test Stake Feature</b></h3>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: '5px' }}>
                      <div className="col-2">
                        <img src={testPeriodGreenLock} alt="testPeriodGreenLock" style={{ width: '33px' }} />
                      </div>
                      <div className="col-10">
                        <p style={{ fontSize: '13px', marginBottom: '13px', position: 'relative', top: '-7px' }}>your tokens will be locked and released in 2 minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="networksDivv" style={{ backgroundColor: 'black', borderRadius: '10px' }}>
                  <h4 onClick={() => handleSelectSwapToken('06 Months')}>
                    <b>06 Months @ 07% Per Annum</b></h4>
                  <hr className='selectPeriodHR' />
                  <h4 onClick={() => handleSelectSwapToken('12 Months')}>
                    <b><span>12 Months</span> @ 10% Per Annum</b></h4>
                  <hr className='selectPeriodHR' />
                  <h4 onClick={() => handleSelectSwapToken('24 Months')}>
                    <b>24 Months @ 15% Per Annum</b></h4>
                </div>
                <br />
              </div>
            </div>

            <div className='bottomBtns' style={{ marginTop: '10px' }}>
              <div className="row">
                <div className="col-6">
                  {assetsTxt}
                </div>
                <div className="col-6">
                  {activityTxt}

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
      <ToastContainer />
    </div>
  );
}

export default App;
