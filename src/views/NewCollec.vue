<template>
  <navbar></navbar>

  <div class="navpd pt-20 justify-center flex">
    <navProduct />
  </div>

  <div class="w-full">
    <div class="info mt-8 mx-6 ">
      <img src="../../src/assets/info.png" />
    </div>

    <div class="group mx-6 my-2 grid">
      <div class="">
        <img src="../../src/assets/pink.jpg" class="image justify-center" />
      </div>

      <div class="font flex justify-center mt-4">
        <div>
        <div class="jw text-sm font-bold">
           JW PEI 
        </div>
        <div class="fei text-xs mb-5">
            FEI 100 Collection has arrived.
        </div>
        <div class="but">
          <router-link to="/allProduct">
            <button class=" bg-black p-2 md:px-4 text-white text-xs fei">
              SHOP NOW
            </button>
          </router-link>
        </div>
      </div>
    </div></div>
  </div>
  <Footer />
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
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.search {
  @apply lg:justify-end lg:flex lg:mx-20;
}
.font {
  @apply lg:justify-center lg:items-center ;
}
.group {
  text-align: center;
  @apply lg:grid-cols-2 lg:mx-20 lg:mb-10
  md:mx-14;
}
.info {
  @apply md:mx-14
  lg:mx-20;
}
.jw {
  font-family: "Bebas Neue", cursive;
  @apply md:text-2xl
  lg:justify-end lg:text-5xl;
}
.fei {
  @apply md:text-base  lg:text-xl;
}
.image {
  @apply lg:flex lg:justify-center;
}
.navpd {
  @apply lg:justify-end lg:pt-32;
}
.but{
  @apply md:mb-10;
}
</style>
