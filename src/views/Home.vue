<template>
  <navbar></navbar>

  <div class="navpd pt-20 justify-center flex">
    <navProduct />
  </div>

  <div class="lg:grid lg:grid-cols-5">
    <div class="yellow mx-8 mt-5 flex justify-center">
      <img src="../../src/assets/yellow.png" class="shadow " />
    </div>

    <div v-if="products" class="image mt-5 grid grid-cols-2">
      <div class="">
        <div class="flex justify-center">
          <img :src="getProductImg(products[3].imageName)" class="shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[3].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[3].productName }}
          </div>
          <div class="center">{{ products[3].price }} $</div>
        </div>
      </div>

      <div class="">
        <div class="flex justify-center">
          <img :src="getProductImg(products[11].imageName)" class=" shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[11].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[11].productName }}
          </div>
          <div class="center">{{ products[11].price }} $</div>
        </div>
      </div>

      <div class="">
        <div class="flex justify-center">
          <img :src="getProductImg(products[8].imageName)" class="shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[8].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[8].productName }}
          </div>
          <div class="center">{{ products[8].price }} $</div>
        </div>
      </div>

      <div class="">
        <div class="flex justify-center">
          <img :src="getProductImg(products[5].imageName)" class="shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[5].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[5].productName }}
          </div>
          <div class="center">{{ products[5].price }} $</div>
        </div>
      </div>

      <div class="">
        <div class="flex justify-center">
          <img :src="getProductImg(products[9].imageName)" class="shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[9].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[9].productName }}
          </div>
          <div class="center">{{ products[9].price }} $</div>
        </div>
      </div>

      <div class=" ">
        <div class="flex justify-center">
          <img :src="getProductImg(products[1].imageName)" class=" shadow" />
        </div>
        <div class="product mt-2">
          <div class="box flex justify-center">
            <div
              class="colors py-1 "
              v-for="colorProduct in products[1].Color"
              :key="colorProduct.colorId"
              :style="{ background: colorProduct.colorName }"
            ></div>
          </div>
          <div class="center">
            {{ products[1].productName }}
          </div>
          <div class="center">{{ products[1].price }} $</div>
        </div>
      </div>
    </div>
  </div>

  <div class="new-in mx-8 mt-2">
    <img src="../../src/assets/newin.png" class=" shadow" />
  </div>

  <Footer />
</template>

<script>
import axios from "axios";
export default {
  name: "products",
  components: {},

  data() {
    return {
      search: "",
      url: "https://www.jwbrand.company/backend/api",
      //  url: "http://localhost:3000/api",
      products: [],
      imageName: "",
      price: null,
      productName: "",
      colors: [],
      productDescrip: "",
      inStockDate: null,
      bagType: null,
      ColorsSelect: null,
      show: false,
    };
  },

  methods: {
    async getProduct() {
      try {
        axios.get(`${this.url}/getProduct`).then((res) => {
          this.products = res.data;
        });
        axios.get(`${this.url}/getColors`).then((res) => {
          this.colors = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getProductImg(imageName) {
      return "https://www.jwbrand.company/backend/" + imageName;
      // return "http://localhost:3000/" + imageName;
    },
  },

  async created() {
    this.products = await this.getProduct();
    this.colors = await this.getColors();
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
  @apply w-28 h-28 md:w-52 md:h-52 md:items-center md:flex lg:w-80 lg:h-80;
}
.product {
  font-size: 12px;
  @apply mb-2;
}
.yellow {
  @apply md:mx-12
  lg:col-span-2 lg:mx-0 lg:mr-5 lg:ml-20;
}
.image {
  @apply lg:col-span-3 lg:mr-20 lg:mx-0
  md:grid-cols-3 md:gap-8 md:mx-24 md:px-1;
}
.center {
  @apply flex justify-center;
}
.new-in{
  @apply md:mx-24 md:mb-10
  lg:mt-8 lg:mx-20;
}
.navpd{
  @apply lg:justify-end lg:pt-32;
}
</style>
