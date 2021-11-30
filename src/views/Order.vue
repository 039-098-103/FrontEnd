<template>
  <navbar />

  <div class="mx-8 pt-20">
    <p>Order completed successfully.</p>

    <div class="mt-10 grid grid-cols-2">
      <div>Order</div>
      <div>Price</div>
      <div></div>

      <div></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "http://localhost:3000/api/customer/getOrders",
      orders: [],
    };
  },

  mounted() {
    axios.get(this.url).then((res) => {
      console.log(res.data);
      return (this.orders = res.data);
    });
  },
};
</script>
