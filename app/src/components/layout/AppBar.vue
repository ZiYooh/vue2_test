<template>
  <div>
    <v-app-bar absolute dense color="#788387" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>블록체인 투표 시스템</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white">
        <v-icon>mdi-battery-charging</v-icon>
      </v-btn>
      <v-btn icon color="white">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
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
};
</script>

<style>

</style>
