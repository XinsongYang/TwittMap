<template>
    <div class="tweet">
        <span class="username">@{{ user }}</span> <span class="time">{{ time }}</span>
        <div>{{ text }}</div>
    </div>
</template>

<script>
    export default {

        props: ['data'],

        computed: {
            user: function() {
                return this.data.user.name;
            },

            time: function() {
                let date = new Date(parseInt(this.data.timestamp_ms));
                return date.toLocaleString();
            },

            text: function() {
                return this.data.text;
            } 
        }

    }
</script>

<style>
    .tweet {
        font-size: 12px;
        padding: 10px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
    }
    .tweet:hover {
        background: #f9f9f9;
    }
    .tweet .username {
        color: #3b94d9;
        font-weight: bold;
    }
    .tweet .time {
        color: #a7a7a7;
        font-size: 11px;
    }
</style>