// import React, { Component } from 'react'
// import Web3 from 'web3'

// class App extends Component {

//   async hello() {
//     console.log('df');
//     await this.loadWeb3()
//     // await this.loadBlockchainData()
//   }

//   async loadBlockchainData() {
//     const web3 = window.web3

//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     console.log(this.state.account);
//     localStorage.setItem('account', this.state.account)

//     const ethBalance = await web3.eth.getBalance(this.state.account)
//     this.setState({ ethBalance })
    
//     console.log(web3.utils.fromWei(this.state.ethBalance, 'ether'));
//     console.log(this.state.ethBalance);
//     localStorage.setItem('ethBalance', this.state.ethBalance)

//     // Load Token
//     // const networkId = await web3.eth.net.getId()
//     // const tokenData = Token.networks[networkId]
//     // if (tokenData) {
//     //   const token = new web3.eth.Contract(Token.abi, tokenData.address)
//     //   this.setState({ token })
//     //   let tokenBalance = await token.methods.balanceOf(this.state.account).call()
//     //   this.setState({ tokenBalance: tokenBalance.toString() })
//     // } else {
//     //   window.alert('Token contract not deployed to detected network.')
//     // }

//     // Load EthSwap
//     // const ethSwapData = EthSwap.networks[networkId]
//     // if (ethSwapData) {
//     //   const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
//     //   this.setState({ ethSwap })
//     // } else {
//     //   window.alert('EthSwap contract not deployed to detected network.')
//     // }

//     // this.setState({ loading: false })
//   }

//   async loadWeb3() {
//     console.log('wecsfsd');
//     // if (window.ethereum) {
//     //   window.web3 = new Web3(window.ethereum)
//     //   await window.ethereum.enable()
//     // }
//     // else if (window.web3) {
//     //   window.web3 = new Web3(window.web3.currentProvider)
//     // }
//     // else {
//     //   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     // }
//   }


//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       token: {},
//       ethSwap: {},
//       ethBalance: '0',
//       tokenBalance: '0',
//       loading: true
//     }
//   }

//   render() {
//     // let content
//     // if (this.state.loading) {
//     //   content = <p id="loader" className="text-center">Loading...</p>
//     // } else {
//     //    content = <p id="loader" className="text-center">Not Loading...</p>

//     // }

//     return (
//       <div>

//                 {/* {content} */}
//                 <button onClick={this.hello}>fd</button>
//                 {this.state.account}


//                 // react States
// import { useEffect, useState } from 'react'
// import React, { Component } from 'react';
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// import Token from '../abis/Token.json'
// import EthSwap from '../abis/EthSwap.json'

// import Web3 from 'web3'

// import toggleBtn from '../Images/toggleBtn.png';
// import dropdownImg from '../Images/greenDropdown.png';
// import graphImg from '../Images/graphArtificalView.png';
// import graphDesktop from '../Images/graphDesktop.png';
// import buyImg from '../Images/buyImg.png';
// import swapImg from '../Images/swapImg.png';
// import stakeImg from '../Images/stakeImg.png';
// import tradeImg from '../Images/tradeImg.png';
// import networkImg from '../Images/networkImg.png';
// import connectImg from '../Images/connectImg.png';
// import networkDropdown from '../Images/networkDropdown.png';
// import networkDropdown1 from '../Images/networkDropdown1.png';
// import lightSetting from '../Images/lightSetting.png';
// import StakeIcon from '../Images/StakeIcon.png';
// import stakeOptDropDown from '../Images/stakeOptDropDown.png';
// import greenArrow from '../Images/greenArrow.png';
// import coinImg from '../Images/coinImg.png';
// import infoIcon from '../Images/darkInfo.png';
// import settingIcon from '../Images/darkSetting.png';
// import swapArrow from '../Images/swapArrow.png';
// import binanceSmartChain from '../Images/binanceSmartChain.png';

// // components
// import Graph from '../components/Graph2.jsx'


