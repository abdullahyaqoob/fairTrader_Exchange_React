// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import Web3 from 'web3'

import box1 from '../Images/box1.png';
import box2 from '../Images/box2.png';
import box3 from '../Images/box3.png';
import unlockedIcon from '../Images/unlockedIcon.png';
import toggleBtn from '../Images/toggleBtn.png';
import dropdownImg from '../Images/greenDropdown.png';
import graphImg from '../Images/graphArtificalView.png';
import graphDesktop from '../Images/graphDesktop.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/swapImg.png';
import stakeImg from '../Images/stakeImg.png';
import tradeImg from '../Images/tradeImg.png';
import exchange1stBox from '../Images/exchange1stBox.png';
import exchange2ndBox from '../Images/exchange2ndBox.png';
import exchange3rdBox from '../Images/exchange3rdBox.png';
import networkDropdown1 from '../Images/networkDropdown1.png';
import darkSetting1 from '../Images/lightSetting1.png';
import exchangeBoxArrow from '../Images/exchangeBoxArrow.png';
import darkRefresh1 from '../Images/lightRefresh1.png';
import laExchange from '../Images/laExchange.png';
import footerLogo from '../Images/bottomPageLogo.png';
import footerBubbles from '../Images/footerBubbles.png';
import fbIcon from '../Images/fbIcon.png';
import twitterIcon from '../Images/twitterIcon.png';
import instaIcon from '../Images/instaIcon.png';
import youtubeIcon from '../Images/youtubeIcon.png';
import discordIocn from '../Images/discordIcon.png';
import telegramIcon from '../Images/telegramIcon.png';

// components
import Graph from '../components/Graph2.jsx'

