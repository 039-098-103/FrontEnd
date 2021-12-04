<template>
  <div class="fixed py-5 grid grid-cols-3 w-screen">
    <div class="items-center justify-start flex" @click="showHamburger()">
      <i class="icons fas fa-bars fa-lg"></i>
    </div>

    <p class="brand justify-center flex">
      <router-link to="/">
        JWPEI
      </router-link>
    </p>

    <div class="items-center justify-end mr-7 flex lg:mx-20">
      <router-link to="/cart" class="mr-7 bag mt-1">
        <i class="feature fas fa-shopping-bag "></i>
      </router-link>
      <router-link to="/account" class="">
        <i class="feature user fas fa-user fa-lg"></i>
      </router-link>
    </div>
  </div>

  <div v-if="hamburgerBar" class="menuNav w-full bg-white fixed">
    <div class="fixed py-5 grid grid-cols-3 w-screen ">
      <div class="items-center justify-start flex" @click="showHamburger()">
        <i class="icons fas fa-bars fa-lg"></i>
      </div>
      <p class="brand justify-center flex">
        <router-link to="/">
          JWPEI
        </router-link>
      </p>
    </div>

    <div class="flex justify-center ">
      <div class="">
        <router-link to="/allProduct">
          <p class="pb-5 pt-10 mt-20 menu">All</p>
        </router-link>
        <router-link to="/newCollection">
          <p class="py-5 menu">New Collection</p>
        </router-link>
        <router-link to="/lookbook">
          <p class="py-5 menu">Lookbook</p>
        </router-link>
        <router-link to="/developTeam">
          <p class="py-5 menu">Develop Team</p>
        </router-link>

        <div class="py-5 menu" @click="showHamburger()">
          <i class="iconNav fas fa-angle-up fa-2x "></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      hamburgerBar: false,
    };
  },
  methods: {
    showHamburger() {
      this.hamburgerBar = !this.hamburgerBar;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.brand {
  font-size: 25px;
  font-family: "Bebas Neue", cursive;
  color: black;
  @apply text-2xl 
  md:text-3xl 
  lg:text-5xl;
}
.icons {
  font-size: 2rem;
  color: black;
  @apply text-lg mx-7
  sm:text-lg sm:mx-10
  md:text-2xl md:mx-12
  lg:text-2xl lg:mx-20;
}
.menuNav {
  font-size: 16px;
}
.user {
  font-size: 1rem;
}
.menu{
  @apply justify-center flex text-xs
  md:text-sm
  lg:text-base;
}
.feature{
  @apply md:text-xl;
}

</style>
