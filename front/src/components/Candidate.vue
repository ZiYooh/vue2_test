<template>
    <v-content class="mx-15 mt-15">
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
                    <tr v-for="item in candidates" :key="item.name">
                        <!--
                        <td>{{ item.name }}</td>
                        <td>{{ item.vote }}</td>
                        -->
                    </tr>
                </tbody>
                <v-text-field
                    v-model="search"
                    label="후보자 입력"
                    single-line="single-line"
                    hide-details="hide-details"></v-text-field>
                <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    color="secondary"
                    @click="loader = 'loading'">
                    투표하기
                </v-btn>
                <v-btn
                    class="ma-2"
                    :loading="loading2"
                    :disabled="loading2"
                    color="info"
                    @click="loader = 'loading2'">
                    해당 투표 블록체인 정보 확인
                </v-btn>
                <v-btn
                    class="ma-2"
                    :loading="loading3"
                    :disabled="loading3"
                    color="#E0F2F1"
                    @click="loader = 'loading3'"
                    v-on:click="votefor1">
                    후보1 투표
                </v-btn>
                <v-btn
                    class="ma-2"
                    :loading="loading4"
                    :disabled="loading4"
                    color="#E0F2F1"
                    @click="loader = 'loading4'">
                    후보2 투표
                </v-btn>
                <v-btn
                    class="ma-2"
                    :loading="loading5"
                    :disabled="loading5"
                    color="#E0F2F1"
                    @click="loader = 'loading5'">
                    후보3 투표
                </v-btn>
            </template>
        </v-simple-table>
    </v-content>
</template>

<script>
import Web3 from 'web3';

const { web3 } = this;


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
    };
  },
  async mounted() {
    this.contractInstance = this.$web3.eth.contract(this.$config.VOTE_ABI).at(this.$config.VOTE_CA);
    this.account = await this.$getDefaultAccount();
  },

  methods: {
    votefor1() {
      alert('Vote1했음니다');
    },
    votefor2() {

    },
    votefor3() {

    },
    showVoteModal() {
      this.getOptions()
      
      this.$refs.modalVote.show()
    },

    showTotalResult() {
      this.getTotalVotes()

      this.$refs.modalTotal.show()
    },

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
