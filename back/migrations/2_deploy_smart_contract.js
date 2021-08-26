const Hello = artifacts.require("Hello"); // artifacts.require 가 build 폴더 안에있는 Lottery 데이터 가지고옴 

module.exports = function(deployer) { 
	deployer.deploy(Hello); // Lottery 의 bytecode를 가지고 와 deployer 배포 (deploy) 해줌 
};