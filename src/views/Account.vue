<template>
  <navbar></navbar>

  <div class="layout ">
    <div class="lg:col-span-5 pt-5">
      <p class="account font-bold pt-20 pb-5 flex justify-center">Account</p>
      <div class="justify-center flex">
        <i class="username far fa-user-circle items-center"></i>
      </div>

      <div>
        <div v-if="hiddenEdit == false">
          <div class="detail flex justify-center mb-1">
            <p class="user font-bold">{{ this.customer.firstName }} {{ this.customer.lastName }}</p>
          </div>

          <div class="info">
            <div>
              <div class="detail flex justify-start">
                <p class="">Username : {{ this.customer.username }}</p>
              </div>

              <div class="detail pt-5">
                <div class="mb-2">
                  <button
                    class="bg-white text-black rounded-full w-full py-1"
                    @click="hiddenEdit = !hiddenEdit"
                  >
                    <i class="fas fa-user-edit"></i>
                    EDIT PROFILE
                  </button>
                </div>

                <div @click="logout()">
                  <button class="bg-red-500 rounded-full w-full py-1">
                    <i class="fas fa-sign-out-alt"></i>
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <editCus
            :cusUsername="customer.username"
            :editCustomer="customer"
            @toggleOpen="toggleOpen"
            @toggleDone="toggleDone"
            :fn="firstName"
            :ln="lastName"
          ></editCus>
        </div>
      </div>
    </div>

    <div class="lg:col-span-6">
      <img src="../../src/assets/orange.jpg" class="lg:block hidden" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "customer",
  components: {},

  data() {
    return {
      customer: [],
      url: "https://www.jwbrand.company/backend/api/customer/accountInfo",
      firstName: "",
      lastName: "",
      DOB: null,
      username: "",
      password: "",
      submitEdit: null,
      hiddenEdit: false,
      token: false,
    };
  },

  methods: {
    toggleOpen() {
      this.hiddenEdit = false;
    },

    toggleDone() {
      this.hiddenEdit = false;
    },

    async getCustomer() {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.customer = res.data;
            console.log(res.data);
          })
          .catch((err) => {
            if (err.response.status === 403) {
              return this.token;
            }
            alert(err.response.data);
          });
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return this.$router.push("/login");
    },
  },

  async created() {
    this.customer = await this.getCustomer();
  },
};
</script>

<style scoped>
button {
  @apply md:text-xs;
}
.detail {
  @apply text-xs mt-2 text-black
  lg:mt-2 
  sm:text-sm sm:mt-1;
}
.user {
  @apply ml-0.5
  sm:ml-1;
}
.username {
  font-size: 30px;
}
.layout {
  @apply flex justify-center
  lg:grid lg:grid-cols-11;
}
.account {
  @apply md:text-xl
  lg:text-2xl;
}
.info {
  @apply md:mt-5
  lg:justify-center lg:flex;
}
</style>
