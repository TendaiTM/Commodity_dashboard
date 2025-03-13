<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    props: {
        title: {
            type: String,
            default: 'Crop certificate form'
        }
    },

    data() {
        return {
            certificateIDJson: [],
            // certificateIDs: [],
            submitURL: 'http://localhost:5000/api/certificate/create',
            cropsURL: 'http://localhost:5000/api/crops',
            form: {
                cropID: null,
                certificateID: null,
                certificateName: null,
                issuedBy: null,
                dateOfIssue: null,
                marketValueOnDateOfIssue: null,
                cropGrade: null,
                dateOfExpiry: null,
                marketValueOnDateOfExpiry: null
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
        // this.certificateIDs.push('Farmer ID')
        await axios.get(this.cropsURL).then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                this.certificateIDJson.push(_.pick(response.data[i], ['CropID']))
                // this.certificateIDs.push(this.certificateIDJson['FarmerID'])

            }
            // this.form.certificateID = this.certificateIDJson[0]
            // console.log(this.form.certificateID)
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
                        <select v-model="form.cropID" id="cropID" name="cropID" class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Crop ID</option>
                            <option v-for="id in certificateIDJson" :key="id">{{ id['CropID'] }}</option>
                        </select>
                        <input type="text" v-model="form.certificateID" id="certificateID" name="certificateID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Certificate ID" required>

                        <input type="text" v-model="form.certificateName" id="certificateName" name="certificateName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Certificate name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.issuedBy" id="issuedBy" name="issuedBy"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Issued by" required>
                        <input type="text" v-model="form.dateOfIssue" id="dateOfIssue" name="dateOfIssue"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Date of issue (yyyy-mm-dd)"
                            required>
                        <input type="text" v-model="form.marketValueOnDateOfIssue" id="marketValueOnDateOfIssue" name="marketValueOnDateOfIssue"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Market value on date of issue"
                            required>
                    </div>

                    <!-- 3rd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.cropGrade" id="cropGrade" name="cropGrade"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Crop grade" required>
                        <input type="text" v-model="form.dateOfExpiry" id="dateOfExpiry" name="dateOfExpiry"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Date of expiry (yyyy-mm-dd)"
                            required>
                        <input type="text" v-model="form.marketValueOnDateOfExpiry" id="marketValueOnDateOfExpiry" name="marketValueOnDateOfExpiry"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Market value on date of expiry"
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