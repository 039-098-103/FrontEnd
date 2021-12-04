<template>
  <navStaff/>

  <div class="h-full md:mb-10 ">
    <div class="background bg-loginAd fixed top-0 w-screen h-screen">
    </div>
    <div class="lg:mr-20">
      <div class="search flex justify-center items-center pt-20 text-xs">
        <i class="icons fas fa-search self-center "></i>
        <input
          class="
          ml-2 lg:w-80
          p-1
          placeholder-white
          focus:outline-none
          text-white
          border-b-2
          border-white
          bg-loginAd
        "
          type="text"
          placeholder="search"
          v-model="search"
        />
      </div>
    </div>

    <div class="product grid grid-cols-2 mx-8 gap-4 mt-5 lg:pt-8">
      <div v-for="show in searching" :key="show.productName">
        <div class="flex justify-center">
            <img :src="getProductImg(show.imageName)" class="picture shadow rounded-md" />
        </div>

        <div class=" mt-3 ">
          <div class="box-color flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in show.Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="box mt-2 text-white">
            <div>
              <div class="flex justify-center">
                {{ show.productName }}
              </div>
              <div class="flex justify-center">{{ show.price }} $</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      // url: "http://localhost:5000/products",
      url: "https://jwbrand.company/backend/api",
      products: [],
      imageName: "",
      price: null,
      productName: "",
      colors: [],
      productDescrip: "",
      inStockDate: null,
      bagType: null,
      ColorsSelect: null,
      show: true,
    };
  },

  methods: {
    async getProduct() {
      try {
        axios.get(`${this.url}/getProduct`).then((res) => {
          this.products = res.data;
          console.log("test");
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getProductImg(imageName) {
      return "https://jwbrand.company/backend/" + imageName;
    },
  },

  async created() {
    await this.getProduct();
  },

  computed: {
    searching() {
      return this.products.filter((showResult) => {
        return showResult.productName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.colors {
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply mx-1 justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
.colorSlot {
  display: flex;
  width: 100%;
  @apply justify-center;
}
.showImage {
  /* width: 100px;
  height: 100px; */
  @apply w-28 h-28 md:w-52 md:h-52 md:items-center md:flex lg:w-80 lg:h-80;
}
.product {
  font-size: 12px;
  @apply md:grid-cols-3
  lg:grid-cols-5 lg:gap-x-16 lg:mx-20 lg:mt-2;
}
.search {
  @apply md:text-sm 
  lg:text-xl lg:justify-end lg:pt-32;
}
.nav {
  @apply lg:justify-end lg:text-base lg:mt-14;
}
.box{
  @apply lg:text-sm;
}
.icons{
    color: white;
}
.background{
  z-index: -10;
}
</style>

