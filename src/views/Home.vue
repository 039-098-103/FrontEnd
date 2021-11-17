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
    <navProduct />
  </div>

  <div class="product" v-for="show in products" :key="show.productId">
    <img :src="getProductImg(show.imageName)" />

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
</template>

<script>
import axios from "axios";
export default {
  name: "products",
  components: {},

  data() {
    return {
      search: "",
      // url: "http://localhost:5000/products",
      url: "http://localhost:3000/api",
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
      delete: false,
      selectColor: [],
      selectType: null,
      submitEdit: null,
      imgFile: null,
      preview: null,
    };
  },

  methods: {
  //   async getProduct() {
  //     try {
  //       const res = await fetch(this.url);
  //       const data = await res.json();
  //       return data;
  //     } catch (error) {
  //       console.log(`Could not get! ${error}`);
  //     }
  //   },
  // },

  async getProduct() {
      try {
        axios
          .get(`${this.url}/getProduct`)
          .then((res) => {
            this.products = res.data;
            console.log(res.data)
          })
          // .catch((err) => {
          //   // alert(err.response.data);
          //   if(err.response.status === 403){
          //     console.log('you are not log-in')
          //     this.$router.push('/')
          //   }
          //   console.log(err.response.data)
          // });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

   getProductImg(imageName) {
      return "http://localhost:3000/" + imageName;
    },

  async created() {
    // this.products = await this.getProduct();
    // this.colors = await this.getData();
    this.products = await this.getProducts();
    // this.getData();
  },
  },

  computed: {
    searching() {
      return this.products.filter((showResult) => {
        return showResult.productName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  },

}

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
</style>
