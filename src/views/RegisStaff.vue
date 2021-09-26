<template>
  <navAdmin></navAdmin>

  <div class="bg-grayblue my-12 mx-96">
    <div class="header pt-10 flex justify-center">
      <p>Create Account</p>
    </div>

    <div class="mt-10 grid grid-cols-2">
      <div class="ml-20">
        <div>
         <p class="flex justify-start">Firstname</p>
        <input
          v-model="firstName"
          class="w-auto rounded-sm py-1 px-2 flex justify-start"
        /> 
        </div> 
        <sup v-show="inputFirstname" class="text-red-500 justify-start"> Please enter firstname!</sup>
      </div>

      <div class="ml-10">
        <div>
         <p class="flex justify-start">Lastname</p>
        <input
          v-model="lastName"
          class="rounded-sm py-1 px-2 flex justify-start"
        /> 
        </div>
        <sup v-show="inputLastname" class="text-red-500 justify-start"> Please enter lastname!</sup>
      </div>

      <div class="ml-20 mt-4">
        <p class="flex justify-start">Birthday</p>
        <input
          type="date"
          class="rounded-sm py-1 px-2 flex justify-start w-52"
          v-model="DOB"
        />
        <sup v-show="inputBOD" class="text-red-500 justify-start"> Please enter birthday!</sup>
      </div>
    </div>

    <div class="flex justify-center my-10">
      <hr style="width: 90%" />
    </div>

    <div class="grid grid-cols-2">
      <div class="ml-20">
        <p class="flex justify-start">Username</p>
        <input v-model="username" class="rounded-sm py-1 px-2  flex justify-start" />
        <sup v-show="inputUsername" class="text-red-500 justify-start"> Please enter username!</sup>
      </div>

      <div class="ml-10">
        <p class="flex justify-start">Set password</p>
        <input v-model="password" class="rounded-sm py-1 px-2  flex justify-start" />
        <sup v-show="inputPassword" class="text-red-500 justify-start"> Please enter password!</sup>
      </div>
      <div>

      </div>

      <div class="ml-10 mt-4">
        <p class="flex justify-start">Confirm password</p>
        <input v-model="confirmPassword" class="rounded-sm py-1 px-2  flex justify-start" />
        <sup v-show="inputConfirm" class="text-red-500 justify-start"> Please confirm password!</sup>
      </div>
    </div>

    <div class="pt-12 pb-12">
      <button class="bg-white px-4 py-2 rounded-md" @click="submitAccount">
        SUBMIT
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "staffs",
  components: {},

  data() {
    return {
      inputFirstname: false,
      inputLastname: false,
      inputBOD: false,
      inputUsername: false,
      inputPassword: false,
      inputConfirm: false,
      firstName: "",
      lastName: "",
      DOB: "",
      username: "",
      password: "",
      confirmPassword: "",
      url: "http://localhost:5000/staffs",
      staffs: [],
    };
  },

  methods: {
    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputBOD = this.DOB === "" ? true : false;
      this.inputUsername = this.username === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirm = this.confirmPassword === "" ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputBOD ||
        this.inputUsername ||
        this.inputPassword ||
        this.inputConfirm
      ) {
        return;
      }
      this.addStaff();
    },

    async addStaff() {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            DOB: this.DOB,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
          }),
        });
        const data = await res.json();
        this.staffs = [...this.staffs, data];
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.DOB = "";
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
};
</script>

<style>
.header {
  font-family: "Roboto Condensed", sans-serif;
  @apply sm:text-sm lg:text-2xl;
}
</style>