<template>

  <q-page class="bg-image">
    <q-tabs v-model="tab" class="text-white " style="background-color: red;">
      <q-tab class="text-bold" name="Prijava" label="Prijava" @click.prevent="register = false" />
      <q-tab class="text-bold" name="Registracija" label="Registracija" @click.prevent="register = true" />
    </q-tabs>


    <q-card class="my-card absolute-center">
      <q-card-section>
        <form @submit.prevent="onSubmit">
          <div class="q-gutter-md full-with" style="max-width: 500px">
            <div class="loginText text-bold text-red" style="text-align: center">{{ tab }}</div>

            <q-input v-model="credentials.email" class="input" outlined label="Email" />
            <div> </div>
            <q-input v-model="credentials.password" class="input" outlined type="password" label="Lozinka" />


            <div class="row justify-between">
              <q-btn style="background-color: red; color: white" to="/">Odustani</q-btn>
              <q-btn style="background-color: red; color: white" type="submit">{{ tab }}</q-btn>
            </div>
          </div>

        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue"



const register = ref(false)
const tab = ref('')



if (!register.value) {
  tab.value = "Prijava"
}
else {
  tab.value = "Registracija"
}


const credentials = reactive({
  email: '',
  password: ''
})



const onSubmit = () => {
  console.log("forma potvrđana")

  if (!credentials.email || !credentials.password) {
    alert('Unesite email i lozinku')
  }
  else {
    if (register.value) {
      console.log('Registriraj korisnika sa:', credentials)
    }
    else {
      console.log('Prijavi korisnika sa:', credentials)
    }
  }


}

</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 400px
    margin: 0 auto
    margin-top: 40px
    font-size: 36px
    width: 100%


</style>

<style>
.bg-image {
  background-image: url(https://c1.wallpaperflare.com/preview/108/956/844/people-man-music-party.jpg);

}
</style>


