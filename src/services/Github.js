import axios from 'axios'

export default class Github {

     constructor(){
         axios.defaults.baseURL = 'https://api.github.com/'

     }

     getRepos(username){
        return axios.get(`users/${username}/repos`)
     }
}

export const githubService = new Github()