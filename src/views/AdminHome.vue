<template>
  <navAdmin></navAdmin>

  <div class="mt-12">
    <div class="mb-2 mx-20">
      <div>
        <p class="head font-bold text-left">Officer</p>
        <p class="text opacity-50 text-left">List of officer on the platform</p>
      </div>
    </div>

    <div class="mb-5 flex justify-end mx-20 items-center">
      <i class="fas fa-search self-center"></i>
      <input
        class="
          ml-2
          p-1
          w-80
          placeholder-gray-500 placeholder-opacity-50
          focus:outline-none
          text-blackrounded
          border-b-2
        "
        type="text"
        placeholder="search"
        v-model="search"
      />
    </div>

    <div class="grid grid-cols-4 gap-x-6 gap-y-8 mx-20">
      <div
        class="bg-blue-100 shadow-md py-5 pl-10"
        v-for="list in searching"
        :key="list.username"
      >
        <div class="flex justify-start mb-1">
          <i class="username far fa-user-circle items-center"></i>
          <p class="font-bold ml-1">
            {{ list.username }}
          </p>
        </div>
        <div class="flex justify-start">
          <p class="inline">{{ list.firstName }}</p>
          <p class="inline ml-5">{{ list.lastName }}</p>
        </div>
        <div class="flex justify-start">
          <p>{{ list.DOB }}</p>
        </div>

        <div class="flex justify-end pr-8" @click="deleteStaff(list.username)">
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
    </div>

 
    <div class="flex justify-end sticky bottom-8 mr-12 items-end">
      <div class="rounded-full w-12 h-12 items-center flex justify-center bg-babyblue button ">
      <router-link to="/register">
        <i class="icon fas fa-plus"></i>
        </router-link>
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
      staffs: [],
      // url: "http://localhost:3000/admin",
      url: "http://52.187.115.71:3000/admin",
      search: "",
    };
  },

  methods: {
    async getStaffs() {
      try {
        axios
          .get(`${this.url}/getStaffList`, {
            headers: {
              Authorization: localStorage.getItem("token")
            },
          })
          .then((res) => {
            this.staffs = res.data
          }).catch((err)=>{
            alert(err.response.data)
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async deleteStaff(username) {
      if (confirm(`Are you sure to delete ?`)) {
        axios.delete(`${this.url}/delete/${username}`, {
          headers:{
            Authorization: localStorage.getItem("token")
          }
        }).then((res)=>{
          if(res.status === 200){
            this.staffs = this.staffs.filter((list) => list.username !== username)
          }
        }).catch((err)=>{
          alert(err.response.data)
        })
        
      }
    },
  },

  async created() {
    this.staffs = await this.getStaffs();
  },

  computed: {
    searching() {
      return this.staffs.filter((showResult) => {
        return showResult.username
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style>
.head {
  @apply lg:text-3xl;
}
.username {
  @apply lg:text-xl;
}
.icon{
    font-size: 20px;
    color: white;
}
.button:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: .4s;
  box-shadow: 1px 1px 8px 0 lightblue;
  
}
</style>