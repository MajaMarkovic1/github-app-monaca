<template>
    <v-ons-toolbar>
        <div class="center">{{ title }}</div>
    </v-ons-toolbar>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Github App'
        }
    }
    
}
</script>

