<template>
  <navbar />

  <div class="box mx-8 pt-20">
    <p class="title text-xs font-semibold flex justify-center">
      Order completed successfully
    </p>

    <div class="mt-10 grid grid-cols-2 text-xs">
      <div class="head flex justify-start font-semibold ">Order</div>
      <div class="head flex justify-end font-semibold ">Price</div>
    </div>
    <div v-for="order in orders" :key="order.oderId" class="text-xs mt-5">
      <div class="sub mb-2">
        {{ formatDate(order.deliveryDate) }}
      </div>
      
      <div
        v-for="pd in order.Product"
        :key="pd.productId"
        class="grid grid-cols-2"
      >
        <div class="sub flex justify-start">
          {{ pd.productName }}
        </div>
        <div class="sub flex justify-end">
          {{ pd.price }} $
        </div>
      </div>

      <div class="grid grid-cols-2">
        <div class="sub flex justify-start font-semibold mt-2">
          Total
        </div>
        <div class="sub flex justify-end font-semibold mt-2">
          {{ order.total }} $
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "https://www.jwbrand.company/backend/api/customer/getOrders",
      orders: [],
    };
  },

  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
        new Date(date)
      );
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
        return (this.orders = res.data);
      });
  },
};
</script>

<style scoped>
.box{
  @apply md:mb-20 md:mx-52
  lg:mx-80 lg:pt-32 xl:mx-96;
}
.title{
  @apply md:text-base lg:text-xl;
}
.head{
  @apply md:text-base lg:text-xl;
}
.sub{
  @apply md:text-sm lg:text-base;
}
</style>
