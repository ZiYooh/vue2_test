const Hello = artifacts.require("Hello"); // artifacts.require 가 build 폴더 안에있는 Lottery 데이터 가지고옴 

module.exports = function(deployer) { 
	var options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5'];
	deployer.deploy(Hello, options.map(name => web3.utils.asciiToHex(name))); // Lottery 의 bytecode를 가지고 와 deployer 배포 (deploy) 해줌 
};