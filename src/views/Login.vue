<template>
  <navbar />

  <div class="flex justify-center h-screen bg-bottlegreen">
    <div class="box text-xs pt-10 pb-2 px-5 mt-32 mb-auto rounded-lg">
      <div v-if="hidden == false">
        <form @submit.prevent="login">
          <div class="relative mb-2">
            <input
              v-model="user"
              class="rounded-full py-1.5 px-8 w-full"
              placeholder="USERNAME"
              type="text"
            />
            <div class="icons absolute flex items-center h-full top-0 left-2">
              <i class="fas fa-user-circle "></i>
            </div>
          </div>

          <div class="relative mx-auto">
            <input
              v-model="pass"
              class="rounded-full py-1.5 px-8 w-full"
              placeholder="PASSWORD"
              type="password"
            />
            <div class="icons absolute flex items-center top-0 left-2 h-full">
              <i class="fas fa-lock"></i>
            </div>
          </div>

          <div v-if="login" class="signin mt-5">
            <button class="login bg-red-500 px-20 rounded-full">
              <p class="px-3 py-2 text-black">Log In</p>
            </button>
          </div>

          <div class="text-white grid grid-cols-2 mt-5">
            <p class="justify-start flex">Don’t have account?</p>
            <U class="justify-end flex text-red-500" @click="hidden = !hidden"
              >Create an Account</U
            >
          </div>
        </form>
      </div>

      <div v-else>
        <Register />
      </div>
    </div>

    <img
      src="../../src/assets/bg-img.jpg"
      class="lg:block hidden h-screen w-full static"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: "",
      pass: "",
      url: "http://localhost:3000/api/auth/customer",
      customer: [],
      staff: [],
      hidden: false,
    };
  },

  methods: {
    toggleOpen() {
      this.hiddenEdit = false;
    },

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
              return this.$router.push("/allProduct");
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }
    },
  },

  async created() {
    this.customer = await this.getCustomer();
    this.staff = await this.getStaff();
  },
};
</script>

<style scoped>
.box {
  background-color: rgba(0, 0, 0, 0.658);
  @apply lg:absolute lg:border-black lg:border lg:flex lg:mt-48  lg:px-20 lg:pt-10 lg:rounded-lg lg:shadow-md;
}
.signin {
  @apply lg:mb-10;
}
</style>
