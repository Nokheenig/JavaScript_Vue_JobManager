import Vue from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import auth from '../middleware/auth'
import log from '../middleware/log'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'

//Vue.use(Router)

const routes = [
/*
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited.
    component: () => import(/ webpackChunkName: "about" / '../views/AboutView.vue')
    component: () => import('../views/AboutView.vue')
  }
*/
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      middleware: log
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: log
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      // Hint: try to switch those two around to see
      // how this affects execution of the callbacks.
      middleware: [auth, log]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next
  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
    }
  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware]
      const context = {
        from,
        next,
        router,
        to
      }
      const nextMiddleware = nextFactory(context, middleware, 1)
      return middleware[0]({ ...context, next: nextMiddleware })
    }
    return next()
  })

export default router