// css
import './css/stakedTokens.css'
class App extends Component {
  render() {
    return (
      // [content]
      <div style={{ backgroundColor: '#071144' }}>

        <div className='foooterDiv'>
          <div className="footerInerDiv">

            <h2 style={{ textAlign: 'center' }}><b>Welcome to FTP Exchange</b></h2>

            <p style={{ fontSize: '19px', width: '97%', margin: '0 auto' }}>You can now purchase the FTP token with a debit card or swap it for another token like BNB coin. You can also Stake the FTP token (lock it against an early sale) and earn up to 50% extra tokens per year.</p>
            <div className="row">
              {/* <div className="col-3">
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
              </div> */}
              {/* <div className="col-4">
                <img src={exchange1stBox} className='ExchangeBoxes' alt="exchange1stBox" />
              </div>
              <div className="col-4">
                <img src={exchange2ndBox} className='ExchangeBoxes' alt="exchange2ndBox" />
              </div>
              <div className="col-4">
                <img src={exchange3rdBox} className='ExchangeBoxes' alt="exchange3rdBox" />
              </div> */}
              <div className="col-4">
                <div className="exchnageBoxe">
                  <img className='exchangeBoxImg' src={box1} alt="box1" />
                  <div className="insideExchagneBox">
                    <h5 style={{ color: '#F58633' }}>Need Help?</h5>

                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://drive.google.com/file/d/1i6VLc8gowll5OKmy68WHnCqpVKq34v1e/view?usp=sharing">
                        <span>Buy FTP token with a debit card</span>
                      </a>
                    </div>
                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://drive.google.com/file/d/1V_LLE2uluOgNBIg-60zqpWu44lOKfykf/view?usp=sharing">
                        <span>How to use the FTP Exchange </span>
                      </a>
                    </div>
                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="mailto:support@fairtrader.io">
                        <span>Contact: support@fairtrader.io </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="exchnageBoxe">
                  <img className='exchangeBoxImg' src={box2} alt="box1" />
                  <div className="insideExchagneBox">
                    <h5 style={{ color: '#1699DA' }}>Stake Your FTP</h5>

                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://drive.google.com/file/d/1U4eM-3nE7Xp0tAPjv1cm3i11Kg340XEZ/view?usp=sharing">
                        <span>What is Staking?</span>
                      </a>
                    </div>
                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://drive.google.com/file/d/1t1vL3BEeaQIgVg725IjujTUx8JY26nEn/view?usp=sharing">
                        <span>Try a 2 minute Stake test</span>
                      </a>
                    </div>
                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://drive.google.com/file/d/1gKspOjTvvoVgbaanxc2ogQPlkIcl1I-m/view?usp=sharing">
                        <span>How to Stake FTP token</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="exchnageBoxe">
                  <img className='exchangeBoxImg' src={box3} alt="box1" />
                  <div className="insideExchagneBox">
                    <h5 style={{ color: 'black' }}>Sell & Trade FTP</h5>

                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://latoken.com/exchange/FTP_USDT ">
                        <span>Create account with LATOKEN</span>
                      </a>
                    </div>
                    <div className='singleBoxTxtLine'>
                      <img src={exchangeBoxArrow} alt="exchangeBoxArrow" />
                      <a target="_blank" href="https://latoken.zendesk.com/hc/en-us">
                        <span>Learn how to trade FTP</span>
                      </a>
                    </div>

                    <center>
                      <a target="_blank" href="https://latoken.com/exchange/FTP_USDT ">
                        <button className='exchangeBoxesBTN'>Sell & Trade FTP</button>
                      </a>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: '5px solid #1dccff', backgroundColor: '#1dccff', marginTop: '-1px' }} />
        <br /><br /><br />
        <br />
        <div className='footerBottom'>
          <img style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0' }} src={footerLogo} alt="footerLogo" />
          {/* <img src={footerBubbles} alt="footerLogo" /> */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 220px' }}>
            <p style={{ textAlign: 'center' }}>
              <span><a href="https://www.facebook.com/fairtraderFTP/?ref=pages_you_manage" target="_blank"><img src={fbIcon} alt="fbIcon" /></a></span>
              <span><a href="https://twitter.com/fairtraderftp" target="_blank"><img src={twitterIcon} alt="twitterIcon" /></a></span>
              <span><a href="https://www.instagram.com/fairtraderftp/" target="_blank"><img src={instaIcon} alt="instaIcon" /></a></span>
              <span><a href="https://www.youtube.com/channel/UCWFuSPAbwGbYkFJN0KI5I3A" target="_blank"><img src={youtubeIcon} alt="youtubeIcon" /></a></span>
              <span><a href="https://www.reddit.com/user/FairTraderFTP" target="_blank"><img src={discordIocn} alt="discordIocn" /></a></span>
              <span><a href="https://t.me/FairTraderFriends" target="_blank"><img src={telegramIcon} alt="telegramIcon" /></a></span>
            </p>
          </div>

          <div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="footer_terms row" style={{ color: '#1183B7', fontWeight: 'bold', marginTop: '4px' }}>
              <div className="col-6" style={{ fontSize: '19px', cursor: 'pointer' }}>
                <a href='https://fairtrader.io/' style={{ color: '#1296B9', textDecoration: 'none' }} target='_blank'>Home</a>
                <span style={{ color: 'black' }}>__</span>
                <a href='https://drive.google.com/file/d/1zsG3zXOeh-RNMryB1OvkqjTmN1rUL_mK/view?usp=sharing' style={{ color: '#1296B9', textDecoration: 'none' }} target='_blank'>Partnerships</a>
              </div>
              <div className="col-6" style={{ fontSize: '19px', cursor: 'pointer', textAlign: 'right' }}>
                <a href='https://drive.google.com/file/d/1Jkjy3mhKD0rOSNJnfhe6AlqqcHS0b5K3/view?usp=sharing' style={{ color: '#1296B9', textDecoration: 'none' }} target='_blank'>Privacy Policy</a>
                <span style={{ color: 'black' }}>__</span>
                <a href='https://drive.google.com/file/d/1svath0h6Gmwy63wtonu1CVJbp8lgjDmg/view?usp=sharing' style={{ color: '#1296B9', textDecoration: 'none' }} target='_blank'>Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <div className='hrOfBottom'>
          <div className='hr' id='footerBottomHR' style={{ marginTop: '18px', borderColor: '#1183B7' }}></div>
          <br />
          <p>Please note that the FTP Platform and applications as well as innovations set out in this website and whitepaper are in development stage and are not currently in deployment. Please check the Fair Trader road map for the latest updates on product development on www.fairtrader.io</p>
          <p>No person should use the information contained in this website or the white paper as financial advice. Fair Trader FTP disclaims all liability for any loss or damage whatsoever relating to FTP token price fluctuation.</p>
          <br />
          <h2 style={{ textAlign: 'center', color: '#1296B9', fontWeight: 'bold' }}>Copyright @ 2021 FairTrader.io All rights reserved</h2>
          <br /><br /><br /><br />
        </div>
      </div>
    );
  }
}

export default App;
