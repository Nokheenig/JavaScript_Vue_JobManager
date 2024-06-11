<template>
  <h1>Create an account</h1>
  <p><input v-model="email" type="text" placeholder="Email" /></p>
  <p><input v-model="password" type="password" placeholder="Password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script setup>
import { ref } from "vue";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from 'vue-router' // import router
const email = ref("");
const password = ref("");
const router = useRouter() // get a reference to our vue router

const register = () => {
    // need .value becaus ref()
    const auth = getAuth() // from firebase/auth
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Successfully registered!")

        console.log(auth.currentUser)

        router.push('/dashboard') // redirect to the dashboard
        data
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message)
    })
};
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/dashboard");
        })
        .catch((error) => {
            // handle error
            console.log(error.message)
        });
};
</script>

<style>

</style>