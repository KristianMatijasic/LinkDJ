<template>
  <q-page class="bg-image">


    <q-card class="my-card absolute-center">

      <q-card-section>
        <div class="q-gutter-md full-with" style="max-width: 500px">
        <div class="loginText text-bold text-red" style="text-align: center">Registracija</div>
    <q-form @submit="login">

      <q-input v-model="username" label="Korisničko ime" placeholder="Unesite korisničko ime" outlined dense class="q-mb-md"></q-input>
      <q-input v-model="password" label="Lozinka" type="password" placeholder="Unesite lozinku" outlined dense class="q-mb-md"></q-input>

      <div class="row justify-between">
      <q-btn type="submit" label="registracija" style="background-color: red; color: white" :disable="isLoading"></q-btn>
      <q-btn style="background-color: red; color: white" to="/">Odustani</q-btn>
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
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await fetch('http://localhost:4200/registracija', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          this.showAlert('success', 'Registracija uspješna!');
        } else {
          this.showAlert('negative', 'Korisničko ime zauzeto, unesite drugo korisničko ime!');
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
        this.showAlert('negative', 'An error occurred during login');
      } finally {
        this.isLoading = false;
      }
    },
    showAlert(color, message) {
      this.$q.notify({
        color: color,
        message: message,
        position: 'top',
        timeout: 2000,
      });
    },
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
