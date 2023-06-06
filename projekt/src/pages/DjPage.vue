<template>
  <q-page class="bg-image">
    <div v-for="post in posts" :key="post.id" class="row q-pa-md">

      <div q-card>

        <q-img :src=post.Slika width="500px" height="600px" position="absolute" top="50%" left="50%"
          transform="translate(-50%, -50%)">

          <div class="absolute-bottom text-subtitle1 text-center">
            <div style="text-transform:uppercase; font-size:50px;">{{ post.DJime }}</div>
          </div>
        </q-img>
      </div>


      <div class="q-pa-md">
        <div class="q-pa-md items-start q-gutter-xs" style="background-color: red; color: white;">
          <div class="" style="font-size: 20px;">Ime:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.ime }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Prezime:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.prezime }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Žanr:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.zanr }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Grad:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.grad }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Broj mobitela:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.broj }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Mail:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.email }}</div>
        </div>
      </div>
      <div>
    </div>
    </div>


    <div>
      <q-card-section class="q-gutter-lg">
        <q-btn style="background-color: red; color: white;" class="button" @click="$router.push('/dodaj_pjesmu/'+trenutniID)" label="Dodaj pjesmu" />
        <q-btn style="background-color: red; color: white;" class="button" @click="$router.push('/unos_rez/'+trenutniID)" label="Rezerviraj" />
        <q-btn style="background-color: red; color: white;" class="button" @click="$router.push('/')" label="Natrag na pregled DJ-eva" />
      </q-card-section>
    </div>


    <q-separator color="black" class="bold-separator" />

<div class="q-pa-md row items-start q-gutter-xs">
  <p style="font-size: 25px; color: white"><b>PJESME:</b></p>

</div>

<div class="q-pa-md row items-start q-gutter-md">
  <q-card v-for="item in comments" :key="item" class="my-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="headphones"></q-icon>
        </q-avatar>
      </q-item-section>
      <q-card-section>
        <b>{{item.naziv_pjesma}}</b>
        <div>
         <q-btn icon="delete" style="background-color: red; color: white; left: 560px;" @click="deletePjesma(item.ID_pjesma)" />
        </div>
        </q-card-section>
    </q-item>
    <q-separator />
    <q-card-section horizontal>
      <q-card-section>
        <a :href="item.link_pjesma" target="_blank">{{item.link_pjesma}}</a>
      </q-card-section>
    </q-card-section>
  </q-card>
</div>


  </q-page>
</template>



<script setup>

import { ref, onMounted } from "vue"
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';

const posts = ref([])
const comments = ref([])
const route = useRoute()
const router = useRouter()

const trenutniID = route.params.id
const getPosts = async () => {
  try {
    const response = await api.get(`/DJ/${trenutniID}`)
    posts.value = response.data
    const pjesme = await api.get(`/pjesme/${trenutniID}`)
    comments.value = pjesme.data.data
    console.log(pjesme.data)
    console.log("ID je: ", trenutniID)
    console.log("Podatak iz baze po ID-u: ", posts.value)

  } catch (error) {
    console.log(error)
  }
}

// brisanje pjesme
const deletePjesma = async (id) => {
  try {
    const response = await api.delete(`http://localhost:4200/obrisi_pjes/${id}`);
    console.log(response.data);

  } catch (error) {
    console.log(error);
  }
  getPosts();
}


onMounted(() => {
  getPosts()
})
</script>





<style scoped></style>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 735px
  class: flex-center
</style>


<style>
.post-text {
  max-width: 620px;
  word-wrap: break-word;
}
.bold-separator {
  border-top: 2px solid black;
}

.bg-image {
  background-image: url(https://images.alphacoders.com/237/237133.jpg);

}

</style>
