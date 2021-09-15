<template>
  <div class="bg-babyblue mx-80 mt-20 pt-12 pb-20">
    <div class="login">
      <p>Login</p>
    </div>
    <div class="mt-10">
      <p>Username</p>
      <input class="" />
    </div>
    <div class="mt-10">
      <p>Password</p>
      <input class="" />
    </div>
    <div class="mt-8">
        <router-link to='/admin'>
      <button class="bg-skylight px-4 py-2 rounded-xl">
        SIGN IN 
      </button>
        </router-link>
    </div>
  </div>
</template>
<style>
.login {
  font-family: "Courier New", Courier, monospace;
  font-size: 22px;
}
</style>