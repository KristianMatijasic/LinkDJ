<template>
  <q-page class="bg-black">
    <div v-for="post in posts" :key="post.id" class="row q-pa-md">

      <div q-card>

        <q-img :src=post.Slika width="500px" height="600px" position="absolute" top="50%" left="50%"
          transform="translate(-50%, -50%)">
          <div class="q-pa-md">
            <q-btn-dropdown color="black" label="Uredi sliku">
              <q-list>

                  <q-item-section>
                    <q-form @click="spremiSliku(name, post.ID_DJ)" class="q-gutter-md">
              <!-- <q-input class="bg-light-blue-11" filled v-model="name" label="Zalijepi link nove slike" /> -->
              <div>
      <input type="file" @change="onFileChange" />


      <div v-if="base64Image">
        <img :src="base64Image" />
        <q-separator></q-separator>
      </div>
    </div>
              <div style="display: flex; justify-content: center; align-items: center;">
                <q-btn class="" label="Spremi sliku" type="submit" color="red" />
              </div>
            </q-form>
                  </q-item-section>


                <q-item class="text-bold" clickable v-close-popup @click="obrisi_sliku(post.ID_DJ)">
                  <q-item-section>
                    <q-item-label style="display: flex; justify-content: center; align-items: center;">OBRIŠI SLIKU</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="absolute-bottom text-subtitle1 text-center">
            <div style="text-transform:uppercase; font-size:50px;">{{ post.DJime }}</div>
          </div>
        </q-img>
      </div>


      <div class="q-pa-md">
        <div class="q-pa-md items-start q-gutter-xs" style="background-color: red; color: white;">
          <div class="" style="font-size: 20px;">Ime:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.ime }}</div>
          <q-separator color="black" class="bold-separator"/>
          <div class="" style="font-size: 20px;">Prezime:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.prezime }}</div>
          <q-separator color="black" class="bold-separator"/>
          <div class="" style="font-size: 20px;">Žanr:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.zanr }}</div>
          <q-separator color="black" class="bold-separator"/>
          <div class="" style="font-size: 20px;">Grad:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.grad }}</div>
          <!-- <q-btn round color="black" icon="delete" style="right: -12px" @click="deleteOcjena(post.id_atrakcije)" /> -->
          <q-separator color="black" class="bold-separator"/>
          <!-- <div class="" style="max-width: 400px"></div> -->
          <div class="" style="font-size: 20px;">Broj mobitela:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.broj }}</div>
          <q-separator color="black" class="bold-separator" />
          <div class="" style="font-size: 20px;">Mail:</div>
          <div class="text-bold" style="font-size: 25px;">{{ post.email }}</div>
        </div>
      </div>
    </div>



    <q-card-section>
      <q-btn style="background-color: red; color: white" @click="$router.push('/')" label="Natrag na pregled DJ-eva" />
    </q-card-section>

    <div>
    <q-card-section class="q-gutter-md">
      <q-btn style="background-color: red; color: white" :to="'/komentari/' + trenutniID" label="Pregledaj pjesme" />
      <q-btn style="background-color: red; color: white" :to="'/komentari/' + trenutniID" label="Dodaj pjesmu"/>
      <q-btn style="background-color: red; color: white" :to="'/komentari/' + trenutniID" label="Rezerviraj DJ-a" />
    </q-card-section>
  </div>


</q-page>
</template>



<script setup>

import { ref, onMounted } from "vue"
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';

const posts = ref([])
const route = useRoute()
const router = useRouter()

const trenutniID = route.params.id
const getPosts = async () => {
  try {
    const response = await api.get(`/DJ/${trenutniID}`)
    posts.value = response.data

    console.log("ID je: ", trenutniID)
    console.log("Podatak iz baze po ID: ", posts.value)

  } catch (error) {
    console.log(error)
  }
}


//Dodavanje slike


// const spremiSliku = async (link, id) => {
//   console.log("OnSubmit: ", link, id)

//   try {

//     const response = await api.put(`http://localhost:4200/dodajSliku/${id}`, {
//       slika: link
//     });
//     console.log(response.data);


//   }
//   catch (error) {
//     console.log(error);
//   }
//   getPosts();



// }


const obrisi_sliku = async (id) => {
  try {
    //const response = await api.delete('DJ/${id}');
    const response = await api.delete(`http://localhost:4200/obrisi_sliku_atrakcije/${id}`);
    console.log("LOG1: ", response.data);
    // Perform any additional actions after successful deletion
  } catch (error) {
    console.log("LOG2: ", error);
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
  max-width: 800px

</style>

<style>
.post-text {
  max-width: 620px;
  word-wrap: break-word;
}

.bold-separator {
    border-top: 2px solid black;
  }
</style>
