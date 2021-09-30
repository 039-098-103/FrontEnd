<template>
  <navAdmin></navAdmin>

  <div class="bg-blue-100 my-12 mx-96">
    <div class="header pt-10 flex justify-center">
      <p>Create Account</p>
    </div>

      <div class="justify-center mt-12">
        <div>
          <p class="mr-20 inline">Firstname</p> 
        <input
            v-model="firstName"
            class="w-auto rounded-sm py-1 px-2 justify-start inline"
            placeholder=""
          />
        </div>
        <sup v-show="inputFirstname" class="text-red-500 justify-start">
          Please enter firstname!</sup
        >
      </div>

      <div class="flex justify-center my-5">
        <div>
          <p class="mr-20 inline">Lastname</p>
          <input
            v-model="lastName"
            class="rounded-sm py-1 px-2 justify-start inline"
          />
        </div>
        <sup v-show="inputLastname" class="text-red-500 justify-start">
          Please enter lastname!</sup
        >
      </div>

      <div class="flex justify-center my-5">
        <p class="mr-24 inline">Birthday</p>
        <input
          type="date"
          class="rounded-sm py-1 px-2 inline justify-start w-52"
          v-model="DOB"
        />
        <sup v-show="inputBOD" class="text-red-500 justify-start">
          Please enter birthday!</sup
        >
      </div>

      <div class="flex justify-center my-5">
        <p class="mr-20 inline">Username</p>
        <input
          v-model="username"
          class="rounded-sm py-1 px-2 inline justify-start"
        />
        <sup v-show="inputUsername" class="text-red-500 justify-start">
          Please enter username!</sup
        >
      </div>

      <div class="flex justify-center my-5">
        <p class="mr-16 inline">Set password</p>
        <input
          v-model="password"
          class="rounded-sm py-1 px-2 inline justify-start"
        />
        <sup v-show="inputPassword" class="text-red-500 justify-start">
          Please enter password!</sup
        >
      </div>
      <div></div>

      <div class="flex justify-center my-5">
        <p class="mr-8 inline">Confirm password</p>
        <input
          v-model="confirmPassword"
          class="rounded-sm py-1 px-2 inline justify-start"
        />
        <sup v-show="inputConfirm" class="text-red-500 justify-start">
          Please confirm password!</sup
        >
      </div>

    <div class="pt-10 pb-12">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md button" @click="submitAccount">
        SUBMIT
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
      url: "http://52.187.115.71:3000/admin",
      // url: "http://localhost:3000/admin",
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
          password: this.password
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
              alert("Staff added!")
            }
          }).catch((err)=>{
            alert(err.response.data)
          });
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
.button:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: .4s;
  box-shadow: 1px 1px 8px 0 lightblue;
  
}
</style>