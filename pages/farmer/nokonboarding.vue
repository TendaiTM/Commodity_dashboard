<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Next of kin form'
        }
    },

    data() {
        return {
            farmerIDJson: [],
            farmerIDs: [],
            submitURL: 'http://localhost:5000/api/next-of-kin/create',
            farmersURL: 'http://localhost:5000/api/farmers',
            form: {
                nationalID: null,
                firstName: null,
                surname: null,
                address: null,
                phoneNumber: null,
                farmerID: null
            }
        }
    },
    methods: {
        submit: async function () {
            axios.post(this.submitURL, this.form)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },

    async mounted() {
        // this.farmerIDs.push('Farmer ID')
        await axios.get(this.farmersURL).then((response) => {
            console.log(response.data)
            for(let i=0; i<response.data.length; i++){
                this.farmerIDJson.push(_.pick(response.data[i], ['FarmerID']))
                this.farmerIDs.push(this.farmerIDJson['FarmerID'])
                
            }
            // this.form.farmerID = this.farmerIDJson[0]
            console.log(this.form.farmerID)
        })
    }
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
                        <select v-model="form.farmerID" id="farmerID" name="farmerID"
                            class="border rounded w-full py-2 px-3">
                            <option v-for="id in farmerIDJson" :key="id" >{{ id['FarmerID'] }}</option>
                        </select>
                        <input type="text" v-model="form.nationalID" id="nationalID" name="nationalID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="National ID" required>

                        <input type="text" v-model="form.firstName" id="firstName" name="firstName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="First Name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.surname" id="surname" name="surname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Surname" required>
                        <input type="text" v-model="form.address" id="address" name="address"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Address" required>
                        <input type="text" v-model="form.phoneNumber" id="phoneNumber" name="phoneNumber"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Phone Number"
                            required>
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