<template>
  <navStaff />

  <div class="bg-loginAd h-full md:h-screen  pt-20">
    <div class="flex justify-center text-white  font-semibold">
      <p class="head">NEW IN</p>
    </div>

    <!-- {{ image }} -->
    <div class="addProduct grid grid-cols-1 py-1 justify-items-stretch mx-14">
      <label
        class="upPic bg-white flex-col items-center ursor-pointer rounded-lg shadow-lg"
        id="preview"
      >
        <img :src="preview" />
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
        <span class="mt-2 leading-normal">Upload a Image</span>
        <input
          type="file"
          accept="image/*"
          @change="selectFile"
          class="hidden form-control-file"
        />
      </label>

      <!-- from product -->
      <div class="content">
        <form @submit.prevent="submitForm">
          <div>
            <div class="nameAndPrice">
              <div class="productName">
                <div class="">
                  <input
                    class="inputDetail placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-beer focus:border-transparent focus:ring-2 rounded-full border border-grayFigma"
                    type="text"
                    placeholder="Product Name"
                    v-model="productName"
                  />
                </div>
                <sup v-show="inputName"> Please enter product name! </sup>
              </div>

              <div class="productPrice">
                <input
                  class="inputDetail placeholder-gray-500 placeholder-opacity-50 border border-grayFigma focus:outline-none focus:ring-beer focus:border-transparent focus:ring-2 px-4 rounded-full"
                  type="number"
                  v-model="productPrice"
                  placeholder="Price"
                  step="0.25"
                  min="0"
                  max="999.99"
                />
                <div>
                  <sup v-show="inputPrice"> Please enter product price! </sup>
                </div>
              </div>
            </div>
            <div class="title text-white">Type</div>
            <div class="typeAndStock">
              <div class="">
                <form name="dropdown">
                  <select
                    v-model="selectType"
                    class="inputDetail selectDrop shadow-md rounded-full "
                  >
                    <option
                      v-for="bagType in productType"
                      :value="bagType.bagTypeId"
                      :key="bagType.bagTypeId"
                    >
                      {{ bagType.bagTypeName }}
                    </option>
                  </select>
                </form>
                <sup v-show="inputType"> Please select type! </sup>
              </div>
            </div>

            <div class="title text-white">Color</div>
            <div class="flex justify-between">
              <label
                class="checkbox rounded mr-1"
                v-for="color in productColor"
                :key="color.colorId"
                :style="{ background: color.colorName }"
              >
                <input type="checkbox" :value="color" v-model="colorsSelect" />
              </label>
            </div>
            <sup v-show="inputColor">
              Please enter product color more than one!
            </sup>

            <div>
              <textarea
                v-model="productDescription"
                class="inputDetail boxDescrip placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded-lg focus:ring-beer focus:border-transparent focus:ring-2 shadow-md break-words text-justify whitespace-normal border border-grayFigma"
                placeholder="Description..."
              >
              </textarea>
              <sup v-show="inputDescription"> Please enter description! </sup>
            </div>
          </div>
          <div class="group submit">
            <button
              @click="submitFrom"
              class="submitButton text-white bg-red-500 group-hover:text-white group-hover:bg-blue-600 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      picture: null,
      check: false,
      url: "https://jwbrand.company/backend/api",
      inputName: false,
      inputPrice: false,
      inputColor: false,
      inputType: false,
      inputDate: false,
      inputDescription: false,
      imageName: null,
      products: [],
      colorsSelect: [],
      productName: "",
      productPrice: null,
      productDescription: "",
      productColor: [],
      productType: null,
      selectType: null,
      preview: null,
      imgFile: null,
    };
  },

  methods: {
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

    getData() {
      try {
        axios.get(`${this.url}/getColors`).then((res) => {
          this.productColor = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    getBagType() {
      try {
        axios.get(`${this.url}/getBagType`).then((res) => {
          this.productType = res.data;
        });
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },

    checkColor() {
      this.check = !this.check;
    },

    submitFrom() {
      this.inputName = this.productName === "" ? true : false;
      this.inputPrice =
        this.productPrice === null || this.productPrice === "" ? true : false;
      this.inputPrice =
        this.productPrice <= 0 && this.productPrice < 999.99 ? true : false;
      this.inputColor = this.colorsSelect.length == 0 ? true : false;
      this.inputType = this.selectType === null ? true : false;
      console.log(this.colorsSelect);
      this.inputDescription = this.productDescription === "" ? true : false;
      if (
        this.inputName ||
        this.inputPrice ||
        this.inputColor ||
        this.inputType ||
        this.inputDescription
      ) {
        return;
      }
      console.log("loo");
      this.addProduct();
    },

    addProduct() {
      console.log(this.selectType)
      const formData = new FormData();
      let data = {
        productName: this.productName,
        price: this.productPrice,
        productDes: this.productDescription,
        bagTypeId: this.selectType,
        Color: this.colorsSelect,
      };
      const json = JSON.stringify(data);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("file", this.imgFile);
      formData.append("data", blob);
      axios
        .post(`${this.url}/staff/addProduct`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data)
          res.status === 200 ? alert("Sucessfully Added") : alert("Error");
        });
    },
  },

  created() {
    this.getData();
    this.getBagType();
  },
};
</script>

<style scoped>
.content {
  @apply justify-between py-6 text-xs;
}
.navProduct {
  @apply flex justify-center mt-4 sm:flex sm:justify-center md:justify-end lg:py-6;
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
sup {
  color: red;
}
.selectDrop select {
  display: none;
}
.selectDrop {
  background: transparent;
  background-color: white;
  border-color: black;
  @apply px-2 py-1 mb-4 w-full sm:w-32 md:w-40 lg:w-56 lg:text-base;
}
.drop {
  @apply w-full;
}
.selectDrop::before {
  border-color: black;
  background: white;
}
.addProduct {
  @apply sm:grid-cols-2
  xl:mx-48 xl:justify-center;
}
.nameAndPrice {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2;
}
.typeAndStock {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2;
}
.upPic {
  @apply w-40 h-40 flex justify-center mt-4 text-sm justify-self-center 
  sm:mt-8 sm:w-60 sm:h-60 sm:justify-self-start
  md:justify-self-start md:ml-8 md:h-72 md:w-72 
  lg:w-96 lg:h-96 lg:justify-self-start lg:text-base;
}
.title {
  @apply mb-1 lg:text-base;
}
.inputDetail {
  @apply px-2 py-1 mb-4 w-full sm:w-32 md:w-40 lg:w-56 lg:text-base;
}
.boxDescrip {
  @apply w-full h-40 md:h-20 lg:h-32;
}
.submit {
  @apply flex justify-center lg:text-base lg:mt-5;
}
.submitButton {
  @apply px-2 py-1;
}
.head {
  @apply lg:text-xl lg:pt-16 lg:mb-10;
}
</style>
