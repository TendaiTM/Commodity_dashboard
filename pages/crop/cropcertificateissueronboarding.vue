<script>
import axios from 'axios'
import _ from 'lodash'
import { reactive } from 'vue'

export default {
    props: {
        title: {
            type: String,
            default: 'Crop certificate issuer form'
        }
    },

    data() {
        return {
            allowedToExport: ['TRUE', 'FALSE'],
            certificateIDJson: [],
            // certificateIDs: [],
            submitURL: 'http://localhost:5000/api/certificate-issuer/create',
            certificatesURL: 'http://localhost:5000/api/certificates',
            form: reactive({
                issuerName: null,
                issuerID: null,
                allowedToExport: null,
                certificateID: null
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
        // this.certificateIDs.push('Farmer ID')
        await axios.get(this.certificatesURL).then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                this.certificateIDJson.push(_.pick(response.data[i], ['CertificateID']))
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
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <select v-model="form.certificateID" id="certificateID" name="certificateID"
                            class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Certificate ID</option>
                            <option v-for="id in certificateIDJson" :key="id">{{ id['CertificateID'] }}</option>
                        </select>
                        <input type="text" v-model="form.issuerName" id="issuerName" name="issuerName"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Issuer name" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="text" v-model="form.issuerID" id="issuerID" name="issuerID"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Issuer ID" required>
                        <select v-model="form.allowedToExport" id="allowedToExport" name="allowedToExport"
                            class="border rounded w-full py-2 px-3">
                            <option value="" disabled>Allowed to export?</option>
                            <option v-for="choice in allowedToExport" :key="choice">{{ choice }}</option>
                        </select>
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