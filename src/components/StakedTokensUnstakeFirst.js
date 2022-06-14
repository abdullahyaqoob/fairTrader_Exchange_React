// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import Web3 from 'web3'

import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import lockedIcon from '../Images/lockedIcon2.png';
import unlockedIcon from '../Images/unlockedIcon.png';
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
import networkDropdown1 from '../Images/networkDropdown1.png';
import darkSetting1 from '../Images/lightSetting1.png';
import darkInfo1 from '../Images/lightInfo.png';
import darkRefresh1 from '../Images/lightRefresh1.png';
import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import fbIcon from '../Images/fbIcon.png';
import twitterIcon from '../Images/twitterIcon.png';
import instaIcon from '../Images/instaIcon.png';
import youtubeIcon from '../Images/youtubeIcon.png';
import discordIocn from '../Images/discordIcon.png';

// components
import Graph from './Graph2.jsx'
import FooterBottom from './footerBottom.jsx';
import HeaderNav from './HeaderNav.jsx';

// css
import './css/stakedTokens.css'
import axios from 'axios';
class App extends Component {

  // const navigate = useNavigate();
  constructor(props) {
    super(props)
    this.state = {
      CurrentUserNetwork: 'Networks',
      userAccount: '',
      userAccountStakedToken: '',
      tokenFarm: '',
      networkId: '',
      receipt: false,
      livePriceBftp: ''
    }
  }

