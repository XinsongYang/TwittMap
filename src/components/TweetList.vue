<template>
    <div id="tweet-list">
        <tweet v-for="tweet in tweets" :key="tweet.id_str" :user="tweet.user.name" :time="tweet.timestamp_ms" :text="tweet.text"></tweet>
    </div>
</template>

<script>

    export default {
        props: ['tweets'],

        components: {
            'tweet': require('./Tweet'),
        }
    }
    
</script>