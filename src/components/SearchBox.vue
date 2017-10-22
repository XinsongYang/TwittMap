<template>
    <div id="search-box" >
        <form @submit.prevent="keywordSubmit" class="input-group">
            <input type="text" id="keyword" v-model="keyword" list="suggestions" placeholder="keyword" class="form-control"> 
            <datalist id="suggestions">
                <option value="job"></option>
                <option value="hire"></option>
                <option value="test"></option>
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