// // css
// import './css/swapPage.css'
// import axios from 'axios';
// class App extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             output: '0',
//             CurrentUserNetwork: '',
//             userAccount: '',
//             UserEthBalance: '',
//             FormatedUserEthBalance: '0',
//             SelectSwapToken: '',
//             token: '',
//             ethSwap: '',
//             tokenBalance: '',
//             loading: false,
//             tokenFarm: '',
//             contractGetAmount: '',
//             transactionHash: '',
//             receiptDiv: false,
//             currentNetworkId: ''
//         }
//     }
//     async componentWillMount() {


//         // load WEB3
//         if (window.ethereum) {
//             window.web3 = new Web3(window.ethereum)
//             await window.ethereum.enable()
//         }
//         else if (window.web3) {
//             window.web3 = new Web3(window.web3.currentProvider)
//         }
//         else {
//             window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//         }
//         // load Blockchain Data
//         const web3 = window.web3

//         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
//         console.log('First accounts', accounts[0]);
//         this.setState({ userAccount: accounts[0] })

//         const ethBalance = await web3.eth.getBalance(this.state.userAccount)
//         this.setState({ UserEthBalance: ethBalance })
//         const formatedEthBlnc = window.web3.utils.fromWei(ethBalance, 'Ether')
//         this.setState({ FormatedUserEthBalance: formatedEthBlnc.substring(0, 10) })


//         console.log('First Account Eth Balance : ', this.state.UserEthBalance);

//         const networkChanged = (chainId) => {
//             console.log('chain_changed', chainId);
//             window.location.reload()
//         };

//         // Load Token
//         const networkId = await web3.eth.net.getId()
//         console.log('Accoutn Network ID :', networkId);
//         window.ethereum.on("chainChanged", networkChanged)
//         this.setState({ currentNetworkId: networkId })
//         // setInterval(async () => {
//         //     const networkId2 = await web3.eth.net.getId()
//         //     if (networkId === networkId2) {
//         //         // console.log('matched');
//         //         this.setState({currentNetworkId: networkId2})
//         //     } else {
//         //         window.location.reload();
//         //     }
//         // }, 2000);
//         if (networkId === 4) {
//             localStorage.setItem('userNetwork', 'Ethereum')
//         } else if (networkId === 97) {
//             localStorage.setItem('userNetwork', 'Binance')
//         }
//         this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })

//         setTimeout(() => {
//             if (this.state.CurrentUserNetwork === 'Binance') {
//                 this.setState({ SelectSwapToken: '1 BNB' })
//             } else if (this.state.CurrentUserNetwork === 'Ethereum') {
//                 this.setState({ SelectSwapToken: '1 ETH' })
//             }
//         }, 1);

//         const tokenData = Token.networks[networkId]
//         if (tokenData) {
//             const token = new web3.eth.Contract(Token.abi, tokenData.address)
//             this.state.token = token;
//             let tokenBalance = await token.methods.balanceOf(this.state.userAccount).call()
//             this.state.tokenBalance = tokenBalance.toString();
//         } else {
//             this.state.UserEthBalance = null
//             window.alert('Token contract not deployed to detected network. ( ' + networkId + ' )')
//         }

//         // Load EthSwap
//         const ethSwapData = EthSwap.networks[networkId]
//         if (ethSwapData) {
//             const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
//             this.setState({ ethSwap })
//         } else {
//             this.state.UserEthBalance = null
//             window.alert('EthSwap contract not deployed to detected network. ( ' + networkId + ' )')
//         }

//         // Load TokenFarm
//         const tokenFarmData = EthSwap.networks[networkId]
//         if (tokenFarmData) {
//             const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
//             this.setState({ tokenFarm })
//             // let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.userAccount).call()
//             // if (stakingBalance === null) {
//             //     this.setState({ stakingBalance: '0' })
//             // } else {
//             //     this.setState({ stakingBalance: stakingBalance.toString() })
//             // }
//             // this.setState({ stakingBalance: stakingBalance.toString() })
//         } else {
//             this.state.UserEthBalance = null
//             window.alert('TokenFarm contract not deployed to detected network. ( ' + networkId + ' )')
//         }
//     }

