// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import Web3 from 'web3'

import toggleBtn from '../Images/toggleBtn.png';
import dropdownImg from '../Images/greenDropdown.png';
import graphImg from '../Images/graphArtificalView.png';
import graphDesktop from '../Images/graphDesktop.png';
import buyImg from '../Images/buyImg.png';
import swapImg from '../Images/selectedSwap.png';
import stakeImg from '../Images/stakeImg.png';
import tradeImg from '../Images/tradeImg.png';
import networkImg from '../Images/networkImg.png';
import connectImg from '../Images/connectImg.png';
import networkDropdown from '../Images/networkDropdown.png';
import networkDropdown1 from '../Images/networkDropdown1.png';




import lightSetting1 from '../Images/lightSetting1.png';
import lightInfo from '../Images/lightInfo.png';
import lightRefresh from '../Images/lightRefresh.png';




import StakeIcon from '../Images/StakeIcon.png';
import stakeOptDropDown from '../Images/stakeOptDropDown.png';
import darkSetting1 from '../Images/darkSetting1.png';
import darkInfo1 from '../Images/darkInfo1.png';
import darkRefresh1 from '../Images/darkRefresh1.png';
import greenArrow from '../Images/greenArrow.png';
import coinImg from '../Images/coinImg.png';
import infoIcon from '../Images/darkInfo.png';
import settingIcon from '../Images/darkSetting.png';
import blackSwapArrow from '../Images/blackSwapArrow.png';
import binanceSmartChain from '../Images/binanceSmartChain.png';
import laExchange from '../Images/laExchange.png';
import etherToken from '../Images/etherToken.png';
import transactionTich from '../Images/transactionTich.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// components
import Graph from '../components/Graph2.jsx'
import FooterBottom from '../components/footerBottom.jsx';

import './css/graph.css'

