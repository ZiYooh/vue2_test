<template>
  <v-main>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              후보자
            </th>
            <th class="text-left">
              성별 분석
            </th>
            <th class="text-left">
              지역별 분석
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in results"
            v-bind:key="item"
          >
            <td>{{item.title}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-main>
</template>

<script>
import axios from "axios";
import BarChart from '../charts/BarChart.vue';
import PieChart from '../charts/PieChart.vue';
import jwtDecode from "jwt-decode";

let i;

export default {
  components: {
    BarChart,
    PieChart,
  },

  data() {
    const token = localStorage.usertoken;
		const decoded = jwtDecode(token);

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

      sexGraphs: [],
      locationGraphs: [],
      ageGraphs: [],
      
      code: null,
      aaaa: null,
      bbbb: null,
      sentence: null,

			sex: decoded.sex,
			location: decoded.location,
    };
  },
  created() {
    
  },
  async mounted() {
    this.code = this.$route.params.code;
    this.aaaa = "this.$config." + this.code + "_ABI";
    this.bbbb = "this.$config." + this.code + "_CA";
    this.sentence = "new this.$web3.eth.Contract(" + this.aaaa + ", " + this.bbbb + ");";
    console.log(this.sentence);
    this.contractInstance = eval(this.sentence);
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
      this.voteInfotransfer(this.picked);
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

    gotoInfo() {
      this.$router.push({name: "VoterInfo", params: {code: this.code} });
    },
    
    gotoAnalyze() {
      this.$router.push({name: "VoteAnalyze", params: {code: this.code} });
    },
  },
}
</script>

<style>

</style>