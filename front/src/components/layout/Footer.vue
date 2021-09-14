<template>
  <v-footer app dark absolute padless>
      <v-card tile color="#222222" center class="white--text text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          <v-btn
            icon
            class="mx-4"
            v-on:click="openSchool()"
          >
            <v-icon size="24px">
              mdi-school
            </v-icon>
          </v-btn>
          <v-btn
            icon
            class="mx-4"
            v-on:click="openGithub()"
          >
            <v-icon size="24px">
              mdi-git
            </v-icon>
          </v-btn>
          <v-btn
            icon
            class="mx-4"
            v-on:click="openEmail()"
          >
            <v-icon size="24px">
              mdi-email-multiple
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Kim Ji Woo, Goo Ja Yoon</strong>
        </v-card-text>
      </v-card>
  </v-footer>
</template>

<script>
export default {
  methods: {
    openSchool() {
      window.open('https://cse.pusan.ac.kr/cse/index.do');
    },

    openGithub() {
      window.open('https://github.com/ZiYooh');
    },

    openEmail() {
      window.open('mailto:natsucomi42@gmail.com?subject=[투표 시스템 관련 문의]');
    },
  }
}
</script>

<style>

</style>
