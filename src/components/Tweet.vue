<template>
    <div class="tweet">
        <span class="username">@{{user}}</span> <span class="time">{{ time }}</span>
        <div>{{ text }}</div>
    </div>
    
</template>

<script>
    export default {

        props: ['user', 'timestamp', 'text'],

        computed: {
            time: function() {
                let date = new Date(parseInt(this.timestamp));
                return date.toLocaleString();
            }
        }

    }
</script>

<style>
    .tweet {
        font-size: 12px;
        margin: 15px 0;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
    }
    .tweet:hover {
        
    }
    .username {
        color: #3b94d9;
        font-weight: bold;
    }
    .time {
        color: #a7a7a7;
        font-size: 11px;
    }
</style>