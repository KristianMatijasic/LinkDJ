<template>

  <div class="q-pa-md">
    <q-table
      title="REZERVIRANI TERMINI"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </div>


  <div class="q-pa-md">
    <q-table
      flat bordered
      title="REZERVIRANI TERMINI + edit"
      :rows="posts"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ime_rez" :props="IME_REZ"> {{ props.row.ime_rez }}
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
    </q-table>
  </div>


  <div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" to="/" label="Natrag na pregled DJ-eva" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {api} from 'boot/axios';

const posts = ref([])

const columns = [
  { name: 'ime_rez', align: 'left', label: 'Ime', field: 'ime_rez', sortable: true },
  { name: 'prez_rez', align: 'left', label: 'Prezime', field: 'prez_rez', sortable: false },
  { name: 'broj_rez', align: 'left', label: 'Broj mobitela', field: 'broj_rez', sortable: false },
  { name: 'mail_rez', align: 'left', label: 'E-mail', field: 'mail_rez', sortable: true },
  { name: 'datum', align: 'left', label: 'Datum', field: 'datum', sortable: true },
]


const getPosts = async () => {
  try{
    const response = await api.get('pregled_rez')
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
