import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useNavigate } from "react-router-dom";

import binanceSmartChain from '../Images/binanceSmartChain.png';
import whichWalletCross from '../Images/whichWalletCrooss.png';
import etherGreen from '../Images/etherGreen.png';
import polygonIcon from '../Images/polygonIcon.png';
// import walletConnect from '../Images/walletConnect.png';
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
import darkRefresh1 from '../Images/lightRefresh.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/footerLogo.png';
import footerBubbles from '../Images/footerBubbles.png';


// css
import './css/selectNetwork.css'

// components
import Graph from '../components/Graph.jsx'
import FooterBottom from '../components/footerBottom.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const networks = {
  // Ethereum: {
  //   chainId: `0x${Number(1).toString(16)}`,
  //   chainName: "Ethereum Mainnet",
  //   nativeCurrency: {
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     decimals: 18
  //   },
  //   rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  //   blockExplorerUrls: ["https://etherscan.io"]
  // },
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
    navigate(-1)

  };

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('IstScreen');
  const [userAccount, setuserAccount] = useState('');
  const [userAccountt, setuserAccountt] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    // setuserAccountt(localStorage.getItem('userAccount'))
    setCurrentUserNetwork(localStorage.getItem('userNetwork'))
    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)

    asyncFunc()

  }, [])

  const asyncFunc = async () => {

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


    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    // console.log('First accounts', accounts[0]);
    setuserAccount(accounts[0])
  }

  const networkChanged = (chainId) => {
    console.log('chain_changed', chainId);
    window.location.reload()
  };
  const accountChanged = (account) => {
    console.log('account_changed', account);
    window.location.reload()
  }

  const handleChangeNetworkBinance = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError })
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
      if (networkId != '4' || networkId != '1') {
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


    // change network web3
    // if (window.ethereum) {
    //   try {
    //     await window.ethereum.enable();
    //     window.ethereum._handleChainChanged({
    //       chainId: 0x1,
    //       networkVersion: 1,
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 'Binance') {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
  }


  let assetsTxt
  let activityTxt
  console.log('111111', userAccount + '+');
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
    userAccountContent = <span style={{ color: '#E5E600' }}>{fullResult}</span>

    connectBtn = <button>Connected</button>
  } else {
    userAccountContent = <Link to={{ pathname: '/WhichWallet' }}>
      <span style={{ color: '#E5E600' }}>Connect</span>
    </Link>

    connectBtn = <Link to={{ pathname: '/WhichWallet' }}>
      <button style={{ color: '#E5E600' }}>Connect Wallet</button>
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
                </a>
              </span>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/WhichWallet' }}>
                  <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
                    <img src={connectImg} alt="connectImg" />
                    <span style={{ color: 'white' }}>
                      {userAccountContent}
                    </span>
                  </div>
                </Link>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <div className='headerBtns sndHeaderBtn networkBtn'>
                  {/* <img src={networkImg} alt="connectImg" /> */}
                  <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                    {userNetworkContent}
                  </span>
                  <img src={networkDropdown1} className='sndHeaderBtnsnd' alt="networkDropdown" />
                </div>
                <div className='networksOptions'>
                  <h3>Eth</h3>
                  <h3>BSC</h3>
                  <h3>Matic</h3>
                </div>
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
              <div style={{ width: '110%' }}>
                <Graph />
              </div>

            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-3">
                  <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    {/* <Link to={{ pathname: '/NetworkVideos' }}> */}
                    <a target="_blank" href="https://buy.ftp.indacoin.io/">
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
              <div className="blueBlackMainDiv3" style={{ backgroundColor: '#91D8F7' }}>
                {/* <div className="blueBlackMainDiv3"> */}
                <div className="row">
                  <div className="col-10"><p className='blackConnectTxt3' style={{ color: 'black' }}>Select Network</p></div>
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img src={darkInfo1} alt="infoIcon" />
                    </Link>
                  </div>
                  {/* <img onClick={() => navigate(-1)} src={whichWalletCross} alt="whichWalletCross" /></div> */}
                </div>
                <div style={{ backgroundColor: '#91D8F7', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                  <hr className='hr' />

                  <div className="networksDivDesktop" style={{ backgroundColor: 'black' }}>
                    <div className="row" onClick={() => handleChangeNetwork('Ethereum')}>
                      <div className="col-2"><img src={etherGreen} alt="etherGreen" /></div>
                      <div className="col-10">Ethereum mainnet</div>
                    </div>
                    <hr className='selectNetworkHR' />
                    <div className="row" onClick={() => handleChangeNetworkBinance("Binance")}>
                      <div className="col-2"><img src={binanceSmartChain} alt="etherGreen" className='marginLeft1' width="35px" /></div>
                      <div className="col-10">Binance Smart Chain</div>
                    </div>
                    <hr className='selectNetworkHR' />
                    <div className="row" onClick={() => alert('Polygon not supported yet (Comming Soon)')}>
                      <div className="col-2"><img src={polygonIcon} className='marginLeft1' width="35px" alt="etherGreen" /></div>
                      <div className="col-10">Polygon Matic</div>
                    </div>
                  </div>
                  <br />
                </div>
                <br />
                <br />
                <hr className='hr' />

                <div className='bottomBtns' style={{ marginTop: '30px', marginBottom: '20px' }}>
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
            </div>
          </div>
          <br /><br /><br /><br />
          <br /><br /><br /><br />
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
                  {/* Connect */}
                </div>
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <div className='headerBtns sndHeaderBtn'>
                  {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                  <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                    {userNetworkContent}
                  </span>
                  <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                  <div className='networksOptions' style={{ width: '80px' }}>
                    <h3>Eth</h3>
                    <h3>BSC</h3>
                    <h3>Matic</h3>
                  </div>
                </div>
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
          </div>
          <div>
            <div className="blueBlackMainDiv2" style={{ backgroundColor: '#91D8F7' }}>
              <div className="row">
                <div className="col-10"><p className='blackConnectTxt3' style={{ color: 'black' }}>Select Network</p></div>
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img src={darkInfo1} className='blackDivBtns blackDivBtnsIst' alt="infoIcon" />
                  </Link>
                  {/* <img onClick={() => navigate(-1)} src={whichWalletCross} alt="whichWalletCross" /></div> */}
                </div>
              </div>
              <div style={{ backgroundColor: 'black', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <hr className='hr' />

                <div className="networksDiv">
                  <div className="row" onClick={() => handleChangeNetwork('Ethereum')}>
                    <div className="col-2"><img src={etherGreen} alt="etherGreen" /></div>
                    <div className="col-10">Ethereum mainnet</div>
                  </div>
                  <hr className='selectNetworkHR' />
                  <div className="row" onClick={() => handleChangeNetworkBinance("Binance")}>
                    <div className="col-2"><img src={binanceSmartChain} alt="etherGreen" className='marginLeft1' width="35px" /></div>
                    <div className="col-10">Binance Smart Chain</div>
                  </div>
                  <hr className='selectNetworkHR' />
                  <div className="row" onClick={() => alert('Polygon not supported yet (Comming Soon)')}>
                    <div className="col-2"><img src={polygonIcon} className='marginLeft1' width="35px" alt="etherGreen" /></div>
                    <div className="col-10">Polygon Matic</div>
                  </div>
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
