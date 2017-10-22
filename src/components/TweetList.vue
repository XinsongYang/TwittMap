<template>
    <div id="tweet-list" >
        <tweet v-for="tweet in tweets" :key="tweet.id_str" :data="tweet" ></tweet>
        <button v-if="tweets.length" class="btn btn-link" @click="searchMore">Search More Tweets</button>
    </div>
</template>

<script>

    export default {
        props: ['tweets'],

        components: {
            'tweet': require('./Tweet'),
        },

        methods: {
            searchMore() {
                Event.$emit('searchMore');
            }
        }
    }
    
</script>

<style>

</style>