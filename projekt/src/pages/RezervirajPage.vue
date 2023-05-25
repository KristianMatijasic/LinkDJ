<template>
  <q-page class="bg-image">


   <div class="q-pa-sm flex-center row items-start q-gutter" style="background-color: red;">
    <p style="font-size: 35px; color: white"><b>Unos rezervacije:</b></p>
   </div>

 <h3> </h3>

   <div class=" flex-center row items-start">
       <q-input class="textarea" v-model="ime" label="Ime " placeholder="Unesite vaše ime" :dense="dense" />
   </div>

   <div class="flex-center row items-start">
       <q-input class="textarea" v-model="prezime" label="Prezime " placeholder="Unesite vaše prezime" :dense="dense" />
   </div>
   <div class=" flex-center row items-start">
       <q-input class="textarea" v-model="broj" label="Broj mobitela " placeholder="Unesite vaš broj mobitela" :dense="dense" />
   </div>

   <div class="flex-center row items-start">
       <q-input class="textarea" v-model="email" label="E-mail " placeholder="Unesite vaš E-mail" :dense="dense" />
   </div>
   <div class=" flex-center row items-start">
       <q-input class="textarea" v-model="datumm" label="Datum rezervacije " placeholder="Unesite datum kada želite rezervirati DJ-a" :dense="dense" />
   </div>


     <!-- Poruka nakon klika na rezerviraj -->
   <p class="q-pa-md" style=" font-size: 30px; color:white; display: flex; justify-content: center; align-items: center;"><b>{{ message }}</b></p>
     <q-card-section class="q-gutter-xl flex-center row items-start">
             <q-btn style="background-color: red; color: white" label="Rezerviraj" @click="unos_rez(ime, prezime, broj, email, datumm, trenutniID)" />
             <q-btn style="background-color: red; color: white"  @click="$router.push('/one_dj/'+trenutniID)" label="Natrag na DJ-a" />
         </q-card-section>


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
 const message = ref('');
 const ime = ref('');
 const prezime = ref('');
 const broj = ref('');
 const email = ref('');
 const datumm = ref('');

 //Dodavanje rezervacije DJ-a
 const unos_rez = async (ime, prezime, broj, email, datumm, trenutniID) => {
     try {
         console.log('ime_rez: ', ime)
         console.log('prez_rez: ', prezime)
         console.log('broj_rez: ', broj)
         console.log('mail_rez: ', email)
         console.log('datum: ', datumm)
         console.log("ID: ", trenutniID)

         const response = await api.post(`http://localhost:4200/unos_rez/${trenutniID}`, {
             ime_rez: ime,
             prez_rez: prezime,
             broj_rez: broj,
             mail_rez: email,
             datum: datumm
         });
         console.log(response.data);

         message.value = 'Nova rezervacija uspješno je dodana!';
     }
     catch (error) {
         console.log(error);
     }
 }
 </script>




 <style scoped>
 .textarea {
   width: 50%;
   height: 100px;
   padding-top: 22px;
   padding-bottom: 20px;
   padding-left: 20px;
   padding-right: 20px;
   background-color: white;
 }



 .bg-image {
   background-image: url(https://images.alphacoders.com/237/237133.jpg);

 }
 button {
   border: 1px solid rgb(40, 40, 40);

   padding: 10px 20px;

 }

 </style>