//     buyTokens = (etherAmount) => {
//         this.setState({ loading: true })
//         this.setState({ contractGetAmount: etherAmount })
//         console.log('buy Token Func Ether Amount : ', etherAmount);
//         console.log('buy Token Func User Balance : ', this.state.userAccount);
//         this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.userAccount }).on('transactionHash', (hash) => {
//             this.setState({ transactionHash: hash })
//             this.setState({ receiptDiv: true })
//             this.setState({ loading: false })
//             let etherAmountFromWei = window.web3.utils.fromWei(etherAmount)

//             let invoiceLink
//             if (this.state.currentNetworkId === 4) {
//                 invoiceLink = `https://rinkeby.etherscan.io/tx/${hash}`
//             } else if (this.state.currentNetworkId === 97) {
//                 invoiceLink = `https://testnet.bscscan.com/tx/${hash}`
//             }


//             axios.post('https://haideryaqoob.com/Wallet/create', {
//                 "wallet": this.state.userAccount,
//                 "rate": "200",
//                 "ether": etherAmountFromWei,
//                 "amount": etherAmountFromWei * 200,
//                 "hash": invoiceLink
//             })
//                 .then(res => {
//                     console.log(res);
//                 }).catch(err => {
//                     console.log(err);
//                 })
//         })
//         localStorage.setItem('amountEntered', this.state.output)
//     }

//     render() {
//         // let CurrentUserEthBalance
//         let SwapBtn
//         if (this.state.UserEthBalance === null || this.state.UserEthBalance === '') {
//             SwapBtn = <Link to={{ pathname: '/WhichWallet' }}>
//                 <button className='stakeBtnss' style={{ backgroundColor: '#2223DE' }}>Connect Wallet</button>
//             </Link>
//         } else if (this.state.UserEthBalance != null && this.state.loading != true) {
//             SwapBtn = <button onClick={(e) => {
//                 e.preventDefault()
//                 let etherAmount
//                 etherAmount = this.input.value.toString()
//                 if (etherAmount === '' || etherAmount === null || etherAmount === undefined) {
//                     alert('Invalid Amount')
//                     console.log('etherAmount', etherAmount);
//                 } else {
//                     etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
//                     this.buyTokens(etherAmount)
//                 }
//             }} className='stakeBtnss' style={{ backgroundColor: '#2223DE' }}>Swap</button>
//         } else {
//             SwapBtn = <button className='stakeBtnss' style={{ backgroundColor: '#2223DE' }}>Loading...</button>
//         }


//         let SelectSwapTokenContent
//         if (this.state.SelectSwapToken != '' && this.state.SelectSwapToken != null) {
//             console.log('SelectSwapToken', this.state.SelectSwapToken);
//             SelectSwapTokenContent = this.state.SelectSwapToken
//         } else {
//             console.log('SelectSwapToken', this.state.SelectSwapToken);
//             SelectSwapTokenContent = 'Token'
//         }

//         let userNetworkContent
//         if (this.state.CurrentUserNetwork != '' && this.state.CurrentUserNetwork != null) {
//             console.log('userNetwork', this.state.CurrentUserNetwork);
//             userNetworkContent = this.state.CurrentUserNetwork
//         } else {
//             console.log('userNetwork', this.state.CurrentUserNetwork);
//             userNetworkContent = 'Networks'
//         }

//         let userAccountContent
//         if (this.state.userAccount != '' && this.state.userAccount != null) {
//             let accountFirstLetters = this.state.userAccount.substring(0, 3);
//             let accountlastLetters = this.state.userAccount.substring(40);
//             let fullResult = accountFirstLetters + '..' + accountlastLetters
//             setTimeout(() => {
//                 localStorage.setItem('userAccount', this.state.userAccount)
//             }, 1);
//             userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
//                 <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
//                 <span style={{ color: 'white' }}>{fullResult}</span>
//                 {/* Connect */}
//             </div>
//         } else {
//             userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
//                 <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
//                 <span style={{ color: 'white' }}>Connect</span>
//                 {/* Connect */}
//             </div>
//         }


