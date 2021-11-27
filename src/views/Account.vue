<template>
  <navbar></navbar>

  <!-- <div class="head flex justify-center text-sm">
    <p class="font-bold pt-20 pb-5">Account</p>
  </div>

  <i class="username far fa-user-circle items-center "></i> -->
  <!-- <div v-for="customer in customer" :key="customer.username">
    {{ customer.firstName }} {{ customer.lastName }}
  </div> -->
  <div class="bg">
    <div class="pt-20">
      <input
        class="input-w rounded-full py-1.5 px-8 w-max border-2 border-black"
        placeholder="USERNAME"
        type="text"
      />
      <input
        class="input-w rounded-full py-1.5 px-8 w-max border-2 border-black"
        placeholder="PASSWORD"
        type="text"
      />
      <router-link to="/login">
        <button class="bg-red-500 rounded-full px-5 py-1 text-xs">
          LOG IN
        </button>
      </router-link>
    </div>
    <div>
      <button class="bg-black text-white rounded-full px-5 py-1 text-xs">
        REGISTER
      </button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "customer",
  components: {},

  data() {
    return {
      customer: [],
      url: "http://localhost:5000/customer",
      firstName: "",
      lastName: "",
      DOB: null,
      username: "",
      password: "",
      submitEdit: null,
      hiddenEdit: false,
    };
  },

  methods: {
    async getCustomer() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    toggleOpen() {
      this.hiddenEdit = false;
    },

    toggleDone() {
      this.hiddenEdit = false;
    },
    //   async getCustomer() {
    //   try {
    //     axios
    //       .get(this.url, {
    //         headers: {
    //           Authorization: localStorage.getItem("token"),
    //         },
    //       })
    //       .then((res) => {
    //         this.customer = res.data;
    //       })
    //       .catch((err) => {
    //         alert(err.response.data);
    //       });
    //   } catch (error) {
    //     console.log(`Could not get! ${error}`);
    //   }
    // },
  },

  async create() {
    this.customer = await this.getCustomer();
  },
};
</script>

<style scoped>
.bg{
  /* background-image: url(darkgreen.png); */
}
</style>
