<template>
  <navbar></navbar>

  <div class="pt-24 mx-8">
    <img :src="getProductImg(product.imageName)" class="shadow" />
    {{ product.productName }}
    <!-- <div
      class="colors py-1 "
      :style="{ background: product.colorName }"
    ></div> -->
    {{ product.price }}
    {{ product.productDes }}

    <div>
      <button class="bg-black text-white" @click="goToCart">ADD TO CART</button>
    </div>
  </div>
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

    goToCart(){
      try {
        const formData = new FormData();
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          DOB: this.DOB,
          username: this.username,
          password: this.password,
          positions: this.selectPosition,
        };
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formData.append("data", blob);

        axios
          .post(`${this.url}/addToCart`, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .catch((err) => {
            alert(err.response.data);
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
</style>
