<template>
    <div id="map"></div>
</template>

<script>

    export default {

        data() {
            return {
                map: {},
                markers: []
            }
        },

        props: ['tweets'],

        mounted() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.275518, lng: -104.657942},
                zoom: 5,
                mapTypeControl: false
            });
        },

        methods: {
            render() {
                for (let tweet of this.tweets) {
                    let coordinates = tweet.coordinates.coordinates;
                    let marker = new google.maps.Marker({
                        position: {lat: coordinates[1], lng: coordinates[0]},
                        map: this.map
                    })
                    
                    let tweetWindow = new google.maps.InfoWindow({
                        content: '<tweet :user="tweet.user.name" :time="tweet.timestamp_ms" :text="tweet.text"></tweet>'
                    })
                    marker.addListener('click', function() {
                        tweetWindow.open(map, marker);
                    });

                    this.markers.push(marker);
                }
            },

            clear() {
                for (let marker of this.markers) {
                    marker.setMap(null);
                }
                this.markers = [];
            }
        },

        watch: {
            tweets: function() {
                this.clear();
                this.render();
            }
        }

    }
</script>

<style>
    #map {
        height: 100%;
    }
</style>