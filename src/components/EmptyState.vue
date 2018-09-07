<template>
    <v-ons-card>
        <img src="https://pbs.twimg.com/media/Bt5MoW0CIAE9Fda.jpg" style="width: 100%;" alt="no content">
         There are no {{ pluralize }} here
    </v-ons-card>
</template>

<script>
import pluralize from 'pluralize'

export default {
    props: {
        type: String
    },

    computed: {
        pluralize(){
            return pluralize(this.type)
        }
    }
}
</script>

