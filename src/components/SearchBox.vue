<template>
    <div id="search-box">
        <form @submit.prevent="onSubmit">
            <input type="text" id="keyword" v-model="keyword" placeholder="Search tweets...">
            <button type="submit">Search</button>
        </form>
    </div>
</template>

<script>

    export default {
        
        data() {
            return {
                keyword: ''
            }
        },

        methods: {
            onSubmit() {
                Event.$emit('submit', this.keyword);
            }
        }
    }

</script>