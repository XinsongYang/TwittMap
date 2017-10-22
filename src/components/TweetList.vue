<template>
    <div id="tweet-list" >
        <tweet v-for="tweet in tweets" :key="tweet.id_str" :data="tweet" ></tweet>
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

</style>