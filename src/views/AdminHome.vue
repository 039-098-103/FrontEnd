<template>
  <navAdmin></navAdmin>

  <div class="mt-12">

    <div class="mb-2 mx-20">
      <div>
        <p class="head font-bold text-left">Officer</p>
        <p class="text opacity-25 text-left">List of officer on the platform</p>
      </div>
    </div>

    <div class="mb-5 flex justify-end mx-20">
      <i class="fas fa-search"></i>
      <input class="border-b-2" type="text" />
    </div>

    <div class="grid grid-cols-4 gap-x-6 gap-y-8 mx-20">
      <div
        class="bg-blue-100 shadow-md py-5 pl-10"
        v-for="list in staffs"
        :key="list.id"
      >
        <div class="flex justify-start">
          <p class="font-bold">
            <i class="far fa-user-circle"></i> {{ list.username }}
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
};
</script>

<style>
.head {
  @apply lg:text-3xl;
}
</style>