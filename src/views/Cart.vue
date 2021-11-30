<template>
  <navbar />

  <div class="oders flex justify-center pt-20 font-semibold">
    <p class="">Order</p>
  </div>

  <div class="mt-5 mx-8 ">
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

      <div class="col-span-2 ml-5 text-xs">
        <div>
          {{ order.productName }}
        </div>
        <div class="flex">
          <div class="flex items-center mr-2">Color</div>
          <div
            class="colors my-2"
            :style="{ background: order.colorName }"
          ></div>
        </div>

        <div class="price mt-6 grid grid-cols-2">
          <div>{{ order.price }} $</div>
          <div class="flex justify-end" @click="deleteOrder">
            <i class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-2 text-xs">
      <div class="flex items-center font-semibold">
        Total : 500 {{ total }} $
      </div>
      <div class="flex justify-end">
        <router-link to="/addAddress">
          <button class="bg-black text-white py-1 px-2">CHECK OUT</button>
        </router-link>
      </div>
    </div>
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
      url: "http://localhost:3000/api/customer/getCart",
      remove: "http://localhost:3000/api/customer/removeFromCart",
      // url: "https://jwbrand.company/backend/api/customer/getCart",
      cart: [],
      total: "",
    };
  },

  methods: {
    getProductImg(productId) {
      return "http://localhost:3000/" + productId;
    },

    async deleteOrder(cartItemId) {
      // axios
      //   .post(`${this.login}`, {
      //     username: this.customer.username,
      //     password: this.pass,
      //   })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.staffs = this.staffs.filter(
      //         (list) => list.username !== username
      //       );
      //     }
      //   })
      //   .catch((err) => {
      //     alert(err.response.data);
      //   });

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
        console.log(res.data);
        return (this.cart = res.data);
      });
  },

  computed: {
    totalAmount: function() {
      var sum = 0;
      this.cart.forEach((e) => {
        sum += e.price;
      });
      console.log(sum);
      return this.total == sum;
    },
  },
};
</script>

<style scoped>
.box-image {
  @apply md:items-center;
}
.colors {
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
</style>
