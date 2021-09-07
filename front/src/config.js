const Hello = require('../../back/build/contracts/Hello.json');

export default {
  HELLO_CA: Hello.networks[5777].address,
  HELLO_ABI: Hello.abi,
  GAS_AMOUNT: 500000,
};
