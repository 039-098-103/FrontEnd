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
            class="colors checkbox"
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
            @click="add()"
          >
            ADD TO CART
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
  name: "Preview",
  props: ["productId"],

  data() {
    return {
      url: "https://www.jwbrand.company/backend/api",
      product: "",
      color: null,
      inputColor: false,
    };
  },

  methods: {
    getProductImg(imageName) {
      return "https://www.jwbrand.company/backend/" + imageName;
    },

    add(){
      this.inputColor = this.color === null ? true : false
      if(this.inputColor){
        return alert(`please select color`);
      }
      this.goToCart();
    },

    goToCart() {
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
          });
    },
  },

  mounted() {
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
.checkbox {
  display: flex;
  cursor: pointer;
  border-radius: 50px;
  @apply mb-2 lg:mb-4;
}

.checkbox > input {
  appearance: none;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
  border-radius: 50px;
  @apply w-6 h-4 sm:w-4 md:w-5 lg:w-8 lg:h-5;
}

.checkbox > input:checked {
  border: 2px solid red;
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
