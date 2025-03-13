<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Crop form'
        }
    },

    data() {
        return {
            cooperativeIDJson: [],
            // cooperativeIDs: [],
            submitURL: 'http://localhost:5000/api/crop/create',
            farmsURL: 'http://localhost:5000/api/crops',
            form: {
                cropID: null,
                cropName: null,
                season: null,
                certificateID: null,
                productionReferenceID: null
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
        // this.cooperativeIDs.push('Farmer ID')
        await axios.get(this.farmsURL).then((response) => {
            console.log(response.data)
            for(let i=0; i<response.data.length; i++){
                this.cooperativeIDJson.push(_.pick(response.data[i], ['CropID']))
                // this.cooperativeIDs.push(this.cooperativeIDJson['FarmerID'])
                
            }
            // this.form.cooperativeID = this.cooperativeIDJson[0]
            console.log(this.form.cooperativeID)
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
                        <select v-model="form.cropID" id="cropID" name="cropID"
                            class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Crop ID</option>
                            <option v-for="id in cooperativeIDJson" :key="id" >{{ id['CropID'] }}</option>
                        </select>
                        <input type="text" v-model="form.cropName" id="cropName" name="cropName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Crop name" required>

                        <input type="text" v-model="form.season" id="season" name="season"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Season" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.certificateID" id="certificateID" name="certificateID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Certificate ID" required>
                        <input type="text" v-model="form.productionReferenceID" id="productionReferenceID" name="productionReferenceID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Production reference ID" required>
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