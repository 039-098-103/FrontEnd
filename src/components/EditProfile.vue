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

      <div class="edit flex justify-center">
        <input
          v-model="DOB"
          type="date"
          placeholder="Change birthday"
          class="px-5 py-1 inline my-2 xl:w-56"
        />
      </div>
      <sup v-show="inputBOD" class="text-red-500 justify-end flex mt-4">
        Please enter birthday!</sup
      >

      <div class="edit flex justify-center">
        <input
          v-model="username"
          type="text"
          placeholder="Change username"
          class="px-5 py-1 inline my-2"
        />
      </div>
      <sup v-show="inputUsername" class="text-red-500 justify-end flex mt-4">
        Please enter username!</sup
      >

      <div class="edit flex justify-center ">
        <input
          v-if="showPassword"
          type="text"
          class="input"
          v-model="password"
        />
        <input v-else type="password" class="input" v-model="password" />
        <div class="flex items-center bg-white" @click="showPass">
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
          <button class="bg-white text-black buttoncan" @click="cancel">
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
  name: "admin",
  components: {},
  props: {
    editAdmin: {
      type: Object,
    },
  },
  emits: ["editAc"],
  data() {
    return {
      admin: [],
      firstName: "",
      lastName: "",
      DOB: null,
      username: "",
      password: null,
      // url: "http://52.187.115.71:3000/admin",
      url: "http://localhost:3000/api/admin",
      show: true,
      hiddenEdit: true,
      inputFirstname: false,
      inputLastname: false,
      inputBOD: false,
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
    // done(){
    //   alert(`Edit Success`)
    // },
    submitAccount() {
      this.inputFirstname = this.firstName === "" ? true : false;
      this.inputLastname = this.lastName === "" ? true : false;
      this.inputBOD = this.DOB === "" ? true : false;
      this.inputUsername = this.username === "" ? true : false;
      if (
        this.inputFirstname ||
        this.inputLastname ||
        this.inputBOD ||
        this.inputUsername
      ) {
        return;
      }
      this.submitEdit();
    },
    async submitEdit() {
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
        .patch(`${this.url}/update`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.admin = this.admin.map((adminEdit) =>
              adminEdit.username === this.username
                ? {
                    ...adminEdit,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    DOB: this.DOB,
                    username: this.username,
                    password: this.password,
                  }
                : adminEdit
            );
            (this.firstName = ""),
              (this.lastName = ""),
              (this.DOB = null),
              (this.password = ""),
              (this.username = ""),
              (this.submitEdit = null);
            alert("Edit success");
            this.$emit("toggleDone");
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
    // this.admin = await this.getData();
    this.firstName = this.editAdmin.firstName;
    this.lastName = this.editAdmin.lastName;
    this.DOB = this.editAdmin.DOB;
    this.password = this.editAdmin.password;
    this.username = this.editAdmin.username;
  },
};
</script>

<style scoped>
.header {
  @apply xl:mb-5 xl:mt-5 xl:text-2xl
  lg:text-xl;
}
/* .button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 lightblue;
} */
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
  @apply rounded-full w-full;
}
.box {
  @apply mx-52;
}
</style>
