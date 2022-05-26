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
import binanceSmartChain from '../Images/binanceSwapToken.png';
import laExchange from '../Images/laExchange.png';
import etherToken from '../Images/etherToken.png';
import transactionTich from '../Images/transactionTich.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// components
import Graph from '../components/Graph2.jsx'
import FooterBottom from '../components/footerBottom.jsx';
import HeaderNav from '../components/HeaderNav.jsx';

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
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }


        if (metamaskStatus === false) {
            toast.error("Please first connect your wallet", {
                position: 'top-right'
            })



        } else if (metamaskStatus === true) {

            window.ethereum.on("chainChanged", function (accounts) {
                window.location.reload()
            })
            window.ethereum.on('accountsChanged', function (accounts) {
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
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
            // load Blockchain Data
            const web3 = window.web3

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            console.log('First accounts', accounts[0]);
            this.setState({ userAccount: accounts[0] })

            setInterval(async () => {
                const ethBalance = await web3.eth.getBalance(this.state.userAccount)
                this.setState({ UserEthBalance: ethBalance })
                const formatedEthBlnc = window.web3.utils.fromWei(ethBalance, 'Ether')
                let formatedBlncOfEth = Number(formatedEthBlnc).toFixed(4)
                if (formatedBlncOfEth === 0.0000 || formatedBlncOfEth === '0.0000') {
                    this.setState({ FormatedUserEthBalance: '0' })
                } else {
                    this.setState({ FormatedUserEthBalance: formatedBlncOfEth })
                }
            }, 1000);


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
            window.ethereum.on("chainChanged", networkChanged)
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
                // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
                window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
            }

            // Load EthSwap
            const ethSwapData = EthSwap.networks[networkId]
            if (ethSwapData) {
                const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
                this.setState({ ethSwap })
            } else {
                this.state.UserEthBalance = null
                // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
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
                // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
                window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
            }

            let moralisApiKey = 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
            axios.get('https://api.latoken.com/v2/ticker/FTP/USDT',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => {
                    // this.setState({ livePriceBftp: res.data.usdPrice })
                    console.log('livePriceOfFTPInUSDTLATOKEN', res.data.lastPrice);
                    // this.setState({ lPriceinCryptoBNB: res.data.nativePrice.value })
                    // this.setState({ livePriceOfBFTPInUSD: res.data.usdPrice })
                }).catch((err) => {
                    console.log(err);
                })


            // 73297
            // 0.000000000000072972



            axios.get('https://deep-index.moralis.io/api/v2/erc20/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/price?chain=bsc',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': moralisApiKey
                    }
                }
            )
                .then(res => {
                    this.setState({ livePriceBftpBNB: res.data.usdPrice })
                    console.log('livePriceBNBlivePriceBNB', res);
                    this.setState({ lPriceinCryptoBftp: res.data.nativePrice.value })
                    this.setState({ livePriceOfBNBInUSD: res.data.usdPrice })
                }).catch((err) => {
                    console.log(err);
                })



            console.log('12121212', process.env.REACT_APP_FTP_MANUALLY_PRICE);
            this.setState({ outputInUSD: process.env.REACT_APP_FTP_MANUALLY_PRICE })
        }
    }

    buyTokens = async (etherAmount) => {
        // if (window.web3.utils.fromWei(etherAmount) > this.state.FormatedUserEthBalance) {
        //     alert('insufficient Balance');
        // } else {
        this.setState({ loading: true })
        this.setState({ contractGetAmount: etherAmount })
        console.log('buy Token Func Ether Amount : ', etherAmount);
        console.log('buy Token Func User Balance : ', this.state.userAccount);

        let manuallySetRateOfBFTP = process.env.REACT_APP_FTP_MANUALLY_PRICE / this.state.livePriceOfBNBInUSD;
        console.log('manuallySetRateOfBFTP', manuallySetRateOfBFTP);
        console.log('manuallySetRateOfBFTP', window.web3.utils.toWei(String(manuallySetRateOfBFTP.toFixed(18)), 'Ether'));

        // Variable names are opposite BNB = BFTP        &&       BFTP = BNB

        let formatedCryptoValueOfBNB = manuallySetRateOfBFTP
        let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(this.state.lPriceinCryptoBftp, 'Ether')
        // let formatedCryptoValueOfBNB = window.web3.utils.fromWei(this.state.lPriceinCryptoBNB, 'Ether')
        console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

        let outputSwapValue = formatedCryptoValueOfBFTP / formatedCryptoValueOfBNB
        console.log('121212122', outputSwapValue);



        let _liveRate = outputSwapValue.toFixed(0);
        // let _liveRate = (this.state.outputInUSD).toString()
        // let _liveRate = 57770.4;

        // this.state.ethSwap.methods.buyTokens(_liveRate).send({ value: etherAmount, from: this.state.userAccount }).on('transactionHash', (hash) => {
        this.setState({ receiptDiv1: true })

        this.state.ethSwap.methods.buyTokens(_liveRate).send({ value: etherAmount, from: this.state.userAccount }).on('transactionHash', (hash) => {
            this.setState({ receiptDiv1: false })
            this.setState({ receiptDiv2: true })
            this.setState({ transactionHash: hash })
            this.setState({ loading: true })
            if (this.state.output === '0') {
                console.log('this.state.output', this.state.outputT);
                localStorage.setItem('amountEntered', this.state.outputT)
            } else {
                localStorage.setItem('amountEntered', this.state.output)
                console.log('this.state.output', this.state.output);
            }
            let etherAmountFromWei = window.web3.utils.fromWei(etherAmount)

            let tokenName
            let invoiceLink
            if (this.state.currentNetworkId === 4) {
                tokenName = "ETH"
                invoiceLink = `https://rinkeby.etherscan.io/tx/${hash}`
            } else if (this.state.currentNetworkId === 97) {
                tokenName = "BNB"
                invoiceLink = `https://testnet.bscscan.com/tx/${hash}`
            } else if (this.state.currentNetworkId === 1) {
                tokenName = "ETH"
                invoiceLink = `https://etherscan.io/tx/${hash}`
            } else if (this.state.currentNetworkId === 56) {
                tokenName = "BNB"
                invoiceLink = `https://bscscan.com/tx/${hash}`
            }

            let requestAmount
            if (this.state.output === 0 || this.state.output === '0') {
                requestAmount = this.state.outputT
            } else {
                requestAmount = this.state.output
            }

            console.log('requestAmount', requestAmount);
            axios.post('https://haideryaqoob.com/Wallet/create', {
                "wallet": this.state.userAccount,
                "rate": process.env.REACT_APP_FTP_MANUALLY_PRICE,
                "transactionType": "Swap",
                "chain": tokenName,
                "ether": Number(etherAmountFromWei).toFixed(6),
                "amount": requestAmount,
                "hash": invoiceLink
            })
                .then(res => {
                    console.log('Successfully Swapped', res);
                    toast.success("Successfully Swapped", {
                        position: 'top-right'
                    })
                    this.setState({ loading: false })
                }).catch(err => {
                    console.log(err);
                })
        }).catch(e => {
            if (e.code === 4001) {
                console.log('errorrrrrrrrrr', e)
                window.location.reload()
            }
        });
    }

    render() {
        // let CurrentUserEthBalance
        let SwapBtn
        // if (this.state.UserEthBalance != null && this.state.loading != true) {
        if (this.state.UserEthBalance != null && this.state.UserEthBalance != '') {
            SwapBtn = <button onClick={(e) => {
                e.preventDefault()
                let etherAmount
                etherAmount = this.input.value.toString()
                if (etherAmount === '' || etherAmount === null || etherAmount === undefined || etherAmount === 0 || etherAmount === '0' || etherAmount >= this.state.FormatedUserEthBalance) {
                    alert('Invalid Amount')
                    console.log('etherAmount', etherAmount);
                } else {
                    etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
                    this.buyTokens(etherAmount)
                }
            }} className='stakeBtnss' style={{ backgroundColor: '#046633', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '20px', marginBottom: '5px' }}>Swap to FTP</button>
        } else if (this.state.UserEthBalance === null || this.state.UserEthBalance === '') {
            SwapBtn = <Link to={{ pathname: '/WhichWallet' }}>
                <button className='stakeBtnss' style={{ backgroundColor: '#046633', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '20px', marginBottom: '5px' }}>Connect Wallet</button>
            </Link>
        } else if (this.state.loading === true) {
            SwapBtn = <button className='stakeBtnss' style={{ backgroundColor: '#046633', border: '2px solid #023433', borderRadius: '11px', width: '170px', height: '40px', fontSize: '17px', marginTop: '20px', marginBottom: '5px' }}>Loading...</button>
        }


        let SwapBtnDestop
        if (this.state.UserEthBalance === null || this.state.UserEthBalance === '') {
            SwapBtnDestop = <Link to={{ pathname: '/WhichWallet' }}>
                <button className='stakeBtnss' style={{ backgroundColor: '#046633', border: '3px solid #023433', borderRadius: '13px', width: '180px', height: '48px', fontSize: '17px', marginTop: '15px', marginBottom: '17px', position: 'relative', top: '-3px' }}>Connect Wallet</button>
            </Link>
        } else if (this.state.UserEthBalance != null && this.state.loading != true) {
            SwapBtnDestop = <button onClick={(e) => {
                e.preventDefault()
                let etherAmountT
                etherAmountT = this.inputT.value.toString()
                if (etherAmountT === '' || etherAmountT === null || etherAmountT === undefined || etherAmountT === 0 || etherAmountT === '0' || etherAmountT >= this.state.FormatedUserEthBalance) {
                    alert('Invalid Amount')
                    console.log('etherAmount', etherAmountT);
                } else {
                    etherAmountT = window.web3.utils.toWei(etherAmountT, 'Ether')
                    this.buyTokens(etherAmountT)
                }
            }} className='stakeBtnss' style={{ backgroundColor: '#046633', border: '3px solid #023433', borderRadius: '13px', width: '180px', height: '48px', fontSize: '17px', marginTop: '15px', marginBottom: '17px', position: 'relative', top: '-3px' }}>Swap to FTP</button>
        } else if (this.state.loading === true) {
            SwapBtnDestop = <button className='stakeBtnss' style={{ backgroundColor: '#046633', border: '3px solid #023433', borderRadius: '13px', width: '180px', height: '48px', fontSize: '17px', marginTop: '15px', marginBottom: '17px', position: 'relative', top: '-3px' }}>Loading...</button>
        }


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
                userNetworkContent = 'BSC'
            } else {
                userNetworkContent = 'ETH'
            }
        } else {
            // console.log('userNetwork', this.state.CurrentUserNetwork);
            // userNetworkContent = 'Networks'
            userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
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

        let swapTOkenImgDesk;
        let swapTOkenImgMob;
        if (this.state.currentNetworkId === 1 || this.state.currentNetworkId === '1') {
            swapTOkenImgDesk = <img src={etherToken} className="width40 swapTokenTOken" alt="" />
            swapTOkenImgMob = <img src={etherToken} width="20px" alt="" />
        } else {
            swapTOkenImgDesk = <img src={binanceSmartChain} style={{ marginTop: '-2px', position: 'relative', right: '2px' }} className="width40 swapTokenTOken" alt="" />
            swapTOkenImgMob = <img src={binanceSmartChain} width="30px" alt="" />
        }


        // console.log('contractGetAmount', this.state.contractGetAmount);
        const current = new Date();

        // invoice Formated
        let invoiceFirstLetters = this.state.transactionHash.substring(0, 3);
        let invoicelastLetters = this.state.userAccount.substring(39);
        let invoiceFullResult = invoiceFirstLetters + '....' + invoicelastLetters

        // invoice Formated
        let accountFirstLetters = this.state.userAccount.substring(0, 6);
        let accountlastLetters = this.state.userAccount.substring(34);
        let fullResult = accountFirstLetters + '..' + accountlastLetters

        // invoice link
        let invoiceLink
        let invoiceLinkTxt
        if (this.state.currentNetworkId === 4) {
            invoiceLinkTxt = 'https://rinkeby.etherscan.io/'
            invoiceLink = `https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`
        } else if (this.state.currentNetworkId === 97) {
            invoiceLinkTxt = 'https://testnet.bscscan.com/'
            invoiceLink = `https://testnet.bscscan.com/tx/${this.state.transactionHash}`
        } else if (this.state.currentNetworkId === 1) {
            invoiceLinkTxt = 'https://etherscan.io/address/'
            invoiceLink = `https://etherscan.io/tx/${this.state.transactionHash}`
        } else if (this.state.currentNetworkId === 56) {
            invoiceLinkTxt = 'https://bscscan.com/tx/'
            invoiceLink = `https://bscscan.com/tx/${this.state.transactionHash}`
        }


        let selectTokenMob;
        let selectTokenDesk
        let assetsTxt
        let activityTxt
        if (this.state.userAccount === '' || this.state.userAccount === ' ' || this.state.userAccount === null || this.state.userAccount === undefined) {
            assetsTxt = <h1 id='font18' style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} onClick={() => {
                toast.error("Please first connect your wallet", {
                    position: 'top-right'
                })
            }}>Assets</h1>
            activityTxt = <h1 id='font18' style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} onClick={() => {
                toast.error("Please first connect your wallet", {
                    position: 'top-right'
                })
            }}>Activity</h1>

            selectTokenMob = <button className='optionStakeBtnn' style={{ marginTop: '8.2px', marginLeft: '-9px' }} onClick={() => {
                toast.error("Please first connect your wallet", {
                    position: 'top-right'
                })
            }}>
                <span style={{ color: '#F7F700' }}>
                    <img src={binanceSmartChain} width="17px" alt="" />
                </span>
                <span className='swapTOkenMargins'>{SelectSwapTokenContent}</span>
                <span>
                    <img style={{ marginLeft: '5px' }} className='dropDOwn' src={stakeOptDropDown} alt="stakeOptDropDown" />
                </span>
            </button>

            selectTokenDesk = <button className='optionStakeBtnn' style={{ marginTop: '10px', marginLeft: '-9px' }} onClick={() => {
                toast.error("Please first connect your wallet", {
                    position: 'top-right'
                })
            }}>
                <span style={{ color: '#F7F700' }}>
                    <img src={binanceSmartChain} className="width40 swapTokenTOken" alt="" />
                </span>
                <span className='swapTOkenMargins'>{SelectSwapTokenContent}</span>
                <span>
                    <img className='dropDOwn' src={stakeOptDropDown} alt="stakeOptDropDown" />
                </span>
            </button>
        } else {
            assetsTxt = <Link to={{ pathname: '/Assets' }}>
                <h1 id='font18' style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Assets</h1>
            </Link>
            activityTxt = <Link to={{ pathname: '/RecentTx' }}>
                <h1 id='font18' style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Activity</h1>
            </Link>

            selectTokenMob =
                <Link to={{ pathname: '/SelectToken' }}>
                    <button className='optionStakeBtnn' style={{ marginTop: '8.2px', marginLeft: '-9px' }}>
                        <span style={{ color: '#F7F700' }}>
                            {swapTOkenImgMob}
                            {/* <img src={binanceSmartChain} width="30px" alt="" /> */}
                        </span>
                        <span className='swapTOkenMargins'>{SelectSwapTokenContent}</span>
                        <span>
                            <img className='dropDOwn' src={stakeOptDropDown} alt="stakeOptDropDown" />
                        </span>
                    </button>
                </Link>

            selectTokenDesk =
                <Link to={{ pathname: '/SelectToken' }}>
                    <button className='optionStakeBtnn' style={{ marginTop: '10px', marginLeft: '-9px' }}>
                        <span style={{ color: '#F7F700' }}>
                            {swapTOkenImgDesk}
                            {/* <img src={binanceSmartChain} width="40px" alt="" /> */}
                        </span>
                        <span className='swapTOkenMargins'>{SelectSwapTokenContent}</span>
                        <span>
                            <img className='dropDOwn' src={stakeOptDropDown} alt="stakeOptDropDown" />
                        </span>
                    </button>
                </Link>
        }


        let mainContentOfSwapforMob;
        if (this.state.receiptDiv1 === false && this.state.receiptDiv2 === false) {
            mainContentOfSwapforMob = <div className='DeskContentDivv'>
                <h4 className='colorGreyy balancE'><span style={{ marginRight: '6px' }}>Balance: </span>{this.state.FormatedUserEthBalance}</h4>
                <div className="whiteDivv">
                    <div className="row swapAmountBox">
                        <div className="col-7">
                            {selectTokenMob}
                            <span className='MaxTxtt colorGreen' style={{ cursor: 'pointer' }} onClick={(event) => {
                                let ftpAccountBalance = this.state.FormatedUserEthBalance
                                this.input.value = ftpAccountBalance - 0.03;

                                this.setState({ etherAmount: this.input.value })
                                const etherAmountT = this.input.value.toString()
                                console.log('etherAmount', etherAmountT);

                                let manuallySetPriceOfBFTP = (this.state.livePriceOfBNBInUSD * etherAmountT) / process.env.REACT_APP_FTP_MANUALLY_PRICE;
                                console.log('manuallySetPriceOfBFTP', manuallySetPriceOfBFTP);

                                // let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(this.state.lPriceinCryptoBftp, 'Ether')
                                // let formatedCryptoValueOfBNB = window.web3.utils.fromWei(this.state.lPriceinCryptoBNB, 'Ether')
                                // console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

                                // let outputUsdValueOfBNB = etherAmountT * formatedCryptoValueOfBFTP
                                // let outputSwapValue = outputUsdValueOfBNB / formatedCryptoValueOfBNB

                                if (manuallySetPriceOfBFTP === '0.0000' || manuallySetPriceOfBFTP === 0.0000) {
                                    this.setState({ outputT: '0' })
                                } else {
                                    this.setState({
                                        outputT: manuallySetPriceOfBFTP.toFixed(1)
                                    })
                                }
                            }}>Max</span>
                        </div>
                        <div className="col-5 whiteStakeAmountt">
                            <h5 className='colorGreen'>Swap<span style={{ color: 'white' }}>.</span>Amount</h5>
                            <h5 style={{ color: 'green' }}><input
                                type="email"
                                onChange={(event) => {
                                    event.preventDefault()

                                    this.setState({ etherAmount: this.input.value })
                                    const etherAmountT = this.input.value.toString()
                                    console.log('etherAmount', etherAmountT);

                                    let manuallySetPriceOfBFTP = (this.state.livePriceOfBNBInUSD * etherAmountT) / process.env.REACT_APP_FTP_MANUALLY_PRICE;
                                    console.log('manuallySetPriceOfBFTP', manuallySetPriceOfBFTP);

                                    // let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(this.state.lPriceinCryptoBftp, 'Ether')
                                    // let formatedCryptoValueOfBNB = window.web3.utils.fromWei(this.state.lPriceinCryptoBNB, 'Ether')
                                    // console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

                                    // let outputUsdValueOfBNB = etherAmountT * formatedCryptoValueOfBFTP
                                    // let outputSwapValue = outputUsdValueOfBNB / formatedCryptoValueOfBNB

                                    if (manuallySetPriceOfBFTP === '0.0000' || manuallySetPriceOfBFTP === 0.0000) {
                                        this.setState({ outputT: '0' })
                                    } else {
                                        this.setState({
                                            outputT: manuallySetPriceOfBFTP.toFixed(1)
                                        })
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
                        <img src={blackSwapArrow} style={{ float: 'right' }} alt="greenArrow" />

                    </div>
                </div>
                <h4 className='colorGreyy twelveMntTxtt'>
                    {/* Balance: {window.web3.utils.fromWei(this.state.tokenBalance, 'Ether')} */}
                    <span style={{ marginRight: '6px' }}>Balance: </span>{this.state.tokenBalance}
                </h4>
                <div className="darkBlueDivv">
                    <div className="row swapAmountBox">
                        <div className="col-6 extraFtpTxtt" style={{ position: 'relative', left: '-17px' }}>
                            <div className="row">
                                <div className="col-4">
                                    <img className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='30px' style={{ marginTop: '8px' }} alt="logo" />
                                </div>
                                <div className="col-8">
                                    <h5 style={{ fontSize: '14px', marginTop: '7px', color: '#1DCCFF' }}>USDT<span style={{ color: '#111224' }}>_</span>${this.state.outputInUSD}</h5>
                                    {/* {window.web3.utils.fromWei('16175633797319', 'Ether')} */}
                                    {/* <h5 style={{ fontSize: '12px' }}>6,000</h5> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 whiteStakeAmountt">
                            <h5 style={{ color: '#00CCFF' }}>Swap to FTP</h5>
                            <input
                                type="hello"
                                className="form-control swapSetAmount"
                                value={this.state.outputT}
                                placeholder="0"
                                disabled
                                style={{ backgroundColor: 'transparent', color: '#1dccff', outline: 'none' }}
                                required />
                        </div>
                    </div>
                </div>
                <br />
                <p style={{ textAlign: 'center', marginTop: '-7px', marginBottom: '6px' }}>
                    {SwapBtn}
                </p>
            </div>
        }


        let mainContentOfSwap;
        if (this.state.receiptDiv1 === false && this.state.receiptDiv2 === false) {
            mainContentOfSwap = <div className='DeskContentDivv'>
                <h4 className='colorGreyy balancE' style={{ marginBottom: '0px', color: '#39393B', fontSize: '16px' }}><span style={{ marginRight: '6px' }}>Balance: </span>{this.state.FormatedUserEthBalance}</h4>
                <div className="whiteDivv">
                    <div className="row">
                        <div className="col-7">
                            {selectTokenDesk}
                            <span className='MaxTxtt colorGreen' style={{ cursor: 'pointer' }} onClick={(event) => {
                                let ftpAccountBalance = this.state.FormatedUserEthBalance
                                this.inputT.value = ftpAccountBalance - 0.03;

                                this.setState({ etherAmount: this.inputT.value })
                                const etherAmountT = this.inputT.value.toString()
                                console.log('etherAmount', etherAmountT);

                                let manuallySetPriceOfBFTP = (this.state.livePriceOfBNBInUSD * etherAmountT) / process.env.REACT_APP_FTP_MANUALLY_PRICE;
                                console.log('hello1', manuallySetPriceOfBFTP);

                                // let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(this.state.lPriceinCryptoBftp, 'Ether')
                                // let formatedCryptoValueOfBNB = window.web3.utils.fromWei(this.state.lPriceinCryptoBNB, 'Ether')
                                // console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

                                // let outputUsdValueOfBNB = etherAmountT * formatedCryptoValueOfBFTP
                                // let outputSwapValue = outputUsdValueOfBNB / formatedCryptoValueOfBNB

                                if (manuallySetPriceOfBFTP === '0.0000' || manuallySetPriceOfBFTP === 0.0000) {
                                    this.setState({ outputT: '0' })
                                } else {
                                    this.setState({
                                        outputT: manuallySetPriceOfBFTP.toFixed(1)
                                    })
                                }

                            }}>Max</span>
                        </div>
                        <div className="col-5 whiteStakeAmountt">
                            <h5 className='colorGreen swapAmountTxt' style={{ fontSize: '15px' }}>Swap<span style={{ color: 'white' }}>.</span>Amount</h5>
                            <h5 style={{ color: 'green' }}><input
                                type="email"
                                onChange={(event) => {
                                    event.preventDefault()
                                    this.setState({ etherAmount: this.inputT.value })
                                    const etherAmountT = this.inputT.value.toString()
                                    console.log('etherAmount', etherAmountT);

                                    let manuallySetPriceOfBFTP = (this.state.livePriceOfBNBInUSD * etherAmountT) / process.env.REACT_APP_FTP_MANUALLY_PRICE;
                                    console.log('manuallySetPriceOfBFTP', manuallySetPriceOfBFTP);

                                    // let manuallySetRateOfBFTP = process.env.REACT_APP_FTP_MANUALLY_PRICE / this.state.livePriceOfBNBInUSD;
                                    // console.log('manuallySetRateOfBFTP', manuallySetRateOfBFTP);
                                    // console.log('manuallySetRateOfBFTP', window.web3.utils.toWei(String(manuallySetRateOfBFTP.toFixed(18)), 'Ether'));

                                    // let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(this.state.lPriceinCryptoBftp, 'Ether')
                                    // let formatedCryptoValueOfBNB = window.web3.utils.fromWei(this.state.lPriceinCryptoBNB, 'Ether')
                                    // console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

                                    // let outputUsdValueOfBNB = etherAmountT * formatedCryptoValueOfBFTP
                                    // let outputSwapValue = outputUsdValueOfBNB / formatedCryptoValueOfBNB

                                    if (manuallySetPriceOfBFTP === '0.0000' || manuallySetPriceOfBFTP === 0.0000) {
                                        this.setState({ outputT: '0' })
                                    } else {
                                        this.setState({
                                            outputT: manuallySetPriceOfBFTP.toFixed(1)
                                        })
                                    }
                                }}
                                ref={(inputT) => { this.inputT = inputT }}
                                className="form-conrol form-control-lg swapOutput"
                                placeholder="0"
                                style={{ border: 'none', width: '98px', fontSize: '13px', textAlign: 'end' }}
                                required /></h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <img src={blackSwapArrow} width={33} style={{ float: 'right', marginTop: '10px', marginBottom: '10px' }} alt="greenArrow" />

                    </div>
                </div>
                <h4 className='colorGreyy twelveMntTxtt' style={{ color: '#393941', fontSize: '16px' }}>
                    {/* Balance: {window.web3.utils.fromWei(this.state.tokenBalance, 'Ether')} */}
                    <span style={{ marginRight: '6px' }}>Balance: </span>{this.state.tokenBalance}
                </h4>
                <div className="darkBlueDivv">
                    <div className="row">
                        <div className="col-6 extraFtpTxtt" style={{ position: 'relative', left: '-15px' }}>
                            {/* <div className="col-6 extraFtpTxtt"> */}
                            <div className="row">
                                <div className="col-4">
                                    <img style={{ marginTop: '10px', float: 'right', marginRight: '-16px' }} className='extraImg' src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png" width='40px' alt="logo" />
                                </div>
                                <div className="col-8">
                                    <h5 style={{ fontSize: '15px', marginTop: '7px', color: '#1DCCFF' }}>
                                        USDT<span style={{ color: '#111224' }}>_</span>
                                        ${this.state.outputInUSD}
                                    </h5>
                                    {/* <h5 style={{ fontSize: '12px' }}>6,000</h5> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 whiteStakeAmountt">
                            <h5 style={{ color: '#00CCFF', fontSize: '15px' }}>Swap to FTP</h5>
                            <input
                                type="hello"
                                className="form-control swapSetAmount"
                                value={this.state.outputT}
                                placeholder="0"
                                disabled
                                style={{ backgroundColor: 'transparent', color: '#1dccff', outline: 'none' }}
                                required />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <p style={{ textAlign: 'center' }}>
                    {SwapBtnDestop}
                    <br />
                </p>
            </div>
        }

        // console.log('11111111111', this.state.etherAmount);

        let swappingValue = this.state.etherAmount
        // if (this.input === '' || this.input === null) {
        //     swappingValue = this.inputT.value.toString()
        //     console.log('1111111111', this.inputT.value.toString());
        // } else if (this.inputT === '' || this.inputT === null) {
        //     console.log('222222222', this.input.value);
        //     swappingValue = this.input.value.toString()
        // }


        let receiptDiv1forMob
        if (this.state.receiptDiv1 === true && this.state.receiptDiv2 === false) {
            receiptDiv1forMob =
                <div className="wholePage">
                    <div className="receiptMain">
                        <div className='receiptHeading'>
                            <h2><b>Confirm Swap</b></h2>
                        </div>
                        <br />
                        <h2 style={{ color: '#1761fb' }}><b>Waiting for Confirmation</b></h2>
                        <br />
                        <br />
                        <h3 style={{ color: 'black' }}><b>Swapping {swappingValue} BNB for {this.state.outputT} FTP</b></h3>
                        <br />
                        <br />
                        <h3 style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
                        <br />
                        <br />
                    </div>
                    <br />
                </div>
        }


        let receiptDiv2forMob
        if (this.state.receiptDiv2 === true && this.state.receiptDiv1 === false) {
            receiptDiv2forMob =
                <div className="wholePage">
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
                        <Link to={{ pathname: '/StakePage_,_' }}>
                            <button className='receiptBtn' style={{ backgroundColor: '#1BA448' }}>Continue</button>
                        </Link>
                        <br /><br />
                    </div>
                    <br />
                    <br />
                </div>

        }


        let receiptDiv1
        if (this.state.receiptDiv1 === true && this.state.receiptDiv2 === false) {
            receiptDiv1 =
                <div className="wholePage">
                    <br /><br />
                    <div className="receiptMain">
                        <div className='receiptHeading'>
                            <h2><b>Confirm Swap</b></h2>
                        </div>
                        <br /><br />
                        <h2 style={{ color: '#1761fb' }}><b>Waiting for Confirmation</b></h2>
                        <br /><br />
                        <h2 style={{ color: 'black' }}><b>Swapping {swappingValue} BNB for {this.state.outputT} FTP</b></h2>
                        <br /><br />
                        <h3 className='recipt1ConfirmTxt' style={{ color: '#1761fb' }}>Confirm the transaction in your wallet</h3>
                        <br /><br />
                    </div>
                    <br /><br />
                </div>
        }


        let receiptDiv2
        if (this.state.receiptDiv2 === true && this.state.receiptDiv1 === false) {
            receiptDiv2 =
                <div className="wholePage">
                    <br /><br />
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
                        <Link to={{ pathname: '/StakePage_,_' }}>
                            <button className='receiptBtn' style={{ backgroundColor: '#1BA448' }}>Continue</button>
                        </Link>
                        <br /><br /><br /><br /><br />
                    </div>
                    <br />
                </div>

        }

        {/* <div className="wholePage">
                    <div className="receiptMain">
                        <div className="receipt">
                            <h1>.............................................</h1>
                            <br />
                            <h2>FAIRTRADER TRANSACTION</h2>
                            <h1>.............................................</h1>

                            <br /><br /><br />
                            <div className="row fontSize">
                                <div className="col-6 text-left">DATE #</div>
                                <div className="col-6 text-right">{current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}</div>
                            </div>
                            <div className="row fontSize">
                                <div className="col-6 text-left">TIME #</div>
                                <div className="col-6 text-right">{current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()}</div>
                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-6 text-left">Hash NUMBER</div>
                                <div className="col-6 text-right">{invoiceFullResult}</div>
                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-6 text-left">ACCOUNT ADDRESS</div>
                                <div className="col-6 text-right">{fullResult}</div>
                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-6 text-left">AMOUNT #</div>
                                <div className="col-6 text-right">{window.web3.utils.fromWei(this.state.contractGetAmount)}</div>
                            </div>
                            <div className="row fontSize">
                                <div className="col-6 text-left">INVOICE LINK</div>
                                <div className="col-6 text-right">
                                    <a style={{ textDecoration: 'underline' }} target={'_blank'} href={invoiceLink}>
                                        {invoiceLinkTxt}
                                    </a>
                                </div>
                            </div>
                            <br /><br />
                            <br /><br />
                            <h1>.............................................</h1>
                            <br /><br />
                            <p className='text-center'>
                                <Link to={{ pathname: '/StakePage_,_' }}>
                                    <button className='receiptBtn'>Continue</button>
                                </Link>
                            </p>
                            <br /><br />
                            <br /><br />
                        </div>
                    </div>
                </div> */}
        // }

        return (
            <>
                <div style={{ backgroundColor: 'black' }}>
                    <div className='MainDivDesktop'>

                        <HeaderNav />


                        {/* <div className='headerNav'>
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
                                            {userAccountContent}
                                        </Link>
                                    </div>
                                    <div style={{ display: "inline", float: "right" }}>
                                        <Link to={{ pathname: '/SelectNetwork' }}>
                                            <div className='headerBtns sndHeaderBtn networkBtn'>
                                                <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                                                    {userNetworkContent}
                                                </span>
                                                <img src={networkDropdown1} className='sndHeaderBtnsnd' alt="networkDropdown" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="desktopBlueDiv">
                            <hr className='hrr' />
                            <div className="row MainDivMain">
                                <div className="col-8">
                                    {/* <div className="col-8"> */}
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
                                {/* <div className="col-4" style={{ marginLeft: '-40px' }}> */}
                                <div className="col-4 ">
                                    {/* <div className='functionalityDiv'> */}
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
                                            <Link to={{ pathname: '/SwapPage' }}>
                                                <h1 className='colorBlack' style={{ fontWeight: 'bold', color: 'white' }}>
                                                    Swap
                                                </h1>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to={{ pathname: '/StakePage' }}>
                                                <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                                                    Stake
                                                </h1>
                                            </Link>
                                        </div>
                                        <div className="col-3">
                                            <a target="_blank" href="https://latoken.com/">
                                                <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                                                    Trade
                                                </h1>
                                            </a>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    <div className="bottomHeaderr functionalityDiv" style={{ width: '100%', marginBottom: '105px' }}>
                                        <div className="row" style={{ marginBottom: '7px' }}>
                                            <div className="col-2">
                                                <Link to={{ pathname: '/SndScreen' }}>
                                                    <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>Swap to FTP</p>
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


                                        {mainContentOfSwap}
                                        {receiptDiv1}
                                        {receiptDiv2}
                                        <hr className='hr' style={{ marginTop: '20px' }} />
                                        <div className="row" style={{ marginTop: '15px' }}>
                                            <div className="col-6">
                                                {assetsTxt}
                                            </div>
                                            <div className="col-6">
                                                {activityTxt}

                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className='bottomBtns functionalityDiv' style={{ marginTop: '10px' }}>
                                        <div className="row">
                                            <div className="col-6">
                                                {assetsTxt}
                                            </div>
                                            <div className="col-6">
                                                {activityTxt}

                                            </div>
                                        </div>
                                    </div> */}
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
                                            {userAccountContent}
                                        </Link>
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
                                        <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' style={{ width: '42px', marginTop: '-3px' }} src={swapImg} alt="swapImg" /></Link>
                                    </div>
                                    <div className='mainLinksPics col-3'>
                                        <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} alt="stakeImg" /></Link>
                                    </div>
                                    <div className='mainLinksPics col-3'>
                                        <a target="_blank" href="https://latoken.com/"><img className='mainLinksPics2' src={tradeImg} alt="tradeImg" /></a>
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
                                            <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>Swap to<span style={{ color: '#91D8F7', fontSize: '12px' }}>_</span>FTP</p>
                                        </div>
                                        <div className="col-2">
                                            <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                                        </div>
                                        <div className="col-2">
                                            <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                                        </div>
                                    </div>
                                    <hr className='hrSwap' />


                                    {mainContentOfSwapforMob}
                                    {receiptDiv1forMob}
                                    {receiptDiv2forMob}


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
                            {/* <SelectPeriod></SelectPeriod> */}
                            {/* <WhatIsStaking></WhatIsStaking> */}
                            {/* <Web3Test></Web3Test> */}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default App;
