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
import stakeOptDropDown from '../Images/stakeOptDropDown1.png';
import swapArrow from '../Images/swapArrow.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import coinImg from '../Images/coinImg.png';
import transactionTich from '../Images/transactionTich.png';

// components
import Graph from '../components/Graph2.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
      transactionHash: '',
      tokenBalance: '',
      output: '',
      outputA: '0',
      extraStakeAmount: '0',
      loading: false,
      ethSwap: '',
      paramsData: '',
      receiptDiv1: false,
      receiptDiv2: false,
      etherAmount: '',
      networkId: ''
    }
  }

  async componentWillMount() {
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
      // console.log('params', param[0]);
      this.setState({ paramsData: param[0] })
    }

    this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })
    if (localStorage.getItem('StakePeriod') === null) {
      this.setState({ SelectStakePeriod: '12 Months' })
    } else {
      this.setState({ SelectStakePeriod: localStorage.getItem('StakePeriod') })
    }

    setTimeout(() => {
      console.log(this.state.SelectStakePeriod);
      if (this.state.SelectStakePeriod === '2 Mnts') {
        // this.setState({SelectStakePeriod: '06 Months'})
        localStorage.setItem("StakePeriod", "12 Months")
        window.location.reload()
      }
    }, 100);

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
    this.setState({ networkId })
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
      // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
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

        // if (networkId === 4) {
        //   let tokenBalanceOfExchange = await token.methods.balanceOf(EthSwap.networks[4].address).call()
        //   console.log('* tokenBalanceOfExchange * : ', window.web3.utils.fromWei(tokenBalanceOfExchange.toString(), 'Ether'));
        // } else if (networkId === 97) {
        //   let tokenBalanceOfExchange = await token.methods.balanceOf(EthSwap.networks[97].address).call()
        //   console.log('* tokenBalanceOfExchange * : ', window.web3.utils.fromWei(tokenBalanceOfExchange.toString(), 'Ether'));
        // } else if (networkId === 1) {
        //   let tokenBalanceOfExchange = await token.methods.balanceOf(EthSwap.networks[1].address).call()
        //   console.log('* tokenBalanceOfExchange * : ', window.web3.utils.fromWei(tokenBalanceOfExchange.toString(), 'Ether'));
        // } else if (networkId === 56) {
        //   let tokenBalanceOfExchange = await token.methods.balanceOf(EthSwap.networks[56].address).call()
        //   console.log('* tokenBalanceOfExchange * : ', window.web3.utils.fromWei(tokenBalanceOfExchange.toString(), 'Ether'));
        // }

        let tokenBalance = await token.methods.balanceOf(this.state.userAccount).call()
        this.state.tokenBalance = tokenBalance.toString();
      }, 1000);
    } else {
      // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
    }
  }
  stakeTokens = async (tokenAmount) => {
    if (this.state.SelectStakePeriod === null) {
      alert('Invalid time period')
    } else {
      if (window.web3.utils.fromWei(tokenAmount, 'Ether') > Number(localStorage.getItem('amountEntered'))) {
        alert('Insufficient Tokens')
      } else {
        console.log(localStorage.getItem('amountEntered'));
        console.log(window.web3.utils.fromWei(tokenAmount, 'Ether'));
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
        document.getElementById('hello').style.display = 'none';
        document.getElementById('helloo').style.display = 'none';
        this.setState({ receiptDiv1: true })
        await this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.userAccount }).on('transactionHash', (hash) => {
          this.setState({ loading: true })
          setTimeout(() => {
            this.setState({ loading: true })
            this.state.ethSwap.methods.stakeTokens(tokenAmount, 2).send({ from: this.state.userAccount }).on('transactionHash', (hash) => {
              localStorage.setItem('amountEntered', '0')
              this.setState({ receiptDiv1: false })
              this.setState({ transactionHash: hash })
              this.setState({ receiptDiv2: true })
              // console.log('Staked Completed');

              let tokenName
              let invoiceLink
              let requestNetwork;
              if (this.state.networkId === 4 || this.state.networkId === '4') {
                tokenName = "ETH"
                requestNetwork = 'ethereum'
                invoiceLink = `https://rinkeby.etherscan.io/tx/${hash}`
              } else if (this.state.networkId === 97 || this.state.networkId === '97') {
                tokenName = "BNB"
                requestNetwork = 'binance'
                invoiceLink = `https://testnet.bscscan.com/tx/${hash}`
              } else if (this.state.networkId === 56 || this.state.networkId === '56') {
                tokenName = "BNB"
                requestNetwork = 'binance'
                invoiceLink = `https://bscscan.com/tx/${hash}`
              } else if (this.state.networkId === 1 || this.state.networkId === '1') {
                tokenName = "ETH"
                requestNetwork = 'ethereum'
                invoiceLink = `https://etherscan.io/tx/${hash}`
              }

              let requestAmount = window.web3.utils.fromWei(tokenAmount, 'Ether')

              // console.log('requestNetwork', requestNetwork);
              axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet/createStake/`, {
                "wallet": this.state.userAccount,
                "bFTP": tokenAmountFromWei,
                "releaseDate": releaseDateOfStake,
                "currentDate": currentDateOfStake,
                "network": requestNetwork,
                "dollor": '0'
              })
                .then(res => {
                  this.setState({ loading: false })
                  console.log(res);
                  toast.success("Successfully Locked Tokens", {
                    position: 'top-right'
                  })
                  // this.inputA.value = '0';
                  // this.input.value = '0';
                  // window.location.href = "/StakePage";
                }).catch(err => {
                  // console.log(err);
                })


              axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet/create`, {
                "wallet": this.state.userAccount,
                "rate": '0',
                "transactionType": "Stake",
                "chain": tokenName,
                "ether": '0',
                "amount": requestAmount,
                "hash": invoiceLink
              })
                .then(res => {
                  console.log(res);
                  toast.success("Successfully Staked", {
                    position: 'top-right'
                  })
                  // window.location.href = "/StakePage";
                  this.setState({ loading: false })
                }).catch(err => {
                  console.log(err);
                })

              this.setState({ loading: true })
            }).catch(e => {
              if (e.code === 4001) {
                console.log('errorrrrrrrrrr', e)
                window.location.reload()
              }
            });
            this.setState({ loading: true })
            let tokenAmountFromWei = this.state.outputA
          }, 8000);
          this.setState({ loading: true })
        }).catch(e => {
          if (e.code === 4001) {
            console.log('errorrrrrrrrrr', e)
            window.location.reload()
          }
        });
      }
    }
  }

  render() {
    let SelectStakePeriodContent
    if (this.state.SelectStakePeriod != '' && this.state.SelectStakePeriod != null) {
      if (this.state.SelectStakePeriod === '12 Months') {
        SelectStakePeriodContent = <span><span style={{ color: '#F7F700' }}>12 </span><span>Months</span></span>
      } else {
        SelectStakePeriodContent = <span>{this.state.SelectStakePeriod}</span>
      }
    } else if (this.state.paramsData != '') {
      SelectStakePeriodContent =
        <span><span style={{ color: '#F7F700' }}>12 </span> Months</span>
    } else {
      // console.log('SelectStakePeriod', this.state.SelectStakePeriod);
      SelectStakePeriodContent =
        <span><span style={{ color: '#F7F700' }}>? </span> Months</span>
    }

    let swappingValue = this.state.etherAmount

    let receiptDiv1;
    if (this.state.receiptDiv1 === true && this.state.receiptDiv2 === false) {
      receiptDiv1 = <div className="wholePage" style={{ marginBottom: '-24px' }}>
        <br />
        <div className="receiptMain">
          <div className='receiptHeading'>
            <h2><b>Confirm Stake</b></h2>
          </div>
          <br /><br />
          <h2 style={{ color: '#1761fb' }}>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <b> Waiting for Confirmation</b></h2>
          <br /><br />
          <h2 style={{ color: 'black' }}><b>Staking {swappingValue} FTP for {this.state.outputA} FTP</b></h2>
          <br /><br />
          <h3 className='recipt1ConfirmTxt' style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
          <br /><br />
        </div>
      </div>
    }
    let receiptDiv1ForMob;
    if (this.state.receiptDiv1 === true && this.state.receiptDiv2 === false) {
      receiptDiv1ForMob = <div className="wholePage">
        <div className="receiptMain">
          <div className='receiptHeading'>
            <h2><b>Confirm Stake</b></h2>
          </div>
          <br />
          <h2 style={{ color: '#1761fb' }}><div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
            <b> Waiting for Confirmation</b></h2>
          <br />
          <br />
          <h3 style={{ color: 'black' }}><b>Staking {swappingValue} FTP for {this.state.outputA} FTP</b></h3>
          <br />
          <br />
          <h3 style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
          <br />
          <br />
        </div>
        <br />
      </div>
    }

    let invoiceFirstLetters = this.state.transactionHash.substring(0, 3);
    let invoicelastLetters = this.state.userAccount.substring(39);
    let invoiceFullResult = invoiceFirstLetters + '....' + invoicelastLetters


    let invoiceLink
    if (this.state.networkId === 4 || this.state.networkId === '4') {
      invoiceLink = `https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`
    } else if (this.state.networkId === 97 || this.state.networkId === '97') {
      invoiceLink = `https://testnet.bscscan.com/tx/${this.state.transactionHash}`
    } else if (this.state.networkId === 1 || this.state.networkId === '1') {
      invoiceLink = `https://etherscan.io/tx/${this.state.transactionHash}`
    } else {
      invoiceLink = `https://bscscan.com/tx/${this.state.transactionHash}`
    }

    let receiptDiv2;
    if (this.state.receiptDiv2 === true && this.state.receiptDiv1 === false) {
      receiptDiv2 = <div className="wholePage" style={{ marginBottom: '-24px' }}>
        <br />
        <div className="receiptMain">
          <div className='receiptHeading' style={{ backgroundColor: '#09993B' }}>
            <h2> <img src={transactionTich} alt="transactionTich" style={{ marginRight: '20px' }} /> <b>Transaction Receipt</b></h2>
          </div>
          <br /><br />
          <h3>
            <b>
              <a className='viewOnExplorerTxt' target={'_blank'} style={{ color: '#1BA448' }} href={invoiceLink}>
                View on Block Explorer: {invoiceFullResult}
              </a>
            </b>
          </h3>
          <br /><br /><br />
          <Link to={{ pathname: '/assets' }}>
            <button className='receiptBtn' style={{ backgroundColor: '#1BA448' }}>Continue</button>
          </Link>
          <br /><br /><br /><br />
        </div>
      </div>
    }
    let receiptDiv2ForMob;
    if (this.state.receiptDiv2 === true && this.state.receiptDiv1 === false) {
      receiptDiv2ForMob = <div className="wholePage">
        <br />
        <div className="receiptMain">
          <div className='receiptHeading' style={{ backgroundColor: '#09993B' }}>
            <h2> <img src={transactionTich} alt="transactionTich" style={{ marginRight: '20px' }} /> <b>Transaction Receipt</b></h2>
          </div>
          <br /><br />
          <h3>
            <b>
              <a target={'_blank'} style={{ color: '#1BA448' }} href={invoiceLink}>
                View on Block Explorer: {invoiceFullResult}
              </a>
            </b>
          </h3>
          <br /><br />
          <Link to={{ pathname: '/assets' }}>
            <button className='receiptBtn' style={{ backgroundColor: '#1BA448' }}>Continue</button>
          </Link>
          <br /><br />
        </div>
        <br />
        <br />
      </div>
    }

    let userNetworkContent
    // const networkId = await web3.eth.net.getId()
    if (this.state.networkId != '' && this.state.networkId != null) {
      // console.log('userNetwork', this.state.CurrentUserNetwork);
      if (this.state.networkId === 'Binance' || this.state.networkId === '56' || this.state.networkId === 56) {
        userNetworkContent = 'BSC'
      } else {
        userNetworkContent = 'ETH'
      }
    } else {
      console.log('userNetwork', this.state.CurrentUserNetwork);
      userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
    }

    let StakeBtn
    if (this.state.loading === false && this.state.userAccount !== '') {
      StakeBtn = <button className='stakeBtnss' onClick={(event) => {
        if (this.input.value === '' || this.input.value === null || this.input.value === undefined || this.input.value === '0' || this.input.value === 0) {
          alert('Invalid Stake Amount')
        } else {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          console.log('Invalid Stake Amount Condition: ', etherAmount, this.state.tokenBalance);
          // if (etherAmount > this.state.tokenBalance) {
          //   alert('insufficient Balance')
          // } else {
          this.stakeTokens(etherAmount)
          // }
        }
      }
      } style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '115%', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Stake</button>
    } else if (this.state.userAccount === '') {
      StakeBtn =
        <Link to={{ pathname: '/WhichWallet' }}>
          <button className='stakeBtnss newStakeWalCont' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '115%', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Connect Wallet</button>
        </Link>
    } else {
      StakeBtn = <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '115%', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Loading...</button>
    }


    let StakeBtnDesktop
    if (this.state.loading === false && this.state.userAccount !== '') {
      StakeBtnDesktop = <button className='stakeBtns hello stakeNewBtn' style={{ backgroundColor: '#2223DE', border: '3px solid #00339A', marginTop: '5px' }} onClick={(event) => {
        if (this.inputA.value === '' || this.inputA.value === null || this.inputA.value === undefined || this.inputA.value === '0' || this.inputA.value === 0) {
          alert('Invalid Stake Amount')
        }
        //  else if (localStorage.getItem('amountEntered') < this.inputA.value.toString()) {
        // alert('Insufficient Balance of last swapped')
        // }
        else {
          event.preventDefault()
          let etherAmountA = this.inputA.value.toString()
          etherAmountA = window.web3.utils.toWei(etherAmountA, 'Ether')
          console.log('Invalid Stake Amount Condition: ', etherAmountA, this.state.tokenBalance);
          // if (etherAmountA > this.state.tokenBalance) {
          //   alert('insufficient Balance')
          // } else {
          this.stakeTokens(etherAmountA)
          // }
        }
      }
      }>Stake</button>
    } else if (this.state.userAccount === '') {
      StakeBtnDesktop =
        <Link to={{ pathname: '/WhichWallet' }}>
          <button
            style={{ backgroundColor: '#2223DE', border: '3px solid #00339A', marginTop: '5px' }}
            className='stakeBtns hello stakeNewBtn'>Connect Wallet</button>
        </Link>
    } else {

      StakeBtnDesktop = <button className='stakeBtns hello stakeNewBtn' style={{ backgroundColor: '#2223DE' }}>Loading...</button>
      // StakeBtnDesktop = <marquee width="70%" direction="left" height="30px" className='amountStakeBtns'  style={{ width: '300px', paddingTop: '8px'}}>
      //   <h3 style={{fontWeight: 'bold'}}><span style={{color: '#00ff00'}}>Processing..........<span style={{color: '#111224'}}>___________</span></span><span>Security Inspection...........<span style={{color: '#111224'}}>___________</span></span><span style={{color: '#00ff00'}}>Blockchain Protocols..........</span><span style={{color: '#111224'}}>___________</span><span>Loading...........</span></h3>
      // </marquee>
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

    let paramsDataContent = <h4 className='colorGreyy stakeBlance' style={{ marginBottom: '4px', color: '#39393B', fontSize: '16px' }}><span style={{ marginRight: '6px' }}>Just Swapped: </span>{localStorage.getItem('amountEntered')}</h4>

    let ratePerAnnum
    // this.setState({ SelectStakePeriod: localStorage.getItem('StakePeriod') })
    let StakePeriodRate = this.state.SelectStakePeriod
    if (StakePeriodRate === '24 Months') {
      ratePerAnnum = '24 Months @ 30% Per Year'
    } else if (StakePeriodRate === '12 Months') {
      ratePerAnnum = '12 Months @ 25% Per Year'
    } else if (StakePeriodRate === '06 Months') {
      ratePerAnnum = '06 Months @ 20% Per Year'
    } else {
      ratePerAnnum = '02 Minutes @ 01 FTP'
    }

    let dateOfUnlock
    let timeWhichAdd
    if (this.state.SelectStakePeriod === '24 Months') {
      timeWhichAdd = 732
    } else if (this.state.SelectStakePeriod === '12 Months') {
      timeWhichAdd = 366
    } else if (this.state.SelectStakePeriod === '06 Months') {
      timeWhichAdd = 183
    } else if (this.state.SelectStakePeriod === '1 Day') {
      timeWhichAdd = 0
    }
    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + timeWhichAdd);
    dateOfUnlock = `${myFutureDate.getDate()}/${myFutureDate.getMonth() + 1}/${myFutureDate.getFullYear()}`;
    // console.log('dateOfUnlock', dateOfUnlock);





    let assetsTxt
    let activityTxt
    if (this.state.userAccount === '' || this.state.userAccount === ' ' || this.state.userAccount === null || this.state.userAccount === undefined) {
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
                    <Link to={{ pathname: '/StakePage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold', color: 'white' }}>
                      Stake
                    </h1></Link>
                  </div>
                  <div className="col-3">
                    <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                      Trade
                    </h1></a>
                  </div>
                </div>
                <div className="bottomHeaderr functionalityDiv" style={{ marginBottom: '105px' }}>
                  <div className="row" style={{ marginBottom: '7px' }}>
                    <div className="col-2">
                      {/* <Link to={{ pathname: '/WhatIsStaking' }}> */}
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                      {/* </Link> */}
                    </div>
                    <div className="col-6">
                      <p className='blackConnectTxtSwap' style={{ fontSize: '22px' }}>Stake<span style={{ color: '#91D8F7' }}>,</span>new<span style={{ color: '#91D8F7' }}>,</span>FTP?</p>
                      {/* <p className='blackConnectTxt blackConnectTxtIstScreen'>Swap to FTP</p> */}
                    </div>
                    <div className="col-2">
                      <img className='blackDivBtns bigScreenIssue' style={{ marginLeft: '20px', paddingTop: '2px' }} src={lightSetting1} alt="settingIcon" />
                    </div>
                    <div className="col-2">
                      <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ width: '30px', paddingTop: '3px', cursor: 'pointer' }} alt="settingIcon" />
                    </div>

                  </div>
                  <hr className='hr' />
                  {receiptDiv1}
                  {receiptDiv2}
                  <div className='DeskContentDiv' id='hello' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    {paramsDataContent}
                    <div className="whiteDivv">
                      <div className="row">
                        <div className="col-7">
                          <Link to={{ pathname: '/SelectPeriodNew' }}>
                            <button className='optionsOfStake' style={{ backgroundColor: 'black', marginTop: '10px', marginLeft: '-9px' }}>
                              <span className='SelectStakePeriodContent'>{SelectStakePeriodContent}</span>
                              <span>
                                <img className='stakePeriodDropdown' src={stakeOptDropDown} alt="stakeOptDropDown" />
                              </span>
                            </button>
                          </Link>
                          <span className='MaxTxtt' style={{ cursor: 'pointer', color: '#1767FE' }} onClick={(event) => {
                            let ftpAccountBalance = localStorage.getItem('amountEntered')
                            this.inputA.value = Number(ftpAccountBalance).toFixed(4);
                            this.setState({ etherAmount: this.inputA.value })

                            const tokenAmountA = this.inputA.value.toString()

                            // this.setState({ SelectStakePeriod: localStorage.getItem('StakePeriod') })
                            if (this.state.SelectStakePeriod === '24 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = ((tokenAmountA / 100) * 50) * 2
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

                            } else if (this.state.SelectStakePeriod === '12 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = (tokenAmountA / 100) * 35
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

                            } else if (this.state.SelectStakePeriod === '06 Months') {
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

                            } else {
                              setTimeout(() => {

                                this.setState({ extraStakeAmount: 1 });

                                this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(1) })
                                // console.log('outputA', this.state.outputA);
                              }, 1);
                            }
                          }}>Max</span>
                        </div>
                        <div className="col-5 whiteStakeAmountt">
                          <h5 style={{ color: '#0367FE', fontSize: '15px' }} className='swapAmountTxt'>Stake<span style={{ color: '#fff' }}>_</span>Amount</h5>
                          <h5 style={{ color: '#0367FE' }}><input
                            type="stakeTxt"
                            onChange={(event) => {
                              this.setState({ etherAmount: this.inputA.value })

                              const tokenAmountA = this.inputA.value.toString()

                              if (this.state.SelectStakePeriod === '24 Months') {
                                setTimeout(() => {
                                  let extraStakeAmountt = ((tokenAmountA / 100) * 50) * 2
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

                              } else if (this.state.SelectStakePeriod === '12 Months') {
                                setTimeout(() => {
                                  let extraStakeAmountt = (tokenAmountA / 100) * 35
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

                              } else if (this.state.SelectStakePeriod === '06 Months') {
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
                                  console.log('outputA', this.state.outputA);
                                }, 1);

                              } else {
                                setTimeout(() => {

                                  this.setState({ extraStakeAmount: 1 });

                                  this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(1) })
                                  // console.log('outputA', this.state.outputA);
                                }, 1);
                              }
                            }}
                            ref={(inputA) => { this.inputA = inputA }}
                            className="form-conrol form-control-lg swapOutput"
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
                    <h4 className='colorGreyy twelveMntTxtt perAnnum' style={{ color: '#39393B', marginTop: '-22px', fontSize: '16px' }}>{ratePerAnnum}</h4>
                    <div className="darkBlueDiv" style={{ backgroundColor: 'black' }}>
                      <div className="row">
                        <div className="col-6 extraFtpTxt" style={{ position: 'relative', left: '-18px' }}>
                          {/* <div className="col-6 extraFtpTxt"> */}
                          <div className="row">
                            <div className="col-4">
                              <img className='extraImg stakeExtraFtpTokenImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='40px' alt="logo" />
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
                    <h4 className='colorGrey' style={{ fontSize: '16px' }}>unlock date: {dateOfUnlock}</h4>
                    <br />
                    <div className="row functionalityDiv">
                      <div className="col-6 hello functionalityDiv">
                        <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-5px' }}>
                          {StakeBtnDesktop}
                        </h1>
                      </div>

                      <div className="col-6 helloo stakeNewBtn functionalityDiv">
                        <Link to={{ pathname: '/RecentTx' }} >
                          <button className='stakeBtns helloo stakeNewBtn' style={{ backgroundColor: '#FF0000', border: '3px solid #990708' }}>Don't Stake</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr className='hr' style={{ marginTop: '92px' }} />
                  <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col-6">
                      {assetsTxt}
                    </div>
                    <div className="col-6">
                      {activityTxt}

                    </div>
                  </div>
                </div>
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
          </div> */}          <FooterBottom />

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
                      <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                        {userNetworkContent}
                      </span>
                      <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ width: '110%' }}>
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
                  <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} alt="stakeImg" /></Link>
                </div>
                <div className='mainLinksPics col-3'>
                  <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
                </div>
              </div>
            </div>
            <div>
              <div className="bottomHeaderrr" style={{ paddingTop: '5px' }}>
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns blackDivBtnsIst marginMinus5 firstLightInfoMob' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    {/* <p className='blackConnectTxtSwap'>Swap to bFTP</p> */}
                    <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Stake new FTP?</p>
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>
                </div>
                <hr className='hrSwap' />

                {receiptDiv1ForMob}
                {receiptDiv2ForMob}

                <div className='DeskContentDiv' id='helloo' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  {paramsDataContent}
                  <div className="whiteDivv">
                    <div className="row swapAmountBox">
                      <div className="col-7">
                        <Link to={{ pathname: '/SelectPeriodNew' }}>
                          <button className='optionsOfStake' style={{ backgroundColor: 'black', marginTop: '8.2px', marginLeft: '-9px' }}>
                            <span className='SelectStakePeriodContent'>{SelectStakePeriodContent}</span>
                            <span>
                              <img className='stakePeriodDropdown' src={stakeOptDropDown} alt="stakeOptDropDown" />
                            </span>
                          </button>
                        </Link>
                        <span className='MaxTxtt' style={{ cursor: 'pointer', color: '#1767FE' }} onClick={(event) => {
                          let ftpAccountBalance = localStorage.getItem('amountEntered')
                          this.input.value = Number(ftpAccountBalance).toFixed(4);
                          this.setState({ etherAmount: this.input.value })

                          const tokenAmountA = this.input.value.toString()

                          if (this.state.SelectStakePeriod === '24 Months') {
                            setTimeout(() => {
                              let extraStakeAmountt = ((tokenAmountA / 100) * 50) * 2
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

                          } else if (this.state.SelectStakePeriod === '12 Months') {
                            setTimeout(() => {
                              let extraStakeAmountt = (tokenAmountA / 100) * 35
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

                          } else if (this.state.SelectStakePeriod === '06 Months') {
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
                              console.log('outputA', this.state.outputA);
                            }, 1);

                          } else {
                            setTimeout(() => {
                              this.setState({ extraStakeAmount: 1 });

                              this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(1) })
                              console.log('outputA', this.state.outputA);
                            }, 1);
                          }
                        }}>Max</span>
                      </div>
                      <div className="col-5 whiteStakeAmountt">
                        <h5 style={{ color: '#0367FE' }}>Stake<span style={{ color: '#fff' }}>_</span>Amount</h5>
                        <h5 style={{ color: '#0367FE' }}><input
                          type="stakeTxt"
                          onChange={(event) => {

                            this.setState({ etherAmount: this.input.value })
                            const tokenAmountA = this.input.value.toString()

                            if (this.state.SelectStakePeriod === '24 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = ((tokenAmountA / 100) * 50) * 2
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

                            } else if (this.state.SelectStakePeriod === '12 Months') {
                              setTimeout(() => {
                                let extraStakeAmountt = (tokenAmountA / 100) * 35
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

                            } else if (this.state.SelectStakePeriod === '06 Months') {
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
                                console.log('outputA', this.state.outputA);
                              }, 1);

                            } else {
                              setTimeout(() => {
                                this.setState({ extraStakeAmount: 1 });

                                this.setState({ outputA: parseFloat(tokenAmountA) + parseFloat(1) })
                                console.log('outputA', this.state.outputA);
                              }, 1);
                            }
                          }}
                          ref={(input) => { this.input = input }}
                          className="form-conrol form-control-lg swapAmountInput"
                          placeholder="0"
                          style={{ border: 'none', width: '98px', fontSize: '13px', textAlign: 'end' }}
                          required /></h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <img src={swapArrow} style={{ float: 'right', marginTop: '3px' }} alt="greenArrow" />

                    </div>
                  </div>
                  <h4 className='colorGreyy twelveMntTxtt perAnnum stakeBlance' style={{ color: '#39393B', marginTop: '-19px' }}>{ratePerAnnum}</h4>
                  <div className="darkBlueDivv" style={{ backgroundColor: 'black', borderColor: 'black' }}>
                    <div className="row">
                      <div className="col-6 extraFtpTxtt" style={{ position: 'relative', left: '-20px' }}>
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
                  <h4 className='colorGreyy stakeBlance' style={{ color: '#39393B', marginTop: '-10px', marginBottom: '-8px' }}>unlock date: {dateOfUnlock}</h4>
                  <br />
                  <div className="row" style={{ marginBottom: '5px' }}>
                    <div className="col-6" style={{ marginLeft: '-10px' }}>
                      <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-2px' }}>
                        {StakeBtn}
                      </h1>
                    </div>
                    <div className="col-6">
                      <Link to={{ pathname: '/RecentTx' }} >
                        <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px', marginTop: '-2px' }}>
                          <button className='stakeBtnss' style={{ backgroundColor: '#FF0000', border: '2px solid #990708', borderRadius: '11px', width: '115%', height: '40px', fontSize: '17px', marginTop: '3px', marginBottom: '1px' }}>Don't Stake</button></h1>
                      </Link>
                    </div>
                  </div>
                </div>



              </div>
              <div className='bottomBtns' style={{ marginTop: '5px' }}>
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
            {/* <WhatIsStaking></WhatIsStaking> */}
            {/* <Web3Test></Web3Test> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
