<template>
  <v-ons-page>
    
    <app-toolbar>
      <template slot="right">
        <v-ons-button modifier="quiet">
          <v-ons-icon icon="md-settings"></v-ons-icon>
        </v-ons-button>
      </template>
    </app-toolbar>
<div>
    <app-search :query.sync="query" />
      <div v-for="repo in repos" :key="repo.id">
      {{ repo.name }}
    </div>
    </div>

    


  </v-ons-page>
</template>

<script>
import AppToolbar from './components/AppToolbar'
import AppSearch from './components/AppSearch'
import { githubService } from './services/Github'


export default {

  components: {
    AppToolbar,
    AppSearch
  },

  data() {
    return {
      query: '',
      repos: [],
      error: ''
    }
  },

  created() {
    githubService.getRepos(this.query)
      .then((response) => {
        this.repos = response.data
      })
      .catch(err => console.log(this.error = err.response.data))
  },

  watch: {
    query(newValue) {
      console.log(newValue)
    }
  }
  
}
</script>
