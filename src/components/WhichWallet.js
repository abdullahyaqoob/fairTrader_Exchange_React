// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";
// import { withRouter } from 'react-router-dom';

import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import pdf1 from '../Images/pdf1.png';
import pdf2 from '../Images/pdf2.png';
import pdf3 from '../Images/pdf3.png';
import pdfdropdown from '../Images/pdfdropdown.png';

import toggleBtn from '../Images/toggleBtn.png';
import dropdownImg from '../Images/greenDropdown.png';
import graphImg from '../Images/graphArtificalView.png';
import graphDesktop from '../Images/graphDesktop.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/swapImg.png';
import stakeImg from '../Images/stakeImg.png';
import tradeImg from '../Images/tradeImg.png';
import networkImg from '../Images/networkImg.png';
import connectImg from '../Images/connectImg.png';
import networkDropdown from '../Images/networkDropdown.png';

import greenArrow from '../Images/greenArrow.png';
import networkDropdown1 from '../Images/networkDropdown1.png';
import darkSetting1 from '../Images/lightSetting1.png';
import darkInfo1 from '../Images/lightInfo.png';
import darkRefresh1 from '../Images/lightRefresh1.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import swapArrow from '../Images/swapArrow.png';
import coinImg from '../Images/coinImg.png';
import startIconWhich from '../Images/starIconWhichLight.png';
import metamaskIcon from '../Images/metamaskIcon.png';

import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


// components
import Graph from '../components/Graph.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';

// css
import './css/whichWallet.css'
function App() {

  let navigate = useNavigate();
  // const [ethBalance, setethBalance] = useState('');

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Networks');
  const [userAccount, setuserAccount] = useState('');
  const [userAccountt, setuserAccountt] = useState('');

  useEffect(() => {
    // setuserAccount(localStorage.getItem('userAccount'))
    // setCurrentUserNetwork(localStorage.getItem('userNetwork'))
    // setuserAccountt(localStorage.getItem('userAccount'))
    // window.ethereum.on("chainChanged", networkChanged)
    // window.ethereum.on('accountsChanged', accountChanged)

    asyncFunc()

  }, [])

  const asyncFunc = async () => {

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
      window.ethereum.on("chainChanged", function (accounts) {
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload()
      })

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      // console.log('First accounts', accounts[0]);
      setuserAccountt(accounts[0])
      setuserAccount(accounts[0])

      setCurrentUserNetwork(window.ethereum.networkVersion)
    }
  }
  const handleWhichWalletMeta = async () => {

    // const networkId = await web3.eth.net.getId()
    // if (networkId === '97') {
    //   alert("hello")
    // }

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

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    // navigate("/NetworkVideos")
    window.location.reload()
    console.log('First accounts', accounts[0]);
    setuserAccount(accounts[0])
    setuserAccountt(accounts[0])
    setTimeout(() => {
      localStorage.setItem('userAccount', accounts[0])
    }, 1);
    // console.log(this.state.account);
    // this.setState({ account: accounts[0] })

  }

  let userAccountContent
  let connectBtn
  if (userAccountt != '' && userAccountt != null) {
    console.log('userAccountt', userAccountt);
    let accountFirstLetters = userAccountt.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccountt.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    localStorage.setItem('userAccount', userAccountt)
    userAccountContent = <span style={{ color: '#E5E600' }}>{fullResult}</span>

    connectBtn = <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Connected</button>
  } else if (userAccount != '' && userAccount != null) {
    console.log('userAccount', userAccount);
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    localStorage.setItem('userAccount', userAccount)
    userAccountContent = <span style={{ color: '#E5E600' }}>{fullResult}</span>

    connectBtn = <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Connected</button>
  } else {
    userAccountContent = <span style={{ color: '#E5E600' }} onClick={handleWhichWalletMeta}>Connect</span>

    connectBtn =
      <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }} onClick={handleWhichWalletMeta}>Connect Wallet</button>
  }

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 'Ethereum' || CurrentUserNetwork === '1' || CurrentUserNetwork === 1) {
      userNetworkContent = 'ETH'
    } else if (CurrentUserNetwork === 'Binance' || CurrentUserNetwork === '56' || CurrentUserNetwork === 56) {
      userNetworkContent = 'BSC'
    }
  } else {
    console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
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
              <div className="bottomHeaderr functionalityDiv" style={{ width: '100%' }}>
                <div className="row" style={{ marginBottom: '7px' }}>
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>Select Wallet</p>
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
                <div className='whichWalletMainDiv'>
                  <h2 onClick={handleWhichWalletMeta} style={{ cursor: 'pointer', color: 'black' }}>
                    <img src={metamaskIcon} alt="metamaskIcon" width="70px" />
                    <b>Metamask Wallet</b>
                    <span style={{ color: '#91D8F7' }}>_</span>
                    <img src={startIconWhich} alt="startIconWhich" />
                  </h2>
                  <br />
                  <div className='whichWalletMainSubDiv' style={{ color: 'black' }}>
                    <p>Fair Trader works best with Metamask wallet on all chains. Other wallets will be added in the near future.</p>
                    <br />
                    <p>To download Metamask wallet for your browser <a target="_blank" style={{ color: 'blue' }} href="https://metamask.io/">Click Here</a></p>
                  </div>
                </div>
                <p className='blackBottomBtn istScreenBtn'>
                  {connectBtn}
                </p>
                {/* <hr className='hr whichWalletHR' style={{ marginTop: '24px' }} />
                <br />
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
          {/* <br /><br /><br /><br /><br /><br /><br /><br /> */}
        </div>
        <FooterBottom />
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
                  <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
                    <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
                    <span style={{ color: 'white' }}>
                      {userAccountContent}
                    </span>
                    {/* Connect */}
                  </div>
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/SelectNetwork' }}>
                  <div className='headerBtns sndHeaderBtn'>
                    {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                    <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                      {userNetworkContent}
                      {/* Networks */}
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
                <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Select Wallet</p>
              </div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
              </div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
              </div>
            </div>
            <hr className='hrSwap' />
            <div className='whichWalletMainDiv'>
              <h2 onClick={handleWhichWalletMeta} style={{ cursor: 'pointer' }}>
                <img src={metamaskIcon} alt="metamaskIcon" width="70px" />
                <b style={{ color: 'black' }}>Metamask Wallet</b>
                <span style={{ color: '#91D8F7' }}>_</span>
                <img src={startIconWhich} alt="startIconWhich" />
              </h2>
              <br />
              <div className='whichWalletMainSubDiv' style={{ color: 'black' }}>
                <p>Fair Trader works best with Metamask wallet on all chains. Other wallets will be added in the near future.</p>
                <br />
                <p>To download Metamask wallet for your browser <a target="_blank" style={{ color: 'blue' }} href="https://metamask.io/">Click Here</a></p>
              </div>
            </div>
            <p className='blackBottomBtn2' style={{ marginTop: '22px', marginBottom: '22px' }}>
              {connectBtn}
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
      <ToastContainer />
    </div>
  );
}

export default App;