<template>
  <navAdmin></navAdmin>

  <div class="bg bg-blue-100">
    <div class="header flex justify-center">
      <p>Create Account</p>
    </div>

    <div class="form justify-center grid mx-20">
        <p class="title md:inline flex justify-start">Firstname</p>
        <input
          v-model="firstName"
          class="w-auto rounded-sm py-1 px-2 justify-start inline"
          placeholder=""
        /><div></div>
        <sup v-show="inputFirstname" class="text-red-500 flex justify-end mt-4">
        Please enter firstname!</sup
      >
    </div>

    <div class="form justify-center grid mx-20">
        <p class="title md:inline flex justify-start">Lastname</p>
        <input
          v-model="lastName"
          class="rounded-sm py-1 px-2 justify-start inline"
        />
      <div></div>
      <sup v-show="inputLastname" class="text-red-500 justify-end mt-4 flex">
        Please enter lastname!</sup
      >
    </div>

    <div class="form justify-center grid mx-20">
      <p class="title md:inline flex justify-start">Birthday</p>
      <input
        type="date"
        class="rounded-sm py-1 px-2 inline justify-start w-auto"
        v-model="DOB"
      />
      <div></div>
      <sup v-show="inputBOD" class="text-red-500 justify-end flex mt-4">
        Please enter birthday!</sup
      >
    </div>

    <div class="form justify-center grid mx-20">
      <p class="title md:inline flex justify-start">Username</p>
      <input
        v-model="username"
        class="rounded-sm py-1 px-2 inline justify-start"
      />
      <div></div>
      <sup v-show="inputUsername" class="text-red-500 justify-end flex mt-4">
        Please enter username!</sup
      >
    </div>

    <div class="form justify-center grid mx-20">
      <p class="title md:inline flex justify-start">Set password</p>
      <input
        v-model="password"
        class="rounded-sm py-1 px-2 inline justify-start"
      />
      <div></div>
      <sup v-show="inputPassword" class="text-red-500 justify-end flex mt-4">
        Please enter password!</sup
      >
    </div>
    <div></div>

    <div class="form justify-center grid mx-20">
      <p class="title md:inline flex justify-start">Confirm password</p>
      <input
        v-model="confirmPassword"
        class="rounded-sm py-1 px-2 inline justify-start"
      />
      <div></div>
      <sup v-show="inputConfirm" class="text-red-500 justify-end flex mt-4">
        Please confirm password!</sup
      >
    </div>

    <div class="submit">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md button"
        @click="submitAccount"
      >
        CREATE
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      // url: "http://52.187.115.71:3000/admin",
      url: "http://localhost:3000/admin",
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
        const formData = new FormData();
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          DOB: this.DOB,
          username: this.username,
          password: this.password,
        };
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formData.append("data", blob);

        axios
          .post(`${this.url}/addStaff`, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.staffs = [...this.staffs, data];
              this.firstName = "";
              this.lastName = "";
              this.username = "";
              this.password = "";
              this.confirmPassword = "";
              this.DOB = "";
              alert("Staff added!");
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
};
</script>

<style>
.bg {
  @apply h-full pb-10
  xl:my-12 xl:mx-96
  lg:my-14 lg:mx-60 
  md:mt-10 md:mx-40
  sm:mt-10 sm:mx-20;
}
.header {
  font-family: "Roboto Condensed", sans-serif;
  @apply text-lg mb-2
  lg:text-2xl lg:mb-8
  md:text-xl md:mb-4
  sm:text-lg;
}
.button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
.submit {
  @apply xl:pb-12;
}
.form{
  @apply
  sm:grid-cols-2
  sm:mt-2;
}
.title{
  @apply flex justify-start mt-4
  lg:mx-5
  md:mx-1;
}
</style>