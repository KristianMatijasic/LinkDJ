<template>
  <q-page class="bg-image ">
    <q-btn class="center" style="background-color: red; color: white; left: 10px; top: 15px" @click="$router.push('/one_dj/'+trenutniID)" label="Natrag na DJ-a" />
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
            <q-td key="prez_rez" :props="prez_rez"> {{ props.row.prez_rez }}
            </q-td>
            <q-td key="broj_rez" :props="broj_rez"> {{ props.row.broj_rez }}
            </q-td>
            <q-td key="mail_rez" :props="mail_rez"> {{ props.row.mail_rez }}
            </q-td>
            <q-td key="datum" :props="datum">{{ props.row.datum }}
            </q-td>
          </q-tr>
        </template>


  </q-page>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import {api} from 'boot/axios';
  import { useRoute, useRouter } from 'vue-router';

  const posts = ref([])
  const route = useRoute()
   const router = useRouter()
   const trenutniID = route.params.id

  const columns = [
    { name: 'ime_rez', align: 'left', label: 'IME', field: 'ime_rez', sortable: true },
    { name: 'prez_rez', align: 'left', label: 'PREZIME', field: 'prez_rez', sortable: true },
    { name: 'broj_rez', align: 'left', label: 'BROJ MOBITELA', field: 'broj_rez', sortable: false },
    { name: 'mail_rez', align: 'left', label: 'E-MAIL', field: 'mail_rez', sortable: false},
    { name: 'datum', align: 'left', label: 'DATUM', field: 'datum', sortable: true },
  ]


  const getPosts = async () => {
    try{
       const response = await api.get('/pregled_rez/')
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

  .bg-image {
    background-image: url(https://images.alphacoders.com/237/237133.jpg);
  }

  </style>

