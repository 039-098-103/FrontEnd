<template>
  <div class="text-black grid grid-cols-3 lg:mr-16">
    <div class="flex justify-center">
      <router-link to="/allProduct" class="nav hover:text-red-600 inline"
        >ALL
      </router-link>
    </div>
    <div class="flex justify-end">
      <router-link to="/newCollection" class="nav hover:text-red-600 inline"
        >NEW CILLECTION</router-link
      >
    </div>
    <div class=" flex justify-center">
      <router-link to="/lookbook" class="nav hover:text-red-600 inline"
        >LOOKBOOK</router-link
      >
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@300&display=swap");

.nav {
  font-size: 12px;
  font-family: "Rajdhani", sans-serif;
  @apply lg:text-lg;
}

nav:visited {
  color: #e92b2b;
}
</style>
