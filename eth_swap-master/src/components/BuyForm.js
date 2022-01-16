import React, { Component } from 'react'
import ftpLogo from '../ftp.png'
import ethLogo from '../eth-logo.png'
import axios from 'axios'

class BuyForm extends Component {

  async componentWillMount() {
    const web3 = window.web3

    axios.get("https://deep-index.moralis.io/api/v2/erc20/0x32151d601f6578399136c57030890fbb48ede685/price?chain=bsc",
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'DladmpINpdX524fcvOq711RWS5p9o7N9hfBZUdw4AyqIKA4A06p48Q00plHGp5RW'
        }
      }
    )
      .then((res) => {
        this.setState({ rateOfFtp: res.data.nativePrice.value })
        const rateOfFtpFormated = web3.utils.fromWei(res.data.nativePrice.value, 'ether')
        this.setState({ rateOfFtpFormated })
        console.log(this.state.rateOfFtpFormated);
        console.log(this.state.rateOfFtp);
      }).catch((err) => {
        console.log(err);
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      output: '0',
      rateOfFtp: '',
      rateOfFtpFormated: ''
    }
  }

  render() {
    return (
      <div>
        <form className="mb-3" onSubmit={(event) => {
            let etherAmount
            etherAmount = this.input.value.toString()
          if (etherAmount > 98) {
            event.preventDefault()
            alert('Incufficent Liquidity')
          } else {
            event.preventDefault()
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            // this.props.buyTokens(etherAmount, 200)
            console.log('1EtherAmount', etherAmount);
            this.props.buyTokens(etherAmount)
          }
        }}>
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const etherAmount = this.input.value.toString()
                this.setState({
                  // output: etherAmount / this.state.rateOfFtpFormated
                  output: etherAmount * 200
                })
              }}
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ethLogo} height='32' alt="" />
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={this.state.output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ftpLogo} height='32' alt="" />
                &nbsp; Ftp
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            {/* <span className="float-right text-muted">1 ETH = 100 Ftp</span> */}
            {/* <span className="float-right text-muted">1 Ftp = {this.state.rateOfFtpFormated} Eth</span> */}
            <span className="float-right text-muted">1 Eth = 200 Ftp</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
        </form>
        <br />
        <div>
          <span><b><i>Ftp Rate:</i></b>  <span className='float-right colorGreen'>{this.state.rateOfFtpFormated} BNB</span></span>
        </div>
      </div>
    );
  }
}

export default BuyForm;
