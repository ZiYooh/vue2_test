<template>
  <v-content class="mx-16 px-16">
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
        <v-btn class="mx-2" color="info" to="/blockinfo">
          투표 현황 확인
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
        <v-btn> 테스트 </v-btn>
      </template>
    </v-simple-table>
    <v-container class="grey lighten-5">
    <v-row>
      <bar-chart :chart-data="dataCollection"></bar-chart>
      <v-spacer></v-spacer>
      <pie-chart :chart-data="dataCollection2"></pie-chart>
    </v-row>
    </v-container>
  </v-content>
</template>

<script>
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';

let i;

export default {
  components: {
    BarChart,
    PieChart,
  },

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
      dataCollection: null,
      dataCollection2: null,
    };
  },
  created() {
    
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
    this.fillData();
  },

  methods: {
    async voteForOption() {
      if (!this.picked) {
        alert('대상을 선택해 주세요');
        return;
      }
      await this.contractInstance.methods.voting(this.$web3.utils.utf8ToHex(this.picked)).send({ gas: 250000, from: this.account });
      this.$router.go();
    },

    fillData() {
      this.dataCollection = {
        labels: this.optionsAscii,
        datasets: [
          {
            label: '투표수',
            backgroundColor: ["#F48FB1", "#AAAAAA", "#D81B60", "#1E88E5", "#FDD835"],
            data: this.votes,
          },
        ],
      };
      console.log('ChartTestMain', this.dataCollection);
      
      this.dataCollection2 = {
        labels: this.optionsAscii,
        datasets: [
          {
            borderWidth: 5,
            backgroundColor: ["#F48FB1", "#AAAAAA", "#D81B60", "#1E88E5", "#FDD835"],
            data: this.votes,
          },
        ],
      };
      console.log('ChartTestMain', this.dataCollection2);
    },
  },

};
</script>

<style>

</style>
