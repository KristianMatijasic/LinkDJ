const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "unos", component: () => import("pages/UnosDjPage.vue") },
      { path: "unos_rez", component: () => import("pages/RezervirajPage.vue") },
      { path: "auth", component: () => import("pages/LoginPage.vue") },
      { path: "pregled_rez", component: () => import("pages/PregledRezervacijaPage.vue") },
    ],
  },

  {
    path: "/auth",
    component: () => import("layouts/BlankLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },


  {
    path: "/one_dj",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        name: "one_dj",
        path: ":id",
        component: () => import("pages/DjPage.vue"),
      },
    ],
  },




  {
    path: "/komentari",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        name: "komentari",
        path: ":id",
        component: () => import("src/pages/komentariPage.vue"),
      },
    ],
  },



  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
