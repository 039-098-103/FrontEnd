<template>
  <div class="layout bg-loginAd h-screen">
    <div class="form">
      <div class="brand flex justify-center">JW PEI</div>

      <form @submit.prevent="login">
        <div class="input relative mx-auto">
          <input
            v-model="user"
            class="input-w rounded-full py-1.5 px-8 w-max "
            placeholder="USERNAME"
            type="text"
          />
          <div class="icons absolute flex items-center top-0 left-16 h-full">
            <i class="fas fa-user-circle "></i>
          </div>
        </div>

        <div class="input relative mx-auto">
          <input
            v-model="pass"
            class="input-w rounded-full py-1.5 px-8 w-max "
            placeholder="PASSWORD"
            type="password"
          />
          <div class="icons absolute flex items-center top-0 left-16 h-full">
            <i class="fas fa-lock"></i>
          </div>
        </div>

        <div v-if="login" class="signin">
          <button class="login bg-red-500 px-20 rounded-full">
            <p class="px-3 py-1">Log In</p>
          </button>
        </div>
      </form>
    </div>
    <div class="h-screen">
      <img
        src="../../src/assets/bagbrown.png"
        class="lg:block hidden h-screen"
      />
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
      url: "https://www.jwbrand.company/backend/api/worker/auth",
      // url: "http://localhost:3000/api/worker/auth",
    };
  },
  created() {
    let check = localStorage.getItem("token");
    if (!check) {
      return;
    } else {
      return this.$router.push("/worker");
    }
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
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("role", res.data.role);
              if (res.data.role == "Admin") {
                return this.$router.push("/adminHome");
              } else {
                return this.$router.push("/staffHome");
              }
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

<style scoped>
.brand {
  font-family: "Bebas Neue", cursive;
  color: white;
  @apply text-2xl pt-10 pb-5
  lg:text-5xl lg:mt-32
  sm:text-3xl;
}
.layout {
  @apply lg:grid lg:grid-cols-2;
}
.bg {
  @apply md:mx-40 lg:mx-64 xl:mx-80
  xl:my-12 xl:pt-12
  lg:my-12 lg:py-7
  md:my-14 md:py-8 
  sm:my-10 sm:py-10 sm:mx-10 sm:h-auto;
}
.input {
  font-family: "Roboto", sans-serif;
  @apply my-4 text-xs flex justify-center
  lg:text-sm;
}
.input-w {
  @apply sm:py-2
  lg:py-2 lg:w-full;
}
.icons {
  font-size: 16px;
  @apply sm:left-56
  md:left-72
  lg:left-3;
}
.signin {
  font-family: "Roboto", sans-serif;
  color: black;
  @apply font-medium flex justify-center;
}
.login {
  @apply text-sm font-medium
  sm:px-20
  lg:w-full lg:py-0.5;
}
.form {
  @apply lg:px-36
  xl:px-40
  2xl:px-60;
}
</style>
