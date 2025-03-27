<template>
    <UTable :rows="jsonData" />
    <center>
        <!-- <NuxtLink to="/farmer/farmeronboarding"><UButton>Add Farmer</UButton></NuxtLink> -->
        <NuxtLink to="/farmer/bankaccountonboarding">
            <UButton>Add Bank Details</UButton>
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
            bankURL: 'http://localhost:5000/api/bank-details',
            jsonData: [],
            banks: [],
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
        axios.get(this.bankURL)
            .then((response) => {
                this.jsonData = response.data.data
                console.log(this.jsonData)
                console.log('Appending to banks')
                for (let i = 0; i < this.jsonData.length; i++) {
                    // this.farms.push(this.jsonData[i])
                    this.banks.push(_.pick(this.jsonData[i], ['FarmerID', 'AccountNumber', 'AccountName']))
                }
                console.log(this.banks)
            })
    }
}
</script>