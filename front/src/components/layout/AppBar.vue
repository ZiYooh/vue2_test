<template>
  <div>
    <v-app-bar absolute dense flat color="#222222" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <router-link to="/">
      <v-img
      max-height="210"
      max-width="210"
      :src="require('@/assets/main_logo1.png')" >
      </v-img>
    </router-link>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    <v-app-bar-items class="hidden-sm-and-down">
      <v-btn to="/notice" text>
        공지사항
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn to="/votelist" text>
        진행중인 투표
      </v-btn>
      <v-btn to="/endvote" text>
        종료된 투표
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn to="/help" text>
        고객센터
      </v-btn>
    </v-app-bar-items>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon>mdi-animation</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="this.$store.state.user == 1" to="/userlist">
            <v-list-item-title>회원 리스트</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="this.$store.state.user == 2" to="/userlistcomp">
            <v-list-item-title>기업 리스트</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon>mdi-alert-box-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="this.$store.state.user == 1" to="/profile">
            <v-list-item-title>회원 정보</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="this.$store.state.user == 2" to="/profilecomp">
            <v-list-item-title>기업 정보</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.user == 2" to="/makevote">
            <v-list-item-title>투표 개설 신청(기업용)</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="this.$store.state.user == null" to="/login">
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.user == 1" v-on:click="logout">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.user == null" to="/register">
            <v-list-item-title>일반 회원가입</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-if="this.$store.state.user == null" to="/logincomp">
            <v-list-item-title>기업용 로그인</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.user == 2" v-on:click="logout">
            <v-list-item-title>기업용 로그아웃</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$store.state.user == null" to="/registercomp">
            <v-list-item-title>기업 회원가입</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>

    </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                블록체인 투표 시스템
              </v-list-item-title>
              <v-list-item-subtitle>
                개발 중
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        <v-list-item-group
          v-model="group"
        >
          <v-divider></v-divider>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>홈</v-list-item-title>
          </v-list-item>

          <v-list-item to="/notice">
            <v-list-item-icon>
              <v-icon>mdi-bullhorn-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item>

          <v-list-item to="/votelist">
            <v-list-item-icon>
              <v-icon>mdi-vote-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>진행중인 투표</v-list-item-title>
          </v-list-item>

          <v-list-item to="/endvote">
            <v-list-item-icon>
              <v-icon>mdi-calendar-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>종료된 투표</v-list-item-title>
          </v-list-item>

          <v-list-item to="/help">
            <v-list-item-icon>
              <v-icon>mdi-alert-circle-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>고객 센터</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {

		logout() {
			localStorage.removeItem("usertoken");
			this.$store.dispatch("update_user", null);
      this.$router.push("/");
		},

  },
};

</script>

<style>

</style>