//         console.log('contractGetAmount', this.state.contractGetAmount);
//         const current = new Date();

//         // invoice Formated
//         let invoiceFirstLetters = this.state.transactionHash.substring(0, 6);
//         let invoicelastLetters = this.state.userAccount.substring(35);
//         let invoiceFullResult = invoiceFirstLetters + '....' + invoicelastLetters

//         // invoice Formated
//         let accountFirstLetters = this.state.userAccount.substring(0, 6);
//         let accountlastLetters = this.state.userAccount.substring(34);
//         let fullResult = accountFirstLetters + '..' + accountlastLetters

//         // invoice link
//         let invoiceLink
//         let invoiceLinkTxt
//         if (this.state.currentNetworkId === 4) {
//             invoiceLinkTxt = 'https://rinkeby.etherscan.io/'
//             invoiceLink = `https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`
//         } else if (this.state.currentNetworkId === 97) {
//             invoiceLinkTxt = 'https://testnet.bscscan.com/'
//             invoiceLink = `https://testnet.bscscan.com/tx/${this.state.transactionHash}`
//         }

//         let receiptDiv

//         if (this.state.receiptDiv === true) {
//             receiptDiv =
//                 <div className="wholePage">
//                     <div className="receiptMain">
//                         <div className="receipt">
//                             <h1>.............................................</h1>
//                             <br />
//                             <h2>FAIRTRADER TRANSACTION</h2>
//                             <h1>.............................................</h1>

//                             <br /><br /><br />
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">DATE #</div>
//                                 <div className="col-6 text-right">{current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}</div>
//                             </div>
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">TIME #</div>
//                                 <div className="col-6 text-right">{current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()}</div>
//                             </div>
//                             <br /><br />
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">INVOICE NUMBER</div>
//                                 <div className="col-6 text-right">{invoiceFullResult}</div>
//                             </div>
//                             <br /><br />
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">ACCOUNT ADDRESS</div>
//                                 <div className="col-6 text-right">{fullResult}</div>
//                             </div>
//                             <br /><br />
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">AMOUNT #</div>
//                                 <div className="col-6 text-right">{window.web3.utils.fromWei(this.state.contractGetAmount)}</div>
//                             </div>
//                             <div className="row fontSize">
//                                 <div className="col-6 text-left">INVOICE LINK</div>
//                                 <div className="col-6 text-right">
//                                     <a style={{ textDecoration: 'underline' }} target={'_blank'} href={invoiceLink}>
//                                         {invoiceLinkTxt}
//                                     </a>
//                                 </div>
//                             </div>
//                             <br /><br />
//                             <br /><br />
//                             <h1>.............................................</h1>
//                             <br /><br />
//                             <p className='text-center'>
//                                 <Link to={{ pathname: '/StakePage?fromSwapPage' }}>
//                                     <button className='receiptBtn'>Continue</button>
//                                 </Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//         }

