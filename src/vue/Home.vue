<script setup>
import { ref, onMounted } from 'vue'
const movies = ref([])
onMounted(async () => {
  try {
    const res = await fetch(
        'https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json'
    )
    movies.value = await res.json() // la liste des films
  } catch (err) {
// error
  }
})
</script>


<template>
  <h1>Liste des films</h1>
  <ul>
    <li v-for="movie in movies" :key="movie.id">
      {{ movie.title }} - {{ movie.year }}
    </li>
  </ul>
</template>
