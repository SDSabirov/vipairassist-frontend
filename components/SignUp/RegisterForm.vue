<template>
  <div class="">
    <div class="bg-black relative z-30">
      <div class="container sticky max-w-[1280px] px-4 lg:px-[60px] mx-auto">
        
      </div>
    </div>

    <div
      class="container register_wrapper relative bg-center bg-no-repeat bg-cover max-w-[1280px] h-[calc(100vh-88px)] flex flex-col lg:pb-[55px] con lg:px-[60px] mx-auto py-12"
    >
      <form
        v-on:submit.prevent="submitForm"
        v-if="register_type == 1"
        class="bg-[#F8F8F8] px-5 py-[20px] mt-12 lg:px-[98px] lg:py-[0px]"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[50px]">
          <div>
            <h1
              class="text-[24px] mt-[18px] leading-8 font-semibold text-[#565656]"
            >
              Create New Account
            </h1>
            <p
              :class="
                account_type == 'Corporate' ? 'lg:mt-[19px]' : 'lg:mt-[57px]'
              "
              class="text-[24px] mt-4 leading-8 font-normal text-[#858383]"
            >
              Type of the account?
            </p>

            <!-- select account type -->
            <div
              :class="
                account_type == 'Corporate' ? 'lg:mt-[36px]' : 'lg:mt-[40px]'
              "
              class="flex justify-between items-center w-full mt-4"
            >
              <button
                id="Personal"
                @click="selectType"
                type="button"
                class="flex gap-4 justify-center items-center"
              >
                <div
                  id="Personal"
                  class="w-[30px] p-[5px] flex justify-center items-center h-[30px] border border-[#858383] rounded-full"
                >
                  <div
                    id="Personal"
                    v-if="account_type == 'Personal'"
                    class="w-full h-full bg-[#858383] rounded-full"
                  ></div>
                </div>
                <p
                  id="Personal"
                  class="text-[14px] lg:text-[24px] leading-8 font-normal text-[#858383]"
                >
                  Personal
                </p></button
              ><button
                id="Corporate"
                @click="selectType"
                type="button"
                class="flex gap-4 justify-center items-center"
              >
                <div
                  id="Corporate"
                  class="w-[30px] p-[5px] flex justify-center items-center h-[30px] border border-[#858383] rounded-full"
                >
                  <div
                    id="Corporate"
                    v-if="account_type == 'Corporate'"
                    class="w-full h-full bg-[#858383] rounded-full"
                  ></div>
                </div>
                <p
                  id="Corporate"
                  class="text-[14px] lg:text-[24px] leading-8 font-normal text-[#858383]"
                >
                  Corporate
                </p>
              </button>
            </div>

            <div
              :class="
                account_type == 'Corporate' ? 'lg:mt-[30px]' : 'lg:mt-[50px]'
              "
              class="flex gap-5 mt-[20px] flex-col lg:flex-row"
            >
              <div class="relative">
                <label
                  for="title"
                  class="block text-[#858383] text-[14px] leading-[19px]"
                  >Title</label
                >
                <input
                  id="title"
                  type="text"
                  placeholder="Mr,Mrs"
                  v-model="title"
                  :class="
                    requiredFields.includes('title')
                      ? 'border border-red-500'
                      : 'border-none'
                  "
                  class="placeholder:text-[#858383] text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full lg:w-[177px] py-4 px-6"
                />
                <h4
                  v-if="requiredFields.includes('title')"
                  class="text-[10px] absolute text-red-500"
                >
                  Enter title
                </h4>
              </div>
              <div class="flex-grow relative">
                <label
                  for="name"
                  class="block text-[#858383] text-[14px] leading-[19px]"
                  >Your name</label
                >
                <input
                  id="name"
                  type="text"
                  v-model="name"
                  :class="
                    requiredFields.includes('name')
                      ? 'border border-red-500'
                      : 'border-none'
                  "
                  placeholder="Enter your name"
                  class="placeholder:text-[#858383] text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
                />
                <h4
                  v-if="requiredFields.includes('name')"
                  class="text-[10px] absolute text-red-500"
                >
                  Enter name
                </h4>
              </div>
            </div>
            <div
              v-if="account_type == 'Corporate'"
              class="flex gap-5 mt-[20px] flex-col lg:flex-row"
            >
              <div class="relative">
                <label
                  for="title"
                  class="block text-[#858383] text-[14px] leading-[19px]"
                  >Company name</label
                >
                <input
                  id="title"
                  type="text"
                  :class="
                    requiredFields.includes('company')
                      ? 'border border-red-500'
                      : 'border-none'
                  "
                  v-model="company"
                  placeholder="Enter Company name"
                  class="placeholder:text-[#858383] text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full md:w-[177px] py-4 px-6"
                />
                <h4
                  v-if="requiredFields.includes('company')"
                  class="text-[10px] absolute text-red-500"
                >
                  Enter company
                </h4>
              </div>
              <div class="flex-grow relative">
                <label
                  for="name"
                  class="block text-[#858383] text-[14px] leading-[19px]"
                  >Company address</label
                >
                <input
                  id="name"
                  type="text"
                  :class="
                    requiredFields.includes('company_address')
                      ? 'border border-red-500'
                      : 'border-none'
                  "
                  v-model="company_address"
                  placeholder="Enter Company address"
                  class="placeholder:text-[#858383] text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
                />
                <h4
                  v-if="requiredFields.includes('company_address')"
                  class="text-[10px] absolute text-red-500"
                >
                  Enter company address
                </h4>
              </div>
            </div>
            <div class="relative"></div>
            <label
              for="date"
              class="block mt-[18px] text-[#858383] text-[14px] leading-[19px]"
              >Date of birth</label
            >
            <input
              id="date"
              type="date"
              v-model="birthday"
              :class="
                requiredFields.includes('birthday')
                  ? 'border border-red-500'
                  : 'border-none'
              "
              class="text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
            />
            <h4
              v-if="requiredFields.includes('birthday')"
              class="text-[10px] absolute text-red-500"
            >
              Enter date of birth
            </h4>
          </div>
          <div>
            <!-- vuetel -->
            <div class="relative">
              <label
                for="phone"
                class="block text-[#858383] text-[14px] leading-[19px]"
                >Phone number</label
              >
              <vue-tel-input
                id="phone"
                :class="
                  requiredFields.includes('phone')
                    ? 'border border-red-500'
                    : 'border-none'
                "
                v-model="phone"
                v-bind="props"
                class="py-[10px] ring-0 focus:ring-0 outline-none mt-[6px] px-[10px]"
              ></vue-tel-input>
              <h4
                v-if="requiredFields.includes('phone')"
                class="text-[10px] absolute text-red-500"
              >
                Enter phone number
              </h4>
            </div>
            <div class="relative">
              <label
                for="email"
                class="block mt-[18px] text-[#858383] text-[14px] leading-[19px]"
                >Email</label
              >
              <input
                id="email"
                type="email"
                :class="
                  requiredFields.includes('email')
                    ? 'border border-red-500'
                    : 'border-none'
                "
                v-model="email"
                placeholder="Enter your email"
                class="text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
              />
              <h4
                v-if="requiredFields.includes('email')"
                class="text-[10px] absolute text-red-500"
              >
                Enter email
              </h4>
            </div>

            <div class="relative">
              <label
                for="password"
                class="block mt-[18px] text-[#858383] text-[14px] leading-[19px]"
                >Password</label
              >
              <input
                id="password"
                :type="show_password ? 'text' : 'password'"
                :class="
                  requiredFields.includes('password1')
                    ? 'border border-red-500'
                    : 'border-none'
                "
                v-model="password1"
                placeholder="Enter your password"
                class="text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
              />
              <h4
                v-if="requiredFields.includes('password1')"
                class="text-[10px] absolute text-red-500"
              >
                Enter password
              </h4>
            </div>
            <p
              class="block mt-[10px] text-[#858383] text-[10px] leading-[13px]"
            >
              At least 8 characters at least 1 symbol and 1 capital letter.
            </p>
            <button
              @click="showPassword"
              type="button"
              class="flex gap-[14px] items-center mt-6"
            >
              <div
                class="border border-[#D9D9D9] flex justify-center items-center w-5 h-5 rounded-[2px]"
              >
                <i
                  v-if="show_password"
                  class="bx bxs-check-square text-[#858383] text-[20px]"
                ></i>
              </div>
              <p class="block text-[#858383] text-[14px] leading-[19px]">
                Show Password
              </p>
            </button>
            <div class="relative">
              <label
                for="confirm_password"
                class="block mt-[18px] text-[#858383] text-[14px] leading-[19px]"
                >Confirm Password</label
              >
              <input
                id="confirm_password"
                :class="
                  requiredFields.includes('password2')
                    ? 'border border-red-500'
                    : 'border-none'
                "
                v-model="password2"
                :type="show_confirm_password ? 'text' : 'password'"
                placeholder="Confirm your password"
                class="text-[#858383] mt-[6px] bg-[#EFEFEF] focus:ring-0 w-full py-4 px-6"
              />
              <h4
                v-if="requiredFields.includes('password2')"
                class="text-[10px] absolute text-red-500"
              >
                Enter confirm password
              </h4>
            </div>

            <button
              @click="showConfirmPassword"
              type="button"
              class="flex gap-[14px] items-center mt-6"
            >
              <div
                class="border border-[#D9D9D9] flex justify-center items-center w-5 h-5 rounded-[2px]"
              >
                <i
                  v-if="show_confirm_password"
                  class="bx bxs-check-square text-[#858383] text-[20px]"
                ></i>
              </div>
              <p class="block text-[#858383] text-[14px] leading-[19px]">
                Show Password
              </p>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 lg:gap-[51px] md:grid-cols-2">
          <button
            class="hvr-bounce-to-right group downToUp py-[16px] mt-4 lg:mt-4 items-center justify-center flex gap-[10px] px-[26px] text-[16px] md:text-[20px] font-semibold leading-[21px] md:leading-[27px] border border-black"
          >
            <p>Cancel</p></button
          ><button
            @click="submit"
            class="hvr-bounce-to-right-white bg-black text-[#FFFFFF] group downToUp py-[16px] lg:mt-4 items-center justify-center flex gap-[10px] px-[26px] text-[16px] md:text-[20px] font-semibold leading-[21px] md:leading-[27px] border border-black"
          >
            <p>Create Account</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";


