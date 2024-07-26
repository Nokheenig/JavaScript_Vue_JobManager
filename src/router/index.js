import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
    { path: "/", component: () => import("../views/JobManagerHome.vue")},
    { path: "/register", component: () => import("../views/JobManagerRegister.vue")},
    { path: "/sign-in", component: () => import("../views/JobManagerSignIn.vue")},
    { 
        path: "/jobs/dashboard", 
        component: () => import("../views/JobManagerDashboard.vue"),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: "/jobs/dashboard-add-post", 
        component: () => import("../views/JobManagerDashboardAddPost.vue"),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: "/jobs/:jobId", 
        component: () => import("../views/JobPost.vue"),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: "/jobs/stats", 
        component: () => import("../views/JobManagerStats.vue"),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: "/escape-game", 
        component: () => import("../views/EscapeGame.vue"),
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            }, 
            reject
        );
    });
}

router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("you don't have access!");
            next("/");
        }
    } else {
        next()
    }
})

export default router
