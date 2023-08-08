// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

//import "hardhat.console.sol";

contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 time);

    constructor(uint256 _unlockedTime) public payable {
        require(block.timestamp < _unlockedTime, " unlock time should be in future" );

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp <= unlockedTime, "wait till time period complited");
        require(msg.sender == owner, "you are not the owner ");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance); 
    }
    
}