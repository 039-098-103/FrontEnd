<template>
  <navbar></navbar>

  <div class="detail pt-20 mx-8 grid ">
    <div class="box-image md:items-center">
      <img
        :src="getProductImg(product.imageName)"
        class="image shadow rounded-md"
      />
    </div>

    <div class="md:items-center flex">
      <div>
        <div class="name text-sm font-bold mt-5 flex justify-center">
          {{ product.productName }}
        </div>
        <div class="flex justify-center my-1" >
          <label
            class="colors"
            v-for="product in product.Color"
            :key="product.colorId"
            :style="{ background: product.colorName }"
            
          >
            <input
              type="radio"
              :value="product.productDetailId"
              v-model="color"
            />
          </label>
          
        </div>
        <div class="price mb-5 text-sm font-semibold flex justify-center">
          {{ product.price }} $
        </div>
        <div class="descript text-justify text-xs">
          {{ product.productDes }}
        </div>

        <div class="mt-10 flex justify-center">
          <button
            class="bg-black text-white rounded-full px-5 py-1 text-xs"
            @click="goToCart"
          >
            EDIT
          </button>

          <button
            class="bg-black text-white rounded-full px-5 py-1 text-xs"
            @click="goToCart"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import axios from "axios";
export default {
  name: "PreviewEdit",
  props: ["productId"],

  data() {
    return {
      url: "http://localhost:3000/api",
      product: "",
      // imageName: "",
      color: null,
    };
  },

  methods: {
    getProductImg(imageName) {
      console.log(imageName);
      return "http://localhost:3000/" + imageName;
    },

    goToCart() {
      try {
        console.log(this.color);
        axios
          .post(`${this.url}/customer/addToCart/${this.color}`,{}, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Successfully added to cart");
            }
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert("Please log in to order.");
              this.$router.push("/Login");
            }
            // alert(err.response.data);
          });
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },

  mounted() {
    axios.get(`${this.url}/getProduct/${this.productId}`).then((res) => {
      console.log(res.data);
      return (this.product = res.data);
    });
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
.detail {
  @apply md:grid-cols-2 md:pt-2 md:my-0;
}
.name {
  @apply lg:text-lg;
}
.price {
  @apply lg:text-lg;
}
.descript {
  @apply md:mx-8
  lg:text-base;
}
.image {
  @apply md:h-3/5;
}
.box-image {
  @apply justify-center flex;
}
button {
  @apply md:text-base lg:text-lg;
}
</style>
