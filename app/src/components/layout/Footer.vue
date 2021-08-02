<template>
  <v-footer app dark padless>
      <v-card tile color="#FFFFFF" dark center class="white--text text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="black--text pt-0">
          Vuetify Footer 테스트 입니다.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="black--text">
          {{ new Date().getFullYear() }} — <strong>Kim Ji Woo</strong>
        </v-card-text>
      </v-card>
  </v-footer>
</template>

<script>

</script>

<style>

</style>
