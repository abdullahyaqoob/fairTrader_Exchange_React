// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import EthSwap from '../abis/EthSwap.json'

import Web3 from 'web3'

import infoIcon from '../Images/infoIcon.png';
import settingIcon from '../Images/settingIcon.png';
import lockedIcon from '../Images/lockedIconLight.png';
import ftpToken from '../Images/ftpToken.png';
import etherToken from '../Images/etherToken.png';
import bnbToken from '../Images/bnbToken.png';
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
import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';
import darkRefresh1 from '../Images/lightRefresh1.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import greenArrow from '../Images/greenArrow.png';
import coinImg from '../Images/coinImg.png';

// css
import './css/SndScreen.css'
// components
import Graph from '../components/Graph2.jsx'
import HeaderNav from '../components/HeaderNav.jsx';
import FooterBottom from '../components/footerBottom.jsx';
function App() {

  const navigate = useNavigate();

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Binance');
  const [userAccount, setuserAccount] = useState('');
  const [assetsTokens, setassetsTokens] = useState([]);
  const [nativeTokenBalance, setnativeTokenBalance] = useState('0');
  const [stakedBalance, setstakedBalance] = useState('0');
  const [FairtraderBlnc, setFairtraderBlnc] = useState('0');
  const [USDTPriceOfBNB, setUSDTPriceOfBNB] = useState('0');
  const [USDTPriceOfBFTP, setUSDTPriceOfBFTP] = useState('');

  useEffect(() => {
    useEffectFunc()
    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)

    setstakedBalance(
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }, [])

  const networkChanged = (chainId) => {
    console.log('chain_changed', chainId);
    window.location.reload()
  };
  const accountChanged = (account) => {
    console.log('account_changed', account);
    window.location.reload()
  }

  async function useEffectFunc() {
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
    console.log('First accounts', accounts[0]);
    setuserAccount(accounts[0])


    const networkId = await web3.eth.net.getId()
    console.log('Accoutn Network ID :', networkId);
    setCurrentUserNetwork(networkId)

    // const tokenFarmData = EthSwap.networks[networkId]
    // if (tokenFarmData) {
    //   const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
    //   let stakingBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call()
    //   console.log('stakingBalancestakingBalance', stakingBalance.toString());
    //   let hello123 = stakingBalance.toString()
    //   let hello12345 = window.web3.utils.fromWei(hello123, 'Ether')


    let requestNetwork;
    if (networkId === 1 || networkId === '1') {
      requestNetwork = 'ethereum'
    } else {
      requestNetwork = 'binance'
    }
    // staked TOkens +   all staked tokens bftp
    axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet/stake/${requestNetwork}`, {
      "wallet": accounts[0],
      // Nathan Addres
      // "wallet": '0x5d752f135fcc38c370872ea11d9ec6a197791648'
      // User Address tucla
      // "wallet": '0x5d752f135fcc38c370872ea11d9ec6a197791648'
    })
      .then(res => {
        console.log('user All Stake History : ', res);
      })

    // staked TOkens +   all staked tokens bftp
    axios.post(`${process.env.REACT_APP_BASE_URL}/Wallet/stake/${requestNetwork}`, {
      "wallet": accounts[0],
    })
      .then(res => {
        // console.log('response : ', res.data.data);
        let apiBln = 0;
        res.data.data.map(function (tx) {
          // console.log(apiBln, 'tx.bftp', tx.bFTP);
          apiBln = apiBln + tx.bFTP
        })
        // console.log('apiBln', apiBln);
        setstakedBalance(apiBln.toFixed(4))
      }).catch(err => {
        // console.log(err);
      })


    // } else {
    //   window.alert('TokenFarm contract not deployed to detected network.')
    // }


    // Moralis api Key Config
    let moralisBaseUrl = 'https://deep-index.moralis.io/api/v2/'
    let moralisApiKey = 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
    // let ApiWalletAddress = '0xffce9e061d86999e191cc481715597456b85b2d8'
    let ApiWalletAddress = accounts[0]
    // console.log('userAccount', accounts[0]);
    let chainRequest;
    let tokenAddress;
    if (networkId === 4 || networkId === 1) {
      chainRequest = 'eth'
      tokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    } else if (networkId === 97 || networkId === 56) {
      chainRequest = 'bsc'
      tokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    } else {
      // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
      window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
    }


    // BNB price in crypto
    axios.get(`${moralisBaseUrl}${ApiWalletAddress}/balance?chain=${chainRequest}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        // console.log(res);
        const nativeTokenBalance1 = res.data.balance
        const nativeTokenBalance2 = window.web3.utils.fromWei(nativeTokenBalance1, 'Ether')
        setnativeTokenBalance(nativeTokenBalance2.substring(0, 8))
      }).catch((err) => {
        console.log(err);
      })


    // BNB price in USDT
    axios.get(`https://deep-index.moralis.io/api/v2/erc20/${tokenAddress}/price?chain=${chainRequest}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        // console.log('BNB price in usdt', res.data.usdPrice);
        setUSDTPriceOfBNB(res.data.usdPrice)
      }).catch((err) => {
        console.log(err);
      })


    // BFTP price in USDT
    axios.get('https://abdullahyaqoob.com/',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
      .then(res => {
        // console.log('BFTP price in usdt', res.data.lastPrice);
        setUSDTPriceOfBFTP(res.data.lastPrice)
        // setUSDTPriceOfBFTP(process.env.REACT_APP_FTP_MANUALLY_PRICE)

      }).catch((err) => {
        console.log('BFTP price in usd ERROR', err);
      })

    // all extra tokens
    axios.get(`${moralisBaseUrl}${ApiWalletAddress}/erc20?chain=${chainRequest}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        // console.log(res);

        res.data.map(function (rs) {
          // console.log(rs);
          if (rs.token_address === '0x18c85fa24491ddc01e216ddb806ac17c212356bb' || rs.token_address === '0x18c85fa24491ddc01e216ddb806ac17c212356bb') {
            // if (rs.token_address === '0x6b71cdc52b6b5e007e9e018d65b233abed8589c7' || rs.token_address === 0x6B71cDc52B6B5e007E9e018D65B233AbeD8589C7) {
            setassetsTokens(rs)
            let firstStep = rs.balance;
            let sndStep = window.web3.utils.fromWei(firstStep, 'Ether');
            setFairtraderBlnc(Number(sndStep).toFixed(2))
          }
        })
      }).catch((err) => {
        console.log(err);
      })


  }
  let stakedBalanceShow = stakedBalance

  let bnbInUsd = (Number(nativeTokenBalance).toFixed(4)) * Number(USDTPriceOfBNB).toFixed(4)
  let bftpInUsd;

  bftpInUsd = (Number(FairtraderBlnc).toFixed(4)) * USDTPriceOfBFTP;

  setInterval(() => {
    bftpInUsd = (Number(FairtraderBlnc).toFixed(4)) * USDTPriceOfBFTP;
  }, 3000);

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    // console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 97 || CurrentUserNetwork === 56) {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    // console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
  }

  let userAccountContent
  if (userAccount != '' && userAccount != null) {
    // console.log('111111111111111111111111', userAccount);
    let accountFirstLetters = userAccount.substring(0, 3);
    // console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    // console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    // console.log('fullResult', fullResult);
    setTimeout(() => {
      localStorage.setItem('userAccount', userAccount)
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

  let nativeTokenImg
  let nativeTokenSym
  if (CurrentUserNetwork === 97 || CurrentUserNetwork === 56) {
    nativeTokenImg = <img src={bnbToken} alt="bnbToken" style={{ width: '44px', position: 'absolute', left: '10px', top: '-8px' }} />
    nativeTokenSym = 'BNB'

  } else if (CurrentUserNetwork === 4 || CurrentUserNetwork === 1) {
    nativeTokenImg = <img src={etherToken} alt="etherToken" style={{ width: '44px', position: 'absolute', left: '10px', top: '-8px' }} />
    nativeTokenSym = 'ETH'
  }
  console.log('111111111111111111111111111', stakedBalance);

  let letStakedTokensLink
  if (stakedBalance.key === null || stakedBalance === '0.0000' || stakedBalance === '') {
    letStakedTokensLink = <div className="row" style={{ cursor: 'pointer' }}>
      <div className="col-2">
        <img className='marginTop' style={{ marginTop: '0px', width: '40px' }} src={lockedIcon} alt="lockedIcon" />
      </div>
      <div className="col-10" style={{ textAlign: 'start' }}>
        <h5 className="myAssetsHeading" style={{ marginTop: '5px', color: '#004EEC', fontWeight: 'bold', fontSize: '20px' }}>0 FTP</h5>
      </div>
    </div>
  } else {
    letStakedTokensLink = <Link to={{ pathname: '/StakedTokens' }}>
      <div className="row">
        <div className="col-2">
          <img className='marginTop' style={{ marginTop: '0px', width: '40px' }} src={lockedIcon} alt="lockedIcon" />
        </div>
        <div className="col-10" style={{ textAlign: 'start' }}>
          <h5 className="myAssetsHeading" style={{ marginTop: '5px', color: '#004EEC', fontWeight: 'bold', fontSize: '20px' }}>{stakedBalanceShow} FTP</h5>
        </div>
      </div>
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
                    <a className='colorBlack' target="_blank" href="https://buy.ftp.indacoin.io/">
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
                  <a target="_blank" href="https://latoken.com/exchange/FTP_USDT ">
                    <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
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
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>My Assets</p>
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
                {/* <div style={{ height: '380px', overflowY: 'scroll' }}> */}
                <div style={{ height: '380px' }}>
                  <div className="greyDiv2" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                    <span style={{ fontWeight: 'bold' }}>{letStakedTokensLink}</span>
                  </div>

                  <div className="greyDiv2DeskAssets" style={{ paddingTop: '10px', paddingBottom: '5px', backgroundColor: 'black' }}>
                    <div className="row">
                      <div className="col-2">
                        {nativeTokenImg}
                      </div>
                      <div className="col-7" style={{ textAlign: 'start' }}>
                        <h5 className="pdfheading" style={{ marginTop: '3px', fontWeight: 'bold' }}>{Number(nativeTokenBalance).toFixed(4)} <span> {nativeTokenSym}</span></h5>
                      </div>
                      <div className="col-3">
                        <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'end' }}>
                          <span style={{ marginRight: '5px', position: 'relative', left: '-18px' }}>$</span>
                          <span style={{ position: 'relative', left: '-17px' }}>{bnbInUsd.toFixed(1)}</span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* {assetsTokens.map(function (token, i) {
                    return ( */}
                  <div className="greyDiv2DeskAssets" style={{ paddingTop: '10px', paddingBottom: '5px', overflow: 'hidden', backgroundColor: 'black' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={ftpToken} alt="ftpToken" style={{ width: '44px', position: 'absolute', left: '10px', top: '-13px' }} />
                        {/* <img className='marginTop' src={ftpToken} alt="" /> */}
                        {/* <h5 style={{ paddingTop: '5px' }}>{i + 2}</h5> */}
                      </div>
                      <div className="col-7" style={{ textAlign: 'start' }}>
                        {/* <h5 className="pdfheading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span>{Number(FairtraderBlnc).toFixed(0)} {assetsTokens.symbol}</span></h5> */}
                        <h5 className="pdfheading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span>{Number(FairtraderBlnc).toFixed(0)} FTP</span></h5>
                      </div>
                      <div className="col-3">
                        <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'end' }}>
                          <span style={{ marginRight: '5px', position: 'relative', left: '-18px' }}>$</span>
                          <span style={{ position: 'relative', left: '-17px' }}>{bftpInUsd.toFixed(1)} </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                  {/* )
                  })} */}

                  {/* <div className="greyDiv2" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop' src={bnbToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading" style={{ marginTop: '3px' }}>1 BNB</h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}> $650.00</h5>
                    </div>
                  </div>

                </div>
                <div className="greyDiv2" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop' src={ftpToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading" style={{ marginTop: '3px' }}>180,000 bFTP</h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}> $1,270.88</h5>
                    </div>
                  </div>

                </div> */}
                </div>
                <hr className='hr' style={{ marginTop: '-27px' }} />
                <div className="row" style={{ marginTop: '15px' }}>
                  <div className="col-6">
                    <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Assets</h1>
                  </div>

                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }}>
                      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Activity</h1>
                    </Link>

                  </div>
                </div>
              </div>
              {/* 
              <div className='bottomBtns'>
                <div className="row">
                  <div className="col-6" style={{ color: 'white', fontSize: '22px' }}>Assets</div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                      Activity
                    </Link>
                  </div>
                </div>
              </div> */}
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
                <img src={laExchange} style={{marginLeft: '-80px', marginTop: '-30px'}} alt="laExchange" />
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
                {/* <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}> */}
                {/* <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                {/* {accountNumb} */}
                <Link to={{ pathname: '/WhichWallet' }}>
                  {userAccountContent}
                </Link>
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
          <div style={{ width: '110%' }} className='graphDiv'>
            <Graph />
          </div>
        </div>
        <div className="blueDiv">
          {/* <div className="MainLinks" style={{ marginTop: '7px', marginBottom: '7px' }}>
            <div className='row'>
              <div className='mainLinksPics col-3'>
                <a target='_blank' href="https://global.transak.com?apiKey=9432f9ba-8128-4786-9da0-e5ce8c08db33">
                  <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
                </a>

              </div>
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
          </div> */}
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
                  <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>My Assets</p>
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                </div>
              </div>
              <hr className='hrSwap' />
              {/* <div style={{ height: '212px', overflowY: 'scroll' }}> */}
              <div style={{ height: '212px' }}>
                <div className="greyDiv2 assetsLockedFTP" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                  {letStakedTokensLink}
                </div>

                <div className="greyDiv2" style={{ paddingTop: '14px', paddingBottom: '2px' }}>

                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop mobTokensImges' src={ftpToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} >
                      {/* <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span>{Number(FairtraderBlnc).toFixed(2)} {assetsTokens.symbol}</span></h5> */}
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(FairtraderBlnc).toFixed(2)} FTP</span></h5>
                    </div>
                    <div className="col-3">
                      {/* <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}>{window.web3.utils.fromWei(token.balance, 'Ether')} </h5> */}
                      <h5 className='pdfheading assetsValueHeading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-15px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{bftpInUsd.toFixed(1)} </span>
                      </h5>
                    </div>
                  </div>

                </div>

                {/* {assetsTokens.map(function (token, i) {
                  return ( */}
                <div className="greyDiv2" style={{ paddingTop: '13px', paddingBottom: '11px', overflow: 'hidden' }}>
                  <div className="row">
                    <div className="col-2 mobTokensImgeNative">
                      {nativeTokenImg}
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(nativeTokenBalance).toFixed(4)} {nativeTokenSym}</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-13px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{bnbInUsd.toFixed(1)}</span>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* )
                })} */}

                {/* <div className="greyDiv2" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop' src={bnbToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading" style={{ marginTop: '3px' }}>1 BNB</h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}> $650.00</h5>
                    </div>
                  </div>

                </div>
                <div className="greyDiv2" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop' src={ftpToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading" style={{ marginTop: '3px' }}>180,000 bFTP</h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}> $1,270.88</h5>
                    </div>
                  </div>

                </div> */}
                <br />
              </div>
              <div className='assetsBottomHeandler'>
                .
              </div>
            </div>

            <div className='bottomBtns'>
              <div className="row" style={{ marginTop: '-3px' }}>
                <div className="col-6" style={{ color: 'white' }}>
                  Assets
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

export default App;
