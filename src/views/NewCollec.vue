<template>
  <navbar></navbar>
  <div class="search flex justify-center items-center pt-20 mb-3 text-xs">
    <i class="icons fas fa-search self-center"></i>
    <input
      class="
          ml-2 lg:w-80
          p-1
          placeholder-gray-500 placeholder-opacity-50
          focus:outline-none
          text-white
          border-b-2
        "
      type="text"
      placeholder="search"
      v-model="search"
    />
  </div>

  <navProduct></navProduct>

  <div class="mt-8 mx-6 ">
    <img src="../../src/assets/info.png" />
  </div>

  <div class="pic mx-6 my-2 flex items-center">
    <img src="../../src/assets/pink.jpg" class="image justify-center" />

    <div class="font text-white w-1/2">
      <div class="jw text-sm font-bold">
        JW PEI
      </div>
      <div class="fei text-xs mb-5">
        FEI 100 Collection has arrived.
      </div>
      <div>
        <router-link to="/">
          <button class="bg-black p-2 md:px-4 text-white text-xs fei">
            SHOP NOW
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },

  methods: {},

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
.search {
  @apply lg:justify-end lg:flex lg:mx-20;
}
.font {
  @apply absolute 
  lg:justify-end lg:text-black;
}
.pic {
}
.jw {
  @apply md:text-2xl
  lg:justify-end;
}
.fei {
  @apply md:text-base;
}
.image {
  @apply lg:flex lg:justify-start lg:w-1/2;
}
</style>
