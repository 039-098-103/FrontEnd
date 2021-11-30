<template>
  <navbar></navbar>

  <div class="navpd pt-20 justify-center flex">
    <navProduct />
  </div>

  <div class="mx-7 mt-2">
    <div class="pic1 grid lg:grid-cols-2 ">
      <div class="flex justify-center">
        <img src="../../src/assets/model2.jpg"  />
      </div>
      <div class="content mb-5 mt-2">
        <h1 class="flex justify-center">ALL BLACK</h1>
        <h2 class="flex justify-center">JW PEI - MAZE BAG</h2>
        <p class="flex justify-center text-justify">
          maze collection Lizard-embossed vegan leather bag, 1 open pocket
          inside &1 The slip compartment has a zipper. Suitable for iPhone12 Pro
          Max and all other smaller phones.
        </p>
      </div>
    </div>
  </div>
  <div class="mx-7 mt-2 md:mb-10" >
    <div class="pic1 grid lg:grid-cols-2 ">
      <div class="content mb-2">
        <h1 class="flex justify-center">GREEN X ORANGE</h1>
        <h2 class="flex justify-center">JW PEI - GABBI BAG</h2>
        <p class="flex justify-center text-justify">
          Handle Drop Magnetic Closure Undetachable Strap 
          (Unadjustable) 1 Interior Pocket Fits All Sizes 
          Of Phones Imported.
        </p>
      </div>
      <div class="flex justify-center">
        <img src="../../src/assets/model1.jpg" class="" />
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
.pic1 {
  @apply md:mx-14
  lg:mx-16 lg:mt-14 lg:items-center;
}
.navpd {
  @apply lg:justify-end lg:pt-32;
}
.content {
  @apply md:mx-14;
}
h1 {
  @apply font-bold;
}
</style>
