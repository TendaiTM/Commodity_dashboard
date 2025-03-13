<template>
    <UTable :rows="jsonData" />
    <center>
        <!-- <NuxtLink to="/farmer/farmeronboarding"><UButton>Add Farmer</UButton></NuxtLink> -->
        <NuxtLink to="/farmer/nokonboarding">
            <UButton>Add Farmer Next of Kin</UButton>
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
            nokURL: 'http://localhost:5000/api/next-of-kins',
            jsonData: [],
            noks: [],
            /*
            columns: [
                {
                    key: 'farmerid',
                    label: 'Farmer ID',
                },
                {
                    key: 'nationalid',
                    label: 'National ID',
                },
                {
                    key: 'firstname',
                    label: 'First Name',
                },
                {
                    key: 'surname',
                    label: 'Surname',
                },
                {
                    key: 'address',
                    label: 'address',
                },
                {
                    key: 'phonenumber',
                    label: 'Phone Number',
                },
            ]
                */
            // columns: ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']
            // noks: []
        }
    },

    methods: {
        doSomething() {
            console.log('Clicked')
        }
    },
    mounted() {
        axios.get(this.nokURL)
            .then((response) => {
                this.jsonData = response.data.data
                console.log(this.jsonData)
                console.log('Appending to noks')
                for (let i = 0; i < this.jsonData.length; i++) {
                    this.noks.push(this.jsonData[i])
                    // this.noks.push(_.pick(this.jsonData[i], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']))
                }
                console.log(this.noks)
            })
    }
}
</script>