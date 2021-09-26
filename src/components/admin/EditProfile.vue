<template>
  <div class="bg-blue-100">
    <form @submit.prevent="submitEdit" v-if="hiddenEdit == true">
      <div>
        <p>Firstname</p>
        <input v-model="firstName" type="text" placeholder="Change username" />
      </div>
      <div>
        <p>Lastname</p>
        <input v-model="lastName" type="text" placeholder="Change username" />
      </div>
      <div>
        <p>Birthday</p>
        <input v-model="DOB" type="date" placeholder="Change username" />
      </div>
      <div>
        <p>username</p>
        <input v-model="username" type="text" placeholder="Change username" />
      </div>
      <div>
        <p>Password</p>
        <input v-model="password" type="text" placeholder="Change password" />
      </div>
      <div class="mt-4">
        <button
          class="bg-green-400 px-4 py-1 rounded-sm ml-4 mr-4"
          type="submit"
        >
          Submit
        </button>

        <button class="bg-red-400 px-4 py-1 rounded-sm" @click="cancel">
          Cancel
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
      url: "http://52.187.115.71/backend/admin",
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