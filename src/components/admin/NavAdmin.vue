<template>
  <div class="navbar sticky bg-babyblue py-5 grid grid-cols-3">
    <div class="items-center justify-start flex ml-20" @click="showHamburger()">
      <i class="icons fas fa-bars fa-lg"></i>
    </div>

    
      <p class="brand justify-center flex">
       <router-link to="/adminHome"> 
        JWPEI
        </router-link>
        </p>
    
    <div class="items-center justify-end flex mr-20">
      <router-link to="/accountAdmin">
        <i class="icons fas fa-user fa-lg"></i>
      </router-link>
      
    </div>
  </div>
  
  <div v-if="hamburgerBar" class="menuNav bg-babyblue">
    <router-link to="/adminHome">
      <p class="pb-5 pt-10">Staff List</p>
    </router-link>
    <router-link to="/register">
      <p class="py-5">Register Staff</p>
    </router-link>
    <div class="py-5" @click="showHamburger()">
      <i class="iconNav fas fa-angle-up fa-2x"></i>
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


<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.brand {
  color: white;
  font-size: 25px;
  font-family: "Bebas Neue", cursive;
  @apply sm:text-3xl md:text-4xl lg:text-5xl;
}
.icons {
  font-size: 2rem;
  color: white;
  @apply sm:text-xl md:text-2xl lg:text-3xl;
}
.menuNav {
  font-size: 16px;
  color: white;
}
.iconNav {
  font-size: 2rem;
}
</style>


