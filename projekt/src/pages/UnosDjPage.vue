<template>
  <div class="bg-image">
    <q-page padding class="flex flex-center">
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="q-gutter-md full-with; flex-center;" style="max-width: 400px;">
            <div class="" style="max-width: 350px; max-height: 520px;">
              <div class="text-h5 text-weight-bold text-center text-red;" style="color:red; height: 45px;">Unos osobnih
                podataka DJ-a</div>
              <q-separator color="black" class="bold-separator" />
              <q-input ref="DJimeRef" v-model="inputDJime" label="DJ ime" placeholder="Unesite DJ ime">
              </q-input>

              <q-input ref="imeRef" v-model="inputime" label="Ime" placeholder="Unesite ime ">
              </q-input>

              <q-input ref="prezimeRef" v-model="inputprezime" label="Prezime" placeholder="Unesite prezime">
              </q-input>

              <q-input ref="zanrRef" v-model="inputzanr" label="Žanr" placeholder="Unesite žanr">
              </q-input>

              <q-input ref="gradRef" v-model="inputgrad" label="Grad" placeholder="Unesite grad">
              </q-input>

              <q-input ref="brojRef" v-model="inputbroj" label="Broj mobitela" placeholder="Unesite broj mobitela">
              </q-input>

              <q-input ref="emailRef" v-model="inputemail" label="E-mail" placeholder="Unesite E-mail">
              </q-input>

              <div>
                <input type="file" @change="onFileChange" />


                <div v-if="base64Image">
                  <img :src="base64Image" />
                  <q-separator></q-separator>

                  <div class="q-pa-sm" style="max-width: 500px; overflow-wrap: break-word"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-center q-mt-md">
            <q-btn style="background-color: red; color: white" label="Unesite osobne podatke" @click="submitForm"
              class="center" />
          </div>


          <q-dialog v-model="showDialog">
            <q-card>
              <q-card-section> Novi DJ uspješno je unesen! </q-card-section>
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
      inputDJime: '',
      inputime: '',
      inputprezime: '',
      inputzanr: '',
      inputgrad: '',
      inputbroj: '',
      inputemail: '',
      inputSlika: null,

    }
  },
  methods: {
    async onFileChange(e) {
      this.file = e.target.files[0];
      await this.convertImage();
    },
    async convertImage() {
      if (!this.file && !this.imageUrl) {
        return alert("Molimo odaberite sliku.");
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        let compressedFile;

        if (this.imageUrl) {
          const response = await fetch(this.imageUrl);
          const blob = await response.blob();
          compressedFile = await imageCompression(blob, options);
        } else {
          compressedFile = await imageCompression(this.file, options);
        }

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          this.base64Image = reader.result;
          this.base64Text = reader.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
          );
          this.inputSlika = "data:image/jpg;base64," + this.base64Text;
        };
        reader.onerror = (error) => {
          console.error(error);
        };
      } catch (error) {
        console.error(error);
        return alert("Došlo je do pogreške prilikom kompresije slike.");
      }
    },

    closeAndReload() {
      this.showDialog = false;
      window.location.reload();
    },

    onFileSelected(event) {
      this.inputSlika = event.target.files[0]
    },
    onUpload() {
      axios.post
    },
    resetForm() {
      this.inputDJime = ''
      this.inputime = ''
      this.inputprezime = ''
      this.inputzanr = ''
      this.inputgrad = ''
      this.inputbroj = ''
      this.inputemail = ''
      this.inputSlika = ''
      this.$refs.SlikaRef.resetValidation()
      this.$refs.DJimeRef.resetValidation()
      this.$refs.imeRef.resetValidation()
      this.$refs.prezimeRef.resetValidation()
      this.$refs.zanrRef.resetValidation()
      this.$refs.gradRef.resetValidation()
      this.$refs.brojRef.resetValidation()
      this.$refs.emailRef.resetValidation()
    },
    async submitForm() {
      const sampleData = {
        DJime: this.inputDJime,
        ime: this.inputime,
        prezime: this.inputprezime,
        zanr: this.inputzanr,
        grad: this.inputgrad,
        broj: this.inputbroj,
        email: this.inputemail,
        Slika: this.inputSlika

      }
      try {
        const response = await axios.post(
          'http://localhost:4200/DJ',
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
