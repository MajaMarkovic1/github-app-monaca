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

      <v-ons-navigator
      :page-stack="pageStack"
      @view-profile="pageStack.push($event)"
      ></v-ons-navigator>
    
    </div>

  </v-ons-page>
</template>

<script>

import AppToolbar from './components/AppToolbar'
import ReposList from './components/ReposList'

export default {

  components: {
    AppToolbar,
    ReposList,
  },

  data() {
    return {
      pageStack: [ ReposList ]
    }
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

