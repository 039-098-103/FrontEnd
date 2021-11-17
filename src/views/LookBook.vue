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

  <div class="mx-7 mt-2">
    <div class="pic1 grid lg:grid-cols-2 ">
      <div>
        <img src="../../src/assets/model2.jpg" class="" />
      </div>
      <div>
        <h1>ALL BLACK</h1>
        <h2>JW PEI - MAZE BAG</h2>
        <p>
          maze collection Lizard-embossed vegan leather bag, 1 open pocket
          inside &1 The slip compartment has a zipper. Suitable for iPhone12 Pro
          Max and all other smaller phones.
        </p>
      </div>
    </div>
  </div>
  <div class="mx-7 mt-2">
    <div class="pic1 grid lg:grid-cols-2 ">
      <div>
        <h1>ALL BLACK</h1>
        <h2>JW PEI - MAZE BAG</h2>
        <p>
          maze collection Lizard-embossed vegan leather bag, 1 open pocket
          inside &1 The slip compartment has a zipper. Suitable for iPhone12 Pro
          Max and all other smaller phones.
        </p>
      </div>
      <div>
        <img src="../../src/assets/model1.jpg" class="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pic1 {
  @apply  lg:mx-16 lg:mt-14;
}
</style>
