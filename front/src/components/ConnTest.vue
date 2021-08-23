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
};
</script>

<style>

</style>