//         return (
//             <>
//                 {receiptDiv}
//                 <div style={{ backgroundColor: 'black' }}>
//                     <div className='MainDivDesktop'>
//                         <div className='headerNav'>
//                             <div className='row'>
//                                 <div className='col-4'>
//                                     <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
//                                 </div>
//                                 <div className="col-8 headerLinks">
//                                     <span style={{ display: "inline", float: "right" }}>
//                                         <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
//                                     </span>
//                                     <div style={{ display: "inline", float: "right" }}>
//                                         <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
//                                             <img src={connectImg} alt="connectImg" />
//                                             <span className='connectTxt'>Connect</span>
//                                         </div>
//                                     </div>
//                                     <div style={{ display: "inline", float: "right" }}>
//                                         <div className='headerBtns sndHeaderBtn networkBtn'>
//                                             <img src={networkImg} alt="connectImg" />
//                                             <span style={{ color: '#00C4F1' }} className='networksTxt'>Networks</span>
//                                             <img src={networkDropdown1} className='sndHeaderBtnsnd' alt="networkDropdown" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="desktopBlueDiv">
//                             <hr className='hrr' />
//                             <div className="row MainDivMain">
//                                 <div className="col-8">
//                                     <h1 className='HelpTxt' style={{ display: 'inline' }}>Help</h1>
//                           <h1 className='HelpTxt VideoTxt' style={{ display: 'inline', marginLeft: '30px' }}>Video</h1>
//                                     <Graph />

//                                 </div>
//                                 <div className="col-4">
//                                     <div className="row">
//                                         <div className="col-3"><h1 className='colorBlack'>Buy</h1></div>
//                                         <div className="col-3"><h1 className='colorBlack'>Swap</h1></div>
//                                         <div className="col-3"><h1 style={{ color: 'white' }}>Stake</h1></div>
//                                         <div className="col-3"><h1 className='colorBlack'>Trade</h1></div>
//                                     </div>
//                                     <div className="bottomHeaderr">

//                                         <div className="row">
//                                             <div className="col-2"><img className='blackDivBtns' src={StakeIcon} alt="infoIcon" /></div>
//                                             <div className="col-8"><p className='blackConnectTxt'>Stake bFTP</p></div>
//                                             <div className="col-2"><img className='blackDivBtns settingIcon' src={lightSetting} alt="settingIcon" /></div>
//                                         </div>
//                                         <hr className='hr' />
//                                         <div className='DeskContentDiv'>
//                                             <h4 className='colorGrey'>Just Swapped: 18,000</h4>
//                                             <div className="whiteDiv">
//                                                 <div className="row">
//                                                     <div className="col-6">
//                                                         <button className='optionStakeBtn'><span style={{ color: '#F7F700' }}>12 </span> Months <span><img src={stakeOptDropDown} alt="stakeOptDropDown" /></span></button> <span className='MaxTxt'>Max</span>
//                                                     </div>
//                                                     <div className="col-6 whiteStakeAmount">
//                                                         <h5>Stake Amount</h5>
//                                                         <h5>18,000</h5>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="row">
//                                                 <div className="col-4">
//                                                     <img src={greenArrow} style={{ float: 'right' }} alt="greenArrow" />

