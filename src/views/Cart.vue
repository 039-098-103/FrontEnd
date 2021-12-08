<template>
  <navbar />

  <div class="box mt-5 mx-8 pt-20" v-if="hiddenEdit == false">
    <div
      v-for="order in cart"
      :key="order.cartId"
      class="orderlist grid grid-cols-3 mt-5"
    >
      <div class="box-image ">
        <img
          :src="getProductImg(order.imageName)"
          class="image shadow rounded-md"
        />
      </div>

      <div class="content col-span-2 ml-5 text-xs">
        <div>
          <div>
            {{ order.productName }}
          </div>

          <div
            class="flex"
            @click="clickItem(order.productId, order.colorId, order.cartItemId)"
          >
            <div class="flex items-center mr-2">Color</div>
            <div
              class="colors my-2"
              :style="{ background: order.colorName }"
            ></div>
          </div>

          <div class="price mt-6 grid grid-cols-2">
            <div>{{ order.price }} $</div>

            <div
              class="icon flex justify-end"
              @click="deleteOrder(order.cartItemId)"
            >
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout mt-10 grid grid-cols-2 text-xs">
      <div class="flex justify-end">
        <router-link to="/addAddress">
          <button class="bg-black text-white py-1 px-2">CHECK OUT</button>
        </router-link>
      </div>
    </div>
  </div>

  <div v-else>
    <editCart
      :productId="itemId"
      :colorId="cId"
      :cartId="cartItem"
      @toggleOpen="toggleOpen"
      @toggleDone="toggleDone"
      
    >
    </editCart>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
export default {
  name: "cart",
  components: {},

  data() {
    return {
      url: "https://www.jwbrand.company/backend/api/customer/getCart",
      remove: "https://www.jwbrand.company/backend/api/customer/removeFromCart",
      // url: "http://localhost:3000/api/customer/getCart",
      // remove: "http://localhost:3000/api/customer/removeFromCart",
      cart: [],
      total: "",
      hiddenEdit: false,
      itemId: "",
      cId: "",
      cartItem: "",
    };
  },

  methods: {
    clickItem(id, colorId, cartId) {
      this.itemId = id;
      this.cId = colorId;
      this.cartItem = cartId;
      this.hiddenEdit = !this.hiddenEdit;
    },

    toggleOpen() {
      this.hiddenEdit = false;
    },

    toggleDone() {
      this.hiddenEdit = false;
    },

    getProductImg(productId) {
      return "https://www.jwbrand.company/backend/" + productId;
      // return "http://localhost:3000/" + productId;
      
    },

    async deleteOrder(cartItemId) {
      axios
        .delete(`${this.remove}/${cartItemId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.cart = this.cart.filter(
              (list) => list.cartItemId !== cartItemId
            );
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },

  mounted() {
    axios
      .get(this.url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.cart = res.data
      });
  },
};
</script>

<style scoped>
.box-image {
  @apply md:items-center;
}
.colors {
  cursor: pointer;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
.box {
  @apply md:pt-32 md:mx-12 md:grid md:grid-cols-2 md:gap-x-10
  lg:mx-20 lg:grid-cols-3;
}
.content {
  @apply md:ml-8 md:text-base md:items-center;
}
.icon {
  @apply md:flex md:items-end md:text-base
  lg:text-lg lg:justify-start;
}
.checkout {
  @apply md:mb-20 md:mt-20 md:justify-center md:flex md:col-span-3 md:text-base
  xl:text-lg;
}
</style>
