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
    title: "Prijava u sustav",
    caption: "Korisničko ime i lozinka DJ-a",
    icon: "login",
    link: "/auth",
    target: "_self",
  },
  {
    title: "Pregled profila",
    caption: "Pogledaj svoj profil",
    icon: "headset",
    link: "/",
    target: "_self",
  },
  {
    title: "Pregled Dj-eva",
    caption: "Pregledaj prijavljene DJ-eve",
    icon: "list",
    link: "/",
    target: "_self",
  },
  {
    title: "Novi DJ...",
    caption: "Unesi osobne podatke DJ-a",
    icon: "DJ",
    link: "unos",
    target: "_self",
  },
  {
    title: "Pregled rezervacija",
    caption: "Pregledaj DJ-ove rezerirane termine",
    icon: "today",
    link: "pregled_rez",
    target: "_self",
  },
  {
    title: "Rezerviraj DJ-a",
    caption: "Rezerviraj termin kod željenog DJ-a",
    icon: "bookmark",
    link: "unos_rez",
    target: "_self",
  },
  {
    title: "O aplikaciji Link.DJ",
    caption: "Pročitaj informacije o apliakciji",
    icon: "info",
    link: "info_stranica",
    target: "_self",
  },
  {
    title: "Odjava iz sustava",
    caption: "Odjavi se...",
    icon: "logout",
    link: "auth",
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
