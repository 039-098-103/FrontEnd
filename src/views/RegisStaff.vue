<template>
  <navAdmin></navAdmin>

  <div class="bg-babyblue my-12 mx-96">
    <div class="header pt-10 flex justify-center">
      <p>Create Account</p>
    </div>

    <div class="my-2 mx-60 justify-center">
      <p class="flex justify-start">Firstname</p>
      <input v-model="firstName" class="w-auto"/>
    </div>
    <div class="my-2 mx-60 justify-center">
      <p class="flex justify-start">Lastname</p>
      <input v-model="lastName"/>
    </div>
    <div class="my-2 mx-60 justify-center">
      <p class="flex justify-start">Birthday</p>
      <input type="date" class="px-4" v-model="DOB"/>
    </div>
    <div class="my-2 mx-60 justify-center">
      <p class="flex justify-start">Username</p>
      <input v-model="username"/>
    </div>
    <div class="my-2 mx-60 justify-center">
      <p class="flex justify-start">Set password</p>
      <input v-model="password"/>
    </div>
    <div class="mx-60 justify-center">
      <p class="flex justify-start">Confirm password</p>
      <input v-model="confirmPassword"/>
    </div>

    <div class="py-4">
        <button class="bg-white" @click="submitAccount">SUBMIT</button>
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
  @apply sm:text-sm lg:text-2xl;
}
</style>