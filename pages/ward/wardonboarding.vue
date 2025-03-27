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
            submitURL: 'http://localhost:5000/api/ward/create',
            // farmsURL: 'http://localhost:5000/api/crops',
            form: {
                province: null,
                district: null,
                admin: null,
                councilor: null,
                faoHandler: null,
                popularCommodity: null
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

    /*
    async mounted() {
        await axios.get(this.farmsURL).then((response) => {
            console.log(response.data)
            for(let i=0; i<response.data.length; i++){
                this.cooperativeIDJson.push(_.pick(response.data[i], ['CropID']))                     
            }
            console.log(this.form.cooperativeID)
        })
    }
    */
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
                        <input type="text" v-model="form.province" id="province" name="province"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Province" required>
                        <input type="text" v-model="form.district" id="district" name="district"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="District" required>

                        <input type="text" v-model="form.admin" id="admin" name="admin"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Admin" required>
                    </div>

                    <!-- 2nd row -->
                    <div class="mb-4 grid grid-cols-3 gap-3">
                        <input type="text" v-model="form.councilor" id="councilor" name="councilor"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Councilor" required>
                        <input type="text" v-model="form.faoHandler" id="faoHandler" name="faoHandler"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="FAO handler" required>
                        <input type="text" v-model="form.faoHandler" id="faoHandler" name="faoHandler"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="FAO handler" required>
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