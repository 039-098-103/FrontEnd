<template>
    <div class="mb-5 flex justify-end mx-20">
      <i class="fas fa-search"></i>
      <input class="ml-2 p-1 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none text-black rounded" 
      type="text" placeholder="search" v-model="input"/>
    </div>
</template>

<script>
export default{
    name: "staffs",
    components: {},

    data() {
        return{
            staff: [],
            url: "http://localhost:5000/staffs",
            input: "",
        }
    },

    computed: {
        search(){
            return this.url.filter(showResult => {
                return showResult.firstName.toLowerCase().includes(this.input.toLowerCase())
            })
        }
    }
}
</script>
