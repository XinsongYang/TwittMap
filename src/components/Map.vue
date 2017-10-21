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

        components: {
            'tweet': require('./Tweet'),
        },

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
        },

        methods: {
            tweetContent(tweet) {
                return `
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">${ tweet.user.name }</p>
                      </div>
                    </div>
                    <div class="content">
                      ${ tweet.text }
                      <br>
                      <time>${ tweet.timestamp_ms }</time>
                    </div>
                  </div>
                </div>
                `;

            },

            render() {
                for (let tweet of this.tweets) {
                    let coordinates = tweet.coordinates.coordinates;
                    let marker = new google.maps.Marker({
                        position: {lat: coordinates[1], lng: coordinates[0]},
                        map: this.map
                    })
                    
                    let tweetWindow = new google.maps.InfoWindow({
                        content: this.tweetContent(tweet),
                        maxWidth: 200
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