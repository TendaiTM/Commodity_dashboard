<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Bank details form'
        }
    },

    data() {
        return {
            farmerIDJson: [],
            farmerIDs: [],
            submitURL: 'http://localhost:5000/api/bank-details/create',
            farmersURL: 'http://localhost:5000/api/farmers',
            form: {
                accountNumber: null,
                bankName: null,
                branchName: null,
                branchCode: null,
                accountName: null,
                accountType: null,
                walletAddress: null,
                walletType: null,
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
                        <input type="text" v-model="form.accountNumber" id="accountNumber" name="accountNumber"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Account number" required>

                        <input type="text" v-model="form.bankName" id="bankName" name="bankName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Bank Name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.branchName" id="branchName" name="branchName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch name" required>
                        <input type="text" v-model="form.branchCode" id="branchCode" name="branchCode"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Branch code" required>
                        <input type="text" v-model="form.accountName" id="accountName" name="accountName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Account name"
                            required>
                    </div>

                    <!-- 3rd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.accountType" id="accountType" name="accountType"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Account type" required>
                        <input type="text" v-model="form.walletAddress" id="walletAddress" name="walletAddress"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Wallet address" required>
                        <input type="text" v-model="form.walletType" id="walletType" name="walletType"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Wallet type"
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