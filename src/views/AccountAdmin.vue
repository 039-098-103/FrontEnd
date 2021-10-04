<template>
  <navAdmin></navAdmin>

  <div class="head flex justify-center">
    <div>
      <p class="font-bold">Admin profile</p>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="bg bg-blue-100">
      <div v-for="admin in admin" :key="admin.username">
        <div v-if="hiddenEdit == false" >
          <div class="detail flex justify-start mb-1">
            <i class="username far fa-user-circle items-center"></i>
            <p class="user font-bold">
              {{ admin.firstName }} {{ admin.lastName }}
            </p>
          </div>
          <div class="detail flex justify-start">
            <p>Birthday : {{ admin.DOB }}</p>
          </div>
          <div class="detail flex justify-start">
            <p class="">Username : {{ admin.username }}</p>
          </div>
          <!-- <div class="flex justify-start">
            <p class="inline">Password : {{ admin.password }}</p>
          </div> -->
          <div class="detail flex justify-end">
            <button @click="hiddenEdit = !hiddenEdit ">
              <i class="fas fa-user-edit"></i>
            </button>
          </div>
        </div>

        <div v-else>
          <edit  :adminUsername = "admin.username" :editAdmin = "admin" @toggleOpen = "toggleOpen" @toggleDone = "toggleDone"
          :fn="firstName" :ln="lastName" :DOB="bt"></edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "admin",
  components: {},

  data() {
    return {
      admin: [],
      url: "http://52.187.115.71:3000/admin/getInfo",
      // url: "http://localhost:3000/admin/getInfo",
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
    toggleOpen(){
      this.hiddenEdit = false;
      
    },

    toggleDone(){
      this.hiddenEdit = false;
    },

    async getAdmin() {
      try {
        axios.get(this.url, {
          headers:{
            Authorization: localStorage.getItem('token')
          }
        }).then((res)=>{
          this.admin = res.data
        }).catch((err)=>{
          alert(err.response.data)
        })
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

<style>
.head{
  @apply mt-4 text-sm
  xl:mt-20 xl:text-3xl
  lg:mt-16 lg:text-2xl
  md:mt-12 md:text-xl
  sm:mt-10 sm:text-lg;
}
.bg{
  @apply py-5 px-7 mt-10 rounded-sm shadow w-1/2
  xl:mt-14 xl:py-10 xl:px-16
  lg:py-10 lg:px-10 lg:w-1/3
  md:shadow-md
  sm:py-6 sm:px-8 sm:rounded-md sm:w-2/4;
}
.detail{
  @apply text-xs mt-2
  lg:mt-2
  sm:text-sm sm:mt-1;
}
.user{
  @apply ml-0.5
  sm:ml-1;
}
</style>