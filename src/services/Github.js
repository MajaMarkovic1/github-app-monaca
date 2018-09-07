import axios from 'axios'

export default class Github {

     constructor(){
         axios.defaults.baseURL = 'https://api.github.com/'
         axios.defaults.headers.common['Authorization'] = `Bearer f9ae7f61d3970aff7b2af41692f33f47748c0e79`

     }

     getRepos(username){
        return axios.get(`users/${username}/repos`)
     }

}

export const githubService = new Github()