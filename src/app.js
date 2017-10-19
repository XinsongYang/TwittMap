import './bootstrap'
import router from './routes'

var app = new Vue({
    el: '#app',

    // router

    methods: {
        initMap: function() {
            var map = new google.maps.Map(document.getElementById('app'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        }
    }

});

window.app = app;