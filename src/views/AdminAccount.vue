<template>
  <div class="h-screen mt-0">
    <div class="background bg-loginAd fixed top-0 w-screen h-screen"></div>
    <navAdmin></navAdmin>

    <div class="layout text-white">
      <div class="lg:col-span-5 pt-5">
        <div>
          <div class="flex justify-center">
            <p class="account font-bold text-white pt-20 pb-5 ">Account</p>
          </div>

          <div class="flex justify-center">
            <i class="username far fa-user-circle items-center "></i>
          </div>
        </div>

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
                  <p>Birthday : {{ formatDate(admin.DOB) }}</p>
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
       url: "https://www.jwbrand.company/backend/api/admin/getInfo",
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
      localStorage.removeItem("role");
      return this.$router.push("/worker");
    },

    toggleOpen() {
      this.hiddenEdit = false;
    },

    toggleDone() {
      this.hiddenEdit = false;
    },

    async getAdmin() {
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
    },

    formatDate(date) {
      return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
        new Date(date)
      );
    },
  },

  async created() {
    this.admin = await this.getAdmin();
  },
};
</script>

<style scoped>
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
.background {
  z-index: -10;
}
</style>
