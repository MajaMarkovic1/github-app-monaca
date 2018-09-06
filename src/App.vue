<template>
  <v-ons-page>

    <app-toolbar>
      <template slot="right">
        <v-ons-button modifier="quiet">
          <v-ons-icon icon="md-settings"></v-ons-icon>
        </v-ons-button>
      </template>
    </app-toolbar>

    <app-search :query.sync="query" />

  </v-ons-page>
</template>

<script>
import AppToolbar from './components/AppToolbar'
import AppSearch from './components/AppSearch'


export default {

  components: {
    AppToolbar,
    AppSearch
  },

  data() {
    return {
      query: ''
    }
  },

  watch: {
    query(newValue) {
      console.log(newValue)
    }
  }
  
}
</script>
