// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { ethers } from "ethers"
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import Web3 from 'web3'

import greenArrow from '../Images/greenArrow.png';
import toggleBtn from '../Images/toggleBtn.png';
import dropdownImg from '../Images/greenDropdown.png';
import graphDesktop from '../Images/graphDesktop.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/swapImg.png';
import stakeImg from '../Images/selectedStake.png';
import tradeImg from '../Images/tradeImg.png';
import infoIcon from '../Images/darkInfo.png';
import settingIcon from '../Images/darkSetting.png';
import networkImg from '../Images/networkImg.png';
import connectImg from '../Images/connectImg.png';
import networkDropdown from '../Images/networkDropdown.png';
import networkDropdown1 from '../Images/networkDropdown1.png';
import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import swapArrow from '../Images/swapArrow.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import coinImg from '../Images/coinImg.png';

// components
import Graph from '../components/Graph2.jsx'
import StakePage from '../components/stakePage'

// css
import './css/stakePage.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CurrentUserNetwork: 'Networks',
      userAccount: '',
      SelectStakePeriod: '',
      tokenFarm: '',
      stakingBalance: '',
      tokenBalance: '',
      output: '',
      outputA: '0',
      extraStakeAmount: '0',
      loading: false,
      ethSwap: '',
      paramsData: ''
    }
  }

  async componentWillMount() {
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
      // console.log('params', param[0]);
      this.setState({ paramsData: param[0] })
    }

    this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })
    this.setState({ SelectStakePeriod: localStorage.getItem('StakePeriod') })

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

    // Load TokenFarm
    const networkId = await web3.eth.net.getId()
    const tokenFarmData = EthSwap.networks[networkId]
    if (tokenFarmData) {
      setInterval(async () => {
        const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
        this.setState({ tokenFarm })

        let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.userAccount).call()
        // console.log('stakingBalancestakingBalance', stakingBalance.toString());

        // let isStaking = await tokenFarm.methods.stakes(this.state.userAccount).call()
        // let isStaking = await tokenFarm.methods.stakeholders(1).call()
        // console.log('isStakingisStakingisStakingisStaking', isStaking.toString());

        localStorage.setItem('stakedBalance', window.web3.utils.fromWei(stakingBalance.toString(), 'Ether'))
        if (stakingBalance === null) {
          this.setState({ stakingBalance: '0' })
        } else {
          this.setState({ stakingBalance: stakingBalance.toString() })
        }
      }, 1000);
    } else {
      window.alert('Invalid Network Id. Please select ** Binanace Testnet ** or ** Rinkeby Testnet ** to Continue.')
    }

    const networkChanged = (chainId) => {
      console.log('chain_changed', chainId);
      window.location.reload()
    };
    const accountChanged = (account) => {
      console.log('account_changed', account);
      window.location.reload()
    }

    // Load Token
    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)
    const tokenData = Token.networks[networkId]
    if (tokenData) {
      setInterval(async () => {
        const token = new web3.eth.Contract(Token.abi, tokenData.address)
        this.state.token = token;

        // console.log(EthSwap.networks[4].address);
        let tokenBalanceOfExchange = await token.methods.balanceOf(EthSwap.networks[4].address).call()
        // console.log('* tokenBalanceOfExchange * : ', window.web3.utils.fromWei(tokenBalanceOfExchange.toString(), 'Ether'));
        let tokenBalance = await token.methods.balanceOf(this.state.userAccount).call()
        this.state.tokenBalance = tokenBalance.toString();
      }, 1000);
    } else {
      window.alert('Invalid Network Id. Please select ** Binanace Testnet ** or ** Rinkeby Testnet ** to Continue.')
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('Invalid Network Id. Please select ** Binanace Testnet ** or ** Rinkeby Testnet ** to Continue.')
    }
  }
  stakeTokens = async (tokenAmount) => {
    if (this.state.SelectStakePeriod === null) {
      alert('Invalid time period')
    } else {
      this.setState({ loading: true })
      let current = new Date()
      const currentDateOfStake = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
      // console.log('currentDateOfStake', currentDateOfStake);


      // adding time
      let timeWhichAdd
      if (this.state.SelectStakePeriod === '06 Months') {
        timeWhichAdd = 183
      } else if (this.state.SelectStakePeriod === '12 Months') {
        timeWhichAdd = 366
      } else if (this.state.SelectStakePeriod === '24 Months') {
        timeWhichAdd = 732
      } else if (this.state.SelectStakePeriod === '1 Day') {
        timeWhichAdd = 0
      }
      var myCurrentDate = new Date();
      var myFutureDate = new Date(myCurrentDate);
      myFutureDate.setDate(myFutureDate.getDate() + timeWhichAdd);
      const releaseDateOfStake = `${myFutureDate.getDate()}/${myFutureDate.getMonth() + 1}/${myFutureDate.getFullYear()}`;
      // console.log('releaseDateOfStake', releaseDateOfStake);
      await this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.userAccount }).on('transactionHash', (hash) => {
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({ loading: true })
          this.state.ethSwap.methods.stakeTokens(tokenAmount, 2).send({ from: this.state.userAccount }).on('transactionHash', (hash) => {
            // console.log('Staked Completed');

            axios.post('https://haideryaqoob.com/Wallet/createStake', {
              "wallet": this.state.userAccount,
              "bFTP": tokenAmountFromWei,
              "releaseDate": releaseDateOfStake,
              "currentDate": currentDateOfStake
            })
              .then(res => {
                // console.log(res);
                window.location.href = "/StakePage";
              }).catch(err => {
                // console.log(err);
              })

            this.setState({ loading: true })
          })
          this.setState({ loading: true })
          let tokenAmountFromWei = this.state.outputA
        }, 10000);
        this.setState({ loading: true })
      })
    }
  }

  render() {
    let SelectStakePeriodContent
    if (this.state.SelectStakePeriod != '' && this.state.SelectStakePeriod != null) {
      // console.log('SelectStakePeriod', this.state.SelectStakePeriod);
      SelectStakePeriodContent =
        <span>{this.state.SelectStakePeriod}</span>
    } else if (this.state.paramsData != '') {
      SelectStakePeriodContent =
        <span><span style={{ color: '#F7F700' }}>12 </span> Months</span>
    } else {
      // console.log('SelectStakePeriod', this.state.SelectStakePeriod);
      SelectStakePeriodContent =
        <span><span style={{ color: '#F7F700' }}>? </span> Months</span>
    }

    let userNetworkContent
    if (this.state.CurrentUserNetwork != '' && this.state.CurrentUserNetwork != null) {
      // console.log('userNetwork', this.state.CurrentUserNetwork);
      if (this.state.CurrentUserNetwork === 'Binance') {
        userNetworkContent = 'BSC'
      } else {
        userNetworkContent = 'ETH'
      }
    } else {
      console.log('userNetwork', this.state.CurrentUserNetwork);
      userNetworkContent = 'Networks'
    }

    let StakeBtn
    if (this.state.loading === false) {
      StakeBtn = <button className='amountStakeBtns' style={{ backgroundColor: '#2223DE' }} onClick={(event) => {
        if (this.input.value === '' || this.input.value === null || this.input.value === undefined || this.input.value === '0' || this.input.value === 0) {
          alert('Invalid Stake Amount')
        } else if (localStorage.getItem('amountEntered') < this.input.value.toString()) {
          alert('Insufficient Balance of last swapped')
        } else {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          // let notFormatedAmount = etherAmount
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          // console.log('etherAmountStake', etherAmount);
          this.stakeTokens(etherAmount)
        }
      }
      }>Stake</button>
    } else {
      StakeBtn = <button className='amountStakeBtns' style={{ backgroundColor: '#2223DE' }}>Loading...</button>
    }


    let StakeBtnDesktop
    if (this.state.loading === false) {
      StakeBtnDesktop = <button className='stakeBtns hello' style={{ backgroundColor: '#2223DE', marginTop: '5px' }} onClick={(event) => {
        if (this.inputA.value === '' || this.inputA.value === null || this.inputA.value === undefined || this.inputA.value === '0' || this.inputA.value === 0) {
          alert('Invalid Stake Amount')
        } else if (localStorage.getItem('amountEntered') < this.inputA.value.toString()) {
          alert('Insufficient Balance of last swapped')
        } else {
          event.preventDefault()
          let etherAmountA
          etherAmountA = this.inputA.value.toString()
          // let notFormatedAmount = etherAmount
          etherAmountA = window.web3.utils.toWei(etherAmountA, 'Ether')
          // console.log('etherAmountStake', etherAmountA);
          this.stakeTokens(etherAmountA)
        }
      }
      }>Stake</button>
    } else {
      StakeBtnDesktop = <button className='stakeBtns hello' style={{ backgroundColor: '#2223DE' }}>Loading...</button>
    }


    let userAccountContent
    if (this.state.userAccount != '' && this.state.userAccount != null) {
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

    let paramsDataContent = <h4 className='colorGreyy' style={{ marginBottom: '0px', color: '#39393B' }}>Just Swapped: {localStorage.getItem('amountEntered')}</h4>

    let ratePerAnnum
    let StakePeriodRate = localStorage.getItem('StakePeriod')
    if (StakePeriodRate === '24 Months') {
      ratePerAnnum = '24 Months @ 30% Per Year'
    } else if (StakePeriodRate === '12 Months') {
      ratePerAnnum = '12 Months @ 25% Per Year'
    } else {
      ratePerAnnum = '06 Months @ 20% Per Year'
    }

    let dateOfUnlock
    let timeWhichAdd
    if (this.state.SelectStakePeriod === '24 Months') {
      timeWhichAdd = 732
    } else if (this.state.SelectStakePeriod === '12 Months') {
      timeWhichAdd = 366
    } else if (this.state.SelectStakePeriod === ' Months') {
      timeWhichAdd = 183
    } else if (this.state.SelectStakePeriod === '1 Day') {
      timeWhichAdd = 0
    }
    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + timeWhichAdd);
    dateOfUnlock = `${myFutureDate.getDate()}/${myFutureDate.getMonth() + 1}/${myFutureDate.getFullYear()}`;
    // console.log('dateOfUnlock', dateOfUnlock);


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
                    <Link to={{ pathname: '/StakePage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold', color: 'white' }}>
                      Stake
                    </h1></Link>
                  </div>
                  <div className="col-3">
                    <a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x32151D601f6578399136c57030890FbB48eDE685"><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                      Trade
                    </h1></a>
                  </div>
                </div>
                <div className="bottomHeaderr">
                  <div className="row" style={{ marginBottom: '7px' }}>
                    <div className="col-2">
                      <Link to={{ pathname: '/WhatIsStaking' }}>
                        <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                      </Link>
                    </div>
                    <div className="col-6">
                      <p className='blackConnectTxtSwap' style={{ fontSize: '22px' }}>Stake new FTP</p>
                      {/* <p className='blackConnectTxt blackConnectTxtIstScreen'>Swap to FTP</p> */}
                    </div>
                    <div className="col-2">
                      <img className='blackDivBtns ' style={{ marginLeft: '20px' }} src={lightSetting1} alt="settingIcon" />
                    </div>
                    <div className="col-2">
                      <img className='blackDivBtns settingIcon' onClick={()=> {window.location.reload()}} src={lightRefresh} style={{ width: '30px', cursor: 'pointer' }} alt="settingIcon" />
                    </div>

                  </div>
                  <hr className='hr' />
                  <div className='DeskContentDiv' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    {paramsDataContent}
                    <div className="whiteDivv">
                      <div className="row">
                        <div className="col-7">
                          <Link to={{ pathname: '/SelectPeriod' }}>
                            <button className='optionsOfStake'>
                              {SelectStakePeriodContent}
                              <span>
                                <img src={stakeOptDropDown} alt="stakeOptDropDown" />
                              </span>
                            </button>
                          </Link>
                          <span className='MaxTxtt' style={{ cursor: 'pointer' }} onClick={(event) => {
                            let ftpAccountBalance = localStorage.getItem('amountEntered')
                            this.inputA.value = ftpAccountBalance
                          }}>Max</span>
                        </div>
                        <div className="col-5 whiteStakeAmountt">
                          <h5 style={{ color: '#0367FE' }}>Stake<span style={{ color: '#fff' }}>_</span>Amount</h5>
                          <h5 style={{ color: '#0367FE' }}><input
                            type="text"
                            onChange={(event) => {

                              const tokenAmountA = this.inputA.value.toString()

                              if (localStorage.getItem('StakePeriod') === '24 Months') {
                                setTimeout(() => {
                                  let extraStakeAmountt = ((tokenAmountA / 100) * 30) * 2
                                  // console.log('7777777777777', extraStakeAmountt.toString().length);
                                  let extraStakeAmount
                                  if (extraStakeAmountt.toString().length > 10) {
                                    extraStakeAmount = extraStakeAmountt.toFixed(5)
                                  } else {
                                    extraStakeAmount = extraStakeAmountt
                                  }
                                  this.setState({ extraStakeAmount })
                                  this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                  // console.log('outputA', this.state.outputA);
                                }, 1);

                              } else if (localStorage.getItem('StakePeriod') === '12 Months') {
                                setTimeout(() => {
                                  let extraStakeAmountt = (tokenAmountA / 100) * 25
                                  // console.log('7777777777777', extraStakeAmountt.toString().length);
                                  let extraStakeAmount
                                  if (extraStakeAmountt.toString().length > 10) {
                                    extraStakeAmount = extraStakeAmountt.toFixed(5)
                                  } else {
                                    extraStakeAmount = extraStakeAmountt
                                  }
                                  this.setState({ extraStakeAmount })
                                  this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                  // console.log('outputA', this.state.outputA);
                                }, 1);

                              } else {
                                setTimeout(() => {
                                  let extraStakeAmountt = ((tokenAmountA / 100) * 20) / 2
                                  // console.log('7777777777777', extraStakeAmountt.toString().length);
                                  let extraStakeAmount
                                  if (extraStakeAmountt.toString().length > 10) {
                                    extraStakeAmount = extraStakeAmountt.toFixed(5)
                                  } else {
                                    extraStakeAmount = extraStakeAmountt
                                  }
                                  this.setState({ extraStakeAmount })
                                  this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                  // console.log('outputA', this.state.outputA);
                                }, 1);
                              }
                            }}
                            ref={(inputA) => { this.inputA = inputA }}
                            className="form-conrol form-control-lg"
                            placeholder="0"
                            style={{ border: 'none', width: '98px', fontSize: '13px', textAlign: 'end' }}
                            required /></h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <img src={greenArrow} style={{ float: 'right', marginTop: '8px', marginBottom: '8px' }} alt="greenArrow" />
                      </div>
                    </div>
                    <h4 className='colorGreyy twelveMntTxtt perAnnum' style={{ color: '#39393B', marginTop: '-22px' }}>{ratePerAnnum}</h4>
                    <div className="darkBlueDiv">
                      <div className="row">
                        <div className="col-6 extraFtpTxt">
                          <div className="row">
                            <div className="col-4">
                              <img className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='40px' alt="logo" />
                            </div>
                            <div className="col-8">
                              <h5>Extra<span style={{ color: '#111224' }}>_</span>FTP</h5>
                              <h5>{this.state.extraStakeAmount}</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 whiteStakeAmount">
                          <h5 style={{ color: '#00CCFF' }}>Total FTP</h5>
                          <h5 style={{ color: '#00CCFF' }}>{this.state.outputA}</h5>
                        </div>
                      </div>
                    </div>
                    <br />
                    <h4 className='colorGrey'>unlock date: {dateOfUnlock}</h4>
                    <br />
                    <div className="row">
                      <div className="col-6 hello">
                        <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-5px' }}>
                          {StakeBtnDesktop}
                        </h1>
                      </div>

                      <div className="col-6 helloo">
                        <Link to={{ pathname: '/RecentTx' }} >
                          <button className='stakeBtns helloo' style={{ backgroundColor: '#FF0000' }}>Don't Stake</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br /><br /><br /><br /><br />
                  <hr className='hr' />
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <Link to={{ pathname: '/Assets' }} >
                        <h1 style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Assets</h1>
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }} >
                        <h1 style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Activity</h1>
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
                  {/* <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
                  <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                  <Link to={{ pathname: '/WhichWallet' }}>
                    {userAccountContent}
                  </Link>
                  {/* Connect */}
                  {/* </div> */}
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
              <div className="bottomHeaderrr" style={{ paddingTop: '7px' }}>
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/WhatIsStaking' }}>
                      <img className='blackDivBtns blackDivBtnsIst' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    {/* <p className='blackConnectTxtSwap'>Swap to bFTP</p> */}
                    <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px' }}>Stake new<span style={{ color: '#91D8F7', fontSize: '12px' }}>_</span>FTP</p>
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={()=> {window.location.reload()}} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>
                </div>
                <hr className='hrStack' />
                <div className='DeskContentDiv' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  {paramsDataContent}
                  <div className="whiteDivv">
                    <div className="row">
                      <div className="col-7">
                        <Link to={{ pathname: '/SelectPeriod' }}>
                          <button className='optionsOfStake'>
                            {SelectStakePeriodContent}
                            <span>
                              <img src={stakeOptDropDown} alt="stakeOptDropDown" />
                            </span>
                          </button>
                        </Link>
                        <span className='MaxTxtt' style={{ cursor: 'pointer' }} onClick={(event) => {
                          let ftpAccountBalance = localStorage.getItem('amountEntered')
                          this.input.value = ftpAccountBalance
                        }}>Max</span>
                      </div>
                      <div className="col-5 whiteStakeAmountt">
                        <h5 style={{ color: '#0367FE' }}>Stake<span style={{ color: '#fff' }}>_</span>Amount</h5>
                        <h5 style={{ color: '#0367FE' }}><input
                          type="text"
                          onChange={(event) => {

                            const tokenAmountA = this.input.value.toString()

                            if (localStorage.getItem('StakePeriod') === '24 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = ((tokenAmountA / 100) * 30) * 2
                                // console.log('7777777777777', extraStakeAmountt.toString().length);
                                let extraStakeAmount
                                if (extraStakeAmountt.toString().length > 10) {
                                  extraStakeAmount = extraStakeAmountt.toFixed(5)
                                } else {
                                  extraStakeAmount = extraStakeAmountt
                                }
                                this.setState({ extraStakeAmount })
                                this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                // console.log('outputA', this.state.outputA);
                              }, 1);

                            } else if (localStorage.getItem('StakePeriod') === '12 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = (tokenAmountA / 100) * 25
                                // console.log('7777777777777', extraStakeAmountt.toString().length);
                                let extraStakeAmount
                                if (extraStakeAmountt.toString().length > 10) {
                                  extraStakeAmount = extraStakeAmountt.toFixed(5)
                                } else {
                                  extraStakeAmount = extraStakeAmountt
                                }
                                this.setState({ extraStakeAmount })
                                this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                console.log('outputA', this.state.outputA);
                              }, 1);

                            } else {
                              setTimeout(() => {
                                let extraStakeAmountt = ((tokenAmountA / 100) * 20) / 2
                                console.log('7777777777777', extraStakeAmountt.toString().length);
                                let extraStakeAmount
                                if (extraStakeAmountt.toString().length > 10) {
                                  extraStakeAmount = extraStakeAmountt.toFixed(5)
                                } else {
                                  extraStakeAmount = extraStakeAmountt
                                }
                                this.setState({ extraStakeAmount })
                                this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(extraStakeAmount) })
                                console.log('outputA', this.state.outputA);
                              }, 1);
                            }
                          }}
                          ref={(input) => { this.input = input }}
                          className="form-conrol form-control-lg"
                          placeholder="0"
                          style={{ border: 'none', width: '98px', fontSize: '13px', textAlign: 'end' }}
                          required /></h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <img src={swapArrow} style={{ float: 'right' }} alt="greenArrow" />

                    </div>
                  </div>
                  <h4 className='colorGreyy twelveMntTxtt perAnnum' style={{ color: '#39393B', marginTop: '-22px' }}>{ratePerAnnum}</h4>
                  <div className="darkBlueDivv">
                    <div className="row">
                      <div className="col-6 extraFtpTxtt">
                        <div className="row">
                          <div className="col-4">
                            <img className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='30px' style={{ marginTop: '8px' }} alt="logo" />
                          </div>
                          <div className="col-8">
                            <h5 style={{ fontSize: '12px', marginTop: '7px' }}>Extra<span style={{ color: '#111224' }}>_</span>FTP</h5>
                            <h5 style={{ fontSize: '12px' }}>{this.state.extraStakeAmount}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 whiteStakeAmountt">
                        <h5 style={{ color: '#00CCFF' }}>Total FTP</h5>
                        <h5 style={{ color: '#00CCFF' }}>{this.state.outputA}</h5>
                      </div>
                    </div>
                  </div>
                  <br />
                  <h4 className='colorGreyy' style={{ color: '#39393B', marginTop: '-10px', marginBottom: '-8px' }}>unlock date: {dateOfUnlock}</h4>
                  <br />
                  <div className="row">
                    <div className="col-6" style={{ marginLeft: '-10px' }}>
                      <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-5px' }}>
                        {StakeBtn}
                      </h1>
                    </div>
                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }} >
                        <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-5px' }}>
                          <button className='amountStakeBtns' style={{ backgroundColor: '#FF0000' }}>Don't Stake</button></h1>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bottomBtns' style={{ marginTop: '10px' }}>
                <div className="row">
                  <div className="col-6">
                    <Link to={{ pathname: '/Assets' }} style={{ color: '#1FE2FA' }}>
                      <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px' }}>Assets</h1>
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA' }}>
                      <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px' }}>Activity</h1>
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
