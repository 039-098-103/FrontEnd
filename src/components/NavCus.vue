<template>
  <div class="">
    <div class="navbar fixed py-5 grid grid-cols-3 w-screen ">
      <div class="items-center justify-start flex" @click="showHamburger()">
        <i class="icons fas fa-bars fa-lg"></i>
      </div>

      <p class="brand justify-center flex">
        <router-link to="/">
          JWPEI
        </router-link>
      </p>

      <div class="items-center justify-end flex">
        <router-link to="/" class="mr-7 bag mt-1">
          <i class="fas fa-shopping-bag "></i>
        </router-link>
        <router-link to="/" class="mr-7">
          <i class="user fas fa-user fa-lg"></i>
        </router-link>
      </div>
    </div>

    <div v-if="hamburgerBar" class="menuNav fixed w-full bg-white">
      <div class="navbar fixed py-5 grid grid-cols-3 w-screen ">
        <div class="items-center justify-start flex" @click="showHamburger()">
          <i class="icons fas fa-bars fa-lg"></i>
        </div>
        <p class="brand justify-center flex">
          <router-link to="/">
            JWPEI
          </router-link>
        </p>

      </div>
      <router-link to="/">
        <p class="pb-5 pt-10 mt-20">All</p>
      </router-link>
      <router-link to="/">
        <p class="py-5">New Collection</p>
      </router-link>
      <router-link to="/">
        <p class="py-5">Lookbook</p>
      </router-link>
      <router-link to="/developTeam">
        <p class="py-5">Develop Team</p>
      </router-link>

      <div class="py-5" @click="showHamburger()">
        <i class="iconNav fas fa-angle-up fa-2x"></i>
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
  sm:text-3xl 
  md:text-4xl 
  lg:text-5xl;
}
.icons {
  font-size: 2rem;
  color: black;
  @apply text-lg mx-7
  sm:text-lg sm:mx-10
  md:text-2xl md:mx-12
  lg:text-3xl lg:mx-20;
}
.menuNav {
  font-size: 16px;
}
.iconNav {
  font-size: 2rem;
}
.user {
  font-size: 1rem;
}
</style>
