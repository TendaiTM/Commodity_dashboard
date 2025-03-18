<!-- This form captures all of the farmer's details, including their next of kin, spouse, bank account and farm -->

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

defineProps({
    title: {
        type: String,
        default: 'Farmer KYC farmerForm'
    }
})


// const toast = useToast()
const farmerSubmitURL = 'http://localhost:5000/api/farmer/create'
const farmerNOKSubmitURL = 'http://localhost:5000/api/next-of-kin/create'
const farmerSpouseSubmitURL = 'http://localhost:5000/api/spouse/create'
const farmerBankDetailsSubmitURL = 'http://localhost:5000/api/bank-details/create'
const farmSubmitURL = 'http://localhost:5000/api/farm/create'
const farmerURL = 'http://localhost:5000/api/farmer'
// var farmerID
const titles = ['Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Rev']
var selectedTitle = ''
const genders = ['Male', 'Female']
var selectedGender = ''
const provinces = ['Bulawayo', 'Harare', 'Manicaland', 'Mashonaland Central', 'Mashonaland East', 'Mashonaland West', 'Masvingo', 'Matabeleland North', 'Matabeleland South', 'Midlands']
const selectedProvince = ''
const maritalstatuses = ['Single', 'Married', 'Divorced', 'Widowed']
var selectedmaritalstatus = ''
const banks = ['Agricultural Development Bank of Zimbabwe', 'BancABC', 'Cabs', 'CBZ', 'First Capital', 'Ecobank', 'FBC', 'Nedbank',
    'Metbank', 'NMB', 'Stanbic', 'FBCCrownBank', 'Steward Bank', 'ZB', 'POSB']
const selectedBank = ''
const landOwnerships = ['99-year lease', 'Freeholding', 'Title deeds', 'Other']
const selectedLandOwnership = ''
const livestockTypes = ['cattle', 'chickens', 'goats', 'pigs']
const selectedLivestockType = ''

var livestockPresent = ref(false)

const changeState = () => {
    livestockPresent.value = !livestockPresent.value
}

const farmerForm = reactive({
    nationalid: null,
    title: selectedTitle,
    firstname: null,
    gender: selectedGender,
    surname: null,
    dateofbirth: null,
    maidensurname: null,
    countryofbirth: null,
    numberofdependants: null,
    maritalstatus: selectedmaritalstatus,
    emailaddress: null,
    mobilenumber: null,
    hometelephonenumber: null,
    physicaladdress: null,
    province: selectedProvince,
    commodityid: null
})

const nokForm = reactive({
    nationalid: null,
    firstname: null,
    surname: null,
    address: null,
    phonenumber: null,
    relationship: null,
    farmerid: null
})

const spouseForm = reactive({
    nationalid: null,
    firstname: null,
    surname: null,
    address: null,
    phonenumber: null,
    relationship: null,
    farmerid: null
})

const bankDetailsForm = reactive({
    accountnumber: null,
    bankname: selectedBank,
    branchname: null,
    branchcode: null,
    accountname: null,
    accounttype: null,
    walletaddress: null,
    wallettype: null,
    farmerid: null
})

const farmForm = reactive({
    farmid: null,
    farmname: null,
    physicaladdress: null,
    towncity: null,
    district: null,
    province: null,
    coordinateslat: null,
    coordinateslong: null,
    landownership: selectedLandOwnership,
    landsize: null,
    landtype: null,
    arablelandsize: null,
    nearestgmbdepot: null,
    cropid: null,
    offerletterplotnumber: null,
    agritexreference: null,
    cooperativeid: null,
    farmerid: null
})

const livestockForm = reactive({
    farmerid: null,
    livestocktype: selectedLivestockType,
    breed: null,
    sex: null,
    dateofbirth: null,
    dateacquired: null,
    healthstatus: null
})

