const Hello = require('../../back/build/contracts/Hello.json');
const SANGSU = require('../../back/build/contracts/SANGSU.json');
const TESTONE = require('../../back/build/contracts/TESTONE.json');
const FINISHTEST = require('../../back/build/contracts/FINISHTEST.json');
const PNUTEST = require('../../back/build/contracts/PNUTEST.json');

export default {
  // 5777 = 가나슈 네트워크 번호로, 다른 네트워크에 배포 시 수정해야함
  // 3 = Ropsten 테스트넷 번호
  HELLO_CA: Hello.networks[3].address,
  HELLO_ABI: Hello.abi,

  SANGSU_CA: SANGSU.networks[3].address,
  SANGSU_ABI: SANGSU.abi,

  TESTONE_CA: TESTONE.networks[3].address,
  TESTONE_ABI: TESTONE.abi,

  FINISHTEST_CA: FINISHTEST.networks[3].address,
  FINISHTEST_ABI: FINISHTEST.abi,
  
  PNUTEST_CA: PNUTEST.networks[3].address,
  PNUTEST_ABI: PNUTEST.abi,
  
  GAS_AMOUNT: 5500000,
};
