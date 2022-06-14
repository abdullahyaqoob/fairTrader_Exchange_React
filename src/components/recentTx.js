// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Web3 from 'web3'

import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import linkIcon from '../Images/linkIcon2.png';


import toggleBtn from '../Images/toggleBtn.png';
import dropdownImg from '../Images/greenDropdown.png';
import graphDesktop from '../Images/graphDesktop.png';
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
import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';
import darkRefresh1 from '../Images/lightRefresh1.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import greenArrow from '../Images/greenArrow.png';
import coinImg from '../Images/coinImg.png';

// components
import Graph from '../components/Graph2.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';


// css
import './css/recentTx.css'
import axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      CurrentUserNetwork: 'Networks',
      userAccount: '',
      accountTransaction: [],
    }
  }


  connectWallet = async () => {

    // load WEB3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    // load Blockchain Data
    const web3 = window.web3


    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    // console.log('First accounts', accounts[0]);
    this.setState({ userAccount: accounts[0] })

    this.setState({ CurrentUserNetwork: window.ethereum.networkVersion })
    // setCurrentUserNetwork(window.ethereum.networkVersion)

  }

  async componentWillMount() {
    // this.setState({ userAccount: localStorage.getItem('userAccount') })
    // this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })
    window.ethereum.on("chainChanged", function (accounts) {
      window.location.reload()
    })
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })

    this.connectWallet()
  }

  render() {
    axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet`, {
      "wallet": this.state.userAccount,
      // "wallet": '0xdc02A3B51d86D7a19AD24082C0c82AFFE8412913',
    })
      .then(res => {
        console.log('1112111', res);
        this.setState({ accountTransaction: res.data.data })
      }).catch(err => {
        // console.log(err);
      })


    let userNetworkContent
    console.log('this.state.CurrentUserNetwork', this.state.CurrentUserNetwork);
    if (this.state.CurrentUserNetwork != '' && this.state.CurrentUserNetwork != null) {
      // console.log('userNetwork', this.state.CurrentUserNetwork);
      if (this.state.CurrentUserNetwork === '97' || this.state.CurrentUserNetwork === '56') {
        userNetworkContent = 'BSC'
      } else {
        userNetworkContent = 'ETH'
      }
    } else {
      // console.log('userNetwork', this.state.CurrentUserNetwork);
      userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
    }

    let userAccountContent
    if (this.state.userAccount != '' && this.state.userAccount != null) {
      // console.log('111111111111111111111111', this.state.userAccount);
      let accountFirstLetters = this.state.userAccount.substring(0, 3);
      // console.log('accountFirstLetters', accountFirstLetters);
      let accountlastLetters = this.state.userAccount.substring(40);
      // console.log('accountlastLetters', accountlastLetters);
      let fullResult = accountFirstLetters + '..' + accountlastLetters
      // console.log('fullResult', fullResult);
      setTimeout(() => {
        localStorage.setItem('userAccount', this.state.userAccount)
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

    let accountTransactionList
    // console.log('accountTransaction', this.state.accountTransaction);
    // if (this.state.accountTransaction != 'wallet not found' && this.state.accountTransaction != '' && this.state.accountTransaction != undefined && this.state.accountTransaction != null) {
    if (this.state.accountTransaction != 'wallet not found') {
      // console.log('Not empty');
      accountTransactionList = this.state.accountTransaction.map(function (tx, i) {
        if (tx.rate === 0 && tx.ether === 0) {
          return (
            <div className='txsL' key={i}>

              {/* <div className="row">
                <div className="col-10 txsTxt" style={{ color: 'black' }}>
                  {tx.transactionType} {tx.amount} FTP
                </div>
                <div className="col-2">
                  <a href={tx.hash} target='_blank'>
                    <img src={linkIcon} style={{ marginLeft: '8px' }} alt="" />
                  </a>
                </div>
              </div> */}

              <div className="row">
                <div className="col-12 txsTxt" style={{ color: 'black' }}>
                  {tx.transactionType} {tx.amount} FTP <span><a href={tx.hash} target='_blank'>
                    <img src={linkIcon} style={{ marginLeft: '8px', marginTop: '-5px' }} alt="" />
                  </a></span>
                </div>
                {/* <div className="col-2">
                  <a href={tx.hash} target='_blank'>
                    <img src={linkIcon} style={{ marginLeft: '8px', marginTop: '-5px' }} alt="" />
                  </a>
                </div> */}
              </div>
            </div>
          )
        } else {
          return (
            <div className='txsL' key={i}>
              {/* <div className="row">
              <div className="col-10 txsTxt" style={{ color: 'black' }}>
                {tx.transactionType} {tx.amount} FTP for {tx.ether} {tx.chain}
              </div>
              <div className="col-2">
                <a href={tx.hash} target='_blank'>
                  <img src={linkIcon} style={{ marginLeft: '8px', marginTop: '-5px' }} alt="" />
                </a>
              </div>
            </div> */}


              <div className="row">
                <div className="col-12 txsTxt" style={{ color: 'black' }}>
                  {tx.transactionType} {tx.amount} FTP for {tx.ether} {tx.chain} <span>
                    <a href={tx.hash} target='_blank'>
                      <img src={linkIcon} style={{ marginLeft: '8px', marginTop: '-5px' }} alt="" />
                    </a>
                  </span>
                </div>
                {/* <div className="col-2">
                  <a href={tx.hash} target='_blank'>
                    <img src={linkIcon} style={{ marginLeft: '8px' }} alt="" />
                  </a>
                </div> */}
              </div>
            </div>
          )
        }
      })
    } else {
      // console.log('Empty');
    }

    let noAnyTransaction
    if (this.state.accountTransaction === 'wallet not found') {
      noAnyTransaction =
        <div className="txsTxt text-center" style={{ marginTop: '15px', color: 'red' }}>Not any Transactions ...</div>
    }

    return (
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
                <div className="bottomHeaderr functionalityDiv" style={{ width: '100%', marginBottom: '105px' }}>
                  <div className="row" style={{ marginBottom: '7px' }}>
                    <div className="col-2">
                      <Link to={{ pathname: '/SndScreen' }}>
                        <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                      </Link>
                    </div>
                    <div className="col-6">
                      <p className='blackConnectTxtSwap' id='recentTxTxt' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>Recent Transactions</p>
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
                  <div style={{ height: '300px', overflowY: 'scroll' }}>
                    <div>
                      {noAnyTransaction}
                      {accountTransactionList}
                    </div>
                  </div>
                  <hr className='hr' style={{ marginTop: '53px' }} />
                  <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col-6">
                      <Link to={{ pathname: '/Assets' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Assets</h1>
                      </Link>
                    </div>

                    <div className="col-6">
                      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Activity</h1>
                    </div>
                  </div>
                </div>

                {/* <div className='bottomBtns'>
                  <div className="row">
                    <div className="col-6">
                      <Link to={{ pathname: '/Assets' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                        Assets
                      </Link>
                    </div>
                    <div className="col-6" style={{ color: 'white', fontSize: '22px' }}>Activity
                    </div>
                  </div>
                </div> */}
                {/* <br /><br /><br /><br />
                <br /><br /><br /><br /> */}
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
                  <a target="_blank" href="https://buy.ftp.indacoin.io/"  >
                    <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
                  </a>                                    </div>
                <div className='mainLinksPics col-3'>
                  <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
                </div>
                <div className='mainLinksPics col-3'>
                  <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} style={{ marginTop: '2px' }} alt="stakeImg" /></Link>
                </div>
                <div className='mainLinksPics col-3'>
                  <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><img className='mainLinksPics2' style={{ marginTop: '1px' }} src={tradeImg} alt="tradeImg" /></a>
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
                    <p className='recentTxTxtt' style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', marginBottom: '15px', whiteSpace: 'nowrap' }}>Recent Transactions</p>
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>
                </div>
                <hr className='hrSwap' />
                <div style={{ height: '243px', overflowY: 'scroll' }}>
                  <div>
                    {noAnyTransaction}
                    {accountTransactionList}
                  </div>
                </div>
              </div>

              <div className='bottomBtns'>
                <div className="row" style={{ marginTop: '-3px' }}>
                  <div className="col-6" style={{ color: 'white' }}>
                    <Link to={{ pathname: '/Assets' }} style={{ color: 'black' }}>
                      Assets
                    </Link>
                  </div>
                  <div className="col-6" style={{ color: 'white' }}>
                    Activity
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
      // [content]
    );
  }
}

export default App;
