<template>
  <navAdmin></navAdmin>
  <div class="layout flex justify-center bg-loginAd h-screen">
    <div class="flex justify-center lg:col-span-5">
      <div class="header mt-32 absolute lg:block hidden">
        <p>Create Account</p>
      </div>
      <img src="../../src/assets/green.jpg" class="lg:block hidden" />
    </div>

    <div class="lg:col-span-6 mt-20">
      <div class="justify-center mb-2">
        <p class="line mx-2">&nbsp;&nbsp;Profile&nbsp;&nbsp;</p>
      </div>

      <div class="">
        <div class="form justify-center grid my-2 text-xs">
          <input
            v-model="firstName"
            class="rounded-full py-1 px-2 justify-start inline"
            placeholder="FIRSTMANE"
          />
          <div></div>
          <sup
            v-show="inputFirstname"
            class="text-red-500 flex justify-end mt-4"
          >
            Please enter firstname!</sup
          >
        </div>

        <div class="form justify-center grid my-2 text-xs">
          <input
            v-model="lastName"
            class="rounded-full py-1 px-2 justify-start inline"
            placeholder="LASTNAME"
          />
          <div></div>
          <sup
            v-show="inputLastname"
            class="text-red-500 justify-end mt-4 flex"
          >
            Please enter lastname!</sup
          >
        </div>

        <div class="form justify-center grid my-2 text-xs w-full">
          <input
            type="date"
            class="rounded-full py-1 px-5 inline justify-start "
            v-model="DOB"
          />
          <div></div>
          <sup v-show="inputBOD" class="text-red-500 justify-end flex mt-4">
            Please select birthday!</sup
          >
        </div>

        
          <form name="dropdown">
            <select
              v-model="selectPosition"
              class="rounded-full py-1 px-2 justify-start inline"
              placeholder="POSITION"
            >
              <option v-for="position in positions" 
              :value="position" 
              :key="position.positionId">
                {{ position.position }}
              </option>
              
            </select>
          </form>
          <sup
            v-show="inputPostition" 
            class="text-red-500 flex justify-end mt-4"
          >
            Please select position!</sup
          >
       

        <div class="justify-center mt-5 mb-2">
          <p class="line mx-2">&nbsp;&nbsp;Account&nbsp;&nbsp;</p>
        </div>

        <div class="form justify-center grid my-2 text-xs">
          <input
            v-model="username"
            class="rounded-full py-1 px-2 inline justify-start"
            placeholder="USERNAME"
          />
          <div></div>
          <sup
            v-show="inputUsername"
            class="text-red-500 justify-end flex mt-4"
          >
            Please enter username!</sup
          >
        </div>

        <div class="form justify-center grid my-2 text-xs">
          <input
            v-model="password"
            class="rounded-full py-1 px-2 inline justify-start"
            placeholder="PASSWORD"
            type="password"
          />
          <div></div>
          <sup
            v-show="inputPassword"
            class="text-red-500 justify-end flex mt-4"
          >
            Please enter password!</sup
          >
        </div>
        <div></div>

        <div class="form justify-center grid my-1 text-xs">
          <input
            v-model="confirmPassword"
            class="rounded-full py-1 px-2 inline justify-start"
            placeholder="CONFIRM PASSWORD"
            type="password"
          />
          <div></div>
          <sup v-show="inputConfirm" class="text-red-500 justify-end flex mt-4">
            Please confirm password!</sup
          >
        </div>

        <div class="submit mt-5 text-xs">
          <button
            class="bg-red-500 text-white button w-full rounded-full py-2"
            @click="submitAccount"
          >
            REGISTER
          </button>
        </div>
      </div>
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
      inputPostition: false,
      positions: null,
      selectPosition: null,
      firstName: "",
      lastName: "",
      DOB: "",
      username: "",
      password: "",
      confirmPassword: "",
      // url: "http://52.187.115.71:3000/admin",
      url: "http://localhost:3000/api/admin",
      staffs: [],
    };
  },
  
  async created(){
      this.positions = await this.getPositions();
      console.log(this.positions);
    },

  methods: {

    async getPositions(){
      try {
        const res = await fetch("http://localhost:5000/positions");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
      
    },

    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputBOD = this.DOB === "" ? true : false;
      this.inputUsername = this.username === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirm = this.confirmPassword === "" ? true : false;
      this.inputPostition = this.selectPosition === "" ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputBOD ||
        this.inputUsername ||
        this.inputPassword ||
        this.inputConfirm ||
        this.inputPostition
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
          positions: this.selectPosition,
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
              this.positions = "";
              alert("Successfully added!");
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

<style scoped>
.layout {
  @apply lg:grid lg:grid-cols-11;
}
p {
  font-family: "Roboto", sans-serif;
  color: white;
}
.bg {
  @apply xl:my-12 
  lg:my-14 lg:mx-2
  md:mt-10 md:mx-10
  sm:mt-10;
}
.header {
  font-family: "Roboto Condensed", sans-serif;
  @apply text-lg mb-2
  lg:text-3xl lg:mb-8
  md:text-xl md:mb-4 md:font-semibold
  sm:text-lg;
}
.but:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
.submit {
  @apply xl:pb-1;
}
.form {
  @apply lg:text-sm
  sm:grid-cols-2 sm:mt-2;
}
.title {
  @apply flex justify-start mt-4
  lg:mx-5
  md:mx-1;
}
.button {
  @apply md:text-sm md:px-4 md:mt-8 md:rounded-md;
}
.line {
  display: flex;
  flex-direction: row;
}
.line::before,
.line::after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid white;
  margin: auto;
}
</style>
