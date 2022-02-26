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
import darkSetting1 from '../Images/darkSetting1.png';
import darkInfo1 from '../Images/darkInfo1.png';
import darkRefresh1 from '../Images/darkRefresh1.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';

// components
import Graph from '../components/Graph2.jsx'

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

        tokenFarm.methods._withdrawStake(index).send({ from: accounts[0] }).on('transactionHash', (hash) => {
          setTimeout(() => {
            axios.delete(`https://haideryaqoob.com/Wallet/stake/${e.id}`)
              .then(res => {
                console.log('Stake Deleted : ', res);
                window.location.reload()
              }).catch(err => {
                console.log(err);
              })
          }, 2000);
        })
      } else {
        window.alert('TokenFarm contract not deployed to detected network.')
      }
    }

    let requestNetwork;
    if (this.state.networkId === 4 || this.state.networkId === '4') {
      requestNetwork = 'ethereum'
    } else {
      requestNetwork = 'binance'
    }

    axios.post(`https://haideryaqoob.com/Wallet/stake/${requestNetwork}`, {
      // "wallet": this.state.userAccount,
      "wallet": '0x589E639cAC9A02F45aCb9350Cf9B0A5b05Be70F8',
    })
      .then(res => {
        // console.log('response : ', res.data.data);
        this.setState({ userAccountStakedToken: res.data.data })
      }).catch(err => {
        // console.log(err);
      })

    let moralisApiKey = 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
    axios.get('https://deep-index.moralis.io/api/v2/erc20/0x32151D601f6578399136c57030890FbB48eDE685/price?chain=bsc',
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        // console.log(res);
        this.setState({ livePriceBftp: res.data.usdPrice })
      }).catch((err) => {
        // console.log(err);
      })

    let rateAmount = this.state.livePriceBftp
    // console.log('rateAmount', rateAmount);



    let userAccountStakedTokenList
    if (this.state.userAccountStakedToken != '' && this.state.userAccountStakedToken != 'wallet not found' && this.state.userAccountStakedToken != undefined) {
      // console.log('Not empty');
      userAccountStakedTokenList = this.state.userAccountStakedToken.map(function (st, i) {
        let internationalNumberFormat = new Intl.NumberFormat('en-US')

        return (
          <div className="greyDiv2" key={i} style={{ textAlign: 'start', backgroundColor: '#182E2C' }}>
            <div className="row">
              <div className="col-2">
                {release_Img(st)}
                {/* <img src={lockedIcon} alt="" /> */}
              </div>
              <div className="col-5">
                <h5 className="pdfheading" style={{ fontSize: '16px' }}><b>{internationalNumberFormat.format(st.bFTP)}</b></h5>
                <p className="pdfPara" style={{ fontSize: '13px' }}>$ {(st.bFTP * rateAmount).toFixed(7)}</p>
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
      userNetworkContent = 'Networks'
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
        return <img src={unlockedIcon} alt="" />
      } else {
        return <img src={lockedIcon} alt="" />
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
                <div className="bottomHeaderr bottomHeaderIstScreen" style={{ height: '430px' }}>
                  {/* <div className="blueBlackMainDiv3" style={{ paddingBottom: '30px' }}> */}
                  <div className="row">
                    <div className="col-2">
                      <Link to={{ pathname: '/SndScreen' }}>
                        <img className='blackDivBtns ' src={darkInfo1} alt="infoIcon" />
                      </Link>
                    </div>
                    <div className="col-6">
                      <p className='blackConnectTxt blackConnectTxtIstScreen'>Staked Tokens</p></div>
                    <div className="col-2">
                      <img className='blackDivBtns ' style={{ marginLeft: '20px' }} src={darkSetting1} alt="settingIcon" />
                    </div>
                    <div className="col-2">
                      <img className='blackDivBtns settingIcon' onClick={()=> {window.location.reload()}} style={{cursor: 'pointer'}} src={darkRefresh1} alt="settingIcon" />
                    </div>

                  </div>
                  <hr className='hr' />
                  <div style={{ height: '330px', overflowY: 'scroll' }}>
                    <h5 className="stakedTknsHeadi" style={{ fontSize: '18px', marginTop: '20px', marginBottom: '20px' }}>you will be able to trade your FTP on:</h5>
                    {userAccountStakedTokenList}
                  </div>
                </div>

                <div className='bottomBtns'>
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
            <div className="MainLinks stakedTokensLink" style={{ marginTop: '10px', marginBottom: '10px' }}>
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
            <div>
              <div className="blueBlackMainDiv">
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns blackDivBtnsIst' src={darkInfo1} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxt blackConnectTxtIstScreen'>Staked<span style={{ color: 'black', fontSize: '12px' }}>_</span>Tokens</p></div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={darkSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={()=> {window.location.reload()}} style={{cursor: 'pointer'}} src={darkRefresh1} alt="settingIcon" />
                  </div>
                </div>
                <hr className='hr' />
                <div style={{ height: '206px', overflowY: 'scroll' }}>
                  <h5 className="stakedTknsHeadi">you will be able to trade your FTP on:</h5>
                  {userAccountStakedTokenList}
                </div>
              </div>

              <div className='bottomBtns'>
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
}

export default App;
