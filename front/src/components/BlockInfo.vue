<template>
  <v-app class>
    <h1>투표정보 테스트 페이지</h1>
    <v-simple-table class="mx-auto">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              #
            </th>
            <th class="text-center">
              계좌 주소
            </th>
            <th class="text-center">
              대상
            </th>
            <th class="text-center">
              투표 일시
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in voteinfo"
            v-bind:key="item.index"
          >
            <td>{{ item.index }}</td>
            <td v-on:click="openEtherScan(item.voter)">{{ item.voter }}</td>
            <td>{{ item.option }}</td>
            <td>{{ item.votetime }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      receivedinfo: [],
      voteinfo: [],
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
    
    this.receivedinfo = await this.contractInstance.methods.getResult().call();

    for (i = 0; i < this.receivedinfo.length; i++) {
      this.voteinfo.push({index: i, voter: this.receivedinfo[i].voter, option: this.$web3.utils.hexToUtf8(this.receivedinfo[i].option), votetime: this.receivedinfo[i].votetime });
    }
  },

  methods: {
    openEtherScan(address) {
      window.open('https://etherscan.io/address/'+ address);
    }
  },
};
</script>
<style>

</style>