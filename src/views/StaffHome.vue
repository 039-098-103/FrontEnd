<template>
  <navStaff />

  <div class="bg-loginAd h-full">
    <div class="title flex justify-center md:justify-start">
      <div class="posit pt-20">
        <p class="head font-semibold flex justify-center">Order List</p>
        <p class="subhead flex justify-center">List of Items on oder system</p>
      </div>
    </div>

    <div class="search flex justify-center items-center ">
      <i class="icons fas fa-search self-center"></i>
      <input
        class="
          ml-2 lg:w-80
          p-1
          placeholder-gray-500 placeholder-opacity-50
          focus:outline-none
          text-white
          border-b-2
          bg-loginAd
        "
        type="text"
        placeholder="search"
        v-model="search"
      />
    </div>

    <div class="gridfetch grid pb-10">
      <div
        class="list bg-white rounded-lg shadow-md px-5"
        v-for="list in searchOrder"
        :key="list.orderId"
      >
        <div>
          <div class="flex justify-start mb-1 items-center">
            <i class="username far fa-user-circle"></i>
            <p class="font-bold ml-1 ">
              {{ list.cusName }}
            </p>
          </div>

          <div class="text-xs">
            <div v-for="bag in list.Product" :key="bag.bagTypeName">
              <li>{{ bag.productName }}</li>
            </div>
            <div class="grid grid-cols-2 my-2 font-semibold">
              <p>Total : {{ list.total }} $</p>
              <p>Quantity : {{ list.quantity }}</p>
            </div>
            <div class="flex items-start">
              <i class="fas fa-map-marker-alt "></i>
              <p class="ml-1">{{ list.address }}</p>
            </div>

            <div class="mt-2 font-semibold">
              <p>{{ formatDate(list.deliveryDate) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "staff",
  components: {},

  data() {
    return {
      url: "http://localhost:3000/api/staff/getOrderList",
      orders: [],
      search: "",
    };
  },

  methods: {
    formatDate(date) {
      return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
        new Date(date)
      );
    },

    async getOrders() {
      try {
        axios
          .get(this.url, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.orders = res.data;
            console.log(res.data);
          })
          .catch((err) => {
            if (err.response.status === 403) {
              alert("you are not log-in");
              this.$router.push("/adminLogin");
            }
            console.log(err.response.data);
          });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    this.orders = await this.getOrders();
    console.log(this.orders);
  },

  computed: {
    searchOrder() {
      return this.orders.filter((showResult) => {
        return showResult.deliveryDate
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: white;
}
.posit {
  @apply xl:mb-2 xl:mx-16
  lg:mx-14 lg:mb-2
  md:mx-7 md:mb-1;
}
.head {
  color: white;
  @apply text-lg mt-0
  xl:text-3xl
  lg:text-2xl 
  md:text-2xl md:justify-start md:flex
  sm:text-xl;
}
.subhead {
  color: white;
  @apply text-sm
  lg:text-lg
  md:justify-start;
}
.username {
  @apply lg:text-xl;
}
.icons {
  color: white;
}
.gridfetch {
  @apply mx-12 gap-2
  xl:mx-20
  lg:mx-14 lg:gap-x-4 lg:gap-y-6 lg:grid-cols-4
  md:mx-7 md:grid-cols-3 md:gap-x-4 md:gap-y-6
  sm:mx-16 sm:gap-4;
}
.list {
  @apply lg:py-5 
  md:py-4 md:px-8
  sm:py-3 
  pb-2 pt-4;
}
.search {
  @apply xl:mb-5 xl:mx-20
  lg:mb-6 lg:mx-14
  md:mb-5 md:mx-7 md:justify-end
  my-5 mt-10;
}
</style>
