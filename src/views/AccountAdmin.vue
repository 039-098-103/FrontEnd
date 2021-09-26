<template>
  <navAdmin></navAdmin>

  <div class="mb-2 mx-20 mt-12 flex justify-center">
    <div>
      <p class="head font-bold text-left">Admin profile</p>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="mt-20 mx-20 bg-blue-100 shadow-md py-5 px-10 w-1/4">
      <div v-for="admin in admin" :key="admin.id">
        <div v-if="hiddenEdit == false">
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
          <div class="flex justify-start">
            <p class="inline">Password : {{ admin.password }}</p>
          </div>
          <div class="flex justify-end">
            <button @click="hiddenEdit = !hiddenEdit ">
              <i class="fas fa-user-edit"></i>
            </button>
          </div>
        </div>

        <div v-else>
          <edit :adminId = "admin.id" :editAdmin = "admin" @toggleOpen = "toggleOpen"></edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  components: {},



  data() {
    return {
      admin: [],
      url: "http://localhost:5000/admin",
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

    async getAdmin() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
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