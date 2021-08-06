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
                        <td>{{ item.name }}</td>
                        <td>{{ item.vote }}</td>
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
import votingArtifact from "../../../build/contracts/Voting";

const { web3 } = this;


export default {
  data() {
    return {
      candidates: [
        {
          name: '후보1',
          vote: 0,
        }, {
          name: '후보2',
          vote: 0,
        }, {
          name: '후보3',
          vote: 0,
        },
      ],
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
    };
  },
  methods: {
    votefor1() {
      alert('Vote1했음니다');
    },
    votefor2() {

    },
    votefor3() {

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
