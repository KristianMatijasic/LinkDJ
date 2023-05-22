<template>
  <q-page class="bg-black">

    <!-- <q-input style="background-color: white" width="200px" outlined v-model="searchQuery" placeholder="Pretraži DJ-a..."
      dense /> -->

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card v-for="post in posts" :key="post.id" class="my-card">
        <q-img :src=post.Slika width="300px" height="300px" />

        <q-card-section style="background-color: red; color: black">
          <q-btn fab color="grey" icon="DJ" class="absolute" style="top: 0; left: 12px; transform: translateY(-50%)"
            :to="'/one_dj/' + post.ID_DJ" />

          <!-- <q-btn fab color="green" icon="delete" class="absolute"  style="top: 0px; right: 12px; transform: translateY(-50%)"
           @click="deleteById(post.ID_DJ)" /> -->

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


const deleteById = async (id) => {


  try {
    //const response = await api.delete('atrakcije/${id}');
    const response = await api.delete(`http://localhost:4200/obrisi_DJ/${id}`);
    console.log(response.data);
    // Perform any additional actions after successful deletion
  } catch (error) {
    console.log(error);
  }
  getPosts();
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


const searchQuery = ref('')

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

/* .bordered-element {
  border: 1px solid #000;
  padding: 10px;
} */
</style>
