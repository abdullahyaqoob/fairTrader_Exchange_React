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
import lockedIcon from '../Images/lockedIcon.png';
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
import darkSetting1 from '../Images/darkSetting1.png';
import darkInfo1 from '../Images/darkInfo1.png';
import darkRefresh1 from '../Images/darkRefresh1.png';
import lightSetting from '../Images/lightSetting.png';
import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import greenArrow from '../Images/greenArrow.png';
import coinImg from '../Images/coinImg.png';

// css
import './css/SndScreen.css'
// components
import Graph from '../components/Graph2.jsx'
function App() {

  const navigate = useNavigate();

  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Binance');
  const [userAccount, setuserAccount] = useState('');
  const [assetsTokens, setassetsTokens] = useState([]);
  const [nativeTokenBalance, setnativeTokenBalance] = useState('');
  const [stakedBalance, setstakedBalance] = useState('');

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

    const tokenFarmData = EthSwap.networks[networkId]
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
      let stakingBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call()
      console.log('stakingBalancestakingBalance', stakingBalance.toString());
      let hello123 = stakingBalance.toString()
      let hello12345 = window.web3.utils.fromWei(hello123, 'Ether')
      setstakedBalance(hello12345)
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }


    // Moralis api Key Config
    let moralisBaseUrl = 'https://deep-index.moralis.io/api/v2/'
    let moralisApiKey = 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
    // let ApiWalletAddress = '0xffce9e061d86999e191cc481715597456b85b2d8'
    let ApiWalletAddress = accounts[0]
    console.log('userAccount', accounts[0]);
    let chainRequest
    if (networkId === 4) {
      chainRequest = 'eth'
    } else if (networkId === 97) {
      chainRequest = 'bsc'
    } else {
      alert('Error, Invalid Network')
    }


    axios.get(`${moralisBaseUrl}${ApiWalletAddress}/balance?chain=${chainRequest}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        console.log(res);
        const nativeTokenBalance1 = res.data.balance
        const nativeTokenBalance2 = window.web3.utils.fromWei(nativeTokenBalance1, 'Ether')
        setnativeTokenBalance(nativeTokenBalance2.substring(0, 8))
      }).catch((err) => {
        console.log(err);
      })

    axios.get(`${moralisBaseUrl}${ApiWalletAddress}/erc20?chain=${chainRequest}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': moralisApiKey
        }
      }
    )
      .then(res => {
        console.log(res);
        setassetsTokens(res.data)
      }).catch((err) => {
        console.log(err);
      })


  }
  let stakedBalanceShow = stakedBalance

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    console.log('userNetwork', CurrentUserNetwork);
    if (CurrentUserNetwork === 97) {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = 'Networks'
  }

  let userAccountContent
  if (userAccount != '' && userAccount != null) {
    console.log('111111111111111111111111', userAccount);
    let accountFirstLetters = userAccount.substring(0, 3);
    console.log('accountFirstLetters', accountFirstLetters);
    let accountlastLetters = userAccount.substring(40);
    console.log('accountlastLetters', accountlastLetters);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    console.log('fullResult', fullResult);
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
  if (CurrentUserNetwork === 97) {
    nativeTokenImg = <img className='marginTop' src={bnbToken} alt="" />
    nativeTokenSym = 'BNB'

  } else if (CurrentUserNetwork === 4) {
    nativeTokenImg = <img className='marginTop' src={etherToken} alt="" />
    nativeTokenSym = 'ETH'
  }

  let letStakedTokensLink
  if (stakedBalance === 0 || stakedBalance === '0' || stakedBalance === '') {
    letStakedTokensLink = <div className="row" style={{ cursor: 'pointer' }}>
      <div className="col-2">
        <img className='marginTop' src={lockedIcon} alt="" />
      </div>
      <div className="col-10" style={{ textAlign: 'start' }}>
        <h5 className="pdfheading" style={{ marginTop: '3px', color: 'white', fontSize: '18px' }}>{stakedBalanceShow} FTP</h5>
      </div>
    </div>
  } else {
    letStakedTokensLink = <Link to={{ pathname: '/StakedTokens' }}>
      <div className="row">
        <div className="col-2">
          <img className='marginTop' src={lockedIcon} alt="" />
        </div>
        <div className="col-10" style={{ textAlign: 'start' }}>
          <h5 className="pdfheading" style={{ marginTop: '3px', color: 'white', fontSize: '18px' }}>{stakedBalanceShow} FTP</h5>
        </div>
      </div>
    </Link>
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
                    <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
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
              <div className="bottomHeaderr bottomHeaderIstScreen">
                <div className="row">
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={darkInfo1} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxt blackConnectTxtIstScreen'>My Assets</p></div>
                  <div className="col-2">
                    <img className='blackDivBtns ' style={{ marginLeft: '20px' }} src={darkSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} style={{ cursor: 'pointer' }} src={darkRefresh1} alt="settingIcon" />
                  </div>

                </div>
                <hr className='hr' />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                  <div className="greyDiv2" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                    {letStakedTokensLink}
                  </div>

                  <div className="greyDiv2DeskAssets" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                    <div className="row">
                      <div className="col-2">
                        {nativeTokenImg}
                      </div>
                      <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                        <h5 className="pdfheading" style={{ marginTop: '3px' }}><span>{nativeTokenSym}</span></h5>
                      </div>
                      <div className="col-3">
                        <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}>{nativeTokenBalance} </h5>
                      </div>
                    </div>

                  </div>

                  {assetsTokens.map(function (token, i) {
                    return (
                      <div className="greyDiv2DeskAssets" key={i} style={{ paddingTop: '10px', paddingBottom: '5px', overflow: 'hidden' }}>
                        <div className="row">
                          <div className="col-2">
                            {/* <img className='marginTop' src={ftpToken} alt="" /> */}
                            <h5 style={{ paddingTop: '5px' }}>{i + 2}</h5>
                          </div>
                          <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                            <h5 className="pdfheading" style={{ marginTop: '3px' }}><span>{token.name}</span></h5>
                          </div>
                          <div className="col-3">
                            <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}>{window.web3.utils.fromWei(token.balance, 'Ether')} </h5>
                          </div>
                        </div>
                      </div>
                    )
                  })}

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
              </div>

              <div className='bottomBtns'>
                <div className="row">
                  <div className="col-6" style={{ color: 'white', fontSize: '22px' }}>Assets</div>
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
          <Graph />
        </div>
        <div className="blueDiv">
          <div className="MainLinks" style={{ marginTop: '7px', marginBottom: '7px' }}>
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
            <div className="blueBlackMainDiv2">
              <div className="row">
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img className='blackDivBtns blackDivBtnsIst' src={darkInfo1} alt="infoIcon" />
                  </Link>
                </div>
                <div className="col-6">
                  <p className='blackConnectTxt blackConnectTxtIstScreen'>My<span style={{ color: 'black', fontSize: '12px' }}>_</span>Assets</p></div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg' style={{ marginLeft: '17px' }} src={darkSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon' onClick={() => { window.location.reload() }} style={{ cursor: 'pointer' }} src={darkRefresh1} alt="settingIcon" />
                </div>
              </div>
              <hr className='hr' />
              <div style={{ height: '212px', overflowY: 'scroll' }}>
                <div className="greyDiv2" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                  {letStakedTokensLink}
                </div>

                <div className="greyDiv2" style={{ paddingTop: '10px', paddingBottom: '5px' }}>
                  <div className="row">
                    <div className="col-2">
                      {nativeTokenImg}
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading" style={{ marginTop: '3px' }}><span>{nativeTokenSym}</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}>{nativeTokenBalance} </h5>
                    </div>
                  </div>

                </div>

                {assetsTokens.map(function (token, i) {
                  return (
                    <div className="greyDiv2" key={i} style={{ paddingTop: '10px', paddingBottom: '5px', overflow: 'hidden' }}>
                      <div className="row">
                        <div className="col-2">
                          {/* <img className='marginTop' src={ftpToken} alt="" /> */}
                          <h5 style={{ paddingTop: '5px' }}>{i + 2}</h5>
                        </div>
                        <div className="col-7" style={{ textAlign: 'start' }} style={{ textAlign: 'start' }}>
                          <h5 className="pdfheading" style={{ marginTop: '3px' }}><span>{token.name}</span></h5>
                        </div>
                        <div className="col-3">
                          <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'normal', textAlign: 'end' }}>{window.web3.utils.fromWei(token.balance, 'Ether')} </h5>
                        </div>
                      </div>
                    </div>
                  )
                })}

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
            </div>

            <div className='bottomBtns'>
              <div className="row">
                <div className="col-6" style={{ color: 'white' }}>Assets</div>
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

export default App;
