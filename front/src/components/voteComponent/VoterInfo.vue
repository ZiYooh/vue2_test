<template>
  <v-content class="mx-15">
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1500"
    >
      <v-col>
        <h3 class="mt-3 ml-2">지갑 주소별 투표내역 확인 페이지</h3>
      </v-col>
      <v-divider class="mx-4"></v-divider>

      <v-col>
        <h4 class="ml-2">주소 클릭 시 해당 지갑의 이더스캔 페이지로 이동합니다.</h4>
      </v-col>
      <v-divider class="mx-4"></v-divider>
      <v-btn
        block
        v-on:click="goBack()"
        color="success"
        class="mt-5 mb-5"
      >
        이전 페이지로
      </v-btn>
      <v-divider class="mx-4"></v-divider>
      <v-card>
        <v-simple-table class="mx-4">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  #
                </th>
                <th class="text-center">
                  지갑 주소
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
                <td class="text-center">{{ item.index }}</td>
                <td class="text-center" id="myid" v-on:click="openEtherScan(item.voter)">{{ item.voter }}</td>
                <td class="text-center">{{ item.option }}</td>
                <td class="text-center">{{ item.votetime }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-card>
  </v-content>
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
      code: null,
      aaaa: null,
      bbbb: null,
      sentence: null,
    };
  },
  created() {
    
  },
  async mounted() {
    console.log('Mounted 시작');
    this.code = this.$route.params.code;
    this.aaaa = "this.$config." + this.code + "_ABI";
    this.bbbb = "this.$config." + this.code + "_CA";
    this.sentence = "new this.$web3.eth.Contract(" + this.aaaa + ", " + this.bbbb + ");";
    this.contractInstance = eval(this.sentence);
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
      window.open('https://ropsten.etherscan.io/address/'+ address);
    },
    goBack() {
      //this.$router.push({ name: 'NowVote', params: {code: this.code} });
      this.$router.go(-1);
    },
  },
};
</script>
<style>
#myid {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>