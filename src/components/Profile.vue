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
        <div class="notes">
            <div>
                <v-ons-input placeholder="Add a note" v-model="note.text"></v-ons-input>
                <v-ons-button @click="addNote" modifier="outline" style="margin: 6px 0">Add note</v-ons-button>
            </div>
            Notes:
            <v-ons-list>
                <v-ons-list-item v-for="note in notes" :key="note.id">{{ note.text }}</v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import { githubService } from '../services/Github';

export default {
    data(){
        return {
            user: {},
            note: {
                text: '',
                user_id: ''
            },
            notes: []
        }
    },

    props: {
        username: String
    },

    created(){
        githubService.getUser(this.username)
            .then((response) => {
                this.user = response.data
                this.note.user_id = this.user.id

                if (localStorage.getItem('notes')){
                    this.notes = JSON.parse(localStorage.getItem('notes')).filter(note => note.user_id === this.user.id)
                }
            })
            .catch(err => console.log(err))
    },

    methods: {
        addNote () {
            this.notes.push(Object.assign({}, this.note))
            localStorage.setItem('notes', JSON.stringify(this.notes))
            this.user = Object.assign({notes: this.notes}, this.user)
            console.log(this.note)
            console.log(this.user)
            
        }
    }
}
</script>

<style>
.notes {
    margin: 0 auto;
    margin-top: 10px;
    width: 80%;
}

</style>


