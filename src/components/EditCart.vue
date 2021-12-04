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
      url: "https://jwbrand.company/backend/api",
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
        this.item = res.data;
      });
    },

    getProductImg(imageName) {
      return "https://jwbrand.company/backend/" + imageName;
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
  },

  mounted() {},
};
</script>

<style scoped>
</style>
