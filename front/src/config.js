const Hello = require('../../back/build/contracts/Hello.json');
const SANGSU = require('../../back/build/contracts/SANGSU.json');

export default {
  // 5777 = 가나슈 네트워크 번호로, 다른 네트워크에 배포 시 수정해야함
  HELLO_CA: Hello.networks[5777].address,
  HELLO_ABI: Hello.abi,

  SANGSU_CA: SANGSU.networks[5777].address,
  SANGSU_ABI: SANGSU.abi,

  GAS_AMOUNT: 500000,
};
