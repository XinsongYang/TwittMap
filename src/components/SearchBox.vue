<template>
    <div id="search-box" >
        <form @submit.prevent="keywordSubmit" class="input-group">
            <input type="text" id="keyword" v-model="keyword" list="suggestions" placeholder="keyword" class="form-control" required > 
            <datalist id="suggestions">
                <option v-for="word in suggestions" :value="word"></option>
            </datalist>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary">Search</button>
            </span>
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

        props: ['suggestions'],

        methods: {
            keywordSubmit() {
                Event.$emit('keywordSubmit', this.keyword);
            }
        }

    }
</script>

<style>
    #search-box {
        padding: 10px;
    }
</style>