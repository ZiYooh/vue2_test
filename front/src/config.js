const Hello = require('../../back/build/contracts/Hello.json');
const SANGSU = require('../../back/build/contracts/SANGSU.json');
const TESTONE = require('../../back/build/contracts/TESTONE.json');
const FINISHTEST = require('../../back/build/contracts/FINISHTEST.json');

export default {
  // 5777 = 가나슈 네트워크 번호로, 다른 네트워크에 배포 시 수정해야함
  HELLO_CA: Hello.networks[5777].address,
  HELLO_ABI: Hello.abi,

  SANGSU_CA: SANGSU.networks[5777].address,
  SANGSU_ABI: SANGSU.abi,

  TESTONE_CA: TESTONE.networks[5777].address,
  TESTONE_ABI: TESTONE.abi,

  FINISHTEST_CA: FINISHTEST.networks[5777].address,
  FINISHTEST_ABI: FINISHTEST.abi,

  GAS_AMOUNT: 500000,
};
