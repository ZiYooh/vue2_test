<template>
  <v-content class="mx-15">
    <v-card
      outlined
      class="mx-auto mt-5"
      max-width="1500"
    >
      <v-col>
        <h3 class="mt-3 ml-2">투표 제목:&nbsp;{{nowVote.voteName}}</h3>
      </v-col>
    <v-divider class="mx-4"></v-divider>
    <v-simple-table class="mx-15 mt-3 mb-6">
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
        <v-btn class="mx-2 mt-4 white--text" color="blue-grey" v-on:click="gotoInfo()">
          투표 내역 확인
        </v-btn>
        <v-btn class="mx-2 mt-4" color="secondary" v-on:click="gotoAnalyze()">
          투표 현황 분석
        </v-btn>
        <v-btn class="mx-2 mt-4" color="info" to="/votelist">
          목록으로 돌아가기
        </v-btn>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="float-right" color="primary" dark v-bind="attrs" v-on="on">
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
    <v-divider class="mx-4"></v-divider>
      <v-col>
        <h4 class="mt-3 ml-2">투표 설명</h4>
      </v-col>
    <v-divider class="mx-4 mb-4"></v-divider>
      <v-col>
        <span class="ml-2">{{nowVote.description}}</span>
      </v-col>
    <v-divider class="mx-4 mt-3 mb-4"></v-divider>
    <v-col>
        <h4 class="mt-3 ml-2">투표 기간</h4>
      </v-col>
    <v-divider class="mx-4 mb-4"></v-divider>
      <v-col>
        <span class="ml-2">{{nowVote.startDate.substring(0,10)}} ~ {{nowVote.endDate.substring(0,10)}}</span>
      </v-col>
    <v-divider class="mx-4 mt-3 mb-4"></v-divider>
    <v-container class="grey lighten-5">
    <v-row>
      <bar-chart :chart-data="dataCollection" :options="chartOptions"></bar-chart>
      <v-spacer></v-spacer>
      <pie-chart :chart-data="dataCollection2"></pie-chart>
    </v-row>
    </v-container>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      color="success"
      timeout="9999999"
    >
    <div class="text-center">
      확인 버튼을 누른 후 투표 결과가 반영되기까지 시간이 소요됩니다. <br>
      투표 완료까지 페이지를 벗어나지 말아주세요.
      완료 시 자동으로 새로고침 됩니다. <br>
        <v-progress-circular
          indeterminate
        ></v-progress-circular>
    </div>
    </v-snackbar>
  </v-content>
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
      code: null,
      aaaa: null,
      bbbb: null,
      sentence: null,
      rVotes: [], 
      nowVote: '',

			sex: decoded.sex,
      age: decoded.age,
			location: decoded.location,

      snackbar: false,

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
    if(this.$store.state.user < 1) {
        alert("로그인 해 주세요!");
        this.$router.push('/');
    }
    this.code = this.$route.params.code;
    axios.get("http://localhost:5000/users/votelist").then((response) => {
			this.rVotes = response.data;
      for (i = 0; i < this.rVotes.length; i++){
        if(this.rVotes[i].voteCode == this.code){
          this.nowVote = this.rVotes[i];
        }
      }
		});
    console.log(this.rVotes);
  },
  async mounted() {    
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
    this.fillData();

  },

  methods: {
    async voteForOption() {
      if (!this.picked) {
        alert('대상을 선택해 주세요');
        return;
      }

      if(this.$store.state.user == 2) {
        alert("투표는 일반회원만 가능합니다");
        return;
      }
      
      if(await this.contractInstance.methods.isVoted(this.account).call() == true){
        alert("이미 해당 투표에 투표하셨습니다.");
        return;
      }

      this.snackbar = true;
      await this.contractInstance.methods.voting(this.$web3.utils.utf8ToHex(this.picked)).send({ gas: 2500000, from: this.account });
      this.voteInfotransfer(this.picked);
    },

    fillData() {
      this.dataCollection = {
        labels: this.optionsAscii,
        datasets: [
          {
            label: '투표수',
            backgroundColor: ["#1E88E5", "#D81B60", "#3CB371", "#DAA520", "#8B008B", "#778899", "#4682B4", "#800000", "#000000",
                              "#87CEFA", "#F08080", "#98FB98", "#D2691E", "#483D8B", "#2F4F4F", "#6495ED", "#A0522D"],
            data: this.votes,
          },
        ],
      };
      
      this.dataCollection2 = {
        labels: this.optionsAscii,
        datasets: [
          {
            borderWidth: 5,
            backgroundColor: ["#1E88E5", "#D81B60", "#3CB371", "#DAA520", "#8B008B", "#778899", "#4682B4", "#800000", "#000000",
                              "#87CEFA", "#F08080", "#98FB98", "#D2691E", "#483D8B", "#2F4F4F", "#6495ED", "#A0522D"],
            data: this.votes,
          },
        ],
      };
    },

    gotoInfo() {
      this.$router.push({name: "VoterInfo", params: {code: this.code} });
    },
    
    gotoAnalyze() {
      this.$router.push({name: "VoteAnalyze", params: {code: this.code} });
    },

    voteInfotransfer(votedCandidate) {
      axios
      .post("http://localhost:5000/users/voteresult", {
        code: this.code,
        sex: this.sex,
        age: this.age,
        location: this.location,
        candidate: votedCandidate
      })
      .then(() => {
        this.$router.go();
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },

};
</script>

<style>

</style>
