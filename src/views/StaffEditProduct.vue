<template>
  <navStaff></navStaff>

  <div class="box bg-loginAd h-full detail pt-20 grid px-8">
    <div class="box-image md:items-center">
      <label
        class="upPic bg-white flex-col items-center ursor-pointer rounded-lg shadow-lg"
        id="preview"
      >
        <img :src="getProductImg(productInfo.imageName)" />
        <svg
          class="w-4 h-4"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>
        <span class="mt-2 leading-normal">Upload an Image</span>
        <input
          type="file"
          accept="image/*"
          @change="selectFile"
          class="hidden form-control-file"
        />
      </label>
    </div>

      <div class="info mt-10 flex justify-center text-xs">
        <form @submit.prevent="submitEdit">
          <div class="form">
            <div class="nameAndPrice">
              <div class="flex justify-center">
                <input
                  v-model="productName"
                  class="inputDetail px-2 placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-grayFigma focus:border-transparent focus:ring-2 rounded-full border border-grayFigma"
                  type="text"
                  placeholder="Product Name"
                />
              </div>
              <sup v-show="inputName"> Please enter product name! </sup>

              <div class="mt-2 flex justify-center">
                <input
                  class="inputDetail placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-grayFigma focus:border-transparent focus:ring-2 rounded-full px-2 border border-grayFigma"
                  placeholder="Price"
                  v-model="productPrice"
                  min="0"
                  max="999.99"
                />
              </div>
            </div>
            <sup v-show="inputPrice"> Please enter product price! </sup>

            <div class="typeAndStock mt-2 flex justify-center">
              <div class="">
                <p class="title text-white mb-1">Bag Type</p>
                <form name="dropdown">
                  <select v-model="selectType" class="inputDetail rounded-full w-36">
                    <option
                      v-for="bagType in productType"
                      :value="bagType.bagTypeId"
                      :key="bagType.bagTypeId"
                    >
                      {{ bagType.bagTypeName }}
                    </option>
                  </select>
                </form>
              </div>
            </div>

            <div class="title text-white mb-1">Color</div>
            <div class="mb-6 flex justify-start">
              <label
                class="checkbox rounded mr-1"
                v-for="color in productColor"
                :key="color.colorId"
                :style="{ background: color.colorName }"
              >
                <input type="checkbox" :value="color" v-model="selectColor" />
              </label>
            </div>
            <sup v-show="inputColor">
              Please enter product color more than one!
            </sup>

            <div class="flex justify-center">
              <div>
                <p class="title text-white mb-1">Description</p>

                <textarea
                  v-model="productDescrip"
                  class="placeholder-gray-500 placeholder-opacity-50 focus:outline-none 
                rounded focus:ring-white focus:border-transparent focus:ring-2 shadow-md break-words 
                text-justify whitespace-normal flex justify-center px-2 py-1 w-40 h-40"
                  placeholder="Description..."
                />
              </div>
              <sup v-show="inputDescription">
                Please enter description!
              </sup>
            </div>

            <div class="mt-10 grid grid-cols-2 mb-10">
              <div class="delete flex justify-center">
                <button class="bg-black text-white rounded-full py-1 px-4">
                  <router-link to="/stock">
                    CANCEL
                  </router-link>
                </button>
              </div>

              <div class="edit flex justify-center" >
                <input
                  type="submit"
                  value="CONFIRM"
                  class="bg-red-500 px-4 rounded-full py-1 text-white"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["productId"],

  data() {
    return {
      url: "http://localhost:3000/api/staff/editProduct",
      info: "http://localhost:3000/api",
      productInfo: "",
      picture: null,
      productPrice: null,
      productName: "",
      productDescrip: "",
      productType: [],
      productColor: [],
      selectColor: [],
      selectType: "",
      inputName: false,
      inputPrice: false,
      inputColor: false,
      inputType: false,
      inputDescription: false,
      inputImage: false,
      preview: null,
    };
  },

  methods: {
    getData() {
      try {
        axios.get(`${this.info}/getProduct/${this.productId}`).then((res) => {
          this.productInfo = res.data;
          console.log(res.data);
          this.productName = res.data.productName;
          this.productPrice = res.data.price;
          this.productDescrip = res.data.productDes;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getColor() {
      try {
        axios.get(`${this.info}/getColors`).then((res) => {
          this.productColor = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getBagType() {
      try {
        axios.get(`${this.info}/getBagType`).then((res) => {
          this.productType = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getProductImg(imageName) {
      console.log(imageName);
      return (this.preview = "http://localhost:3000/" + imageName);
    },

    submitEdit() {
      console.log("llll")
      this.inputName = this.productName === "" ? true : false;
      this.inputPrice =
        this.productPrice === null || this.productPrice === "" ? true : false;
      this.inputColor = this.selectColor.length == 0 ? true : false;
      this.inputType = this.selectType === null ? true : false;
      this.inputDescription = this.productDescrip === "" ? true : false;
      if (
        this.inputName ||
        this.inputPrice ||
        this.inputColor ||
        this.inputType ||
        this.inputDescription
        
      ) {
        console.log(this.inputName)
        console.log(this.inputPrice)
        console.log(this.inputColor)
        console.log(this.inputType)
        console.log(this.inputDescription)
        return;
      }
      this.editProduct();
    },

    editProduct() {
      console.log("plp")
      const formData = new FormData();
      let data = {
        productName: this.productName,
        price: this.productPrice,
        productDes: this.productDescrip,
        bagTypeId: this.selectType,
        Color: this.selectColor,
      };
      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      if (this.imgFile != null) {
        formData.append("file", this.imgFile);
      }
      formData.append("data", blob);
      console.log(data)
      axios
        .patch(`${this.url}/${this.productId}`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.getProduct();
            this.$router.push("/stock")
          }
        }).catch((err) => {
            console.log(err)
            alert(err.response.data);
        });
    },

    selectFile(e) {
      const file = e.target.files[0];
      this.picture = URL.createObjectURL(file);
      this.imageName = file.name;
      this.imgFile = file;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },

  created() {
    this.getData();
    this.getBagType();
    this.getColor();
  },
};
</script>

<style scoped>
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
.upPic {
  @apply w-40 h-40 flex justify-center mt-4 text-sm justify-self-center 
  sm:mt-8 sm:w-60 sm:h-60 sm:justify-self-start
  md:justify-self-start md:ml-8 md:h-72 md:w-72 
  lg:w-96 lg:h-96 lg:justify-self-start lg:text-base;
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
  @apply w-6 h-6 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-8 lg:h-8;
}
.checkbox > input:checked {
  border: 1px solid red;
}
.box {
  @apply lg:pt-32;
}
/* input{
  @apply rounded-full;
} */
</style>
