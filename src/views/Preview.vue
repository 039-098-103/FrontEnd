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
      <div class="name text-sm font-bold mt-5">{{ product.productName }}</div>
      <div class="flex justify-center my-1">
        <div
          class="colors"
          v-for="product in product.Color"
          :key="product.colorId"
          :style="{ background: product.colorName }"
        ></div>
      </div>
      <div class="price mb-5 text-sm font-semibold">{{ product.price }} $</div>
      <div class="descript text-justify text-xs">
        {{ product.productDes }}
      </div>

      <div class="mt-10">
        <button
          class="bg-black text-white rounded-full px-5 py-1 text-xs"
          @click="goToCart"
        >
          ADD TO CART
        </button>
      </div>
    </div></div>
  </div>
  <Footer></Footer>
</template>

<script>
import axios from "axios";
export default {
  name: "Preview",
  props: ["productId"],

  data() {
    return {
      url: "http://localhost:3000/api",
      product: "",
      imageName: "",
    };
  },

  methods: {
    getProductImg(productId) {
      return "http://localhost:3000/" + productId;
    },

    checkLogin(){

    },

    goToCart() {
      try {
        const formData = new FormData();
        let data = this.product
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formData.append("data", blob);

        axios 
          .post(`${this.url}/customer/addToCart/${this.product.productDetailId}`, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .catch((err) => {
             if (err.response.status === 403) {
              alert('Please log in to order.');
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
    console.log(this.productId);
    axios.get(`${this.url}/getProduct/${this.productId}`).then((res) => {
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
