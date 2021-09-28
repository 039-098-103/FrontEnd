<template>
  <navAdmin></navAdmin>

  <div class="mb-2 mx-20 mt-12 flex justify-center">
    <div>
      <p class="head font-bold text-left mt-5">Admin profile</p>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="mt-14 mx-20 bg-blue-100 shadow-md py-5 px-10 w-1/4">
      <div v-for="admin in admin" :key="admin.username">
        <div v-if="hiddenEdit == false" >
          <div class="flex justify-start mb-1">
            <i class="username far fa-user-circle items-center"></i>
            <p class="font-bold ml-1">
              {{ admin.firstName }} {{ admin.lastName }}
            </p>
          </div>
          <div class="flex justify-start">
            <p>Birthday : {{ admin.DOB }}</p>
          </div>
          <div class="flex justify-start">
            <p class="">Username : {{ admin.username }}</p>
          </div>
          <!-- <div class="flex justify-start">
            <p class="inline">Password : {{ admin.password }}</p>
          </div> -->
          <div class="flex justify-end">
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
      url: "http://52.187.115.71/backend/admin/getInfo",
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
</style>