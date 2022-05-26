import React, { Component } from 'react';
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import footerLogo from '../Images/bottomPageLogo.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// css
import './css/selectNetwork.css'

import axios from 'axios';
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CurrentUserNetwork: '',
            tokenFarm: '',
            currentNetworkId: '',
            networkSelection: '',
            currentTime: '',
            tokenBalanceOfExchange: '',
            exchangeRealBalance: '',
            exchangeDataWhole: [],
            allStakedAmount: 0,
            exchangeWholeStakeData: [],
            adminPannel: false,
            emailInput: '',
            tokenPrice: '',
            adminEmail: 'adminpannel@fairtrader.io',
            adminEmailPassword: 'passwordOfAdminPannel',
            emailPasswordInput: '',
            livePriceOfBNBInUSD: '',
            lPriceinCryptoBftp: ''
        }
    }

    async componentWillMount() {
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
        console.log('First accounts', accounts[0]);
        this.setState({ userAccount: accounts[0] })

        // Load TokenFarm
        const networkId = await web3.eth.net.getId()
        this.setState({ currentNetworkId: networkId })

        const tokenFarmData = EthSwap.networks[networkId]
        if (tokenFarmData) {
            const tokenFarm = new web3.eth.Contract(EthSwap.abi, tokenFarmData.address)
            this.setState({ tokenFarm })

            const formatedArray1 = await tokenFarm.methods.exchangeHistoryOfStake().call();
            console.log('exchangeHistoryOfStakeexchangeHistoryOfStake', formatedArray1);
            formatedArray1.shift(0)
            let exchangeWholeStakeData2 = [];
            let allStakedAmount2 = [];
            formatedArray1.map(function (item, index) {
                // console.log('formatedArray1', item, 'index', index);
                let exchangeWholeStakeData = [];
                let allStakedAmount = [];
                for (let i = 0; i < item.address_stakes.length; i++) {
                    exchangeWholeStakeData.push(item.address_stakes[i]);
                }
                setTimeout(() => {
                    // console.log('exchangeWholeStakeData', exchangeWholeStakeData);
                    exchangeWholeStakeData.map(function (item, index) {
                        exchangeWholeStakeData2.push(item)

                        allStakedAmount2.push(window.web3.utils.fromWei(item.amount.toString(), 'Ether'));

                    })
                }, 1);

            })
            setTimeout(() => {
                let totalAmountOfStake = 0;
                allStakedAmount2.map(function (item, index) {
                    totalAmountOfStake = parseFloat(totalAmountOfStake) + parseFloat(item);
                })
                this.setState({ allStakedAmount: totalAmountOfStake })
                // console.log('totalAmountOfStaketotalAmountOfStake', this.state.allStakedAmount);
                // console.log('exchangeWholeStakeData2', exchangeWholeStakeData2);
                this.setState({ exchangeDataWhole: exchangeWholeStakeData2 })

            }, 1);
            // console.log('THISSTATEexchangeWholeStakeData', this.state.exchangeWholeStakeData);

            this.state.exchangeRealBalance = await tokenFarm.methods.getBalance().call()
            // // console.log('isStakingisStakingisStakingisStaking', window.web3.utils.fromWei(this.state.exchangeRealBalance.toString(), 'Ether'));

        } else {
            // window.alert('Invalid Network Id. Please select ** Binanace ** or ** Ethereum ** to Continue.')
            window.alert('Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon.')
        }

        const tokenData = Token.networks[this.state.currentNetworkId]
        const token = new web3.eth.Contract(Token.abi, tokenData.address)

        if (networkId === 4) {
            let hello123 = await token.methods.balanceOf(EthSwap.networks[4].address).call()
            const tokenBalanceOfExchange = window.web3.utils.fromWei(hello123.toString(), 'Ether')
            this.setState({ tokenBalanceOfExchange: tokenBalanceOfExchange.toString() })
            console.log('* tokenBalanceOfExchange * : ', tokenBalanceOfExchange.toString());
        } else if (networkId === 97) {
            let hello123 = await token.methods.balanceOf(EthSwap.networks[97].address).call()
            const tokenBalanceOfExchange = window.web3.utils.fromWei(hello123.toString(), 'Ether')
            this.setState({ tokenBalanceOfExchange: tokenBalanceOfExchange.toString() })
            console.log('* tokenBalanceOfExchange * : ', tokenBalanceOfExchange.toString());
        } else if (networkId === 1) {
            let hello123 = await token.methods.balanceOf(EthSwap.networks[1].address).call()
            const tokenBalanceOfExchange = window.web3.utils.fromWei(hello123.toString(), 'Ether')
            this.setState({ tokenBalanceOfExchange: tokenBalanceOfExchange.toString() })
            console.log('* tokenBalanceOfExchange * : ', tokenBalanceOfExchange.toString());
        } else if (networkId === 56) {
            let hello123 = await token.methods.balanceOf(EthSwap.networks[56].address).call()
            const tokenBalanceOfExchange = window.web3.utils.fromWei(hello123.toString(), 'Ether')
            this.setState({ tokenBalanceOfExchange: tokenBalanceOfExchange.toString() })
            console.log('* tokenBalanceOfExchange * : ', tokenBalanceOfExchange.toString());
        }
        const networkChanged = (chainId) => {
            console.log('chain_changed', chainId);
            window.location.reload()
        };
        const accountChanged = (account) => {
            console.log('account_changed', account);
            window.location.reload()

            // if (accounts.length > 0) {
            //     console.log(`Account connected: ${accounts[0]}`);
            //     console.log("Account disconnected1");
            // } else {
            //     console.log("Account disconnected");
            // }
        }

        let moralisApiKey = 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
        axios.get('https://deep-index.moralis.io/api/v2/erc20/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/price?chain=bsc',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': moralisApiKey
                }
            }
        )
            .then(res => {
                this.setState({ livePriceOfBNBInUSD: res.data.usdPrice })
                this.setState({ lPriceinCryptoBftp: res.data.nativePrice.value })
            }).catch((err) => {
                console.log(err);
            })

        window.ethereum.on("chainChanged", networkChanged)
        window.ethereum.on('accountsChanged', accountChanged)

    }
    adminWithdrawal = async () => {
        let acount = this.state.userAccount
        if (acount != 0x2faF59B19C294dd31fa222De7E0493C217EAd47b) {
            alert('You are not Owner')
        } else {
            let adminWithdrawal = await this.state.tokenFarm.methods.adminWithdraw(acount).send({ from: acount }).on('transactionHash', (hash) => {
                console.log(hash);
            }).catch(e => {
                if (e.code === 4001) {
                    console.log('errorrrrrrrrrr', e)
                    window.location.reload()
                }
            });
            console.log('adminWithdrawaladminWithdrawal', adminWithdrawal);
        }
    }
    adminWithdrawalToken = async () => {
        let acount = this.state.userAccount
        if (acount != 0x2faF59B19C294dd31fa222De7E0493C217EAd47b) {
            alert('You are not Owner')
        } else {
            let adminWithdrawalToken = await this.state.tokenFarm.methods.adminWithdrawToken().send({ from: acount }).on('transactionHash', (hash) => {
                console.log(hash);
            }).catch(e => {
                if (e.code === 4001) {
                    console.log('errorrrrrrrrrr', e)
                    window.location.reload()
                }
            });
            console.log('adminWithdrawalTokenadminWithdrawalToken', adminWithdrawalToken);
        }
    }
    // adminSetTokenPrice = async () => {
    //     let acount = this.state.userAccount
    //     if (acount != 0xe8f720da6A996d2556AE93C0cD926A8d11B1c719) {
    //         alert('You are not Owner')
    //     } else {
    //         if (this.tokenPrice.value === '') {
    //             alert('Invalid Price')
    //         } else {

    //             let livePriceOfBNBInUSD = this.state.livePriceOfBNBInUSD;
    //             let lPriceinCryptoBftp = this.state.lPriceinCryptoBftp;

    //             let manuallySetRateOfBFTP = process.env.REACT_APP_FTP_MANUALLY_PRICE / livePriceOfBNBInUSD;
    //             console.log('livePriceOfBNBInUSD', livePriceOfBNBInUSD);
    //             console.log('manuallySetRateOfBFTP', manuallySetRateOfBFTP);
    //             console.log('manuallySetRateOfBFTP', window.web3.utils.toWei(String(manuallySetRateOfBFTP.toFixed(18)), 'Ether'));
    //             let formatedCryptoValueOfBNB = manuallySetRateOfBFTP
    //             let formatedCryptoValueOfBFTP = window.web3.utils.fromWei(lPriceinCryptoBftp, 'Ether')
    //             console.log(',,,,,,', formatedCryptoValueOfBFTP, formatedCryptoValueOfBNB);

    //             let outputSwapValue = formatedCryptoValueOfBFTP / formatedCryptoValueOfBNB
    //             console.log('121212122', outputSwapValue);

    //             let _tokenPrice = outputSwapValue.toFixed(0);


    //             let adminSetTokenPrice = await this.state.tokenFarm.methods.exchangeTokenPrice(_tokenPrice).send({ from: acount }).on('transactionHash', (hash) => {
    //                 console.log(hash);
    //             })
    //             console.log('adminSetTokenPriceadminSetTokenPrice', adminSetTokenPrice);
    //             toast.success("Successfully Token Price Set", {
    //                 position: 'top-right'
    //             })
    //         }
    //     }
    // }
    render() {
        function timestampToDate(time) {
            let time1 = time.since.toString()
            var d = new Date(time1 * 1000);
            return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + ", " + d.toLocaleTimeString([], { hour12: false, timeZoneName: "short" });
        };

        let networkSelection
        if (this.state.currentNetworkId === 4 || this.state.currentNetworkId === 1) {
            networkSelection = <span>Ethereum</span>
        } else if (this.state.currentNetworkId === 97 || this.state.currentNetworkId === 56) {
            networkSelection = <span>Binance</span>
        } else if (this.state.currentNetworkId === undefined || this.state.currentNetworkId === '') {
            networkSelection = <span style={{ color: 'red' }}>First connect Wallet</span>
        }
        const current = new Date();

        setInterval(() => {
            this.setState({ currentTime: current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds() })
        }, 1000);

        let ethOrBnb
        if (this.state.currentNetworkId === 4 || this.state.currentNetworkId === 1) {
            ethOrBnb = 'ETH'
        } else if (this.state.currentNetworkId === 97 || this.state.currentNetworkId === 56) {
            ethOrBnb = 'BNB'
        } else if (this.state.currentNetworkId === undefined || this.state.currentNetworkId === '') {
            ethOrBnb = ''
        }

        let withDrawalBtn
        if (window.web3.utils.fromWei(this.state.exchangeRealBalance.toString()) === '0' || window.web3.utils.fromWei(this.state.exchangeRealBalance.toString()) === 0) {
            withDrawalBtn = <button className='receiptBtn'>Insufficient {ethOrBnb}</button>
        } else {
            withDrawalBtn = <button onClick={this.adminWithdrawal} className='receiptBtn'>Withdraw {ethOrBnb}</button>
        }

        let withDrawalBtnToken
        // if (window.web3.utils.fromWei(this.state.tokenBalanceOfExchange.toString()) === '0' || window.web3.utils.fromWei(this.state.tokenBalanceOfExchange.toString()) === 0) {
        //     withDrawalBtnToken = <button className='receiptBtn'>Insufficient FTP</button>
        // } else {
        withDrawalBtnToken = <button onClick={this.adminWithdrawalToken} className='receiptBtn'>Withdraw FTP</button>
        // }

        let adminPannel;
        if (this.state.adminPannel === true) {
            adminPannel =
                <div className="wholePage" style={{ backgroundColor: 'purple' }}>
                    {/* <div className="receiptMain" style={{ marginTop: '120px', width: '70%' }}> */}
                    <div className="receiptMain" style={{ marginTop: '120px' }}>
                        <div className="receipt" style={{ paddingTop: '0px' }}>
                            <div style={{ float: 'right', marginRight: '20px', marginTop: '-50px' }}>
                                <h4 style={{ color: 'yellow' }}>Network:  {networkSelection}</h4>
                            </div>
                            <br /><br /><br />
                            <br /><br />
                            <br /><br /><br />
                            <h1>.............................................</h1>
                            <br />
                            <h2>ADMIN PANNEL FAIRTRADAER</h2>
                            <h1>.............................................</h1>

                            <br /><br /><br />

                            <div className="row fontSize">
                                <div className="col-8 text-left">DATE # </div>
                                <div className="col-4 text-right">{current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}</div>
                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-8 text-left">TIME # </div>
                                <div className="col-4 text-right">{current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()}</div>
                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-8 text-left">Exchange FTP Liquidity # </div>
                                <div className="col-4 text-right">{Number(this.state.tokenBalanceOfExchange).toFixed(3)} FTP</div>

                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-8 text-left">Exchange FTP Locked Liquidity # </div>
                                <div className="col-4 text-right">{Number(this.state.allStakedAmount).toFixed(3)} FTP</div>

                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-8 text-left">Exchange FTP Remained Liquidity # </div>
                                <div className="col-4 text-right">{Number(this.state.tokenBalanceOfExchange - this.state.allStakedAmount).toFixed(3)} FTP</div>

                            </div>
                            <br /><br />
                            <div className="row fontSize">
                                <div className="col-8 text-left">Exchange {ethOrBnb} Balance # </div>
                                <div className="col-4 text-right">{window.web3.utils.fromWei(this.state.exchangeRealBalance.toString())} {ethOrBnb}</div>
                                {/* <div className="col-6 text-right">{ethOrBnb}</div>                             */}
                            </div>
                            <br /><br />
                            {/* <input
                                className="setTokenPrice"
                                type="text"
                                placeholder="Set Token Price"
                                onChange={(e) => {
                                    e.preventDefault()
                                    this.setState({ tokenPrice: this.tokenPrice.value })
                                    const tokenPrice = this.tokenPrice.value.toString()
                                    console.log('tokenPrice', tokenPrice);
                                }}
                                ref={(tokenPrice) => { this.tokenPrice = tokenPrice }}
                            />
                            <button className='log-in setTOkenPRiceBTN' onClick={this.adminSetTokenPrice}>Set</button> */}
                            <h1>.............................................</h1>
                            <br /><br />
                            <p className='text-center'>
                                {withDrawalBtn}
                            </p>
                            <p className='text-center'>
                                {withDrawalBtnToken}
                            </p>
                            <br /><br />
                            <br /><br />
                            <br /><br />
                            <br /><br />
                        </div>
                    </div>
                    <div className="receiptMain" style={{ marginTop: '220px', marginBottom: '50px' }}>
                        <div className="receipt" style={{ paddingTop: '0px' }}>
                            <table class="table table-striped table-dark" style={{fontSize: '15px'}}>
                                <thead>
                                    <tr>
                                        <th scope="col">ID #</th>
                                        <th scope="col">Account Number #</th>
                                        <th scope="col">Staked Amount #</th>
                                        <th scope="col">Staked Time #</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.exchangeDataWhole.map((value, index) =>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.user}</td>
                                            <td>{window.web3.utils.fromWei(value.amount.toString(), 'Ether')} FTP</td>
                                            <td>{timestampToDate(value)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        } else {
            adminPannel =
                <div className='signInBox'>
                    <div class="containersignInBox">
                        <div class="boxsignInBox">
                            <div>
                                <br /><br />
                                <br />
                                <div id="main-div">
                                    <div className="second-div">
                                        <div>
                                            {/* <!-- <img src="@/assets/images/lock.svg" class="lock-img" /> --> */}
                                            <img src={footerLogo} className="lock-img" />
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div className="lock-div">
                                            {/* <!-- <h2 class="lock-subheading">Welcome to name</h2> --> */}
                                            <h3 className="lock-subheading">SIGN IN</h3>
                                            <br />
                                            <h6 className="sign-in-sub">
                                                Sign in to create<span onClick={() => this.setState({ adminPannel: true })}>,</span> discover and connect <br />
                                                with the global community.
                                            </h6>
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <input
                                                className="input-fel"
                                                type="text"
                                                placeholder="Email"
                                                style={{ marginBottom: "15px" }}
                                                onChange={(e) => {
                                                    e.preventDefault()
                                                    this.setState({ emailInput: this.email.value })
                                                    const etherAmountT = this.email.value.toString()
                                                    console.log('email', etherAmountT);
                                                }}
                                                ref={(email) => { this.email = email }}
                                            />
                                            <br />
                                            <input
                                                className="input-fel"
                                                type="text"
                                                placeholder="Password"
                                                onChange={(e) => {
                                                    e.preventDefault()
                                                    this.setState({ emailPasswordInput: this.emailPassword.value })
                                                    const etherAmountT = this.emailPassword.value.toString()
                                                    console.log('emailPassword', etherAmountT);
                                                }}
                                                ref={(emailPassword) => { this.emailPassword = emailPassword }}
                                            />
                                            {/* <br />
                                            <p class="forgot-passw">Create an account!</p>
                                        <p class="forgot-pass" style={{textAlign: "start"}}>Forgot my password!</p> */}
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <button className="log-in" onClick={(e) => {
                                            e.preventDefault()
                                            console.log(this.state.emailPasswordInput);
                                            console.log(this.state.emailInput);
                                            console.log(this.state.adminEmailPassword);
                                            console.log(this.state.adminEmail);

                                            if (this.state.emailPasswordInput !== this.state.adminEmailPassword) {
                                                alert('Password Not Correct')
                                            } else if (this.state.emailInput !== this.state.adminEmail) {
                                                alert('Email Not Correct')
                                            } else {
                                                this.setState({ adminPannel: true })

                                            }
                                        }}>Log In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
        }


        return (
            <>
                <div style={{ width: '100%', height: '100vh', backgroundColor: 'purple' }}>
                    {adminPannel}
                </div>
                <ToastContainer />
            </>

        );
    }
}

export default App;
