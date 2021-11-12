<template>
  <navbar></navbar>

  <div class="search flex justify-center items-center pt-20">
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

  <div class="mt-2">
    <navProduct/>
  </div>

  <div class="preview">
    <div class="product" v-for="show in products" :key="show.productId">
        <img
          :src="getProductImg(show.imageName)"
          @click="showProduct(show.productId)"
        />

        <div class="colorSlot pt-4">
          <div
            class="colors pt-4"
            v-for="colorProduct in show.colors"
            :key="colorProduct.colorName"
            :style="{ background: colorProduct.colorName }"
          ></div>
        </div>

        <h3 class="productName text-black">{{ show.productName }}</h3>
        <h4 class="productPrice font-extralight">{{ show.price }} $</h4>
      </div>
  </div>
</template>
<script>
export default {
  name: "products",
  components: {},

  data() {
    return {
      search: "",
      url: "http://localhost:5000/products",
      products: [],
    };
  },

  methods: {
    async getProduct() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    this.products = await this.getProduct();
    this.colors = await this.getData();
  },

  computed: {
    searching() {
      return this.staffs.filter((showResult) => {
        return showResult.username
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped></style>