//                                                 </div>
//                                             </div>
//                                             <h4 className='colorGrey twelveMntTxt'>12 Months @ 20% Per Annum</h4>
//                                             <div className="darkBlueDiv">
//                                                 <div className="row">
//                                                     <div className="col-6 extraFtpTxt">
//                                                         <div className="row">
//                                                             <div className="col-4">
//                                                                 <img className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='40px' alt="logo" />
//                                                             </div>
//                                                             <div className="col-8">
//                                                                 <h5>Extra<span style={{ color: '#111224' }}>_</span>FTP</h5>
//                                                                 <h5>6,000</h5>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-6 whiteStakeAmount">
//                                                         <h5 style={{ color: '#00CCFF' }}>Total FTP</h5>
//                                                         <h5 style={{ color: '#00CCFF' }}>24,000</h5>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <br />
//                                             <h4 className='colorGrey'>unlock date: 20 Aug 2023</h4>
//                                             <br />
//                                             <div className="row">
//                                                 <div className="col-6 hello">
//                                                     <button className='stakeBtns hello' style={{ backgroundColor: '#2223DE' }}>Stake</button>
//                                                 </div>
//                                                 <div className="col-6 helloo">
//                                                     <button className='stakeBtns helloo' style={{ backgroundColor: '#FF0000' }}>Dont't Stake</button>
//                                                 </div>
//                                             </div>
//                                         </div><br /><br /><br /><br /><br />
//                                         <hr className='hr' />
//                                         <br />
//                                         <div className="row">
//                                             <div className="col-6">
//                                                 <h1 style={{ textAlign: 'center', color: 'black' }}>Assets</h1>
//                                             </div>
//                                             <div className="col-6">
//                                                 <h1 style={{ textAlign: 'center', color: 'black' }}>Activity</h1>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="desktopWhiteMainDiv">
//                             <div className="desktopWhiteDiv">
//                                 <div className="row">
//                                     <div className="col-2">
//                                         <img src={coinImg} alt="coinImg" />
//                                     </div>
//                                     <div className="col-10">
//                                         <h1>Fair Trader FTP Token</h1>
//                                         <br />
//                                         <p>We have a number of way acquire FTP coin. Fair Trader provides a number of Staking options where new FTP Swaps can earn as much as 25% bonus tokens with. This is great if you plan to hold FTP for a longer term. You will be able to view the locked FTP and the time left for the release of the tokens. The locked FTP tokens will be purchased at current PancakeSwap traded prices. For more information please email lockftp@fairtrader.io</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='MainDivMob'>
//                         <div className='blackWholeDiv'>
//                             <div className='row headerLogoBtns'>
//                                 <div className='col-4'>
//                                     <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
//                                 </div>
//                                 <div className="col-8 headerLinks">
//                                     <span style={{ display: "inline", float: "right" }}>
//                                         <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
//                                     </span>
//                                     <div style={{ display: "inline", float: "right" }}>
//                                         <Link to={{ pathname: '/WhichWallet' }}>
//                                             {userAccountContent}
//                                         </Link>
//                                     </div>
//                                     <div style={{ display: "inline", float: "right" }}>
//                                         <Link to={{ pathname: '/SelectNetwork' }}>
//                                             <div className='headerBtns sndHeaderBtn'>
//                                                 <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" />
//                                                 <span style={{ color: 'white' }}>
//                                                     {userNetworkContent}
//                                                 </span>
//                                                 <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                             <Graph />

//                         </div>
//                         <div className="blueDiv">
//                             <div className="MainLinks">
//                                 <div className='row'>
//                                     <div className='mainLinksPics col-3'>
//                                         <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
//                                     </div>
//                                     <div className='mainLinksPics col-3'>
//                                         <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
//                                     </div>
//                                     <div className='mainLinksPics col-3'>
//                                         <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} alt="stakeImg" /></Link>
//                                     </div>
//                                     <div className='mainLinksPics col-3'>
//                                         <a target="_blank" href="https://pancakeswap.finance/swap?outputCurrency=0x32151D601f6578399136c57030890FbB48eDE685"><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="bottomHeaderrr">
//                                     <div className="row">
//                                         <div className="col-2">
//                                             <Link to={{ pathname: '/SndScreen' }}>
//                                                 <img className='blackDivBtnss settingIcon' src={infoIcon} alt="infoIcon" />
//                                             </Link>
//                                         </div>

//                                         <div className="col-8">
//                                             <p className='blackConnectTxtSwap'>Swap to bFTP</p>
//                                         </div>
//                                         <div className="col-2">
//                                             <img className='blackDivBtnss settingIcon' src={settingIcon} alt="settingIcon" />
//                                         </div>

