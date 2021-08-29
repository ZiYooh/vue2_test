pragma solidity >=0.4.21 <0.7.0; 

contract Hello { 
	address public owner; // public 으로 선언하여 자동 getter 생성 
    
    bytes32[] public optionList;
    mapping (address => bytes32) public uservotes;
    mapping (bytes32 => uint8) public votes;

    constructor(bytes32[] memory options) public { 
        owner = msg.sender; 
        optionList = options;
    }
    
    function voting(bytes32 option) public {
        require(uservotes[msg.sender]=='');
        uservotes[msg.sender] = option;
        votes[option] += 1;


    }

    function totalVotesFor(bytes32 option) view public returns (uint8) {
        require(validOption(option));
        return votes[option];
    }

    function validOption(bytes32 option) view public returns (bool) {
        for(uint i = 0; i < optionList.length; i++) {
            if (optionList[i] == option) {
                return true;
            }
        }

        return false;
    }

    function getOptionList() public view returns(bytes32[] memory options) {
        return optionList;
    }
    

    // 아래는 테스트용 함수들 이다
    function getSomeValue() public pure returns (uint256 value){ 
    	return 5; 
    } 

    function whoIsOwner() public view returns (address){
        return owner;
    }

    function helloWorld() public view returns (string memory){
        return "Hello World!";
    }
}