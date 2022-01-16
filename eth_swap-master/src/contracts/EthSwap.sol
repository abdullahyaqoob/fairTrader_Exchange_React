pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  uint public rate = 200;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  // intrest
  mapping(address => bool) public isDeposited;
  mapping(address => uint) public depositStart;

  // events
  // event Deposit(address indexed user, uint etherAmount, uint timeStart);

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rateFtp
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public {
    token = _token;
  }

  // function buyTokens(uint _rateFtp) public payable {
  function buyTokens() public payable {
    // Calculate the number of tokens to buy
    uint256 tokenAmount = msg.value * rate;

    // uint256 tokenAmount1 = msg.value;
    // uint256 tokenAmount2 = tokenAmount1 + 000000000000000000;
    // uint256 tokenAmount = tokenAmount2 * rate;

    // Require that EthSwap has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function stakeTokens(uint _amount) public {
    require(isDeposited[msg.sender] == false, 'Error, deposit already active');

    // Require amount greater than 0
    require(_amount > 0, "amount cannot be 0");

    // Trasnfer Mock Dai tokens to this contract for staking
    token.transferFrom(msg.sender, address(this), _amount);

    // intrest
    // depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;
    isDeposited[msg.sender] = true; //activate deposit status

    // Update staking balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    // Add user to stakers array *only* if they haven't staked already
    if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
    }

    // Update staking status
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;

    //function emit
    // emit Deposit(msg.sender, msg.value, block.timestamp);
}

// Unstaking Tokens (Withdraw)
function unstakeTokens() public {
  // require(isDeposited[msg.sender]==true, 'Error, no previous deposit');

    // Fetch staking balance
    uint balance = stakingBalance[msg.sender];

    //check user's hodl time
    // uint depositTime = block.timestamp - depositStart[msg.sender];

    // Require amount greater than 0
    require(balance > 0, "staking balance cannot be 0");

    uint intrest = balance * 25 / 100;
    uint unstakeBalance = balance + intrest;

    // Transfer Mock Dai tokens to this contract for staking
    token.transfer(msg.sender, unstakeBalance);

    // Reset staking balance
    stakingBalance[msg.sender] = 0;

    // Update staking status
    isStaking[msg.sender] = false;
}

}
