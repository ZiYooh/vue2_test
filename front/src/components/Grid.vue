<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="n in 12" :key="n" cols="12" md="1" sm="1">
        <v-card class="pa-3" outlined tile>
          #{{n}}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

</script>

<style>

</style>
