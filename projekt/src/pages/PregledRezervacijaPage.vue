<template>
    <!-- <div class="q-pa-md" style="background-color: black">
    <q-btn class="center" style="background-color: red; color: white;" to="/" label="Natrag na pregled DJ-eva" />
  </div> -->
<q-page class="bg-image ">
  <div class="q-pa-md">
    <h4 style="color: white;"><b>REZERVACIJE</b></h4>
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="name"
      class="white-table"
      style="border: 1px solid black;"
    />
  </div>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ime_rez" :props="ime_rez" > {{ props.row.ime_rez }}
          </q-td>
          <q-td key="prez_rez" :props="ime_rez"> {{ props.row.prez_rez }}
          </q-td>
          <q-td key="broj_rez" :props="props"> {{ props.row.broj_rez }}
          </q-td>
          <q-td key="mail_rez" :props="props"> {{ props.row.mail_rez }}
          </q-td>
          <q-td key="datum" :props="props">{{ props.row.datum }}
          </q-td>
        </q-tr>
      </template>


</q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {api} from 'boot/axios';

const posts = ref([])

const columns = [
  { name: 'ime_rez', align: 'left', label: 'IME', field: 'ime_rez', sortable: true },
  { name: 'prez_rez', align: 'left', label: 'PREZIME', field: 'prez_rez', sortable: false },
  { name: 'broj_rez', align: 'left', label: 'BROJ MOBITELA', field: 'broj_rez', sortable: false },
  { name: 'mail_rez', align: 'left', label: 'E-MAIL', field: 'mail_rez', sortable: true },
  { name: 'datum', align: 'left', label: 'DATUM', field: 'datum', sortable: true },
]


const getPosts = async () => {
  try{
    const response = await api.get('/pregled_rez')
    console.log(response.data)
    posts.value = response.data

  }catch (error){
    console.log(error)
  }

}

onMounted(() => {
  getPosts()
})

</script>

<style>
.red-table {
  background-color: red;
  color: black;
  font-weight: bold;
}
.bg-image {
  background-image: url(https://c1.wallpaperflare.com/preview/108/956/844/people-man-music-party.jpg);

}

</style>

