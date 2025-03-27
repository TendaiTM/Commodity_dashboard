<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Farm form'
        }
    },

    data() {
        return {
            farmerIDJson: [],
            farmerIDs: [],
            submitURL: 'http://localhost:5000/api/farm/create',
            farmersURL: 'http://localhost:5000/api/farmers',
            form: {
                farmID: null,
                farmName: null,
                physicalAddress: null,
                townCity: null,
                district: null,
                province: null,
                coordinatesLat: null,
                coordinatesLong: null,
                landOwnership: null,
                landSize: null,
                landType: null,
                arableLandSize: null,
                nearestGMBDepot: null,
                cropID: null,
                offerLetterPlotNumer: null,
                agritexReference: null,
                cooperativeID: null,
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
            for (let i = 0; i < response.data.length; i++) {
                this.farmerIDJson.push(_.pick(response.data[i], ['FarmerID']))
                // this.farmerIDs.push(this.farmerIDJson['FarmerID'])

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
                            <option v-for="id in farmerIDJson" :key="id">{{ id['FarmerID'] }}</option>
                        </select>
                        <input type="text" v-model="form.farmID" id="farmID" name="farmID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Farm ID" required>

                        <input type="text" v-model="form.farmName" id="farmName" name="farmName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Farm Name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.physicalAddress" id="physicalAddress" name="physicalAddress"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Physical Address" required>
                        <input type="text" v-model="form.townCity" id="townCity" name="townCity"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Town/City" required>
                        <input type="text" v-model="form.district" id="district" name="district"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="District" required>
                    </div>

                    <!-- 3rd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.province" id="province" name="province"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Province" required>
                        <input type="text" v-model="form.coordinatesLat" id="coordinatesLat" name="coordinatesLat"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Latitude" required>
                        <input type="text" v-model="form.coordinatesLong" id="coordinatesLong" name="coordinatesLong"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Longitude" required>
                    </div>

                    <!-- 4th row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.province" id="province" name="province"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Province" required>
                        <input type="text" v-model="form.coordinatesLat" id="coordinatesLat" name="coordinatesLat"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Latitude" required>
                        <input type="text" v-model="form.coordinatesLong" id="coordinatesLong" name="coordinatesLong"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Longitude" required>
                    </div>

                    <!-- 5th row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.landOwnership" id="landOwnership" name="landOwnership"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Land Ownership" required>
                        <input type="text" v-model="form.landSize" id="landSize" name="landSize"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Land Size" required>
                        <input type="text" v-model="form.landType" id="landType" name="landType"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Land Type" required>
                    </div>

                    <!-- 6th row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.arableLandSize" id="arableLandSize" name="arableLandSize"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Arable land size" required>
                        <input type="text" v-model="form.nearestGMBDepot" id="nearestGMBDepot" name="nearestGMBDepot"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Nearest GMB depot" required>
                        <input type="text" v-model="form.cropID" id="cropID" name="cropID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Crop ID" required>
                    </div>

                    <!-- 7th row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.offerLetterPlotNumer" id="offerLetterPlotNumer" name="offerLetterPlotNumer"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Arable land size" required>
                        <input type="text" v-model="form.agritexReference" id="agritexReference" name="agritexReference"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Agritex reference" required>
                    </div>

                    <!-- 8th row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.cooperativeID" id="cooperativeID" name="cooperativeID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Cooperative ID" required>
                        <input type="text" v-model="form.nearestGMBDepot" id="nearestGMBDepot" name="nearestGMBDepot"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Nearest GMB depot" required>
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