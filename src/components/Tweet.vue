<template>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ user }}</p>
          </div>
        </div>

        <div class="content">
          {{ text }}
          <br>
          <time>{{ time }}</time>
        </div>
      </div>
    </div>
</template>

<script>
    export default {

        props: ['user', 'time', 'text']

    }
</script>