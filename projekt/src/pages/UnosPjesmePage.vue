<template>
  <q-page class="bg-image">


   <div class="q-pa-sm flex-center row items-start q-gutter" style="background-color: red;">
    <p style="font-size: 35px; color: white"><b>Unos pjesme:</b></p>
   </div>

 <h3> </h3>

   <div class=" flex-center row items-start">
       <q-input class="textarea" v-model="pjesma" label="Naziv pjesme " placeholder="Unesite naziv pjesme" :dense="dense" />
   </div>

   <div class="flex-center row items-start">
       <q-input class="textarea" v-model="link" label="Link pjesme " placeholder="Unesite link pjesme" :dense="dense" />
   </div>

     <!-- Poruka nakon klika na dodaj pjesmu -->
   <p class="q-pa-md" style=" font-size: 30px; color:white; display: flex; justify-content: center; align-items: center;"><b>{{ message }}</b></p>
     <q-card-section class="q-gutter-xl flex-center row items-start">
             <q-btn style="background-color: red; color: white" label="Dodaj pjesmu" @click="unos_pjes(pjesma, link, trenutniID)" />
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
 const pjesma = ref('');
 const link = ref('');


 //Dodavanje pjesme DJ-a
 const unos_pjes = async (pjesma, link, trenutniID) => {
     try {
         console.log('naziv_pjesma: ', pjesma)
         console.log('link_pjesma: ', link)
         console.log("ID: ", trenutniID)

         const response = await api.post(`http://localhost:4200/unos_pjes/${trenutniID}`, {
             naziv_pjesma: pjesma,
             link_pjesma: link
         });
         console.log(response.data);

         message.value = 'Nova pjesma uspješno je dodana!';
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
