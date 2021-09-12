<template>
  <v-app id="App">
    <main-app-bar></main-app-bar>
    <v-main class="mt-12">
      <router-view/>
    </v-main>

    <main-footer></main-footer>
  </v-app>
</template>

<script>
import MainAppBar from '@/components/layout/AppBar';
import MainFooter from '@/components/layout/Footer';

export default {
  name: 'App',
  components: {
    MainAppBar,
    MainFooter,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