// css
import './css/swapPage.css'
import axios from 'axios';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            output: '0',
            outputT: '0',
            outputInUSD: '0',
            CurrentUserNetwork: '',
            userAccount: '',
            UserEthBalance: '',
            FormatedUserEthBalance: '0',
            SelectSwapToken: '',
            token: '',
            ethSwap: '',
            tokenBalance: '0',
            loading: false,
            tokenFarm: '',
            contractGetAmount: '',
            transactionHash: '',
            receiptDiv1: false,
            receiptDiv2: false,
            currentNetworkId: '',
            livePriceBftp: '',
            livePriceBftpBNB: '',
            lPriceinCryptoBNB: '',
            lPriceinCryptoBftp: '',
            etherAmount: '',
            livePriceOfBNBInUSD: '',
            livePriceOfBFTPInUSD: '',
        }
    }
    async componentWillMount() {

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
            // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }


        if (metamaskStatus === false) {
            // toast.error("Please first connect your wallet", {
            //     position: 'top-right'
            // })



        } else if (metamaskStatus === true) {
            window.ethereum.on("chainChanged", function (chainId) {
                console.log('accountsChanges', chainId);
                window.location.reload()
            })
            window.ethereum.on('accountsChanged', function (account) {
                console.log('accountsChanges', account);
                window.location.reload()
            })

            this.setState({
                tokenBalance: <span>Loading ...</span>
            })
            this.setState({
                FormatedUserEthBalance: <span>Loading ...</span>
            })

            // this.setState({
            //     FormatedUserEthBalance: <div class="spinner-border" role="status">
            //         <span class="sr-only">Loading...</span>
            //     </div>
            // })


            // load WEB3
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable();
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
            console.log('First accounts', accounts[0]);
            this.setState({ userAccount: accounts[0] })

            console.log('First Account Eth Balance : ', this.state.UserEthBalance);

            const networkChanged = (chainId) => {
                console.log('chain_changed', chainId);
                window.location.reload()
            };
            const accountChanged = (account) => {
                console.log('account_changed', account);
                window.location.reload()
            }

            // Load Token
            const networkId = await web3.eth.net.getId()
            console.log('Accoutn Network ID :', networkId);
            // window.ethereum.on("chainChanged", networkChanged)
            this.setState({ currentNetworkId: networkId })

            window.ethereum.on('accountsChanged', accountChanged)
            // setInterval(async () => {
            //     const networkId2 = await web3.eth.net.getId()
            //     if (networkId === networkId2) {
            //         // console.log('matched');
            //         this.setState({currentNetworkId: networkId2})
            //     } else {
            //         window.location.reload();
            //     }
            // }, 2000);
            if (networkId === 4 || networkId === 1) {
                localStorage.setItem('userNetwork', 'Ethereum')
            } else if (networkId === 97 || networkId === 56) {
                localStorage.setItem('userNetwork', 'Binance')
            }
            this.setState({ CurrentUserNetwork: localStorage.getItem('userNetwork') })

            setTimeout(() => {
                if (this.state.CurrentUserNetwork === 'Binance') {
                    this.setState({ SelectSwapToken: 'BNB ' })
                } else if (this.state.CurrentUserNetwork === 'Ethereum') {
                    this.setState({ SelectSwapToken: 'ETH ' })
                }
            }, 1);


            const tokenData = Token.networks[networkId]
            if (tokenData) {
                setInterval(async () => {
                    const token = new web3.eth.Contract(Token.abi, tokenData.address)
                    this.state.token = token;
                    let tokenBalance = await token.methods.balanceOf(this.state.userAccount).call()


                    let tokenBalanceFormation1 = tokenBalance.toString()
                    let tokenBalanceFormation2 = window.web3.utils.fromWei(tokenBalanceFormation1, 'Ether')
                    let tokenBalanceFormaton = Number(tokenBalanceFormation2).toFixed(4)
                    if (tokenBalanceFormaton === 0.0000 || tokenBalanceFormaton === '0.0000') {
                        this.setState({ tokenBalance: '0' })
                    } else {
                        this.setState({ tokenBalance: Number(tokenBalanceFormation2).toFixed(4) })
                    }
                    // this.state.tokenBalance = tokenBalance.toString();
                }, 1000);
            } else {
                this.state.UserEthBalance = null
                // // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
                window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
            }

            // Load EthSwap
            const ethSwapData = EthSwap.networks[networkId]
            if (ethSwapData) {
                const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
                this.setState({ ethSwap })
            } else {
                this.state.UserEthBalance = null
                // // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
                window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
            }

            // Load TokenFarm
            const tokenFarmData = EthSwap.networks[networkId]
            if (tokenFarmData) {
                const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
                this.setState({ tokenFarm })
                // let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.userAccount).call()
                // if (stakingBalance === null) {
                //     this.setState({ stakingBalance: '0' })
                // } else {
                //     this.setState({ stakingBalance: stakingBalance.toString() })
                // }
                // this.setState({ stakingBalance: stakingBalance.toString() })
            } else {
                this.state.UserEthBalance = null
                // // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
                window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
            }

        }
    }



    render() {

        let SelectSwapTokenContent
        if (this.state.SelectSwapToken != '' && this.state.SelectSwapToken != null) {
            // console.log('SelectSwapToken', this.state.SelectSwapToken);
            SelectSwapTokenContent = this.state.SelectSwapToken
        } else {
            // console.log('SelectSwapToken', this.state.SelectSwapToken);
            SelectSwapTokenContent = 'Token'
        }

        let userNetworkContent
        if (this.state.CurrentUserNetwork != '' && this.state.CurrentUserNetwork != null) {
            // console.log('userNetwork', this.state.CurrentUserNetwork);
            if (this.state.CurrentUserNetwork === 'Binance') {
                userNetworkContent =
                    <span className='navBarNetworkBTn'>
                        BSC
                    </span>
            } else {
                userNetworkContent = <span className='navBarNetworkBTn'>
                    ETH
                </span>
            }
        } else {
            userNetworkContent = <span className='navBarDisNetworkBTn'>
                Networks
            </span>
        }

        let userAccountContent
        if (this.state.userAccount != '' && this.state.userAccount != null) {
            let accountFirstLetters = this.state.userAccount.substring(0, 3);
            let accountlastLetters = this.state.userAccount.substring(40);
            let fullResult = accountFirstLetters + '..' + accountlastLetters
            setTimeout(() => {
                localStorage.setItem('userAccount', this.state.userAccount)
            }, 1);
            userAccountContent = <div className='headerBtns sndHeaderBtn navHeaderBtnDiv headerBtnIst' style={{ paddingRight: '4px' }}>
                <img src={connectImg} className='sndHeaderBtnist navConnectBtn' alt="connectImg" />
                <span className='navBarConnectBTn'>{fullResult}</span>
                {/* Connect */}
            </div>
        } else {
            userAccountContent = <div className='headerBtns sndHeaderBtn navHeaderBtnDiv headerBtnIst' style={{ paddingRight: '4px' }}>
                <img src={connectImg} className='sndHeaderBtnist navConnectBtn' alt="connectImg" />
                <span className='navBarDisConnectBTn'>Connect</span>
                {/* Connect */}
            </div>
        }

        return (
            <>
                <div className='headerNav'>
                    <div className='row'>
                        <div className='col-4'>
                            <a href="http://fairtrader.io/">
                                <img className='fairtraderLogo navFairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
                            </a>
                        </div>
                        <div className="col-8 headerLinks">
                            <span style={{ display: "inline", float: "right" }}>
                                <a href="http://fairtrader.io/">
                                    <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
                                </a>
                            </span>
                            <div style={{ display: "inline", float: "right" }}>



                                {/* <div className='headerBtns sndHeaderBtn navHeaderBtnDiv headerBtnIst' style={{ paddingRight: '4px' }}>
                                    <img src={connectImg} className='sndHeaderBtnist navConnectBtn' alt="connectImg" />
                                    <span className='navConnectTxt' style={{ color: '#E0E102' }}>{fullResult}</span>
                                </div> */}


                                <Link to={{ pathname: '/WhichWallet' }}>
                                    {userAccountContent}
                                </Link>
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                <Link to={{ pathname: '/SelectNetwork' }}>
                                    <div className='headerBtns sndHeaderBtn networkBtn navHeaderBtnDiv headerBtnIst'>
                                        <img src={networkImg} className='sndHeaderBtnist navConnectSNDBtn' alt="connectImg" />
                                        {userNetworkContent}
                                        <img src={networkDropdown1} className='sndHeaderBtnsnd navHeaderBtnDiv' alt="networkDropdown" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default App;
