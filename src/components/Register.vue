<template>
  <div v-if="hidden == true">
    <div class="justify-center mb-2">
      <p class="line mx-2">&nbsp;&nbsp;Profile&nbsp;&nbsp;</p>
    </div>

    <div class="">
      <div class="">
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

        <div class="justify-center grid my-2 text-xs">
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

        <div class="justify-center grid my-2 text-xs w-full">
          <input
            id="date"
            type="date"
            class="rounded-full py-1 px-5 inline justify-start "
            v-model="DOB"
          />
          <div></div>
          <sup v-show="inputBOD" class="text-red-500 justify-end flex mt-4">
            Please select birthday!</sup
          >
        </div>
      </div>

      <div class="justify-center mt-5 mb-2">
        <p class="line mx-2">&nbsp;&nbsp;Account&nbsp;&nbsp;</p>
      </div>

      <div class="box ">
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
          <sup v-show="inputConfirm" class="text-red-500 justify-end flex mt-4">
            Please confirm password!</sup
          >
          <div>
            <sup
              v-show="alertPassword"
              class="text-red-500 justify-end flex mt-4"
              >The password confirm doesn't match.</sup
            >
          </div>
        </div>

        <div class="submit mt-5 text-xs mb-10">
          <button
            class="bg-red-500 text-white button w-full rounded-full py-2"
            @click="submitAccount"
          >
            REGISTER
          </button>
        </div>
      </div>

      <div class="text-white grid grid-cols-2 mt-5">
        <p class="justify-start flex">Have an account?</p>
        <U class="justify-end flex text-red-500" @click="signin">Sign in</U>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hidden: true,
      url: "https://jwbrand.company/backend/api/customer/register",
      customer: [],
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
      alertPassword: false,
    };
  },

  methods: {
    signin() {
      this.$emit("toggleOpen");
    },

    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputBOD = this.DOB === "" ? true : false;
      this.inputUsername = this.username === "" ? true : false;
      this.inputPassword = this.password === "" ? true : false;
      this.inputConfirm = this.confirmPassword === "" ? true : false;
      this.alertPassword =
        this.password !== this.confirmPassword ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputBOD ||
        this.inputUsername ||
        this.inputPassword ||
        this.inputConfirm
      ) {
        return;
      } else if (this.alertPassword) {
        return;
      }
      this.addCustomer();
    },

    async addCustomer() {
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
        .post(`${this.url}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.customer = [...this.customer, data];
            this.firstName = "";
            this.lastName = "";
            this.username = "";
            this.password = "";
            this.confirmPassword = "";
            this.DOB = "";
            alert("Successfully applied!");
            this.$emit("toggleDone");
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
p {
  font-family: "Roboto", sans-serif;
  color: white;
}
.header {
  font-family: "Roboto Condensed", sans-serif;
  @apply text-lg mb-2
  lg:text-3xl lg:mb-8
  md:text-xl md:mb-4 md:font-semibold
  sm:text-lg;
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
  @apply md:text-sm md:px-4 md:mt-8
  lg:py-1 lg:w-44;
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
</style>
