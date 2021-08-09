pragma solidity >=0.4.0 <0.6.0;

contract Voting{
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesReceived;

    struct VotingInfo{
        address voter;
        string candidate;
        uint voteDate;
    }

    // 투표 할 때, 투표자랑 후보자 기록하는 이벤트
    event voteForSomeone(
        address indexed _voter,
        bytes32 candidate
    );

    // Constructor to initialize candidates
    constructor(bytes32[] memory candidateNames) public{
        candidateList = candidateNames;
    }

    // Get count of votes for each candidates
    function voteForCandidate(bytes32 candidate) public{
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
        emit voteForSomeone(msg.sender, candidate);
    }

    // Vote for candidates
    function totalVotesFor(bytes32 candidate) view public returns(uint8){
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }
    
    // Check if candidate is valid
    function validCandidate(bytes32 candidate) view public returns (bool){
        for(uint i = 0; i < candidateList.length; i++){
            if(candidateList[i] == candidate){
                return true;
            }
        }
        return false;
    }


}