import React, { Component } from 'react'
import ftpLogo from '../ftp.png'

class SellForm extends Component {

  async componentWillMount() {
    console.log('1122', this.props.stakingBalance);
    console.log('1122', this.props.tokenFarm);
  }


  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <div>
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} Ftp</td>
              {/* <td>{window.web3.utils.fromWei(this.props.tokenFarm, 'Ether')} DAPP</td> */}
              <td>25% Ftp</td>
            </tr>
          </tbody>
        </table>
        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          // let notFormatedAmount = etherAmount
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.stakeTokens(etherAmount)
        }}>
          <div>
            <label className="float-left"><b>Stake Tokens</b></label>
            {/* <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span> */}
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const tokenAmount = this.input.value.toString()
                this.setState({
                  output: tokenAmount / 100
                })
              }}
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ftpLogo} height='32' alt="" />
                &nbsp; Ftp
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">Stake!</button>
        </form>
        <button
          type="submit"
          className="btn btn-link btn-block btn-sm"
          onClick={(event) => {
            event.preventDefault()
            this.props.unstakeTokens()
          }}>
          UN-STAKE...
        </button>
      </div>
    );
  }
}

export default SellForm;
