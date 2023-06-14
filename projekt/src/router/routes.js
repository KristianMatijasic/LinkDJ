const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "unos", component: () => import("pages/UnosDjPage.vue") },
      { path: "info_stranica", component: () => import("pages/InfoPage.vue") },
      { path: "odjava", component: () => import("pages/OdjavaPage.vue") },
      { path: "auth", component: () => import("pages/RegPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
    ],
  },


  {
    path: "/one_dj",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "one_dj", path: ":id", component: () => import("pages/DjPage.vue"),
      },
    ],
  },

  {
    path: "/unos_rez",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "unos_rez", path: ":id", component: () => import("pages/RezervirajPage.vue"),
      },
    ],
  },

  {
    path: "/dodaj_pjesmu",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "dodaj_pjesmu", path: ":id", component: () => import("src/pages/UnosPjesmePage.vue") },
    ],
  },


  {
    path: "/pregled_rez",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "pregled_rez", path: ":id", component: () => import("src/pages/PregledRezervacijaPage.vue") },
    ],
  },


  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
