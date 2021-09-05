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
          <tr
            v-for="item in results"
            v-bind:key="item"
          >
            <td>{{item.title}}</td>
            <td>{{item.count}}</td>
          </tr>
        </tbody>
        <v-btn class="ma-2" :loading="loading2" :disabled="loading2" color="info" @click="loader = 'loading2'">
          해당 투표 블록체인 정보 확인
        </v-btn>
        <v-btn to="/conntest">
          테스트페이지로
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
              <v-radio-group v-model="picked" column>
                <v-radio
                  v-for="item in results"
                  v-bind:key="item"
                  :label="`${item.title}`"
                  :value="`${item.title}`"
                >
                </v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">
                닫기
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false" v-on:click="voteForOption()">
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
let i;

export default {
  data() {
    return {
      account: '',
      contractInstance: null,
      func1: null,
      func2: null,
      func3: null,
      dialog: false,
      options: [],
      optionsAscii: [],
      votes: [],
      results: [],
      picked: null,
    };
  },

  async mounted() {
    this.contractInstance = new this.$web3.eth.Contract(this.$config.HELLO_ABI, this.$config.HELLO_CA);
    this.account = await this.$getDefaultAccount();
    this.options = (await this.contractInstance.methods.getOptionList().call());
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.optionsAscii[i] = this.$web3.utils.hexToUtf8(this.options[i]);
    }
    /*
    for (i = 0; i < this.options.length; i++) {
      this.optionsAscii[i] = this.optionsAscii[i].replace(/\0/g, ''); // 문자열 뒤에 Null문자(\u0000) 제거
    }
    */
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.votes[i] = await this.contractInstance.methods.totalVotesFor(this.$web3.utils.utf8ToHex(this.optionsAscii[i])).call();
      console.log(this.votes[i]);
    }
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.results.push({ title: this.optionsAscii[i], count: this.votes[i] });
      console.log(this.results[i]);
    }
  },

  methods: {
    async voteForOption() {
      if (!this.picked) {
        alert('대상을 선택해 주세요');
        return;
      }
      await this.contractInstance.methods.voting(this.$web3.utils.asciiToHex(this.picked)).send({ gas: 140000, from: this.account });
      this.$router.go();
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