  async componentWillMount() {
    this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })

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

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    this.setState({ userAccount: accounts[0] })


    const networkId = await window.web3.eth.net.getId();
    this.setState({ networkId })

    const networkChanged = (chainId) => {
      console.log('chain_changed', chainId);
      window.location.reload()
    };
    const accountChanged = (account) => {
      console.log('account_changed', account);
      window.location.reload()
    }

    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)

  }
  render() {
    async function withdrawStake(index, e) {
      const web3 = window.web3
      const networkId = await web3.eth.net.getId();
      const tokenFarmData = EthSwap.networks[networkId]
      if (tokenFarmData) {
        const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        // let etherAmot = amount.toString()
        // let etherAmout = window.web3.utils.toWei(etherAmot, 'Ether')

        // let etherAmot = window.web3.fromBigNumber(amount);
        // // let etherAmout = window.web3.utils.toWei(etherAmot, 'Ether')
        document.getElementById('helloDesk1').style.display = 'none';
        document.getElementById('helloDesk2').style.display = 'initial';
        document.getElementById('helloo').style.display = 'none';
        document.getElementById('hello').style.display = 'initial';
        tokenFarm.methods._withdrawStake(4).send({ from: accounts[0] }).on('transactionHash', (hash) => {
          setTimeout(() => {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/Wallet/stake/${e.id}`)
              .then(res => {
                console.log('Stake Deleted : ', res);
                window.location.reload()
              }).catch(err => {
                console.log(err);
              })
          }, 1000);
        }).catch(e => {
          if (e.code === 4001) {
            console.log('errorrrrrrrrrr', e)
            window.location.reload()
          }
        });
      } else {
        window.alert('TokenFarm contract not deployed to detected network.')
      }
    }

    let requestNetwork;
    if (this.state.networkId === 1 || this.state.networkId === '1') {
      requestNetwork = 'ethereum'
    } else {
      requestNetwork = 'binance'
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet/stake/${requestNetwork}`, {
      "wallet": this.state.userAccount,
      // Customer address
      // "wallet": '0x76a575a8caa85a826243284091b6853863ac9e7f',
      // My own address
      // "wallet": '0x0232728B0853394893AD55f3d9f971Bf7Dd64054',
    })
      .then(res => {
        console.log('response : ', res.data.data);
        this.setState({ userAccountStakedToken: res.data.data })
      }).catch(err => {
        // console.log(err);
      })

      axios.get('https://abdullahyaqoob.com/',
      {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
        .then(res => {
          // console.log(res);
          this.setState({ livePriceBftp: res.data.lastPrice })
        }).catch((err) => {
          // console.log(err);
        })
  
      let rateAmount = this.state.livePriceBftp
      // let rateAmount = process.env.REACT_APP_FTP_MANUALLY_PRICE
      // console.log('rateAmount', rateAmount);
  


    let userAccountStakedTokenList
    if (this.state.userAccountStakedToken != '' && this.state.userAccountStakedToken != 'wallet not found' && this.state.userAccountStakedToken != undefined) {
      // console.log('Not empty');
      userAccountStakedTokenList = this.state.userAccountStakedToken.map(function (st, i) {
        let internationalNumberFormat = new Intl.NumberFormat('en-US')

        return (
          <div className="greyDiv2" key={i} style={{ textAlign: 'start', backgroundColor: 'black' }}>
            <div className="row">
              <div className="col-2">
                {release_Img(st)}
                {/* <img src={lockedIcon} alt="" /> */}
              </div>
              <div className="col-5">
                <h5 className="pdfheading" style={{ fontSize: '16px' }}><b>{internationalNumberFormat.format(st.bFTP)}</b></h5>
                <p className="pdfPara" style={{ fontSize: '13px' }}>$ {(st.bFTP * rateAmount).toFixed(5)}</p>
              </div>
              <div className="col-5">
                <h5 className="pdfheading" style={{ fontSize: '16px' }}><b>{release_date_txt(st)}</b></h5>
                <p className="pdfPara" style={{ fontSize: '13px' }}> {release_date(st)}</p>
              </div>
            </div>
          </div>
        )
      })
    } else {
      // console.log('Empty');
    }

    let userNetworkContent
    if (this.state.CurrentUserNetwork != '' && this.state.CurrentUserNetwork != null) {
      if (this.state.CurrentUserNetwork === 'Binance') {
        userNetworkContent = 'BSC'
      } else {
        userNetworkContent = 'ETH'
      }
    } else {
      userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
    }

    function release_date(e) {
      let current = new Date()
      const currentDateOfStake = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

      let rlsDate = e.releaseDate;
      rlsDate = rlsDate.split("/");
      var newDate = new Date(rlsDate[2], rlsDate[1] - 1, rlsDate[0]);
      // console.log(newDate.getTime());

      let todaysDate = currentDateOfStake;
      todaysDate = todaysDate.split("/");
      var currentDate = new Date(todaysDate[2], todaysDate[1] - 1, todaysDate[0]);
      // console.log(currentDate.getTime());


      if (newDate.getTime() <= currentDate.getTime()) {
        return <p className="pdfPara clickToRlsTxt" style={{ cursor: 'pointer', color: '#16FE00', fontSize: '15px' }} onClick={(event) => {
          event.preventDefault()
          // withdrawStake(e.bFTP, e.stakeNumber, e)
          withdrawStake(e.stakeNumber, e)
        }}
        >
          Click<span style={{ color: '#182E2C' }}>.</span>to<span style={{ color: '#182E2C' }}>.</span>Release<span style={{ color: '#182E2C' }}>.</span>
        </p>
      } else {
        return e.releaseDate
      }
    }

    function release_date_txt(e) {
      let current = new Date()
      const currentDateOfStake = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

      let rlsDate = e.releaseDate;
      rlsDate = rlsDate.split("/");
      var newDate = new Date(rlsDate[2], rlsDate[1] - 1, rlsDate[0]);
      // console.log(newDate.getTime());

      let todaysDate = currentDateOfStake;
      todaysDate = todaysDate.split("/");
      var currentDate = new Date(todaysDate[2], todaysDate[1] - 1, todaysDate[0]);
      // console.log(currentDate.getTime());


      if (newDate.getTime() <= currentDate.getTime()) {
        return <h5 className="pdfheading" style={{ color: '#16FE00', fontSize: '16px' }}><b>Unlocked</b> </h5>
      } else {
        return <h5 className="pdfheading" style={{ fontSize: '16px' }}><b>Release<span style={{ color: '#182E2C' }}>.</span>Date</b></h5>
      }
    }
    function release_Img(e) {
      let current = new Date()
      const currentDateOfStake = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

      let rlsDate = e.releaseDate;
      rlsDate = rlsDate.split("/");
      var newDate = new Date(rlsDate[2], rlsDate[1] - 1, rlsDate[0]);
      // console.log(newDate.getTime());

      let todaysDate = currentDateOfStake;
      todaysDate = todaysDate.split("/");
      var currentDate = new Date(todaysDate[2], todaysDate[1] - 1, todaysDate[0]);
      // console.log(currentDate.getTime());


      if (newDate.getTime() <= currentDate.getTime()) {
        return <img src={unlockedIcon} alt="unlockedIcon" style={{ width: '42px', marginTop: '1px' }} />
      } else {
        return <img src={lockedIcon} alt="lockedIcon" style={{ width: '45px', marginTop: '-2px' }} />
      }
    }

    let userAccountContent
    if (this.state.userAccount != '' && this.state.userAccount != null) {
      let accountFirstLetters = this.state.userAccount.substring(0, 3);
      let accountlastLetters = this.state.userAccount.substring(40);
      let fullResult = accountFirstLetters + '..' + accountlastLetters
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
                      <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>Staked Tokens</p>
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
                  <div id='helloDesk1' style={{ height: '330px', overflowY: 'scroll' }}>
                    {/* <div id='helloo' style={{ height: '330px', overflowY: 'scroll', display: 'none' }}> */}
                    <h5 className="stakedTknsHeadi" style={{ fontSize: '18px', marginTop: '10px', marginBottom: '20px', color: '#004eec', fontWeight: 'bold' }}>you will be able to trade your FTP on:</h5>
                    {userAccountStakedTokenList}
                  </div>

                  <div className="wholePage" style={{ display: 'none' }} id='helloDesk2'>
                    {/* <div className="wholePage" id='helloDesk2'> */}
                    <br /><br />
                    <div className="receiptMain">
                      <div className='receiptHeading'>
                        <h2><b>Confirm UnStake</b></h2>
                      </div>
                      <br /><br />
                      <h2 style={{ color: '#1761fb' }}><b>Waiting for Confirmation</b></h2>
                      <br /><br />
                      <h2 style={{ color: 'black' }}><b>Unlocking your FTP</b></h2>
                      <br /><br />
                      <h3 className='recipt1ConfirmTxt' style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
                      <br /><br />
                    </div>
                    <br /><br />
                  </div>
                  {/* <hr className='hr' style={{ marginTop: '6px' }} />
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Assets</h1>
                    </div>

                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }}>
                        <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Activity</h1>
                      </Link>

                    </div>
                  </div> */}
                </div>
                <div className='bottomBtns functionalityDiv' style={{ marginTop: '-53px', marginBottom: '115px' }}>
                  <hr className='hr' />
                  <div className="row" style={{ marginTop: '12px' }}>
                    <div className="col-6">
                      <Link to={{ pathname: '/Assets' }} style={{ color: 'black', fontSize: '18px' }}>
                        Assets
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }} style={{ color: 'black', fontSize: '18px' }}>
                        Activity
                      </Link>
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
                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                        Activity
                      </Link>
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
                  <a target="_blank" href="https://buy.ftp.indacoin.io/" >
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
                    <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>View Staked FTP</p>
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>
                </div>
                <hr className='hrSwap' />

                <div id='helloo' style={{ height: '252px', overflowY: 'scroll' }}>
                  {/* <div id='helloo' style={{ height: '206px', overflowY: 'scroll', display: 'none' }}> */}
                  <h5 className="stakedTknsHeadi" style={{ color: '#004eec', fontWeight: 'bold' }}>you will be able to trade your FTP on:</h5>
                  {userAccountStakedTokenList}
                </div>


                <div className="wholePage" style={{ display: 'none' }} id='hello'>
                  {/* <div className="wholePage" id='hello'> */}
                  <div className="receiptMain">
                    <div className='receiptHeading'>
                      <h2><b>Confirm UnStake</b></h2>
                    </div>
                    <br />
                    <h2 style={{ color: '#1761fb' }}><b>Waiting for Confirmation</b></h2>
                    <br />
                    <h3 style={{ color: 'black' }}><b>Unlocking your FTP</b></h3>
                    <br />
                    <h3 className='recipt1ConfirmTxt mobileRectipUnstakeTxt' style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
                    <br />
                  </div>
                  <br />
                </div>

              </div>

              <div className='bottomBtns'>
                <div className="row">
                  <div className="col-6">
                    <Link to={{ pathname: '/Assets' }} style={{ color: 'black' }}>
                      Assets
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} style={{ color: 'black' }}>
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
}

export default App;