const submit = async () => {
    const request = {
        params: {
            nationalid: farmerForm.nationalid
        }
    }
    await axios.post(farmerSubmitURL, farmerForm).then((response) => {
        console.log('Adding farmer')
        console.log(response)
        axios.get(farmerURL, request).then((response) => {
            console.log(response)
            nokForm.farmerid = response.data[0]['FarmerID']
            spouseForm.farmerid = response.data[0]['FarmerID']
            console.log('Adding next of kin')
            if (nokForm.farmerid != null || spouseForm.farmerid != null || bankDetailsForm.farmerid != null || farmForm.farmerid != null) {
                axios.post(farmerNOKSubmitURL, nokForm).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
                // console.log(spouseForm)
                console.log('Adding spouse')
                axios.post(farmerSpouseSubmitURL, spouseForm).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
                console.log('Adding bank details')
                axios.post(farmerBankDetailsSubmitURL, bankDetailsForm).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
                console.log('Adding farm details')
                axios.post(farmSubmitURL, farmForm).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            }
            else {
                console.log('No farmer ID was provided')
            }
        })
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
    <div class="mb-10">
        <center>
            <h1 class="text-3xl mt-5"><strong>Farmer Form</strong></h1>
        </center>
    </div>
    <section class="bg-white w-auto mx-60 my-30">
        <div class="container m-auto max-w-4xl">
            <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="submit">

                    <!-- Personal Info -->
                    <div>
                        <h2 class="text-lg font-bold mb-4">Personal info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmerForm.nationalid" id="nationalid" name="nationalid"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
                            <select v-model="farmerForm.title" id="title" name="title"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Title</option>
                                <option v-for="title in titles" :key="title">{{ title }}</option>
                            </select>
                            <input type="text" v-model="farmerForm.firstname" id="firstname" name="firstname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
                        </div>

                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <select v-model="farmerForm.gender" id="gender" name="gender"
                                class="border rounded w-full py-2 px-3 mb-2">
                                <option value="" selected disabled>Gender</option>
                                <option v-for="gender in genders" :key="gender">{{ gender }}</option>
                            </select>
                            <input type="text" v-model="farmerForm.surname" id="maidensurname" name="maidensurname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
                            <VueDatePicker v-model="farmerForm.dateofbirth" :format="'yyyy-MM-dd'"
                                placeholder="Date of birth"></VueDatePicker>
                        </div>

                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmerForm.maidensurname" id="maidensurname"
                                name="maidensurname" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Maiden Surname" required>
                            <input type="text" v-model="farmerForm.countryofbirth" id="countryofbirth"
                                name="countryofbirth" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Country of birth" required>
                            <input type="text" v-model="farmerForm.numberofdependants" id="numberOfDependants"
                                name="numberOfDependants" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Number of dependents" required>
                        </div>

                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <select v-model="farmerForm.maritalstatus" id="maritalstatus" name="maritalstatus"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Marital Status</option>
                                <option v-for="maritalstatus in maritalstatuses" :key="maritalstatus">{{ maritalstatus
                                    }}</option>
                            </select>
                            <input type="text" v-model="farmerForm.emailaddress" id="emailAddress" name="emailAddress"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Email address">
                            <input type="text" v-model="farmerForm.mobilenumber" id="mobileNumber" name="mobileNumber"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Mobile number" required>
                        </div>

                        <div class="mb-4 grid grid-cols-2 gap-2">
                            <input type="text" v-model="farmerForm.hometelephonenumber" id="homeTelephoneNumber"
                                name="homeTelephoneNumber" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Home telephone number" required>
                            <input type="text" v-model="farmerForm.physicaladdress" id="physicalAddress"
                                name="physicalAddress" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Physical Address" required>
                        </div>
                    </div>

                    <div class="mb-8 grid grid-cols-2 gap-2">
                        <select v-model="farmerForm.province" id="province" name="province"
                            class="border rounded w-full py-2 px-3  mb-2">
                            <option value="" selected disabled>Province</option>
                            <option v-for="province in provinces" :key="province">{{ province }}</option>
                        </select>
                        <input type="text" v-model="farmerForm.commodityid" id="commodityid" name="commodityid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Commodity ID" required>
                    </div>

                    <!-- Spouse info -->
                    <div>
                        <h2 class="text-lg font-bold mb-4">Spouse info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="spouseForm.nationalid" id="spouseid" name="spouseid"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
                            <input type="text" v-model="spouseForm.firstname" id="spousefirstname"
                                name="spousefirstname" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="First name" required>
                            <input type="text" v-model="spouseForm.surname" id="spousesurname" name="spousesurname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="spouseForm.address" id="spouseaddress" name="spouseaddress"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Address" required>
                            <input type="text" v-model="spouseForm.phonenumber" id="spousephonenumber"
                                name="spousephonenumber" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Phone number" required>
                            <input type="text" v-model="spouseForm.relationship" id="spouserelationship"
                                name="spouserelationship" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Relationship to farmer" required>
                        </div>
                    </div>

                    <!-- Next of kin info -->
                    <div>
                        <h2 class="text-lg font-bold mb-4">Next of kin info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="nokForm.nationalid" id="nokid" name="nokid"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>
                            <input type="text" v-model="nokForm.firstname" id="nokfirstname" name="nokfirstname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="First name" required>
                            <input type="text" v-model="nokForm.surname" id="noksurname" name="noksurname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="nokForm.address" id="nokaddress" name="nokaddress"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Address" required>
                            <input type="text" v-model="nokForm.phonenumber" id="nokphonenumber" name="nokphonenumber"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Phone number" required>
                            <input type="text" v-model="nokForm.relationship" id="nokrelationship"
                                name="nokrelationship" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Relationship to farmer" required>
                        </div>
                    </div>

                    <!-- Bank details info -->
                    <div>
                        <h2 class="text-lg font-bold mb-4">Bank details info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="bankDetailsForm.accountname" id="accountname" name="accountname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Account name" required>
                            <input type="text" v-model="bankDetailsForm.accountnumber" id="accountnumber"
                                name="accountnumber" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Account number" required>
                            <input type="text" v-model="bankDetailsForm.accounttype" id="accounttype" name="accounttype"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Account type" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <select v-model="bankDetailsForm.bankname" id="bankname" name="bankname"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Bank name</option>
                                <option v-for="bank in banks" :key="bank">{{ bank }}</option>
                            </select>
                            <input type="text" v-model="bankDetailsForm.branchcode" id="branchcode" name="branchcode"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch code" required>
                            <input type="text" v-model="bankDetailsForm.branchname" id="branchname" name="branchname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch name" required>
                        </div>
                        <div class="mb-4 grid grid-cols-2 gap-2">
                            <input type="text" v-model="bankDetailsForm.walletaddress" id="walletaddress"
                                name="walletaddress" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Wallet address" required>
                            <input type="text" v-model="bankDetailsForm.wallettype" id="wallettype" name="wallettype"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Wallet type" required>
                        </div>
                    </div>

                    <!-- Farm info -->
                    <div>
                        <h2 class="text-lg font-bold mb-4">Farm info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmForm.agritexreference" id="agritexreference"
                                name="agritexreference" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Agritex reference" required>
                            <input type="text" v-model="farmForm.arablelandsize" id="arablelandsize"
                                name="arablelandsize" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Arable land size" required>
                            <input type="text" v-model="farmForm.cooperativeid" id="cooperativeid" name="cooperativeid"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Cooperative ID" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmForm.coordinateslat" id="coordinateslat"
                                name="coordinateslat" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Latitude" required>
                            <input type="text" v-model="farmForm.coordinateslong" id="coordinateslong"
                                name="coordinateslong" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Longitude" required>
                            <input type="text" v-model="farmForm.cropid" id="cropid" name="nokrelationship"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Crop ID" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmForm.district" id="district" name="district"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="District" required>
                            <input type="text" v-model="farmForm.farmid" id="farmid" name="farmid"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Farm ID" required>
                            <input type="text" v-model="farmForm.farmname" id="farmname" name="farmname"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Farm name" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <select v-model="farmForm.landownership" id="landownership" name="landownership"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Land ownership</option>
                                <option v-for="lo in landOwnerships" :key="lo">{{ lo }}</option>
                            </select>
                            <input type="number" v-model="farmForm.landsize" id="landsize" name="landsize"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Land size" required>
                            <input type="text" v-model="farmForm.landtype" id="landtype" name="landtype"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Land type" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmForm.nearestgmbdepot" id="nearestgmbdepot"
                                name="nearestgmbdepot" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Nearest GMB depot" required>
                            <input type="number" v-model="farmForm.offerletterplotnumber" id="offerletterplotnumber"
                                name="landsize" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Offer letter/plot number" required>
                            <input type="text" v-model="farmForm.physicaladdress" id="physicaladdress"
                                name="physicaladdress" class="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Physical Address" required>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <input type="text" v-model="farmForm.towncity" id="towncity" name="towncity"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Town/City" required>
                            <select v-model="farmerForm.province" id="province" name="province"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Province</option>
                                <option v-for="province in provinces" :key="province">{{ province }}</option>
                            </select>
                            <label class="inline-flex items-center cursor-pointer">
                                <input @click="changeState" type="checkbox" value="" class="sr-only peer">
                                <div
                                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-200 dark:peer-checked:bg-orange-400">
                                </div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Any
                                    livestock?</span>
                            </label>
                        </div>
                    </div>

                    <!-- Livestock form -->
                    <div v-if="livestockPresent">
                        <h2 class="text-lg font-bold mb-4">Livestock info</h2>
                        <hr>
                        <div class="mt-4 mb-4 grid grid-cols-3 gap-3">
                            <select v-model="livestockForm.livestocktype" id="livestocktype" name="livestocktype"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Livestock Type</option>
                                <option v-for="lst in livestockTypes" :key="lst">{{ lst }}</option>
                            </select>
                            <input type="text" v-model="livestockForm.breed" id="breed" name="breed"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Breed" required>
                            <select v-model="livestockForm.sex" id="lssex" name="lssex"
                                class="border rounded w-full py-2 px-3  mb-2">
                                <option value="" selected disabled>Sex</option>
                                <option v-for="gender in genders" :key="gender">{{ gender }}</option>
                            </select>
                        </div>
                        <div class="mb-4 grid grid-cols-3 gap-3">
                            <VueDatePicker v-model="livestockForm.dateofbirth" :format="'yyyy-MM-dd'"
                                placeholder="Date of birth"></VueDatePicker>
                            <VueDatePicker v-model="livestockForm.dateacquired" :format="'yyyy-MM-dd'"
                                placeholder="Date acquired"></VueDatePicker>
                            <input type="text" v-model="livestockForm.healthstatus" id="healthstatus" name="healthstatus"
                                class="border rounded w-full py-2 px-3 mb-2" placeholder="Health status" required>
                        </div>
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
