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

            this.map.addListener('click', function(event) {
                let lat = event.latLng.lat();
                let lon = event.latLng.lng();
                Event.$emit('mapClicked', {lat, lon});
            });

            Event.$on('onTweet', index => {
                this.markers[index].setIcon('icons/red-marker.png');
            });

            Event.$on('outTweet', index => {
                this.markers[index].setIcon('icons/blue-marker.png');
            });
        },

        methods: {
            tweetContent(tweet) {
                let date = new Date(parseInt(tweet.timestamp_ms));
                return `
                <div class="tweet">
                    <span class="username">@${ tweet.user.name }}</span> <span class="time">${ date.toLocaleString() }</span>
                    <div>${ tweet.text }</div>
                </div>
                `;

            },

            render() {
                for (let [index, tweet] of this.tweets.entries()) {
                    let coordinates = tweet.coordinates.coordinates;
                    let marker = new google.maps.Marker({
                        position: {lat: coordinates[1], lng: coordinates[0]},
                        icon: 'icons/blue-marker.png',
                        label: (index + 1).toString(),
                        map: this.map
                    });
                    let tweetWindow = new google.maps.InfoWindow({
                        content: this.tweetContent(tweet),
                        maxWidth: 200
                    })
                    marker.addListener('mouseover', function() {
                        tweetWindow.open(map, marker);
                        this.setIcon('icons/red-marker.png');
                        Event.$emit('onMarker', index);
                    });
                    marker.addListener('mouseout', function() {
                        tweetWindow.close(map, marker);
                        this.setIcon('icons/blue-marker.png');
                        Event.$emit('outMarker', index);
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

</style>