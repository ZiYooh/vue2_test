<template>
  <v-app class="mt-15">
    <h1>블럭정보 테스트 페이지</h1>
  </v-app>
</template>

<script>
let i;

export default {
  data() {
    return {
      account: '',
      contractInstance: null,
      options: [],
      optionsAscii: [],
      votes: [],
      results: [],
      lastblocknum: null,
    };
  },
  created() {
    
  },
  async mounted() {
    console.log('Mounted 시작');
    this.contractInstance = new this.$web3.eth.Contract(this.$config.HELLO_ABI, this.$config.HELLO_CA);
    this.account = await this.$getDefaultAccount();
    this.options = (await this.contractInstance.methods.getOptionList().call());
    for (i = 0; i < this.options.length; i++) {
      this.optionsAscii[i] = this.$web3.utils.hexToUtf8(this.options[i]);
    }
    /*
    for (i = 0; i < this.options.length; i++) {
      this.optionsAscii[i] = this.optionsAscii[i].replace(/\0/g, ''); // 문자열 뒤에 Null문자(\u0000) 제거
    }
    */
    for (i = 0; i < this.options.length; i++) {
      this.votes[i] = await this.contractInstance.methods.totalVotesFor(this.$web3.utils.utf8ToHex(this.optionsAscii[i])).call();
    }
    for (i = 0; i < this.options.length; i++) {
      this.results.push({ title: this.optionsAscii[i], count: this.votes[i] });
    }
    this.lastblocknum = await this.$web3.eth.getBlockNumber();
    console.log('마지막블록넘버');
    console.log(this.lastblocknum);
    for (i = 0; i < this.lastblocknum; i++){
      console.log(await this.$web3.eth.getBlock(i));
    }
  },
};
</script>
<style>

</style>