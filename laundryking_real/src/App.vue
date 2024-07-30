<template>
  <v-app>
    <v-app-bar app dark color="blue">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>To Do List</v-toolbar-title>
</v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
