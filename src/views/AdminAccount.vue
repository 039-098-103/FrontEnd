<template>
  <div class="bg-loginAd h-screen mt-0">
    <navAdmin></navAdmin>

    <div class="layout text-white">
      <div class="lg:col-span-5 pt-5">
        <p class="account font-bold text-white pt-20 pb-5">Account</p>

        <i class="username far fa-user-circle items-center "></i>

        <div v-for="admin in admin" :key="admin.username">
          <div v-if="hiddenEdit == false">
            <div class="detail flex justify-center mb-1">
              <p class="user font-bold">
                {{ admin.firstName }} {{ admin.lastName }}
              </p>
            </div>

            <div class="info">
              <div>
                <div class="detail flex justify-start">
                  <p class="">Username : {{ admin.username }}</p>
                </div>
                <div class="detail flex justify-start">
                  <p>Birthday : {{ admin.DOB }}</p>
                </div>

                <div class="detail flex justify-start">
                  <p class="">Position : {{ admin.position }}</p>
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
            <edit
              :adminUsername="admin.username"
              :editAdmin="admin"
              @toggleOpen="toggleOpen"
              @toggleDone="toggleDone"
              :fn="firstName"
              :ln="lastName"
              :DOB="bt"
            ></edit>
          </div>
        </div>
      </div>

      <div class="lg:col-span-6">
        <img src="../../src/assets/orange.jpg" class="lg:block hidden" />
      </div>
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
      admin: [],
      // url: "http://52.187.115.71:3000/admin/getInfo",
      url: "http://localhost:3000/api/admin/getInfo",
      firstName: "",
      lastName: "",
      DOB: null,
      username: "",
      submitEdit: null,
      hiddenEdit: false,
    };
  },

  methods: {


    logout() {
      localStorage.removeItem("token");
      console.log("logout");
      return this.$router.push("/adminLogin");
    },

    toggleOpen() {
      this.hiddenEdit = false;
    },

    toggleDone() {
      this.hiddenEdit = false;
    },

    async getAdmin() {
      try {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.admin = res.data;
          })
          .catch((err) => {
            alert(err.response.data);
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    hideEdit() {
      this.hidenEdit = true;
    },
  },

  async created() {
    this.admin = await this.getAdmin();
  },
};
</script>

<style scoped>
/* .head {
  @apply xl:mt-20 xl:text-3xl
  lg:mt-16 lg:text-2xl
  md:mt-12 md:text-xl
  sm:mt-10 sm:text-lg;
}
.bg {
  @apply py-5 px-7 rounded-sm shadow w-1/2
  xl:mt-14 xl:py-10 xl:px-16
  lg:py-10 lg:px-10 lg:w-1/3
  md:shadow-md
  sm:py-6 sm:px-8 sm:rounded-md sm:w-2/4;
} */
.detail {
  @apply text-xs mt-2
  lg:mt-2 
  sm:text-sm sm:mt-1;
}
.user {
  @apply ml-0.5
  sm:ml-1;
}
.username {
  color: white;
  font-size: 30px;
  /* @apply pt-10; */
}
.layout {
  @apply flex justify-center
  lg:grid lg:grid-cols-11;
}
.account {
  @apply md:text-xl
  lg:text-2xl;
}
button {
  @apply md:text-xs;
}
.info {
  @apply md:mt-5
  lg:justify-center lg:flex;
}
</style>
