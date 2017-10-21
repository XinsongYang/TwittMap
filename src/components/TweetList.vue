<template>
    <div id="tweet-list" >
        <tweet v-for="tweet in tweets" :key="tweet.id_str" :user="tweet.user.name" :timestamp="tweet.timestamp_ms" :text="tweet.text"></tweet>
    </div>
</template>

<script>

    export default {
        props: ['tweets'],

        components: {
            'tweet': require('./Tweet'),
        },
    }
    
</script>

<style>
    #tweet-list {
        /*flex-grow: 1;
        overflow-y: auto;*/
    }
</style>