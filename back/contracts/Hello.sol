pragma solidity >=0.4.21 <0.7.0; 

contract Hello { 
	  address public owner; // public 으로 선언하여 자동 getter 생성 
    
    constructor() public { 
    	owner = msg.sender; 
    } 
    
    function getSomeValue() public pure returns (uint256 value){ 
    	return 5; 
    } 
}