// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";


import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import videoPlayBtn from '../Images/videoPlayBtn.png';
import pdfIcons from '../Images/pdfIcons.png';
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
import darkSetting1 from '../Images/lightSetting1.png';
import darkInfo1 from '../Images/lightInfo.png';
import darkRefresh1 from '../Images/lightRefresh.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import greenArrow from '../Images/greenArrow.png';
import coinImg from '../Images/coinImg.png';

import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';

// components
import Graph from '../components/Graph.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// css
import './css/SndScreen.css'
function App() {

  const navigate = useNavigate();

  const [userAccount, setuserAccount] = useState('');
  const [userAccountt, setuserAccountt] = useState('');
  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('IstScreen');


  useEffect(() => {
    // window.ethereum.on("chainChanged", networkChanged)
    // window.ethereum.on('accountsChanged', accountChanged)
    // setuserAccountt(localStorage.getItem('userAccount'))
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
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    if (metamaskStatus === false) {
      toast.error("Please first connect your wallet", {
        position: 'top-right'
      })
      setCurrentUserNetwork(null)


    } else if (metamaskStatus === true) {
      window.ethereum.on("chainChanged", function (chainId) {
        console.log('accountsChanges', chainId);
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', function (account) {
        console.log('accountsChanges', account);
        window.location.reload()
      })
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      // console.log('First accounts', accounts[0]);
      setuserAccountt(accounts[0])

      setCurrentUserNetwork(window.ethereum.networkVersion)

    }
  }


  const handleConnectBtn = async () => {
    // load WEB3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    // load Blockchain Data
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    setuserAccount(accounts[0])
    console.log('userAccount', userAccount);
  }


  let assetsTxt
  let activityTxt
  if (userAccountt === '' || userAccountt === ' ' || userAccountt === null || userAccountt === undefined) {
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
    activityTxt = <Link to={{ pathname: '/RecentTx' }}>
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
  let connectBtn

  console.log('userAccountt', userAccountt);

  if (userAccountt != '' && userAccountt != null) {
    console.log('userAccountt', userAccountt);
    let accountFirstLetters = userAccountt.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccountt.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    localStorage.setItem('userAccount', userAccountt)
    userAccountContent = <Link to={{ pathname: '/WhichWallet' }}><span style={{ color: '#E5E600' }}>{fullResult}</span></Link>

    connectBtn = <button>Connected</button>
  } else if (userAccount != '' && userAccount != null) {
    console.log('userAccount', userAccount);
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    localStorage.setItem('userAccount', userAccount)

    userAccountContent = <Link to={{ pathname: '/WhichWallet' }}><span style={{ color: '#E5E600' }}>{fullResult}</span></Link>

    connectBtn = <button>Connected</button>
  } else {
    userAccountContent = <Link to={{ pathname: '/WhichWallet' }}><span style={{ color: '#E5E600' }}>Connect</span></Link>

    connectBtn = <Link to={{ pathname: '/WhichWallet' }}><button style={{ color: '#E5E600' }}>Connect Wallet</button></Link>
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
                  <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Trade
                  </h1></a>
                </div>
              </div>
              <div className="bottomHeaderr functionalityDiv" style={{ width: '100%' }}>
                <div className="row" style={{ marginBottom: '7px' }}>
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>Select Network</p>
                    {/* <p className='blackConnectTxt blackConnectTxtIstScreen'>Swap to FTP</p> */}
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns bigScreenIssue' style={{ marginLeft: '20px', paddingTop: '2px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ width: '30px', paddingTop: '3px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>

                </div>
                <hr className='hrSwap' />
                <a target="_blank" href="https://www.youtube.com/watch?v=xAvmFY4qIQY">
                  <div className="greyDiv5" style={{ color: 'white', marginTop: '20px' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={videoPlayBtn} style={{ width: '40px' }} alt="" />
                      </div>
                      <div className="col-10">
                        <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>What is Fair Trader?</h5>
                        <p className="pdfPara" style={{ textAlign: 'start', fontSize: '12px' }}>Click here to find out more.</p>
                      </div>
                    </div>

                  </div></a>
                <a target="_blank" href="https://www.youtube.com/watch?v=Dkn9vi9PNPY">
                  <div className="greyDiv5" style={{ color: 'white' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={videoPlayBtn} style={{ width: '40px' }} alt="" />
                      </div>
                      <div className="col-10">
                        <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>Become a Mediator</h5>
                        <p className="pdfPara" style={{ textAlign: 'start', fontSize: '12px' }}>Earn money by helping people</p>
                      </div>
                    </div>
                  </div>
                </a>

                <a target="_blank" href="https://drive.google.com/file/d/1gKspOjTvvoVgbaanxc2ogQPlkIcl1I-m/view?usp=sharing">
                  <div className="greyDiv5" style={{ color: 'white' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={pdfIcons} style={{ width: '35px' }} alt="" />
                      </div>
                      <div className="col-10">
                        <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>How to Stake FTP</h5>
                        <p className="pdfPara" style={{ textAlign: 'start', fontSize: '12px' }}>Learn all about Staking</p>
                      </div>
                    </div>
                  </div>
                </a>

                <a target="_blank" href="https://latoken.zendesk.com/hc/en-us">
                  <div className="greyDiv5" style={{ color: 'white' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={pdfIcons} style={{ width: '35px' }} alt="" />
                      </div>
                      <div className="col-10">
                        <h5 className="pdfheading netwVidLAtokenTxtHeading" id='netwVidLAtokenTxtHeading' style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>How to use Latoken Exchange</h5>
                        <p className="pdfPara" style={{ textAlign: 'start', fontSize: '12px' }}>Learn how trade FTP on Latoken</p>
                      </div>
                    </div>
                  </div>
                </a>

                {/* <hr className='hr networdVideosHR' style={{ marginBottom: '15px', marginTop: '48px' }} />

                <div className="row">
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
        </div> */}
        <FooterBottom />

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
                <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
                  <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
                  {/* {accountNumb} */}
                  {userAccountContent}
                </div>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/SelectNetwork' }}>
                  <div className='headerBtns sndHeaderBtn'>
                    {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                    <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>{userNetworkContent}</span>
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
                {/* <a target='_blank' href="https://global.transak.com?apiKey=9432f9ba-8128-4786-9da0-e5ce8c08db33"> */}
                <a target="_blank" href="https://buy.ftp.indacoin.io/" >
                  <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
                </a>              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} alt="stakeImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
              </div>
            </div>
          </div><div>
            <div className="bottomHeaderrr" style={{ paddingTop: '5px' }}>
              <div className="row">
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img className='blackDivBtns blackDivBtnsIst' src={lightInfo} alt="infoIcon" />
                  </Link>
                </div>
                <div className="col-6">
                  {/* <p className='blackConnectTxtSwap'>Swap to bFTP</p> */}
                  <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Select Network</p>
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                </div>
              </div>
              <hr className='hrSwap' />
              {/* <hr className='hr' style={{ marginTop: '-3px', marginBottom: '-2px' }} /> */}
              <a target="_blank" href="https://www.youtube.com/watch?v=xAvmFY4qIQY">
                <div className="greyDiv2" style={{ color: 'white' }}>
                  <div className="row">
                    <div className="col-2">
                      <img src={videoPlayBtn} alt="" />
                    </div>
                    <div className="col-10">
                      <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>What is Fair Trader?</h5>
                      <p className="pdfPara" style={{ textAlign: 'start' }}>Click here to find out more.</p>
                    </div>
                  </div>

                </div></a>

              <a target="_blank" href="https://www.youtube.com/watch?v=Dkn9vi9PNPY">
                <div className="greyDiv2" style={{ color: 'white', marginTop: '6px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img src={videoPlayBtn} alt="" />
                    </div>
                    <div className="col-10">
                      <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>Become a Mediator</h5>
                      <p className="pdfPara" style={{ textAlign: 'start' }}>Earn money by helping people</p>
                    </div>
                  </div>
                </div>
              </a>


              <a target="_blank" href="https://drive.google.com/file/d/1gKspOjTvvoVgbaanxc2ogQPlkIcl1I-m/view?usp=sharing">
                <div className="greyDiv2" style={{ color: 'white', marginTop: '4px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img src={pdfIcons} alt="" />
                    </div>
                    <div className="col-10">
                      <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>How to Stake FTP</h5>
                      <p className="pdfPara" style={{ textAlign: 'start' }}>Learn all about Staking</p>
                    </div>
                  </div>
                </div>
              </a>

              <a target="_blank" href="https://latoken.zendesk.com/hc/en-us">
                <div className="greyDiv2" style={{ color: 'white', marginTop: '4px', marginBottom: '7px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img src={pdfIcons} alt="" />
                    </div>
                    <div className="col-10">
                      <h5 className="pdfheading" style={{ textAlign: 'start', color: '#1DCCFF', fontWeight: 'bold' }}>How to use Latoken Exchange</h5>
                      <p className="pdfPara" style={{ textAlign: 'start' }}>Learn how trade FTP on Latoken</p>
                    </div>
                  </div>
                </div>
              </a>

            </div>
            <div className='bottomBtns'>
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
