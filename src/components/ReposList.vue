<template>
    <v-ons-page>
        <app-search :query.sync="query" />
        <v-ons-button @click="viewProfile" modifier="outline" style="margin: 6px 0">View profile</v-ons-button>

        <v-ons-list >

            <v-ons-list-header class="header">
            Repositories of {{ this.query }}
            </v-ons-list-header>

            <p>
            <v-ons-progress-circular indeterminate v-if="loading"></v-ons-progress-circular>
            </p>

            <empty-state v-if="showEmptyState" :type="'repo'"></empty-state>

            <error404 v-if="show404" />
            
            <v-ons-list-item v-if="showList" v-for="repo in repos" :key="repo.id">
                <div class="left">
                  <img class="list-item__thumbnail" :src="repo.owner.avatar_url">
                </div>
                <span class="list-item__title">{{ repo.name }}</span>
                <span class="list-item__subtitle">{{ repo.description }}</span>
            </v-ons-list-item>

        </v-ons-list>
    </v-ons-page>
        
</template>

<script>
import debounce from 'lodash/debounce'

import AppSearch from './AppSearch'
import { githubService } from '../services/Github'
import EmptyState from './EmptyState'
import Error404 from './Error404'
import Profile from './Profile'

export default {

    components: {
        AppSearch,
        EmptyState,
        Error404, 
        Profile
    },

    data() {
      return {
        query: '',
        repos: [],
        notFound: false,
        loading: false,
        
      }
    },

    computed: {
      showEmptyState () {
        return this.query && !this.notFound && !this.loading && !this.repos.length
      },
      show404 () {
        return this.notFound && !this.loading
      },
      showList () {
        return this.query && !this.notFound && !this.loading && this.repos.length
      }
    },

    watch: {
      query: debounce(function(newValue) {
        this.loading = true
        githubService.getRepos(newValue)
          .then((response) => {
            this.repos = response.data 
            console.log(this.repos)
          })
          .catch((err) => {
            if (err.response.status === 404){
              this.notFound = true 
            }
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      }, 1000)
      
    },
      
    methods: {
      viewProfile(){
          this.$emit('view-profile', {
            extends: Profile,
            onsNavigatorProps: {
              username: this.query
            }
          })
        }
      }
    
    
}
</script>

