import { createRouter, createWebHashHistory } from 'vue-router';
import App from "../vue/Home.vue";
import Contact from "../vue/Contact.vue";

const routes = [
    { path: '/', name: 'home', component: App },
    { path: '/contact', name: 'contact', component: Contact}
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;