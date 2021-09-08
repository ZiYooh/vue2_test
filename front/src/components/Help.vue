<template>
  <v-content justify="center" class="mx-15">
    <v-row justify="center" class="mt-5">
      <v-col cols="4" sm="4">
        <router-link to="/faq">
          <v-img
            min-width="300"
            min-height="300"
            :src="require('@/assets/faq_final.png')" >
          </v-img>
        </router-link>
      </v-col>
      <v-col cols="1" sm="1">
      </v-col>
      <v-col cols="4" sm="4">
        <router-link to="/qna">
          <v-img
            min-width="300"
            min-height="300"
            :src="require('@/assets/qna_final.png')" >
          </v-img>
        </router-link>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>

</script>

<style>

</style>