//  Form Datas
let title = ref(null);
let name = ref(null);
let firstName = ref(null);
let lastName = ref(null);
let company = ref(null);
let company_address = ref(null);
let email = ref(null);
let password1 = ref(null);
let password2 = ref(null);
let phone = ref(null);
let account_type = ref("Personal");
let is_personal = ref(null);
let is_corporate = ref(null);
let birthday = ref(null);

let register_type = ref(1);
let payment_type = ref("visa");
let show_password = ref(false);
let show_confirm_password = ref(false);
let requiredFields = ref([]);
let props = ref({
  preferredCountries: ["US", "GB", "DE"],
  placeholder: "Enter your phone",
  mode: "international",
  inputOptions: {
    showDialCode: true,
  },
  disabledFormatting: false,
  wrapperClasses: "country-phone-input",
});

function selectType(e) {
  account_type.value = e.target.id;
}
function showPassword() {
  show_password.value = !show_password.value;
}
function showConfirmPassword() {
  show_confirm_password.value = !show_confirm_password.value;
}

async function submit() {
  requiredFields.value = [];
  if (!title.value) {
    requiredFields.value.push("title");
  }
  if (!name.value) {
    requiredFields.value.push("name");
  }
  if (!birthday.value) {
    requiredFields.value.push("birthday");
  }
  if (!phone.value) {
    requiredFields.value.push("phone");
  }
  if (!email.value) {
    requiredFields.value.push("email");
  }
  if (!password1.value) {
    requiredFields.value.push("password1");
  }
  if (!password2.value) {
    requiredFields.value.push("password2");
  }
  if (password1.value != password2.value) {
    requiredFields.value.push("password2");
  }
  if (account_type.value == "Corporate") {
    if (!company.value) {
      requiredFields.value.push("company");
    }
    if (!company_address.value) {
      requiredFields.value.push("company_address");
    }
  }
  if (requiredFields.value.length == 0) {
    firstName = name.value.split(" ")[0];
    lastName = name.value.split(" ")[1];
    let data = {
      title: title.value,
      username: email.value,
      first_name: firstName,
      last_name: lastName,
      birthday: birthday.value,
      phone: phone.value,
      email: email.value,
      password: password1.value,
      re_password: password2.value,

      company: company.value,
      company_address: company_address.value,
    };
    let res = await axios.post(
      "https://api.vipairassist.com/api/v1/users/",
      data
    );
    console.log(res);
    if (res.status == 201) {
      console.log("account created");
      const checkout = async () => {
  const stripe = await stripePromise;
    
    
      // Call the DRF API to create a checkout session
      const response = await axios.post(
        "https://api.vipairassist.com/api/v1/payments/create-subscription",
        data
      );
      const sessionId = response.data.id;
      //Redirect the customer to the Stripe hosted checkout page
      await stripe.redirectToCheckout({ sessionId });
   
  }
    }
  }
}


</script>
<style>
.register_wrapper {
  max-height: calc(100vh - 101px) !important;
  overflow: auto;
}
.vue-tel-input {
  background-color: #efefef;
}
.vti__input {
  background: none !important;
}

</style>