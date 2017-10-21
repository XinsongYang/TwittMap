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
        searchByKeyword() {
            axios.get('/api/tweetsByKeyword', {
                params: { keyword: this.keyword }
            }).then(response => {
                this.tweets = response.data.tweets;
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        },

        searchByCoord(coordinate) {
            axios.get('/api/tweetsByCoord', {
                params: coordinate
            }).then(response => {
                this.tweets = response.data.tweets;
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        }
    },

    mounted() {
        Event.$on('mapClicked', coordinate => {
            this.searchByCoord(coordinate);
        })
    }

});

