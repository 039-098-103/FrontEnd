<template>
  <navbar />

  <div class="box ">
    <div class="text-lg">
      <p class="flex justify-center">Teams</p>
    </div>

    <h6 class="mt-1 text-center text-sm">
      Integrated Project - INT222 Integrated Information Technology Project
    </h6>

    <div class="team">
      <div class="member">
        <div class=" flex justify-center">
          <img src="../../src/assets/Team/jeab.jpg"/>
        </div>
        <h1>Back-End and Devops-Network</h1>
        <h2>62130500039</h2>
        <h2 class="name">Thanyaluck Ngamchaipisit</h2>
      </div>

      <div class="member">
        <div class=" flex justify-center">
          <img src="../../src/assets/Team/gift.jpg" />
        </div>
        <h1>Database and Devops-Network</h1>
        <h2>62130500098</h2>
        <h2 class="name">Sunanta Singka</h2>
      </div>

      <div class="member">
        <div class=" flex justify-center">
          <img src="../../src/assets/Team/mel.jpg" />
        </div>
        <h1>Front-End and Design</h1>
        <h2>62130500103</h2>
        <h2 class="name">Apisara Ngakor</h2>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
img {
  @apply w-40 h-40 shadow;
}
h1 {
  @apply text-xs font-semibold mt-2 flex justify-center 
  lg:text-base;
}
h2 {
  @apply text-xs flex justify-center md:text-sm lg:text-base;
}
h6 {
  font-size: 12px;
  @apply md:text-sm lg:text-base;
}
p {
  @apply sm:text-xl md:text-2xl lg:text-3xl;
}
.box {
  @apply mx-4 pt-20 lg:pt-32;
}
.team {
  @apply grid lg:grid-cols-3 lg:mx-40 md:mb-10 lg:mb-44 lg:mt-10;
}

.member{
  @apply mt-5;
}
</style>
