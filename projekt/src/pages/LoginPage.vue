<template>
  <q-page class="bg-image">


    <q-card class="my-card absolute-center">

      <q-card-section>
        <div class="q-gutter-md full-with" style="max-width: 500px">
        <div class="loginText text-bold text-red" style="text-align: center">Prijava</div>
    <q-form @submit="login">

      <q-input v-model="username" label="Korisničko ime" placeholder="Unesite korisničko ime" outlined dense class="q-mb-md"></q-input>
      <q-input v-model="password" label="Lozinka" type="password" placeholder="Unesite lozinku" outlined dense class="q-mb-md"></q-input>

      <div class="flex flex-center">
      <q-btn label="prijavi se" style="background-color: red; color: white"></q-btn>
</div>
    </q-form>
</div>
</q-card-section>
    </q-card>

</q-page>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
    };
  },




};
</script>


<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 350px
    margin: 0 auto
    font-size: 36px
    width: 100%
</style>
<style>
.bg-image {
  background-image: url(https://c1.wallpaperflare.com/preview/108/956/844/people-man-music-party.jpg);
}
</style>
