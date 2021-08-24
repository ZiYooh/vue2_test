<template>
  <div>
    <v-app-bar absolute dense flat color="#0c1512" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <router-link to="/">
      <v-img
      max-height="235"
      max-width="235"
      :src="require('@/assets/main_logo1.png')" >
      </v-img>
    </router-link>
      <v-spacer></v-spacer>
    <v-app-bar-items class="hidden-sm-and-down">
      <v-btn to="/notice" text>
        공지사항
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn to="/candidate" text>
        진행중인 투표
      </v-btn>
      <v-btn text>
        종료된 투표
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn to="/help" text>
        고객센터
      </v-btn>
    </v-app-bar-items>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>

    </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-title>홈</v-list-item-title>
          </v-list-item>

          <v-list-item to="/notice">
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item>

          <v-list-item to="/candidate">
            <v-list-item-title>진행중인 투표</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>종료된 투표</v-list-item-title>
          </v-list-item>

          <v-list-item to="/help">
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

  },
};
</script>

<style>

</style>
