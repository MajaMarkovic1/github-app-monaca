import axios from 'axios'

export default class Github {

     constructor(){
         axios.defaults.baseURL = 'https://api.github.com/'

     }

     getRepos(username){
        return axios.get(`users/${username}/repos`)
     }

     getUser(user){
         return axios.get(`users/${user}`)
     }

}

export const githubService = new Github()