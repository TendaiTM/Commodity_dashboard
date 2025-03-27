<template>
    <UTable :rows="jsonData" />
    <center>
        <!-- <NuxtLink to="/farmer/farmeronboarding"><UButton>Add Farmer</UButton></NuxtLink> -->
        <NuxtLink to="/farmer/cooperativeonboarding">
            <UButton>Add Cooperative</UButton>
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
            cooperativesURL: 'http://localhost:5000/api/facility-cooperatives',
            jsonData: [],
            cooperatives: [],
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
        axios.get(this.cooperativesURL)
            .then((response) => {
                this.jsonData = response.data
                console.log(this.jsonData)
                console.log('Appending to cooperatives')
                /*
                for (let i = 0; i < this.jsonData.length; i++) {
                    this.cooperatives.push(_.pick(this.jsonData[i], ['FarmerID', 'AccountNumber', 'AccountName']))
                }
                */
                console.log(this.cooperatives)
            })
    }
}
</script>