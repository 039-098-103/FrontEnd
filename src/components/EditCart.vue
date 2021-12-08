<template>
  <div class="detail pt-20 mx-8 text-xs grid">
    <div class="box-image ">
      <img
        :src="getProductImg(item.imageName)"
        class="image shadow rounded-md"
      />
    </div>

    <div class="md:mx-10 lg:mt-20">
      <div class="flex justify-center mt-5 font-semibold">
        {{ item.productName }}
      </div>

      <div class="flex justify-center my-1">
        <label
          class="colors checkbox"
          v-for="product in item.Color"
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
      <div class="flex justify-center font-semibold">{{ item.price }} $</div>
      <div class="text-justify mt-5">
        {{ item.productDes }}
      </div>

      <div class="flex justify-center mt-5">
        <div class="mx-1">
          <button
            class="bg-black text-white rounded-full px-5 py-1 text-xs"
            @click="cancel"
          >
            CANCLE
          </button>
        </div>
        <div class="mx-1">
          <button
            class="bg-red-500 text-white rounded-full px-5 py-1 text-xs"
            @click="submitForm"
          >
            SAVE
          </button>
        </div>
      </div>
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
      Type: Number,
    },
  },
  data() {
    return {
      item: [],
      url: "https://www.jwbrand.company/backend/api",
      // url: "http://localhost:3000/api",
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
      return "https://www.jwbrand.company/backend/" + imageName;
      // return "http://localhost:3000/" + imageName;
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
        .patch(
          `${this.url}/customer/updateCart/${this.cartId}/${this.color}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Edit success");
            this.$emit("toggleDone");
            this.$router.go();
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },

  async created() {
    this.item = await this.getData();
  },

  mounted() {},
};
</script>

<style scoped>
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
.colors {
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply mx-1 justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
.detail {
  @apply md:grid-cols-2 md:pt-32 md:my-0
  lg:text-base;
}
.box-image {
  @apply justify-center flex;
}
.image {
  @apply md:h-3/5;
}
button{
  @apply md:text-base lg:text-xl;
}
</style>
