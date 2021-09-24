<template>
  <navAdmin></navAdmin>

  <div class="mt-12">
    <div class="mb-2 mx-20">
      <div>
        <p class="head font-bold text-left">Officer</p>
        <p class="text opacity-25 text-left">List of officer on the platform</p>
      </div>
    </div>

    <div class="mb-5 flex justify-end mx-20 items-center">
      <i class="fas fa-search self-center"></i>
      <input
        class="ml-2 p-1 w-80 placeholder-gray-500 placeholder-opacity-50
        focus:outline-none text-blackrounded border-b-2" type="text" placeholder="search"
        v-model="search" />
    </div>

    <div class="grid grid-cols-4 gap-x-6 gap-y-8 mx-20">
      <div
        class="bg-blue-100 shadow-md py-5 pl-10"
        
        v-for="list in searching"
        :key="list.id"
      >
        <div class="flex justify-start mb-1">
            <i class="username far fa-user-circle items-center"></i>
          <p class="font-bold ml-1 ">  
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

        <div class="flex justify-end pr-8" @click="deleteStaff(list.id)">
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
    </div>

    <addStaff></addStaff>
  </div>
</template>
<script>
export default {
  name: "staffs",
  components: {},

  data() {
    return {
      staffs: [],
      url: "http://localhost:5000/staffs",
      search: "",
    };
  },

  methods: {
    async getStaffs() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    async deleteStaff(id) {
      if (confirm(`Are you sure to delete ?`)) {
        const res = await fetch(`${this.url}/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.staffs = this.staffs.filter((list) => list.id !== id))
          : alert("Error to delete product");
      }
    },
  },

  async created() {
    this.staffs = await this.getStaffs();
  },

  computed: {
        searching(){
            return this.staffs.filter(showResult => {
                return showResult.username.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
};
</script>

<style>
.head {
  @apply lg:text-3xl;
}
.username{
  @apply lg:text-xl;
}
</style>