<template>
    <UTable :rows="jsonData" />
    <center>
        <NuxtLink to="/crop/commodityonboarding">
            <UButton>Add Commodity</UButton>
        </NuxtLink>
    </center>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    data() {
        return {
            commoditiesURL: 'http://localhost:5000/api/commodities',
            jsonData: [],
            commodities: []
        }
    },

    methods: {
        doSomething() {
            console.log('Clicked')
        }
    },
    mounted() {
        axios.get(this.commoditiesURL)
            .then((response) => {
                // this.jsonData = response.data
                console.log(response)
                // console.log('Appending to commoditiess')
                /*
                for (let i = 0; i < this.jsonData.length; i++) {
                    this.commoditiess.push(_.pick(this.jsonData[i], ['FarmerID', 'AccountNumber', 'AccountName']))
                }
                */
            })
    }
}
</script>