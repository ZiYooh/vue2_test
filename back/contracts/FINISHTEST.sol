pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract FINISHTEST { 
	address public owner; // public 으로 선언하여 자동 getter 생성 
    
    string[] public optionList;
    mapping (address => string) public uservotes;
    mapping (string => uint8) public votes;
    mapping (address => uint8) public vote_or_not; // 0 = 투표 안했음 1 = 해당 투표 이미 했음
    uint public voteTime;

    struct VoterInfo{
        address voter;
        string option;
        uint votetime;
    }

    VoterInfo[] VoteResult;

    constructor(string[] memory options) public { 
        owner = msg.sender; 
        optionList = options;
    }
    
    function voting(string memory option) public {
        //require(uservotes[msg.sender]=='');
        uservotes[msg.sender] = option;
        votes[option] += 1;
        vote_or_not[msg.sender] = 1;
        voteTime = now;
        VoterInfo memory info = VoterInfo(msg.sender, option, now);
        pushInfo(info);
    }

    function totalVotesFor(string memory option) view public returns (uint8) {
        require(validOption(option));
        return votes[option];
    }

    function pushInfo(VoterInfo memory info) public {
        VoteResult.push(info);
    }

    function getResult() view public returns (VoterInfo[] memory){
        return VoteResult;
    }

    function validOption(string memory option) view public returns (bool) {
        for(uint i = 0; i < optionList.length; i++) {
            /*
            if (optionList[i] == option) {
                return true;
            }
            */
            // String 형식에서 문자열 비교하기
            if (keccak256(abi.encodePacked(optionList[i])) == keccak256(abi.encodePacked(option))) {
                return true;
            }
        }
        return false;
    }

    function getOptionList() public view returns(string[] memory options) {
        return optionList;
    }
    
    // 중복투표 여부 확인
    function isVoted(address user) public view returns (bool) {
        if(vote_or_not[user] == 1){
            return true;
        } else {
            return false;
        }
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