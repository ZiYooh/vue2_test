<template>
  <v-content class="mx-16 mt-14 px-16">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              후보자
            </th>
            <th class="text-left">
              득표수
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(option, index) in results"
              :key="index">
            <td>{{option.title}}</td>
            <td>{{option.count}}</td>
          </tr>
        </tbody>
        <v-btn class="ma-2" :loading="loading2" :disabled="loading2" color="info" @click="loader = 'loading2'">
          해당 투표 블록체인 정보 확인
        </v-btn>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              투표 창 열기
            </v-btn>
          </template>
          <v-card>
            <v-card-title>후보자 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="dialogm1" column>
                <v-radio label="후보1" value="후보1"></v-radio>
                <v-radio label="후보2" value="후보2"></v-radio>
                <v-radio label="후보3" value="후보3"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">
                닫기
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                투표
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>
  </v-content>
</template>

<script>

export default {
  data() {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      account: '',
      contractInstance: null,
      selectedOption: null,
      options: [],
      results: [],
      dialogm1: '',
      dialog: false,
    };
  },
  async mounted() {
    this.contractInstance = this.$web3.eth.contract(this.$config.VOTE_ABI).at(this.$config.VOTE_CA);
    this.account = await this.$getDefaultAccount();
  },

  methods: {
    getOptions() {
      this.options = []
      this.contractInstance.getOptionList({}, (err, result) => {        
        for(let key in result){
          this.options.push(this.$web3.toAscii(result[key]))
        }        
      })
    },

    getTotalVotes() {
      this.results = []
      this.contractInstance.getOptionList({}, (err, result) => {        
        for(let key in result){
          const option = this.$web3.toAscii(result[key])
          this.contractInstance.totalVotesFor(option, {}, (err, result) => {            
            this.results.push({'title': option, 'count': result.toNumber()})
          })
        }
      })
    },

    handleChooseOption() {    
      if(!this.selectedOption){
        alert("please select a option")
        return
      }
      this.contractInstance.voting(this.selectedOption, {from: this.account, gas: this.$config.GAS_AMOUNT}, (error, transactionHash) => {     
            console.log("txhash",transactionHash)            
        })
      this.watchVoted((error, result) => {
        if(!error) alert("Vote completed...!")
      })
    },

    async watchVoted(cb) {
      const currentBlock = await this.getCurrentBlock()
      const eventWatcher = this.contractInstance.VoteCompleted({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
      eventWatcher.watch(cb)
    },

    getCurrentBlock() {
      return new Promise((resolve, reject ) => {
        this.$web3.eth.getBlockNumber((err, blocknumber) => {
            if(!err) resolve(blocknumber)
            reject(err)
        })
      })
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
