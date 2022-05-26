// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import EthSwap from '../abis/EthSwap.json'
import Web3 from 'web3'

import toggleBtn from '../Images/toggleBtn.png';
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
import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';

import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';

// components
import Graph from '../components/Graph.jsx'
import FooterBottom from '../components/footerBottom.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// css
import '../App.css';

const networks = {
  Ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Smart Chain Mainnet",
    nativeCurrency: {
      name: "Ethereum Chain Native Token",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: [
      // "https://rpc.ankr.com/eth",
      // "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      "https://mainnet.infura.io/v3/f5846a03eaec47c28b102d6d01a2de16"
    ],
    blockExplorerUrls: ["https://etherscan.io"]
  },
  // Ethereum: {
  //   chainId: `0x${Number(4).toString(16)}`,
  //   chainName: "Rinkeby Testnet",
  //   nativeCurrency: {
  //     name: "Rinkeby Coin",
  //     symbol: "ETH",
  //     decimals: 18
  //   },
  //   rpcUrls: ["https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  //   blockExplorerUrls: ["https://rinkeby.etherscan.io"]
  // },
  // //  Binance Testnet
  // Binance: {
  //   chainId: `0x${Number(97).toString(16)}`,
  //   chainName: "Binance Smart Chain Testnet",
  //   nativeCurrency: {
  //     name: "BINANCE COIN",
  //     symbol: "BNB",
  //     decimals: 18
  //   },
  //   rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  //   blockExplorerUrls: ["https://testnet.bscscan.com/"]
  // },
  // BINACNE MAINNET
  Binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};

