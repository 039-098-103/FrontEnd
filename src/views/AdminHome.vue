<template>
  <navAdmin></navAdmin>

  <div class=" h-full lg:h-screen">
    <div class="background bg-loginAd fixed top-0 w-screen h-screen">
    </div>
    <div class="title flex justify-center md:justify-start z-10">
      <div class="posit mt-20">
        <p class="head font-bold">Officer</p>
        <p class="subhead">List of officer on the platform</p>
      </div>
    </div>

    <div class="search flex justify-center items-center z-10">
      <i class="icons fas fa-search self-center"></i>
      <input
        class="
          ml-2 lg:w-80
          p-1
          placeholder-gray-500 placeholder-opacity-50
          focus:outline-none
          text-white
          border-b-2
          bg-loginAd
        "
        type="text"
        placeholder="search"
        v-model="search"
      />
    </div>

    <div class="gridfetch grid lg:grid-cols-4 xl:gap-x-6 xl:gap-y-8 z-10">
      <div
        class="list bg-white rounded-lg shadow-md"
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
          <p :format="'MM.DD.YYYY'">{{ list.DOB }}</p>
        </div>

        <div class="flex justify-end pr-8 " @click="deleteStaff(list.username)">
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
  name: "admin",
  components: {},

  data() {
    return {
      staffs: [],
      url: "https://www.jwbrand.company/backend/api/admin",
      login: "https://www.jwbrand.company/backend/api/worker/auth",
      //  url: "http://localhost:3000/api/admin",
      // login: "http://localhost:3000/api/worker/auth",
      search: "",
      admin: [],
      pass: "",
    };
  },

  methods: {
    async getAdmin() {
        axios
          .get(`${this.userAdmin}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.admin = res.data;
          })
          .catch((err) => {
            alert(err.response.data);
          });
    },

    async getStaffs() {
        axios
          .get(`${this.url}/getStaffList`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.staffs = res.data;
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert("you are not log-in");
              this.$router.push("/adminLogin");
            }
          });
    },

    async deleteStaff(username) {
      if (confirm(`Are you sure to delete ?`)) {
        axios
          .delete(`${this.url}/deleteStaff/${username}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.staffs = this.staffs.filter(
                (list) => list.username !== username
              );
              alert(`Delete Success`)
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
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

<style scoped>
input::placeholder {
  color: white;
}
.posit {
  @apply xl:mb-2 xl:mx-16
  lg:mx-14 lg:mb-2
  md:mx-7 md:mb-1;
}
.head {
  color: white;
  @apply text-lg mt-0
  xl:text-3xl
  lg:text-2xl 
  md:text-2xl md:justify-start md:flex
  sm:text-xl;
}
.subhead {
  color: white;
  @apply text-sm
  lg:text-lg
  md:justify-start;
}
.username {
  @apply lg:text-xl;
}
.icons {
  color: white;
}
.button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 lightblue;
}
.gridfetch {
  @apply mx-12 gap-2
  xl:mx-20
  lg:mx-14 lg:gap-x-4 lg:gap-y-6 lg:grid-cols-4
  md:mx-7 md:grid-cols-3 md:gap-x-4 md:gap-y-6
  sm:mx-16 sm:gap-4;
}
.list {
  @apply lg:py-5 lg:pl-10
  md:py-4 md:pl-8
  sm:py-3 sm:pl-8 
  pb-2 pl-6 pt-4;
}
.search {
  @apply xl:mb-5 xl:mx-20
  lg:mb-6 lg:mx-14
  md:mb-5 md:mx-7 md:justify-end
  my-5 mt-10;
}
.background{
  z-index: -10;
}
</style>
