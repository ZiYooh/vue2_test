/*
const Hello = artifacts.require("Hello"); // artifacts.require 가 build 폴더 안에있는 Lottery 데이터 가지고옴 
const SANGSU = artifacts.require("SANGSU");
const TESTONE = artifacts.require("TESTONE");
const FINISHTEST = artifacts.require("FINISHTEST");
*/
const PNUTEST = artifacts.require("PNUTEST");

module.exports = function(deployer) { 
	/*
	<=== 배포 완료된 컨트랙트들 ===>
	var options = ['오징어버거', '라이스버거', '유러피언프리코치즈버거', '텐더그릴치킨버거'];
	deployer.deploy(Hello, options.map(name => web3.utils.utf8ToHex(name))); // bytecode를 가지고 와 deployer 배포 (deploy) 해줌 

	var options2 = ['후보1', '후보2', '후보3'];
	deployer.deploy(SANGSU, options2.map(name => web3.utils.utf8ToHex(name))); // bytecode를 가지고 와 deployer 배포 (deploy) 해줌 

	var options3 = ['1번 출품작', '2번 출품작', '3번 출품작', '4번 출품작', '5번 출품작'];
	deployer.deploy(TESTONE, options3.map(name => web3.utils.utf8ToHex(name))); // bytecode를 가지고 와 deployer 배포 (deploy) 해줌 

	var options4 = ['A연습생', 'B연습생', 'C연습생', 'D연습생', 'E연습생', 'F연습생'];
	deployer.deploy(FINISHTEST, options4.map(name => web3.utils.utf8ToHex(name))); // bytecode를 가지고 와 deployer 배포 (deploy) 해줌 
	*/

	var options5 = ['대상1', '대상2', '대상3'];
	deployer.deploy(PNUTEST, options5.map(name => web3.utils.utf8ToHex(name))); // bytecode를 가지고 와 deployer 배포 (deploy) 해줌 

};