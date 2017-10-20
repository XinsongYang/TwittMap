<template>
    <div id="map"></div>
</template>

<script>

    export default {

        mounted() {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.275518, lng: -104.657942},
                zoom: 5,
                mapTypeControl: false
            });
        }

    }
</script>

<style>
    #map {
        height: 100%;
    }
</style>