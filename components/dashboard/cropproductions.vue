<template>
    <UTable :rows="jsonData" />
    <center>
        <!-- <NuxtLink to="/farmer/farmeronboarding"><UButton>Add Farmer</UButton></NuxtLink> -->
        <NuxtLink to="/farm/cropproductiononboarding">
            <UButton>Add Crop Production</UButton>
        </NuxtLink>
    </center>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    data() {
        return {
            url: 'http://localhost:5000/api',
            cropProductionsURL: 'http://localhost:5000/api/crop-productions',
            jsonData: [],
            cropProductions: [],
            /*
            columns: [
                {
                    key: 'farmerid',
                    label: 'Farmer ID',
                },
                {
                    key: 'accountnumber',
                    label: 'Account Number',
                },
                {
                    key: 'accountname',
                    label: 'Account Name',
                },
            ]
            */
            // columns: ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']
            // farms: []
        }
    },

    methods: {
        doSomething() {
            console.log('Clicked')
        }
    },
    mounted() {
        axios.get(this.cropProductionsURL)
            .then((response) => {
                this.jsonData = response.data.data
                console.log(this.jsonData)
                console.log('Appending to cropProductions')
                /*
                for (let i = 0; i < this.jsonData.length; i++) {
                    this.cropProductions.push(_.pick(this.jsonData[i], ['FarmerID', 'AccountNumber', 'AccountName']))
                }
                */
                console.log(this.cropProductions)
            })
    }
}
</script>