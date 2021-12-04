<template>
  <navAdmin></navAdmin>

  <div class="layout flex justify-center bg-loginAd h-screen">
    <div class="flex justify-center lg:col-span-5">
      <img
        src="../../src/assets/green.jpg"
        class="lg:block hidden w-full h-s4 lg:h-screen"
      />
    </div>

    <div class="lg:col-span-6 mt-20 ">
      <div class="justify-center mb-2">
        <p class="title line mx-2">&nbsp;&nbsp;Profile&nbsp;&nbsp;</p>
      </div>

      <div>
        <div class="input">
          <div class=" justify-center grid my-2 text-xs">
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

          <div class="justify-center grid my-2 text-xs ">
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

          <div class="justify-center grid my-2 text-xs">
            <input
              id="date"
              type="date"
              class="date rounded-full py-1 px-4 md:px-3 inline justify-start"
              v-model="DOB"
            />
            <div></div>
            <sup v-show="inputBOD" class="text-red-500 justify-end flex mt-4">
              Please select birthday!</sup
            >
          </div>

          <div class="justify-center grid my-2 text-xs">
            <div class="flex justify-center">
              <form name="" class="">
                <select
                  name="Position"
                  id="Position"
                  v-model="position"
                  class="shadow-md rounded-full "
                >
                  <option value="Admin">
                    Admin
                  </option>
                  <option value="Staff">
                    Staff
                  </option>
                </select>
              </form>
            </div>
            <sup
              v-show="inputPosition"
              class="text-red-500 justify-end flex mt-4"
            >
              Please select position!</sup
            >
          </div>
        </div>

        <div class="justify-center mt-5 mb-2">
          <p class="title line mx-2">&nbsp;&nbsp;Account&nbsp;&nbsp;</p>
        </div>

        <div class="box ">
          <div>
            <div class="justify-center grid my-2 text-xs">
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

            <div class="justify-center grid my-2 text-xs">
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

            <div class="justify-center grid my-1 text-xs">
              <input
                v-model="confirmPassword"
                class="rounded-full py-1 px-2 inline justify-start"
                placeholder="CONFIRM PASSWORD"
                type="password"
              />
              <div></div>
              <sup
                v-show="inputConfirm"
                class="text-red-500 justify-end flex mt-4"
              >
                The password confirm doesn't match.!</sup
              >
            </div>
          </div>

          <div class="submit mt-5">
            <button
              class="bg-red-500 text-white button w-full rounded-full md:py-1.5"
              @click="submitAccount"
            >
              REGISTER
            </button>
          </div>
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
      inputPosition: false,
      firstName: "",
      lastName: "",
      DOB: "",
      username: "",
      password: "",
      confirmPassword: "",
      position: "",
      alertPassword: false,
      url: "https://www.jwbrand.company/backend/api/admin",
      // url: "http://localhost:3000/api/admin",
      staffs: [],
      type: "password",
      btnText: "Show Password",
    };
  },

  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },

    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputBOD = this.DOB === "" ? true : false;
      this.inputUsername = this.username === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirm = this.password !== this.confirmPassword ? true : false;
      this.inputPosition = this.position === "" ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputBOD ||
        this.inputUsername ||
        this.inputPassword ||
        this.inputConfirm ||
        this.inputPosition
      ) {
        return;
      } else if (this.alertPassword) {
        return;
      }
      this.addStaff();
    },

    async addStaff() {
      const formData = new FormData();
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        DOB: this.DOB,
        username: this.username,
        password: this.password,
        position: this.position,
      };

      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);

      axios
        .post(`${this.url}/addWorker`, formData, {
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
            (this.position = ""), alert("Successfully added!");
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },
  mounted() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("date").setAttribute("max", today);
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
  @apply xl:pb-1
  lg:flex justify-center;
}
.title {
  @apply flex justify-start mt-4
  lg:mx-5 lg:text-xl
  md:mx-1 md:text-base;
}
.button {
  @apply md:text-sm md:px-4 md:mt-8
  lg:py-1 lg:w-44 lg:text-base;
}
.line {
  display: flex;
  flex-direction: row;
  @apply lg:mx-20 lg:mt-12 lg:mb-5;
}
.line::before,
.line::after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid white;
  margin: auto;
}
.selectDrop select {
  display: none;
}
.selectDrop {
  background: transparent;
  background-color: white;
  border-color: black;
  @apply px-2 py-1 mb-4 w-full sm:w-32 md:w-40 lg:w-56 lg:text-base;
}
.selectDrop::before {
  border-color: black;
  background: white;
}
.select {
  @apply lg:text-base;
}
.inputDetail {
  @apply px-2 py-1 mb-4 w-full sm:w-32 md:w-40 lg:w-56 lg:text-base;
}
#Position {
  max-width: 100%;
  @apply w-40 py-1 lg:w-36;
}
</style>
