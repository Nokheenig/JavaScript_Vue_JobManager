<template>
    <h1>Sign In to an account</h1>
    <p><input v-model="email" type="text" placeholder="Email" /></p>
    <p><input v-model="password" type="password" placeholder="Password" /></p>
    <p v-if="errMsg">{{ errMsg }} </p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from 'vue-router' // import router
  const email = ref("");
  const password = ref("");
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter() // get a reference to our vue router
  
  const register = () => {
      // need .value becaus ref()
      const auth = getAuth() // from firebase/auth
      signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
          console.log("Successfully registered!")
  
          console.log(auth.currentUser)
  
          router.push('/dashboard') // redirect to the dashboard
          data
      })
      .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
            default:
                errMsg.value = "Email or password is incorrect";
                break;
          }
      })
  };
  const signInWithGoogle = () => {
  
  };
  </script>
  
  <style>
  
  </style>