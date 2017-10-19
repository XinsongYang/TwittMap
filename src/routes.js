import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./components/App')
    }
];

export default new VueRouter({
    routes
});