//                                     </div>
//                                     <hr className='hrSwap' />
//                                     <div className='DeskContentDivv'>
//                                         <h4 className='colorGreyy balancE'>Balance: {this.state.FormatedUserEthBalance}</h4>
//                                         <div className="whiteDivv">
//                                             <div className="row">
//                                                 <div className="col-7">
//                                                     <Link to={{ pathname: '/SelectToken' }}><button className='optionStakeBtnn'>
//                                                         <span style={{ color: '#F7F700' }}>
//                                                             <img src={binanceSmartChain} width="30px" alt="" />
//                                                         </span>
//                                                         {SelectSwapTokenContent}
//                                                         <span>
//                                                             <img className='dropDOwn' src={stakeOptDropDown} alt="stakeOptDropDown" />
//                                                         </span>
//                                                     </button>
//                                                     </Link>
//                                                     <span className='MaxTxtt colorGreen'>Max</span>
//                                                 </div>
//                                                 <div className="col-5 whiteStakeAmountt">
//                                                     <h5 className='colorGreen'>Swap<span style={{ color: 'white' }}>_</span>Amount</h5>
//                                                     <h5 style={{ color: 'green' }}><input
//                                                         type="email"
//                                                         onChange={(event) => {
//                                                             const etherAmount = this.input.value.toString()
//                                                             this.setState({
//                                                                 output: etherAmount * 200
//                                                             })
//                                                             console.log('Output', this.state.output);
//                                                         }}
//                                                         ref={(input) => { this.input = input }}
//                                                         className="form-conrol form-control-lg"
//                                                         placeholder="0"
//                                                         style={{ border: 'none', width: '98px', fontSize: '13px', textAlign: 'end' }}
//                                                         required /></h5>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-4">
//                                                 <img src={swapArrow} style={{ float: 'right' }} alt="greenArrow" />

//                                             </div>
//                                         </div>
//                                         <h4 className='colorGreyy twelveMntTxtt'>
//                                             Balance: {window.web3.utils.fromWei(this.state.tokenBalance, 'Ether')}
//                                         </h4>
//                                         <div className="darkBlueDivv">
//                                             <div className="row">
//                                                 <div className="col-6 extraFtpTxtt">
//                                                     <div className="row">
//                                                         <div className="col-4">
//                                                             <img className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='30px' style={{ marginTop: '8px' }} alt="logo" />
//                                                         </div>
//                                                         <div className="col-8">
//                                                             <h5 style={{ fontSize: '14px', marginTop: '7px', color: '#1DCCFF' }}>USD<span style={{ color: '#111224' }}>_</span>$200.00</h5>
//                                                             {/* <h5 style={{ fontSize: '12px' }}>6,000</h5> */}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-6 whiteStakeAmountt">
//                                                     <h5 style={{ color: '#00CCFF' }}>Swap to FTP</h5>
//                                                     <input
//                                                         type="hello"
//                                                         className="form-control swapSetAmount"
//                                                         value={this.state.output}
//                                                         placeholder="0"
//                                                         disabled
//                                                         style={{ backgroundColor: 'transparent', color: '#1dccff', outline: 'none' }}
//                                                         required />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <br />
//                                         <p style={{ textAlign: 'center' }}>
//                                             {SwapBtn}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className='bottomBtns' style={{ marginTop: '10px' }}>
//                                     <div className="row">
//                                         <div className="col-6">
//                                             <Link to={{ pathname: '/Assets' }} style={{ color: '#1FE2FA' }}>
//                                                 <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px' }}>Assets</h1>
//                                             </Link>
//                                         </div>
//                                         <div className="col-6">
//                                             <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA' }}>
//                                                 <h1 style={{ textAlign: 'center', color: '#1dccff', fontSize: '18px' }}>Activity</h1>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* {content} */}
//                             {/* <IstScreen></IstScreen> */}
//                             {/* <SndScreen></SndScreen> */}
//                             {/* <WhichWallet></WhichWallet> */}
//                             {/* <NetworkVideos></NetworkVideos> */}
//                             {/* <SelectNetwork></SelectNetwork> */}
//                             {/* <Assets></Assets> */}
//                             {/* <StakedTokens></StakedTokens> */}
//                             {/* <RecentTx></RecentTx> */}
//                             {/* <SwapPage></SwapPage> */}
//                             {/* <SelectToken></SelectToken> */}
//                             {/* <StakePage></StakePage> */}
//                             {/* <SelectPeriod></SelectPeriod> */}
//                             {/* <WhatIsStaking></WhatIsStaking> */}
//                             {/* <Web3Test></Web3Test> */}
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default App;

//               </div>

//     );
//   }
// }

// export default App;