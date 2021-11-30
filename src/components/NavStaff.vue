<template>
  <div class="navbar fixed py-5 grid grid-cols-3 w-screen ">
    <div class="items-center justify-start flex" @click="showHamburger()">
      <i class="icons fas fa-bars fa-lg"></i>
    </div>
    <p class="brand justify-center flex">
      <router-link to="/staffHome">
        JWPEI
      </router-link>
    </p>

    <div class="items-center justify-end flex ">
      <router-link to="/">
        <i class="icons fas fa-user fa-lg"></i>
      </router-link>
    </div>
  </div>

  <div v-if="hamburgerBar" class="menuNav bg-loginAd fixed w-full ">
    <div class="navbar fixed py-5 grid grid-cols-3 w-screen ">
      <div class="items-center justify-start flex" @click="showHamburger()">
        <i class="icons fas fa-bars fa-lg"></i>
      </div>
      <p class="brand justify-center flex">
        <router-link to="/">
          JWPEI
        </router-link>
      </p>

      <div class="items-center justify-end flex ">
        <router-link to="/">
          <i class="icons fas fa-user fa-lg"></i>
        </router-link>
      </div>
    </div>

    <div class="flex justify-center">
      <div>
        <router-link to="/staffHome">
          <p class="pb-5 pt-10 mt-20 flex justify-center">Staff List</p>
        </router-link>

        <router-link to="/">
          <p class="py-5 flex justify-center">Register Staff</p>
        </router-link>
        <div class="py-5 flex justify-center" @click="showHamburger()">
          <i class="iconNav fas fa-angle-up fa-2x"></i>
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
  color: white;
  font-size: 25px;
  font-family: "Bebas Neue", cursive;
  @apply text-2xl 
  sm:text-3xl 
  md:text-4xl 
  lg:text-5xl;
}
.icons {
  font-size: 2rem;
  color: white;
  @apply text-lg mx-12
  sm:text-lg sm:mx-14
  lg:text-2xl;
}
.menuNav {
  font-size: 16px;
  color: white;
}
.iconNav {
  font-size: 2rem;
}
</style>
