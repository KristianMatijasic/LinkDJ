<template>
  <q-page class="bg-black">

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card v-for="post in posts" :key="post.id" class="my-card">
        <q-img :src=post.Slika width="300px" height="300px" />

        <q-card-section style="background-color: red; color: black">
          <q-btn fab color="grey" icon="DJ" class="absolute" style="top: 0; left: 12px; transform: translateY(-50%)"
            :to="'/one_dj/' + post.ID_DJ" />

          <div class="myDiv" style="padding: 10px;"></div>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis text-bold">{{ post.DJime }}</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="background-color: red; color: white">
          <div class="text-subtitle1 text-bold">{{ post.broj }}</div>
          <div class="text-caption text-bold">
            {{ post.email }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { api } from 'boot/axios'

const posts = ref([])



const getPosts = async () => {
  try {
    const response = await api.get('/DJ')
    console.log(response.data)
    posts.value = response.data

  } catch (error) {
    console.log(error)
  }

}

onMounted(() => {
  getPosts()
})

const goToDJDetalji = (id) => {
  router.push({
    name: 'one_dj',
    params: {
      id: id
    }
  })
}

</script>


<style>
.bg-blue {
  background-color: #1e90ff;
  color: white;
}

.my-card {
  width: 100%;
  max-width: 300px;
}

.bg-image {
  background-image: url(https://c1.wallpaperflare.com/preview/108/956/844/people-man-music-party.jpg);

}

/* .bordered-element {
  border: 1px solid #000;
  padding: 10px;
} */
</style>
