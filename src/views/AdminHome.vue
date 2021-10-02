<template>
  <navAdmin></navAdmin>

  <div class="mt-12">
    <div class="title">
      <div>
        <p class="head font-bold md:text-left ">Officer</p>
        <p class="subhead opacity-50 md:text-left">List of officer on the platform</p>
      </div>
    </div>

    <div class="search flex md:justify-end items-center">
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

    <div class="gridfetch grid lg:grid-cols-4 xl:gap-x-6 xl:gap-y-8 ">
      <div
        class="list bg-blue-100 shadow-md"
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

    <addStaff></addStaff>

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
.title{
  @apply xl:mb-2 xl:mx-20
  lg:mx-14 lg:mb-2
  md:mx-7 md:mb-1;
}
.head {
  @apply text-lg
  xl:text-3xl
  lg:text-2xl
  md:text-2xl
  sm:text-xl;
}
.subhead{
  @apply text-sm
  lg:text-lg;
}
.username {
  @apply lg:text-xl;
}
.icon{
    font-size: 20px;
    color: white;
  @apply md:text-xs;
}
.button:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: .4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
.gridfetch{
  @apply mx-12 gap-2
  xl:mx-20
  lg:mx-14 lg:gap-x-4 lg:gap-y-6
  md:mx-7 md:grid-cols-3 md:gap-x-4 md:gap-y-6
  sm:mx-14 sm:gap-4;
}
.list{
  @apply lg:py-5 lg:pl-10
  md:py-4 md:pl-8
  sm:py-3 sm:pl-8 
  pb-2 pl-6 pt-4;
}
.search{
  @apply xl:mb-5 xl:mx-20 
  lg:mb-6 lg:mx-14
  md:mb-5 md:mx-7
  my-5 mt-10 justify-center;
}
</style>