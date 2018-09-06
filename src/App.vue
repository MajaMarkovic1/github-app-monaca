<template>
  <v-ons-page>
    
    <app-toolbar>
      <template slot="right">
        <v-ons-button modifier="quiet">
          <v-ons-icon icon="md-settings"></v-ons-icon>
        </v-ons-button>
      </template>
    </app-toolbar>
    <div class="container">
      <app-search :query.sync="query" />
      <div v-for="repo in repos" :key="repo.id">
        {{ repo.name }}
      </div>
    </div>

    


  </v-ons-page>
</template>

<script>
import debounce from 'lodash/debounce'
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

  watch: {
    query: debounce(function(newValue) {
      githubService.getRepos(newValue)
        .then((response) => {
          this.repos = response.data
          console.log(this.repos)
        })
    }, 500)
    
  }
  
}
</script>

<style>

.container{
  margin: 0 auto;
  width: 80%;
  padding: 10px;
}

</style>

