<script>
import axios from 'axios'
import _ from 'lodash'
import { reactive } from 'vue'

export default {
    props: {
        title: {
            type: String,
            default: 'Commodity form'
        }
    },

    data() {
        return {
            submitURL: 'http://localhost:5000/api/commodity/create',
            commoditiesURL: 'http://localhost:5000/api/commodities',
            form: reactive({
                commodityid: null,
                commodityname: null,
                commodityproducerprice: null,
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

    /*
    async mounted() {
        await axios.get(this.commoditiesURL).then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                this.certificateIDJson.push(_.pick(response.data[i], ['CertificateID']))
            }
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
                        <input type="text" v-model="form.commodityid" id="commodityid" name="commodityid"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Commodity ID" required>
                            <input type="text" v-model="form.commodityname" id="commodityname" name="commodityname"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Commodity name" required>
                            <input type="number" step=".01" v-model="form.commodityproducerprice" id="commodityproducerprice" name="commodityproducerprice"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Commodity producer price" required>
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