const Hello = artifacts.require("Hello"); // artifacts.require 가 build 폴더 안에있는 Lottery 데이터 가지고옴 
const SANGSU = artifacts.require("SANGSU");

module.exports = function(deployer) { 
	var options = ['오징어버거', '라이스버거', '유러피언프리코치즈버거', '텐더그릴치킨버거'];
	deployer.deploy(Hello, options.map(name => web3.utils.utf8ToHex(name))); // Lottery 의 bytecode를 가지고 와 deployer 배포 (deploy) 해줌 

	var options2 = ['후보1', '후보2', '후보3'];
	deployer.deploy(SANGSU, options2.map(name => web3.utils.utf8ToHex(name))); // Lottery 의 bytecode를 가지고 와 deployer 배포 (deploy) 해줌 
};