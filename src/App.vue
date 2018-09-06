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

      <v-ons-list-header class="header">
        Repositories of {{ this.query }}
      </v-ons-list-header>

      <v-ons-list v-if="repos" v-for="repo in repos" :key="repo.id" >
        <v-ons-list-item>
            <div class="left">
              <img class="list-item__thumbnail" :src="repo.owner.avatar_url">
              
            </div>
            <span class="list-item__title">{{ repo.name }}</span>
            <span class="list-item__subtitle">{{ repo.description }}</span>
        </v-ons-list-item>
      </v-ons-list>
    
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
        .catch(err => console.log(err))
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

.header {
  margin: 10px;
}

</style>

