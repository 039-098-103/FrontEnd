<template>
  <div class="bg-blue-100">
    <p class="header">Edit profile</p>
    <form @submit.prevent="submitEdit" v-if="hiddenEdit == true">
      <div class="edit flex justify-center">
        <p class="flex mr-10 items-center">Firstname</p>
        <input
          v-model="firstName"
          type="text"
          placeholder="Change firstname"
          class="px-2 py-1 inline my-2"
        />
      </div>
      <div class="edit flex justify-center">
        <p class="flex items-center mr-10">Lastname</p>
        <input
          v-model="lastName"
          type="text"
          placeholder="Change lastname"
          class="px-1 py-1 inline my-2"
        />
      </div>
      <div class="edit flex justify-center">
        <p class="flex items-center mr-12">Birthday</p>
        <input
          v-model="DOB"
          type="date"
          placeholder="Change birthday"
          class="px-5 py-1 inline my-2 xl:w-56"
        />
      </div>
      <div class="edit flex justify-center">
        <p class="flex items-center mr-10">Username</p>
        <input
          v-model="username"
          type="text"
          placeholder="Change username"
          class="px-1 py-1 inline my-2"
        />
      </div>
      <div class="edit flex justify-center">
        <p class="flex items-center mr-10">Password</p>
        <input
          v-model="password"
          type="text"
          placeholder="Change password"
          class="px-1 py-1 inline my-2"
        />
      </div>
      <div class="mt-5">
        <button
          class="border-black border buttoncan"
          @click="cancel"
        >
          CANCEL
        </button>
        <button
          class="
            bg-blue-500
            text-white
            border-2 border-blue-500
          "
          type="submit"
        >
          SUBMIT
        </button>
      </div>
    </form>

    <div v-else></div>
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
      password: "",
      url: "http://52.187.115.71:3000/admin",
      // url: "http://localhost:3000/admin",
      show: true,
      hiddenEdit: true,
    };
  },

  methods: {
    cancel() {
      // อันนี้ไว้สำหรับไว้ลองเเก้อีกหน้านึงที่เรียกใช้ compo นี้
      // <edit @handleCancel="ชื่อ method ที่ไว้ใช่เปลี่ยนค่า true false ในการเเสดง ไม่เเสดง"></edit>
      this.$emit("toggleOpen");
    },

    // done(){

    //   alert(`Edit Success`)
    // },

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

  async created() {
    // this.admin = await this.getData();
    this.firstName = this.editAdmin.firstName;
    this.lastName = this.editAdmin.lastName;
    this.DOB = this.editAdmin.DOB;
    // this.password = this.editAdmin.password;
    this.username = this.editAdmin.username;
  },
};
</script>


<style>
.header {
  @apply xl:mb-5 xl:mt-5 xl:text-2xl
  lg:text-xl;
}
.button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
button {
  @apply text-xs mr-4 px-1 py-1 rounded
  lg:px-4 lg:mr-8
  md:text-sm
  sm:mr-7 sm:px-3 sm:py-1
  sm:rounded-md;
}
.buttoncan {
  font-size: 14.5px;
}
.edit {
  @apply text-xs md:text-sm lg:text-base;
}
</style>