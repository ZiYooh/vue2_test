<template>
  <v-content class="mx-15">
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1500"
    >
      <v-col>
        <h3 class="mt-3 ml-2">투표 현황 분석</h3>
      </v-col>
      <v-divider class="mx-4"></v-divider>
      <v-btn
      block
      v-on:click="goBack()"
      color="success"
      class="mx-auto mt-5 mb-3"
      >
      이전 페이지로
      </v-btn>
    <v-simple-table class="mx-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center" id="myhead">
              후보자
            </th>
            <th class="text-center" id="myhead">
              성별 분석
            </th>
            <th class="text-center" id="myhead">
              지역별 분석
            </th>
            <th class="text-center" id="myhead">
              나이대별 분석
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in resultsWithGraphs"
            v-bind:key="item"
          >
            <td class="text-center">{{item.title}}</td>
            <td class="text-center"><pie-chart :chart-data="item.sex"></pie-chart></td>
            <td class="text-center"><bar-chart :chart-data="item.location" :options="chartOptions"></bar-chart></td>
            <td class="text-center"><bar-chart :chart-data="item.age" :options="chartOptions"></bar-chart></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    </v-card>
  </v-content>
</template>

<script>
import axios from "axios";
import BarChart from '../charts/BarChart.vue';
import PieChart from '../charts/PieChart.vue';
import jwtDecode from "jwt-decode";

let i;
let j;
let k;

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

      sex_list: ['남', '여'],
      locations_list: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
                  '제주', '경기', '강원', '충북', '충남', '경북', '경남', '전북', '전남'],

      age_list: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],

      voteDatas: [],
      finalDatas: [],
      
      sexDatas: [],
      locationDatas: [],
      ageDatas: [],
      
      resultsWithGraphs: [],

      chartOptions: {
        scales: {
          yAxes: [{
            display: true, // y축 기준 표시 여부
            ticks: { // y축 기준 데이터 변경
              beginAtZero: true,
            },
          }],
        }, // scales 끝
      },
    };
  },
	created() {
    
	},

  async mounted() {
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

    // 득표수 데이터 정리하기 시작

    // 전체 투표의 모든 득표 가져옴
    await axios.get("http://localhost:5000/users/voteresult").then((response) => {
			this.voteDatas = response.data;
		});
    console.log(this.voteDatas);

    // 그중에서 해당 투표에 맞는 득표들만 걸러냄
    for (i = 0; i < this.voteDatas.length; i++) {
      if(this.voteDatas[i].code == this.code) {
        this.finalDatas.push(this.voteDatas[i]);
      }
    }
    console.log(this.finalDatas);
    
    // 데이터 목록 0으로 초기화
    for (i = 0; i < this.options.length; i++) {
      for (j = 0; j < this.sex_list.length; j++) {
        this.sexDatas.push({option: this.optionsAscii[i], sex: this.sex_list[j], count: 0})
      }
      
      for (j = 0; j < this.locations_list.length; j++) {
        this.locationDatas.push({option: this.optionsAscii[i], location: this.locations_list[j], count: 0})
      }
      
      for (j = 0; j < this.age_list.length; j++) {
        this.ageDatas.push({option: this.optionsAscii[i], age: this.age_list[j], count: 0})
      }
      
    }

    // 성별 데이터 넣기
    for (i = 0; i < this.sexDatas.length; i++ ) {
      for (j = 0; j < this.finalDatas.length; j++) {
        if (this.sexDatas[i].option == this.finalDatas[j].candidate
            && this.sexDatas[i].sex == this.finalDatas[j].sex) {
              this.sexDatas[i].count++;
        }
      }
    }
    console.log(this.sexDatas);

    // 지역 데이터 넣기
    for (i = 0; i < this.locationDatas.length; i++ ) {
      for (j = 0; j < this.finalDatas.length; j++) {
        if (this.locationDatas[i].option == this.finalDatas[j].candidate
            && this.locationDatas[i].location == this.finalDatas[j].location) {
              this.locationDatas[i].count++;
        }
      }
    }
    console.log(this.locationDatas);

    // 나이대 데이터 넣기
    for (i = 0; i < this.ageDatas.length; i++ ) {
      for (j = 0; j < this.finalDatas.length; j++) {
        if (this.ageDatas[i].option == this.finalDatas[j].candidate
            && this.ageDatas[i].age == this.finalDatas[j].age) {
              this.ageDatas[i].count++;
        }
      }
    }

    console.log(this.ageDatas);

    // 득표수 데이터 정리 끝

    
    console.log(this.sexDatas.filter((item) => {
      return item.option == this.optionsAscii[0];
    }).map(item => item.count));
    

    // 그래프 데이터 최종적으로 채움
    this.fillData();

  },

  methods: {
    // 그래프 그리기
    // 후보마다 성별, 지역별, 나이대별 그래프 그려야 하니까
    // 총 후보수 * 3 의 개수의 그래프가 그려져야 함
    fillData() {
      for(i = 0; i < this.options.length; i++){
        console.log('for문들어왓음 ' + i);
        this.sexGraphs[i] = {
          labels: this.sex_list,
          datasets: [
          {
            label: '투표수',
            backgroundColor: ["#1E88E5", "#D81B60"],
            data: this.sexDatas.filter((item) => {
              return item.option == this.optionsAscii[i];})
              .map(item => item.count),
          },
          ],
        };
        console.log(this.sexGraphs[i]);
        // this.locationGraphs[i] = { } ;
        this.locationGraphs[i] = {
          labels: this.locations_list,
          datasets: [
          {
            label: '투표수',
            backgroundColor: ["#1E88E5", "#D81B60", "#3CB371", "#DAA520", "#8B008B", "#778899", "#4682B4", "#800000", "#000000",
                              "#87CEFA", "#F08080", "#98FB98", "#D2691E", "#483D8B", "#2F4F4F", "#6495ED", "#A0522D"],
            data: this.locationDatas.filter((item) => {
              return item.option == this.optionsAscii[i];})
              .map(item => item.count),
          },
          ],
        };
        // this.ageGraphs[i] = { };
        this.ageGraphs[i] = {
          labels: this.age_list,
          datasets: [
          {
            label: '투표수',
            backgroundColor: ["#1E88E5", "#D81B60", "#3CB371", "#DAA520", "#8B008B", "#778899"],
            data: this.ageDatas.filter((item) => {
              return item.option == this.optionsAscii[i];})
              .map(item => item.count),
          },
          ],
        };
        this.resultsWithGraphs.push({ title: this.optionsAscii[i], count: this.votes[i],
                                      sex: this.sexGraphs[i], location: this.locationGraphs[i],
                                      age: this.ageGraphs[i]});
        console.log(this.resultsWithGraphs[i]);
      }
    },

    goBack() {
      //this.$router.push({ name: 'NowVote', params: {code: this.code} });
      this.$router.go(-1);
    },
  },
}
</script>

<style>
#myhead{
  font-size: 14px;
  text-align: center;
  color: black;
}
</style>