<template>
  <div class="bg-image">
    <q-page padding class="flex flex-center">
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="q-gutter-md full-with; flex-center;" style="max-width: 400px;">
            <div class="" style="max-width: 350px; max-height: 520px;">
              <div class="text-h5 text-weight-bold text-center text-red;" style="color:red; height: 45px;">Rezerviraj termin kod DJ-a</div>
              <q-separator color="black" class="bold-separator" />

              <q-input ref="ime_rezRef" v-model="inputime_rez" label="Ime" placeholder="Unesite ime ">
              </q-input>

              <q-input ref="prez_rezRef" v-model="inputprez_rez" label="Prezime" placeholder="Unesite prezime">
              </q-input>

              <q-input ref="broj_rezRef" v-model="inputbroj_rez" label="Broj mobitela" placeholder="Unesite broj mobitela">
              </q-input>

              <q-input ref="mail_rezRef" v-model="inputmail_rez" label="E-mail" placeholder="Unesite E-mail">
              </q-input>

              <q-input ref="datumRef" v-model="inputdatum" label="Datum" placeholder="Unesite datum kada želite rezervirati DJ-a">
              </q-input>
            </div>
          </div>

          <div class="row justify-center q-mt-md">
            <q-btn style="background-color: red; color: white" label="Rezerviraj" @click="submitForm"
              class="center" />
          </div>


          <q-dialog v-model="showDialog">
            <q-card>
              <q-card-section> Rezervacija uspješno unesena! </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Ok" color="red" v-close-popup @click="closeAndReload" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { QDialog } from 'quasar'
import imageCompression from "browser-image-compression";
import { ref } from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      inputime_rez: '',
      inputprez_rez: '',
      inputbroj_rez: '',
      inputmail_rez: '',
      inputdatum: '',
    }
  },
  methods: {
    closeAndReload() {
      this.showDialog = false;
      window.location.reload();
    },

    onUpload() {
      axios.post
    },

    resetForm() {
      this.inputime_rez = ''
      this.inputprez_rez = ''
      this.inputbroj_rez = ''
      this.inputmail_rez = ''
      this.inputdatum = ''
      this.$refs.ime_rezRef.resetValidation()
      this.$refs.prez_rezRef.resetValidation()
      this.$refs.broj_rezRef.resetValidation()
      this.$refs.mail_rezRef.resetValidation()
      this.$refs.datumRef.resetValidation()
    },
    async submitForm() {
      const sampleData = {
        ime_rez: this.inputime_rez,
        prez_rez: this.inputprez_rez,
        broj_rez: this.inputbroj_rez,
        mail_rez: this.inputmail_rez,
        datum: this.inputdatum,
      }
      try {
        const response = await axios.post(
          'http://localhost:4200/unos_rez',
          sampleData
        )
        console.log(response.data)
        this.showDialog = true
        this.resetForm()
      } catch (error) {
        console.error(error)
      }
    }
  },
}

</script>

<style>
.bg-image {
  background-image: url(https://c1.wallpaperflare.com/preview/108/956/844/people-man-music-party.jpg);

}

.bold-separator {
  border-top: 2px solid black;
}
</style>
