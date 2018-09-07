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

      <v-ons-list >
        <v-ons-list-header class="header">
          Repositories of {{ this.query }}
        </v-ons-list-header>
        <p>
          <v-ons-progress-circular indeterminate v-if="loading"></v-ons-progress-circular>
        </p>
        <empty-state v-if="repos.length <= 0 && query !== ''" :type="'repo'"/>
        
      
        <v-ons-list-item v-if="repos" v-for="repo in repos" :key="repo.id">
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
import EmptyState from './components/EmptyState'


export default {

  components: {
    AppToolbar,
    AppSearch,
    EmptyState
  },

  data() {
    return {
      query: '',
      repos: [],
      error: '',
      loading: false
    }
  },

  watch: {
    query: debounce(function(newValue) {
      this.loading = true
      githubService.getRepos(newValue)
        .then((response) => {
          this.repos = response.data
          //console.log(this.repos)
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
        })
    }, 1000)
    
  },
  
}
</script>

<style>

.container{
  margin: 0 auto;
  width: 90%;
  padding: 10px;
}

.header {
  margin: 10px;
}

</style>

