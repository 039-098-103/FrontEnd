<template>
  <div class="mt-5 box">
    <form @submit.prevent="submitAccount" v-if="hiddenEdit == true">
      <div class="edit flex justify-center">
        <input
          v-model="firstName"
          type="text"
          class="px-5 py-1 inline my-2 "
          placeholder="Name"
        />
      </div>
      <sup v-show="inputFirstname" class="text-red-500 flex justify-end mt-4">
        Please enter firstname!</sup
      >

      <div class="edit flex justify-center">
        <input
          v-model="lastName"
          type="text"
          placeholder="Change lastname"
          class="px-5 py-1 inline my-2"
        />
      </div>
      <sup v-show="inputLastname" class="text-red-500 justify-end mt-4 flex">
        Please enter lastname!</sup
      >

      <div class="edit flex justify-center ">
        <input
        readonly
          v-model="username"
          type="text"
          placeholder="Change username"
          class="px-5 py-1 inline my-2 text-gray-500"
        />
      </div>

      <div class="edit flex justify-center ">
        <input
          v-if="showPassword"
          type="text"
          class="input px-5 py-1 inline my-2"
          v-model="password"
        />
        <input
          v-else
          type="password"
          class="input px-5 py-1 inline my-2"
          v-model="password"
          placeholder="New Password"
        />
        <div
          class="flex items-center bg-gray-300 rounded-full px-1 my-2.5 ml-2"
          @click="showPass"
        >
          <i
            class="fas"
            :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"
          ></i>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex justify-center w-full mb-2 ">
          <button
            class="bg-red-500 text-white"
            type="submit"
            @click="submitEdit"
          >
            SAVE EDIT
          </button>
        </div>
        <div class="flex justify-center w-full">
          <button class="bg-white text-black border-black border-2" @click="cancel">
            CANCEL
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "customer",
  components: {},
  props: {
    editCustomer: {
      type: Object,
    },
  },

  data() {
    return {
      admin: [],
      firstName: "",
      lastName: "",
      username: "",
      password: null,
      url: "https://www.jwbrand.company/backend/api/customer",
      // url: "http://localhost:3000/api/admin",
      show: true,
      hiddenEdit: true,
      inputFirstname: false,
      inputLastname: false,
      inputUsername: false,
      inputPassword: false,
      showPassword: false,
    };
  },
  methods: {
    async showPass() {
      this.showPassword = !this.showPassword;
    },

    cancel() {
      // อันนี้ไว้สำหรับไว้ลองเเก้อีกหน้านึงที่เรียกใช้ compo นี้
      // <edit @handleCancel="ชื่อ method ที่ไว้ใช่เปลี่ยนค่า true false ในการเเสดง ไม่เเสดง"></edit>
      this.$emit("toggleOpen");
    },

    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname
      ) {
        return;
      }
      this.submitEdit();
    },

    async submitEdit() {
      const formData = new FormData();
      var data = {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };
      if (this.password === undefined) {
        data = {
          firstName: this.firstName,
          lastName: this.lastName,
          DOB: this.DOB,
          password: "",
        };
      }
      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("data", blob);
      axios
        .patch(`${this.url}/editInfo`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Edit success");
            this.$emit("toggleDone");
            this.$router.go();
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },

  computed: {
    button() {
      return this.showPassword ? "Hide" : "Show";
    },
  },

  async created() {
    this.firstName = this.editCustomer.firstName;
    this.lastName = this.editCustomer.lastName;
    this.password = this.editCustomer.password;
    this.username = this.editCustomer.username;
  },
};
</script>

<style scoped>
.header {
  @apply xl:mb-5 xl:mt-5 xl:text-2xl
  lg:text-xl;
}
button {
  @apply text-xs px-1 py-1 rounded-full w-full
  lg:px-4
  md:text-sm
  sm:px-3 sm:py-1;
}

.edit {
  @apply text-black text-xs 
  md:text-sm 
  lg:text-base;
}
sup {
  @apply text-xs md:text-sm lg:text-base;
}
input {
  @apply rounded-full w-full bg-gray-300;
}
.box {
  @apply mx-52;
}
</style>
