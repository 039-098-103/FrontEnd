<template>
  <navAdmin></navAdmin>

  <div class="mb-2 mx-20 mt-12 flex justify-center">
    <div>
      <p class="head font-bold text-left">Admin profile</p>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="mt-20 mx-20 bg-blue-100 shadow-md py-5 pl-10 w-1/4">
      <div v-for="data in admin" :key="data.id">

          <div class="flex justify-start mb-1">
            <i class="username far fa-user-circle items-center"></i>
            <p class="font-bold ml-1">
              {{ data.username }}
            </p>
          </div>
          <div class="flex justify-start">
            <p class="inline">{{ data.firstName }}</p>
            <p class="inline ml-5">{{ data.lastName }}</p>
          </div>
          <div class="flex justify-start">
            <p>{{ data.DOB }}</p>
          </div>

          <div class="flex justify-end pr-8" >
            <i class="fas fa-user-edit" @click="editProfile(adminEdit)"></i>
          </div>


          
            <form @submit.prevent="submit(editing)">
            <div>
              <p>username</p>
              <input v-model="username" type="text" placeholder="Change username"/>
            </div>
            <div>
              <p>Password</p>
              <input v-model="password" type="text" placeholder="Change password"/>
            </div>
          </form>

          

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
      hidenEdit: false,
      show: false,

    };
  },

  methods: {
    async getAdmin() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    editProfile(adminEdit) {
      this.firstName = adminEdit.firstName;
      this.lastName = adminEdit.lastName;
      this.DOB = adminEdit.DOB;
      this.username = adminEdit.username;
      this.password = adminEdit.password;
      this.submitEdit = adminEdit;
    },

    async submit(editing) {
      const res = await fetch(`${this.url}/${editing.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          DOB: this.DOB,
          username: this.username,
          password: this.password,
        }),
      });
      const data = await res.json();
      this.admin = this.admin.map((adminEdit) =>
        adminEdit.id === data.id
          ? {
              ...adminEdit,
              firstName: data.firstName,
              lastName: data.lastName,
              DOB: data.DOB,
              username: data.username,
              password: data.password,
            }
          : adminEdit
      );
      (this.firstName = ""),
        (this.lastName = ""),
        (this.DOB = null),
        (this.password = ""),
        (this.username = ""),
        (this.submit = null);
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