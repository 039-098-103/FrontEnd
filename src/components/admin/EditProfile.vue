<template>
  <div class="bg-blue-100">
    <form @submit.prevent="submitEdit">
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
  </div>
</template>
<script>
export default {
  name: "admin",
  components: {},

  props: {
    editAdmin:{
      type: Object,
    }
  },

  data() {
    return {
      admin: [],
      firstName: "",
      lastName: "",
      DOB: null,
      username: "",
      password: "",
      url: "http://localhost:5000/admin",
      show: true,
    };
  },

  methods: {

    cancel() {
      // อันนี้ไว้สำหรับไว้ลองเเก้อีกหน้านึงที่เรียกใช้ compo นี้
      // <edit @handleCancel="ชื่อ method ที่ไว้ใช่เปลี่ยนค่า true false ในการเเสดง ไม่เเสดง"></edit>
      this.$emit('toggleOpen');

    },

    async getData() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async submitEdit() {
      const res = await fetch(`${this.url}/${this.editAdmin.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          DOB: this.DOB,
          username: this.username,
          password: this.password,
        }),
      });
      const data = await res.json();
      this.admin = this.admin.map((adminEdit) =>
        adminEdit.id === data.id
          ? {
              ...adminEdit,
              firstName: data.firstName,
              lastName: data.lastName,
              DOB: data.DOB,
              username: data.username,
              password: data.password,
            }
          : adminEdit
      );
      (this.firstName = ""),
        (this.lastName = ""),
        (this.DOB = null),
        (this.password = ""),
        (this.username = ""),
        (this.submitEdit = null);

        console.log('submit')
    },
  },

  async created() {
    this.admin = await this.getData();
    this.firstName = this.admin.firstName;
    this.lastName = this.admin.lastName;
    this.DOB = this.admin.DOB;
    this.password = this.admin.password;
    this.username = this.admin.username;
  },
};
</script>