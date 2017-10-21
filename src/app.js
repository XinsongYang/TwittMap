import './bootstrap'

new Vue({
    el: '#app',

    data: {
        keyword: '',
        tweets: [],
        response: {}
    },

    components: {
        'gmap': require('./components/Map'),
        'tweet': require('./components/Tweet'),
        'tweet-list': require('./components/TweetList')
    },

    methods: {
        search() {
            axios.get('/api/tweets', {
                params: { keyword: this.keyword }
            }).then(response => {
                this.tweets = response.data.tweets;
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        }
    }

});

