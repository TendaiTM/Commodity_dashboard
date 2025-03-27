<script>
import axios from 'axios'
import _ from 'lodash'
import { reactive } from 'vue'

export default {
    props: {
        title: {
            type: String,
            default: 'Cooperative form'
        }
    },

    data() {
        return {
            cooperativeIDJson: [],
            cooperativeIDs: [],
            submitURL: 'http://localhost:5000/api/facility-cooperative/create',
            farmsURL: 'http://localhost:5000/api/farms',
            form: reactive({
                cooperativeID: null,
                cooperativeName: null,
                cooperativeLocation: null,
                agriculturalSector: null,
                numberOfFarmers: null,
                leadAgritexOfficer: null,
                leadAgronomist: null
            })
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
        // this.cooperativeIDJson.push({'Farmer ID': 'Farmer ID'})
        await axios.get(this.farmsURL).then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                this.cooperativeIDJson.push(_.pick(response.data[i], ['FarmerID']))
                // this.cooperativeIDs.push(this.cooperativeIDJson['FarmerID'])

            }
            // this.form.cooperativeID = this.cooperativeIDJson[0]
            // console.log(this.form.cooperativeID)
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
                        <select v-model="form.cooperativeID" id="cooperativeID" name="cooperativeID"
                            class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Farmer ID</option>
                            <option v-for="id in cooperativeIDJson" :key="id">{{ id['FarmerID'] }}</option>
                        </select>
                        <input type="text" v-model="form.cooperativeName" id="cooperativeName" name="cooperativeName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Cooperative name" required>

                        <input type="text" v-model="form.cooperativeLocation" id="cooperativeLocation"
                            name="cooperativeLocation" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Cooperative location" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.agriculturalSector" id="agriculturalSector"
                            name="agriculturalSector" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Agricultural sector" required>
                        <input type="text" v-model="form.numberOfFarmers" id="numberOfFarmers" name="numberOfFarmers"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Number of farms" required>
                    </div>

                    <!-- 3rd row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.leadAgritexOfficer" id="leadAgritexOfficer"
                            name="leadAgritexOfficer" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Lead agritex officer" required>
                        <input type="text" v-model="form.leadAgronomist" id="leadAgronomist" name="leadAgronomist"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Lead agronomist" required>
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