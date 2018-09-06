<template>

    <v-ons-search-input 
        :placeholder="placeholder" 
        :value="query"
        @input="$emit('update:query', $event.target.value)"
    ></v-ons-search-input>

</template>

<script>
export default {
    props: {
        query: {
            type: String,
            
        },
        placeholder: {
            type: String,
            default: 'Search'
        }

    }
    
}
</script>