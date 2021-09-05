<template>
  <v-app id="app">
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-title>카드 제목 1</v-card-title>
    <v-card-text>
      {{func1}} {{func3}}
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>카드 제목 2</v-card-title>
    <v-card-text>
      {{func2}}
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>여기서부터 후보자 랜더링 하겠습니다</v-card-title>
    <v-card-text>
      대충 들어갈 곳<br>
      {{options}}
      {{this.$web3.utils.toAscii(options[0])}}
      {{this.$web3.utils.toAscii(options[1])}}
      {{this.$web3.utils.toAscii(options[2])}}
      {{this.$web3.utils.toAscii(options[3])}}
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>여기서부터 득표수 랜더링 하겠습니다</v-card-title>
    <v-card-text>
      대충 들어갈 곳2
      {{votes}}
    </v-card-text>
  </v-card>
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
                <v-radio
                  v-for="item in optionsAscii"
                  v-bind:key="item"
                  :label="`${item}`"
                  >
                </v-radio>
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
  </v-app>
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
    };
  },

  async mounted() {
    console.log('mounted 시작입니다');
    //console.log(this.$config.HELLO_ABI);
    //console.log(this.$config.HELLO_CA);
    this.contractInstance = new this.$web3.eth.Contract(this.$config.HELLO_ABI, this.$config.HELLO_CA);
    //console.log('contractInstance까지 가져왔슴');
    //console.log(this.contractInstance);
    this.account = await this.$getDefaultAccount();
    //console.log('getDefaultAccount 했습');
    //console.log(this.account);
    //console.log('함수시작하겟음');
    this.func1 = await this.contractInstance.methods.getSomeValue().call();
    this.func2 = await this.contractInstance.methods.whoIsOwner().call();
    this.func3 = await this.contractInstance.methods.helloWorld().call();
    this.options = (await this.contractInstance.methods.getOptionList().call());
    //this.votes = (await this.contractInstance.methods.totalVotesFor().call());
    console.log(this.options.length);
    console.log('For문 돌아가는지 확인하기');
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.optionsAscii[i] = this.$web3.utils.toAscii(this.options[i]);
    }
    for (i = 0; i < this.options.length; i++) {
      this.optionsAscii[i] = this.optionsAscii[i].replace(/\0/g, ''); // 문자열 뒤에 Null문자(\u0000) 제거
    }
    console.log('For문 확인끝');
    console.log('득표수 확인가능한지');
    console.log(await this.contractInstance.methods.totalVotesFor(this.options[0]).call());
    console.log('득표수 확인끝');
    console.log('득표수 배열에넣겠습니다');
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.votes[i] = await this.contractInstance.methods.totalVotesFor(this.options[i]).call();
      console.log(this.votes[i]);
    }
    console.log('득표수 배열에넣기끝');
    console.log('결과 객채에 후보, 투표수 넣겠습니다');
    for (i = 0; i < this.options.length; i++) {
      console.log(i);
      this.results.push({ title: this.optionsAscii[i], count: this.votes[i] });
      console.log(this.results[i]);
    }
  },
};
</script>

<style>

</style>
