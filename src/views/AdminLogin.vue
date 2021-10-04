<template>
  <div class="sticky bg-babyblue py-5">
    <p class="brand justify-center flex">JW PEI</p>
  </div>

<div class="flex justify-center">
  <div class="bg bg-grayblue ">
    <div class="login">
      <p>Login</p>
    </div>

    <form @submit.prevent="login">
      <div class="groupform flex justify-center">
        <div>
          <div class="textname">
            <p class="text-sm justify-start flex">Username</p>
            <input
              v-model="user"
              class="rounded-sm py-1 px-2 flex justify-start"
            />
          </div>

          <div class="textname">
            <p class="text-sm justify-start flex">Password</p>
            <input
              v-model="pass"
              class="rounded-sm py-1 px-2 flex justify-start"
              type="password"
            />
          </div>
        </div>
      </div>
      <div class="submit" v-if="login">
        <button type="submit" class="button bg-skylight ">
          <p class="signin">SIGN IN
          </p>
        </button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "admin",
  components: {},

  data() {
    return {
      user: "",
      pass: "",
      showError: false,
      url: "http://52.187.115.71:3000/auth",
      // url: "http://localhost:3000/auth",
    };
  },

  methods: {
    async login() {
      if (!this.user || !this.pass) {
        alert("Username and Password can't be empty!");
      } else {
        axios
          .post(this.url, {
            username: this.user,
            password: this.pass,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("token", res.data);
              return this.$router.push("/adminHome");
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }
    },
  },
};
</script>

<style>
.brand {
  color: white;
  font-family: "Bebas Neue", cursive;
  @apply sm:text-lg
  md:text-xl 
  lg:text-3xl
  xl:text-5xl;
}
.login {
  font-family: "Roboto Condensed", sans-serif;
  @apply text-lg mb-2
  xl:text-2xl
  lg:text-2xl
  md:text-xl 
  sm:text-xl;
}
.bg {
  @apply
  md:mx-40 lg:mx-64 xl:mx-80
  xl:my-12 xl:pt-12
  lg:my-12 lg:py-7
  md:my-14 md:py-8 
  sm:my-10 sm:py-10 sm:mx-10 sm:h-auto;
}
.submit {
  font-family: "Roboto Condensed", sans-serif;
}
.textname {
  @apply mt-6 
   xl:mt-10 lg:mt-10 md:mt-8 sm:mt-7;
}
.button:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: .4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
.button{
  @apply px-1.5 py-1 mt-10 rounded-sm 
  xl:px-4 xl:py-2 xl:rounded-md xl:mt-16 
  lg:px-3 lg:py-1.5 lg:rounded lg:mb-5 lg:mt-16 
  md:px-1.5 md:py-1 md:text-base md:mt-12 md:rounded
  sm:px-1.5 sm:pt-1 sm:rounded sm:mt-10;
}
.signin{
  @apply text-xs
  sm:text-sm
  md:text-sm;
}
</style>