function App() {

  const navigate = useNavigate();

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]


      });
    } catch (err) {
      setError(err.message);
    }

    localStorage.setItem('userNetwork', networkName)
    navigate("/NetworkVideos")

  };
  const [networkId, setnetworkId] = useState('');
  const [userAccount, setuserAccount] = useState('');
  const [optionsOfNetwork, setoptionsOfNetwork] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {
    // window.ethereum.on("chainChanged", networkChanged)
    // window.ethereum.on('accountsChanged', accountChanged)
    // setuserAccount(localStorage.getItem('userAccount'))
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

    // load Blockchain Data
    const web3 = window.web3
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
      // setCurrentUserNetwork(null)

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
      setuserAccount(accounts[0])

      setnetworkId(window.ethereum.networkVersion)

    }
    const ethSwapData = EthSwap.networks[window.ethereum.networkVersion]
    if (ethSwapData) { }
    else {
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')

    }

  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     activePage: 'IstScreen',
  //     // account: '',
  //     // token: {},
  //     // ethSwap: {},
  //     // ethBalance: '0',
  //     // tokenBalance: '0',
  //     // loading: true
  //   }
  // }
  const handleChangeNetworkOptions = () => {
    if (optionsOfNetwork === true) {
      setoptionsOfNetwork(false)
    } else if (optionsOfNetwork === false) {
      setoptionsOfNetwork(true)
    }
  }

  let userNetworkContent
  if (networkId != '' && networkId != null) {
    console.log('userNetwork', networkId);
    if (networkId === 'Binance' || networkId === '56' || networkId === 56) {
      userNetworkContent =
        <span className='navBarNetworkBTn'>
          BSC
        </span>
    } else if (networkId === 'Ethereum' || networkId === '1' || networkId === 1) {
      userNetworkContent = <span className='navBarNetworkBTn'>
        ETH
      </span>
    } else {
      userNetworkContent = <span className='navBarDisNetworkBTn'>
        Networks
      </span>

    }
  } else {
    console.log('userNetwork', networkId);
    userNetworkContent = <span className='navBarDisNetworkBTn'>
      Networks
    </span>
  }

  let userNetworkContentForMob
  if (networkId != '' && networkId != null) {
    console.log('userNetwork', networkId);
    if (networkId === 'Binance' || networkId === '56' || networkId === 56) {
      userNetworkContentForMob = 'BSC'
    } else if (networkId === 'Ethereum' || networkId === '1' || networkId === 1) {
      userNetworkContentForMob = 'ETH'
    } else {
      userNetworkContentForMob = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>

    }
  } else {
    console.log('userNetwork', networkId);
    userNetworkContentForMob = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
  }

  const handleChangeNetworkBinance = async (networkName) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      setError();
      await changeNetwork({ networkName, setError })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      setError();
      await changeNetwork({ networkName, setError })
    }
    else {
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const handleChangeNetwork = async (e) => {
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

    const networkId = await web3.eth.net.getId()
    console.log('networkId', networkId);

    if (e === 'Ethereum') {
      if (networkId != '4' || networkId != '1' || networkId != 4 || networkId != 1) {
        alert('Please first change network from wallet not selected ' + e)
      } else {
        localStorage.setItem('userNetwork', e)
        navigate(-1)
      }
    } else if (e === 'Binance') {
      if (networkId != '97' || networkId != '56') {
        alert('Please first change network from wallet not selected ' + e)
      } else {
        localStorage.setItem('userNetwork', e)
        navigate(-1)
      }
    }
  }

  let assetsTxt
  let activityTxt
  if (userAccount === '' || userAccount === ' ' || userAccount === null || userAccount === undefined) {
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

  let networksOptions
  if (optionsOfNetwork === true) {
    networksOptions = <div className='networksOptions'>
      <span onClick={handleChangeNetworkOptions} className="networkCross">X</span>
      {/* <h3 onClick={() => handleChangeNetwork('Ethereum')}>Eth</h3> */}
      <h3 onClick={() => alert('Ethereum not supported yet (Comming Soon)')}>Eth</h3>
      <h3 onClick={() => handleChangeNetworkBinance("Binance")}>BSC</h3>
      <h3 onClick={() => alert('Polygon not supported yet (Comming Soon)')}>Matic</h3>
    </div>
  }

  let connectBtn
  let userAccountContent
  let userAccountContentForMob
  if (userAccount != '' && userAccount != null) {
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
    setTimeout(() => {
      localStorage.setItem('userAccount', userAccount)
    }, 1);
    // navigate('/NetworkVideos')
    userAccountContent = <div className='headerBtns sndHeaderBtn navHeaderBtnDiv headerBtnIst' style={{ paddingRight: '4px', color: 'white' }}>
      <img src={connectImg} className='sndHeaderBtnist navConnectBtn' alt="connectImg" />
      <span className='navBarConnectBTn'>{fullResult}</span>
      {/* Connect */}
    </div>
    userAccountContentForMob = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>{fullResult}</span>
      {/* Connect */}
    </div>

    connectBtn = <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '0px', marginBottom: '1px' }}>Connected</button>

  } else {
    userAccountContent = <div className='headerBtns sndHeaderBtn navHeaderBtnDiv headerBtnIst' style={{ paddingRight: '4px', color: 'white' }}>
      <img src={connectImg} className='sndHeaderBtnist navConnectBtn' alt="connectImg" />
      <span className='navBarDisConnectBTn'>Connect</span>
      {/* Connect */}
    </div>
    userAccountContentForMob = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>Connect</span>
      {/* Connect */}
    </div>
    connectBtn = <Link to={{ pathname: '/WhichWallet' }}>
      <button className='stakeBtnss' style={{ backgroundColor: '#2223DE', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '0px', marginBottom: '1px' }}>Connect Wallet</button>
    </Link>
  }


  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className='MainDivDesktop'>
        <div className='headerNav'>
          <div className='row'>
            <div className='col-4'>
              <a href="http://fairtrader.io/">
                <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
              </a>
            </div>
            <div className="col-8 headerLinks">
              <span style={{ display: "inline", float: "right" }}>
                <a href="http://fairtrader.io/">
                  <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
                  {/* <img className='toggleBtn' src={toggleBtn} alt="toggleBtn"onClick={() => {}} /> */}
                  {/* <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" onClick={deactivate} /> */}
                </a>
              </span>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/WhichWallet' }}>
                  {userAccountContent}
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <div className='headerBtns sndHeaderBtn networkBtn navHeaderBtnDiv headerBtnIst' onClick={handleChangeNetworkOptions}>
                  <img src={networkImg} className='sndHeaderBtnist navConnectSNDBtn' alt="connectImg" />
                  {/* <span style={{ color: '#1DCBFE', marginLeft: '12px', fontSize: '16px', marginRight: '22px', position: 'relative', top: '2px', fontWeight: 'bold' }} className='networksTxt'>
                    {userNetworkContent}</span> */}
                  {userNetworkContent}
                  <img src={networkDropdown1} className='sndHeaderBtnsnd navHeaderBtnDiv' alt="networkDropdown" />
                </div>
                {networksOptions}

              </div>
            </div>
          </div>
        </div>
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
                    <a target="_blank" href="https://buy.ftp.indacoin.io/" style={{ fontWeight: 'bold', color: 'black' }}>
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
              {/* for black Background */}
              {/* <div className="bottomHeaderr `bottomHeaderIstScreen`"> */}
              {/* for light Background */}
              <div className="bottomHeaderr functionalityDiv">
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={darkInfo1} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxt blackConnectTxtIstScreen' style={{ position: 'relative', top: '-2px' }}>Select<span style={{ color: '#91d8f7' }}>.</span>Network</p></div>
                  <div className="col-2">
                    <img className='blackDivBtns bigScreenIssue ' style={{ marginLeft: '20px', paddingTop: '1px' }} src={darkSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} style={{ cursor: 'pointer', width: '32px', marginTop: '13px' }} src={darkRefresh1} alt="settingIcon" />
                  </div>

                </div>

                <hr className='hr' />
                <div className='DeskContentDiv'>
                  <br />
                  <div className="greyDiv greyDivIstscreen">
                    <h4>Please select your network from the top of the screen.</h4>
                  </div>

                  <div className="greyDiv greyDivIstscreen" style={{ marginTop: '10px' }}>
                    <h4 style={{ color: '#22E9FE' }}>Note: your FTP token will appear as bFTP on Binance Smart Chain</h4>
                  </div>
                  <br />
                  <p className='blackBottomBtn'>
                    {connectBtn}
                  </p>

                </div><br /><br /><br />
                {/* <hr className='hr istScreenHR' style={{marginTop: '10px'}} />
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
              <div className='bottomBtns functionalityDiv' style={{ marginTop: '-53px', marginBottom: '8px' }}>
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
              <br /><br /><br /><br />
              <br /><br /><br />
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
                  {userAccountContentForMob}
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <div className='headerBtns sndHeaderBtn' onClick={handleChangeNetworkOptions}>
                  {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                  <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                    {userNetworkContentForMob}
                  </span>
                  <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                </div>
                {networksOptions}
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
                <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Select Network</p>
              </div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
              </div>
              <div className="col-2">
                <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
              </div>
            </div>
            <hr className='hrSwap' />
            <div className="greyDiv" style={{ backgroundColor: 'black' }}>
              <h4>Please select your network from the top of the screen.</h4>
            </div>
            <div className="greyDiv" style={{ marginTop: '15px', backgroundColor: 'black' }}>
              <h4 style={{ color: '#1DCCFF' }}>Note: your FTP token will appear as bFTP on Binance Smart Chain</h4>
            </div>
            <br />
            <br />
            <p className='blackBottomBtn istScreenBtn'>
              {connectBtn}
            </p>
            <br />
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
    </div >
  );
}
// }

export default App;
