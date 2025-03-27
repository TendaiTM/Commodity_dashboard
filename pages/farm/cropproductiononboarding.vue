<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Crop production form'
        }
    },

    data() {
        return {
            cropIDJson: [],
            // cropIDs: [],
            submitURL: 'http://localhost:5000/api/crop-production/create',
            cropsURL: 'http://localhost:5000/api/crops',
            form: {
                cropID: null,
                plantingDate: null,
                harvestDate: null,
                cropYield: null
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
        // this.cropIDs.push('Farmer ID')
        await axios.get(this.cropsURL).then((response) => {
            console.log(response.data)
            for(let i=0; i<response.data.length; i++){
                this.cropIDJson.push(_.pick(response.data[i], ['CropID']))
                // this.cropIDs.push(this.cropIDJson['FarmerID'])
                
            }
            // this.form.cropID = this.cropIDJson[0]
            console.log(this.form.cropID)
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
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <select v-model="form.cropID" id="cropID" name="cropID"
                            class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Crop ID</option>
                            <option v-for="id in cropIDJson" :key="id" >{{ id['CropID'] }}</option>
                        </select>
                        <input type="text" v-model="form.plantingDate" id="plantingDate" name="plantingDate"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Planting date (yyyy-mm-dd)" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.harvestDate" id="harvestDate" name="harvestDate"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Harvest date (yyyy-mm-dd)" required>
                        <input type="text" v-model="form.cropYield" id="cropYield" name="cropYield"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Crop yield" required>
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