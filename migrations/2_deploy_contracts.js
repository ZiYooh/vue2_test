const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting, ['후보1', '후보2', '후보3'].map(name => web3.utils.asciiToHex(name)));
};
