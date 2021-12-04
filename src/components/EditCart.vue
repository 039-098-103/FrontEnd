<template>
  <div class="pt-32 mx-8">
    <div class="">
      <img
        :src="getProductImg(item.imageName)"
        class="image shadow rounded-md"
      />

      {{ item.productName }}

      <label
        class="colors checkbox"
        v-for="product in item.Color"
        :key="product.colorId"
        :style="{ background: product.colorName }"
      >
        <input type="radio" :value="product.productDetailId" v-model="color" />
      </label>

      {{ item.price }}

      {{ item.productDes }}
    </div>

    <div>
      <button
        class="bg-black text-white rounded-full px-5 py-1 text-xs"
        @click="cancel"
      >
        CANCLE
      </button>
      <button
        class="bg-red-500 text-white rounded-full px-5 py-1 text-xs"
        @click="submitForm"
      >
        SAVE
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editCart",
  props: {
    productId: {
      Type: Number,
    },
    colorId: {
      Type: Number,
    },
    cartId: {
        Type: Number
    }
  },
  data() {
    return {
      item: [],
      url: "http://localhost:3000/api",
      inputColor: false,
      productName: "",
      price: "",
      productDes: "",
      color: "",

    };
  },

  methods: {
    getData() {
      axios.get(`${this.url}/getProduct/${this.productId}`).then((res) => {
        console.log(res.data);
        //   return (this.item = res.data);
        this.item = res.data;
        console.log(this.item);
      });
    },

    getProductImg(imageName) {
      console.log(imageName);
      return "http://localhost:3000/" + imageName;
    },

    cancel() {
      this.$emit("toggleOpen");
    },

    submitForm() {
      this.inputColor = this.colorName === "" ? true : false;
      if (this.inputColor) {
        return;
      }

      this.editCart();
    },

    async editCart() {
      axios
        .patch(`${this.url}/customer/updateCart/${this.cartId}/${this.color}`, {}, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Edit success");
            this.$emit("toggleDone");
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },

  async created() {
    this.item = await this.getData();
    this.product = await this.getColor();
    // this.productName = this.editCart.productName;
    // this.productDes = this.editCart.productDes;
    // this.price = this.editCart.price;
  },

  mounted() {},
};
</script>

<style scoped>
/* .checkbox {
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
} */
</style>
