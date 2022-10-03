<template>
    <v-toolbar
      dark
      color="blue lighten-1"
    >
      <v-toolbar-title>Pesquisa</v-toolbar-title>
      <v-autocomplete
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Procure por um produto..."
        solo-inverted
      ></v-autocomplete>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
</template>
<script>
export default {
   
}
</script>

<style lang="scss" scoped>

</style>