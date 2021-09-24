<template>
<div class="sticky bg-babyblue py-5 ">
      <p class="brand justify-center flex">
        JWPEI
        </p>
  </div>

  <div class="bg bg-grayblue my-12 pt-12 pb-48 ">
    <div class="login">
      <p>Login</p>
    </div>

    <form @submit.prevent="login">
      <div class="mt-10 px-80">
        <p class="text-sm justify-start flex pl-4">Username</p>
        <input v-model="user" class="rounded-sm py-1 px-2"/>
      </div>
      <div class="mt-10 px-80">
        <p class="text-sm pl-4 justify-start flex">Password</p>
        <input v-model="pass" class="rounded-sm py-1 px-2"/>
      </div>
      <div class="mt-16 submit" v-if="login">
          <button type="submit" class=" bg-skylight px-4 py-2 rounded-md">
            SIGN IN
          </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "admin",
  components: {},

  data() {
    return {
      user: "",
      pass: "",
      showError: false,
      url: "http://localhost:5000/admin",
      username: "Athena",
      password: "123",
    };
  },

  methods: {
    async login() {
      if (this.user === this.username && this.pass === this.password) {
        return this.$router.push('/adminHome');
      } 
      else if(this.user === this.user || this.pass === this.pass){
        alert("Plase enter your username or password")
      }
      else {
        alert("Invalid username or password");
      }
    },
  },
};
</script>

<style>
.brand {
  color: white;
  font-size: 25px;
  font-family: "Bebas Neue", cursive;
  @apply sm:text-3xl md:text-4xl lg:text-5xl;
}
.login {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 30px;
  @apply lg:text-2xl 
  md:text-base 
  sm:text-sm;
}
.bg {
 @apply sm:mx-40 md:mx-40 lg:mx-80;
}
.submit {
  font-family: 'Roboto Condensed', sans-serif;
}
</style>