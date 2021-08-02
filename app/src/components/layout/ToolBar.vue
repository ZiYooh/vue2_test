<template>
  <v-toolbar
    color="#0c1512"
    dark
  >
    <v-toolbar-title>블록체인 투표 시스템</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text>
        공지사항
      </v-btn>
      <v-btn text>
        고객센터
      </v-btn>
      <v-divider vertical></v-divider>
      <v-btn text>
        진행중인 투표
      </v-btn>
      <v-btn text>
        종료된 투표
      </v-btn>
    </v-toolbar-items>
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
  </v-toolbar>
</template>

<script>

</script>

<style>

</style>
