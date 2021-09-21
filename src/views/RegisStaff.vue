<template>
  <navAdmin></navAdmin>

  <div class="bg-babyblue my-12 mx-80">
    <div class="header pt-10">
      <p>Create Account</p>
    </div>

    <div class="my-2">
      <p>Firstname</p>
      <input v-model="firstName"/>
    </div>
    <div class="my-2">
      <p>Lastname</p>
      <input v-model="lastName"/>
    </div>
    <div class="my-2">
      <p>Birthday</p>
      <input type="date" v-model="DOB"/>
    </div>
    <div class="my-2">
      <p>Username</p>
      <input v-model="username"/>
    </div>
    <div class="my-2">
      <p>Set password</p>
      <input v-model="password"/>
    </div>
    <div class="my-2 pb-12">
      <p>Confirm password</p>
      <input v-model="confirmPassword"/>
    </div>

    <div >
        <button class="bg-white" @click="submitStaff">SUBMIT</button>
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
        
        this.password = "";
        this.confirmPassword = "";
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