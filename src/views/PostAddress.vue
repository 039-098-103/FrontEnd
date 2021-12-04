<template>
  <navbar />

  <div class="box pt-20 mx-8">
    <div class="address">
      <div class="text-xs font-semibold flex">
        <div class="mr-2">
          <i class="fas fa-map-marker-alt "></i>
        </div>
        <p class="flex items-end">Delivery Address</p>
      </div>

      <form class="text-xs mt-2">
        <textarea
          v-model="address"
          placeholder="71/2 ABC Bangkok Thailand 14025"
        ></textarea>
      </form>
      <sup v-show="inputAddress" class="text-red-500 justify-end flex mt-4">
        Please enter address.</sup
      >
    </div>
    <!-- product -->
    <div
      v-for="item in listItem"
      :key="item.cartId"
      class="orderlist grid grid-cols-3 mt-5"
    >
        <div class="box-image ">
          <img
            :src="getProductImg(item.imageName)"
            class="image shadow rounded-md"
          />
        </div>

        <div class="list col-span-2 ml-5 text-xs">
          <div class="md:flex md:justify-center">
            {{ item.productName }}
          </div>
          <div class="flex md:justify-center">
            <div class="flex items-center mr-2">Color</div>
            <div
              class="colors my-2"
              :style="{ background: item.colorName }"
            ></div>
          </div>

      </div>
    </div>

    <div class="flex justify-center mt-8 text-xs" @click="submit">
      <!-- <router-link to="/order"> -->
      <button class="bg-black text-white py-1 px-2">Place Order</button>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "http://localhost:3000/api/customer/checkout",
      item: "http://localhost:3000/api/customer/getCart",
      address: "",
      inputAddress: false,
      listItem: [],
    };
  },

  methods: {
    getProductImg(productId) {
      return "http://localhost:3000/" + productId;
    },

    submit() {
      this.inputAddress = this.address === "" ? true : false;
      if (this.inputAddress) {
        return;
      }
      this.postAddress();
    },

    async getItem() {
      axios
        .get(this.item, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          return (this.listItem = res.data);
        });
    },

    async postAddress() {
      try {
        const formData = new FormData();
        let data = {
          address: this.address,
          Cart: this.listItem,
        };
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formData.append("data", blob);

        axios
          .post(this.url, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Successfully added!");
              return this.$router.push("/order");
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },

  async created() {
    await this.getItem();
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
.colors {
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
.box {
  @apply md:mx-12 md:pt-32 lg:mx-52;
}
.orderlist {
  @apply md:grid-cols-1 md:mx-40
  lg:grid-cols-3 lg:gap-5 xl:mx-52;
}
.address {
  @apply md:mx-32;
}
.list{
  @apply md:ml-0 md:mt-2;
}
.image{
  @apply md:w-40 ;
}
.box-image{
 @apply  md:flex md:justify-center;
}
button{
  @apply md:mb-20 md:text-base;
}
</style>
