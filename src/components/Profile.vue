<template>
    <v-ons-page>
        <v-ons-back-button>Home</v-ons-back-button>
        <v-ons-list>
            <v-ons-list-item>
                <div class="left" style="width: 70%;">
                    <img class="list-item__thumbnail" style="height: 100%; width: 100%;" :src="user.avatar_url">
                </div>
                <span class="list-item__title">Name: {{ user.login }}</span>
                <span class="list-item__title">Location: {{ user.location }}</span>
                <span class="list-item__title">Followers: {{ user.followers }}</span>
                <span class="list-item__title">Following: {{ user.following }}</span>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import { githubService } from '../services/Github';

export default {
    data(){
        return {
            user: {}
        }
    },

    props: {
        username: String
    },

    created(){
        githubService.getUser(this.username)
            .then((response) => {
                this.user = response.data
            })
            .catch(err => console.log(err))
    }
}
</script>

