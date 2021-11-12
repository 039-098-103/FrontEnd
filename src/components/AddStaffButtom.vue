<template>
  <div class="flex justify-end sticky mr-8 bottom-8 items-end">
    <router-link to="/addAccount">
      <div
        class="size  rounded-full w-8 h-8 items-center flex justify-center button bg-black"
      >
        <i class="icon fas fa-plus"></i>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.icon {
  font-size: 20px;
  color: white;
}
.button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.4s;
  box-shadow: 1px 1px 8px 0 gray;
}
.size {
  @apply lg:w-12 lg:h-12  
  md:w-10 md:h-10;
}
</style>