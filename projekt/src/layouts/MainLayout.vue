<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar style="color: white; background-color: red">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="text-h6"><b>LinkDJ - sustav za rezervaciju DJ-a</b></div>
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" style="background-color: red">
      <q-list style="color: black; background-color: red">
        <q-item-label class="text-bold" header style="color: black; font-size: 20px; text-align: center;">
          IZBORNIK
        </q-item-label>
        <q-separator color="black"/>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Registracija",
    caption: "Napravi korisnički račun...",
    icon: "person_add",
    link: "/auth",
    target: "_self",
  },
  {
    title: "Prijava",
    caption: "Unesi korisničko ime i lozinku...",
    icon: "login",
    link: "/login",
    target: "_self",
  },
  {
    title: "Pregled DJ-eva",
    caption: "Pregledaj DJ-eve...",
    icon: "list",
    link: "/",
    target: "_self",
  },
  {
    title: "Unos osobnih podataka",
    caption: "Unesi osobne podatke...",
    icon: "DJ",
    link: "unos",
    target: "_self",
  },
  {
    title: "Pregled rezervacija",
    caption: "Pregledaj rezerirane termine...",
    icon: "today",
    link: "pregled_rez",
    target: "_self",
  },
  {
    title: "O aplikaciji Link.DJ",
    caption: "Pročitaj informacije o apliakciji...",
    icon: "info",
    link: "info_stranica",
    target: "_self",
  },
  {
    title: "Odjava",
    caption: "Odjavi se iz sustava...",
    icon: "logout",
    link: "odjava",
    target: "_self",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
