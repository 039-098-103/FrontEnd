<template>
  <navAdmin></navAdmin>

  <table class="mt-16 justify-center flex">
    <tr class="">
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Username</th>
    </tr>
    <div>
      <tr>
        <div class="staff flex" v-for="list in staffs" :key="list.staff">
          <td>
            {{ list.firstName }}
          </td>
          <td>{{ list.lastName }}</td>
          <td>
            {{ list.username}}
          </td>
    </div>
    </tr>
    </div>
    
  </table>
</template>
<script>
export default {
  name: "staffs",
  components: {},

  data(){
    return{
      staffs: [],
      url: "http://localhost:5000/staffs",

    }
  },

  methods: {
    async getStaffs(){
      try{
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      }catch(error){
        console.log(`Could not get! ${error}`);
      }
    },

    
  },
  async created(){
      this.staffs = await this.getStaffs();
    }

}
</script>
