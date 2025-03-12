<script setup>
// import Navbar from '@/components/Navbar.vue';
// import Hero from '@/components/Hero.vue';
import { reactive } from 'vue';
import axios from 'axios';
// import { useToast } from 'vue-toastification';
// import router from '@/router';

defineProps({
    title: {
        type: String,
        default: 'Farmer KYC Form'
    }
})


// const toast = useToast()
const submitURL = 'http://localhost:5000/api/farmer/create'
const titles = ['Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Rev']
const provinces = ['Bulawayo', 'Harare', 'Manicaland', 'Mashonaland Central', 'Mashonaland East', 'Mashonaland West', 'Masvingo', 'Matabeleland North', 'Matabeleland South', 'Midlands']
const genders = ['Male', 'Female']

const form = reactive({
    nationalid: null,
    title: titles[0],
    firstname: null,
    gender: genders[0],
    surname: null,
    dateofbirth: null,
    maidensurname: null,
    countryofbirth: null,
    numberofdependants: null,
    maritalstatus: null,
    emailaddress: null,
    mobilenumber: null,
    hometelephonenumber: null,
    physicaladdress: null,
    province: provinces[0],
    country: null,
    accountnumber: null,
    spousenationaid: null,
    nextofkinnationalid: null,
    farmid: null,
    farmerid: null,
    commodityid: null
})

const submit = async () => {
    // console.log(form)
    axios.post(submitURL, form).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>

<template>
    <section class="bg-white w-auto mx-60 my-30">
        <div class="container m-auto max-w-4xl">
            <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="submit">
                    <!-- Form title -->
                    <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>

                    <!-- 1st row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.nationalid" id="nationalid" name="nationalid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
                        <select v-model="form.title" id="title" name="title" class="border rounded w-full py-2 px-3">
                            <option v-for="title in titles" :key="title">{{ title }}</option>
                        </select>
                        <input type="text" v-model="form.firstname" id="firstname" name="firstname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <select v-model="form.gender" id="gender" name="gender" class="border rounded w-full py-2 px-3">
                            <option v-for="gender in genders" :key="gender">{{ gender }}</option>
                        </select>
                        <input type="text" v-model="form.surname" id="surname" name="surname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
                        <input type="text" v-model="form.dateofbirth" id="dateOfBirth" name="dateOfBirth"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Date of birth (yyyy-mm-dd)"
                            required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.maidensurname" id="maidensurname" name="maidensurname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Maiden Surname" required>
                        <input type="text" v-model="form.countryofbirth" id="countryofbirth" name="countryofbirth"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Country of birth" required>
                        <input type="text" v-model="form.numberofdependants" id="numberOfDependants"
                            name="numberOfDependants" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Number of dependents" required>
                    </div>

                    <!-- 3rd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.maritalstatus" id="maritalStatus" name="maritalStatus"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Marital status">
                        <input type="text" v-model="form.emailaddress" id="emailAddress" name="emailAddress"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Email address">
                        <input type="text" v-model="form.mobilenumber" id="mobileNumber" name="mobileNumber"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Mobile number" required>
                    </div>

                    <!-- 6th row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.hometelephonenumber" id="homeTelephoneNumber"
                            name="homeTelephoneNumber" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Home telephone number" required>
                        <input type="text" v-model="form.physicaladdress" id="physicalAddress" name="physicalAddress"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Physical Address" required>
                        <select v-model="form.province" id="province" name="province"
                            class="border rounded w-full py-2 px-3">
                            <option v-for="province in provinces" :key="province">{{ province }}</option>
                        </select>
                    </div>

                    <!-- 7th row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.country" id="country" name="country"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Country" required>
                        <input type="text" v-model="form.accountnumber" id="accountNumber" name="accountNumber"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Bank account number" required>
                        <input type="text" v-model="form.spousenationalid" id="spouseNationalid" name="spouseNationalid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Spouse national ID" required>
                    </div>

                    <!-- 8th row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="number" v-model="form.nextofkinnationalid" id="nextOfKinNationalid"
                            name="nextOfKinNationalid" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Next of kin national ID" required>
                        <input type="number" v-model="form.farmid" id="farmid" name="farmid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Farm ID" required>
                    </div>

                    <!-- 9th row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="number" v-model="form.farmerid" id="farmerid" name="farmerid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Farmer ID" required>
                        <input type="text" v-model="form.commodityid" id="commodityid" name="commodityid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Commodity ID" required>
                    </div>

                    <div>
                        <button
                            class="bg-orange-300 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>