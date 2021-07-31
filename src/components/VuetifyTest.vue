<template>
  <v-app id="app">
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
    <v-card elevation="2" loading outlined shaped>
      <v-card-title>
        <span v-text="title" />
        <v-spacer></v-spacer>
        <v-btn @click="$emit('action-btn:clicked')">
          Action
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
      <v-card>
        <v-card-title>
          CorpInfo
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"></v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="totalVisible"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"></v-pagination>
        </div>
      </v-card>
  </v-app>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: 'Welcome to AyoteraLab',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      totalVisible: 10,
      search: '',
      loading: true,
      headers: [
        { text: '회사명', align: 'center', sortable: false, value: 'corpName' },
        { text: '회사코드', align: 'center', sortable: false, value: 'corpCode' },
        { text: '종목코드', align: 'center', sortable: false, value: 'stockCode' },
        { text: '수정일자', align: 'center', sortable: false, value: 'modifyDate' },
      ],
      items: [],
    };
  },
};
</script>
