<template>
    <UTable :rows="jsonData" />
    <center>
        <!-- <NuxtLink to="/farmer/farmeronboarding"><UButton>Add Farmer</UButton></NuxtLink> -->
        <NuxtLink to="/farm/farmonboarding">
            <UButton>Add Farm</UButton>
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
            farmURL: 'http://localhost:5000/api/farms',
            jsonData: [],
            farms: [],
            /*
            columns: [
                {
                    key: 'farmerid',
                    label: 'Farmer ID',
                },
                {
                    key: 'farmname',
                    label: 'Farm Name',
                },
                {
                    key: 'arablelandsize',
                    label: 'Arable Land Size',
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
        axios.get(this.farmURL)
            .then((response) => {
                this.jsonData = response.data
                console.log(this.jsonData)
                console.log('Appending to farms')
                for (let i = 0; i < this.jsonData.length; i++) {
                    // this.farms.push(this.jsonData[i])
                    this.farms.push(_.pick(this.jsonData[i], ['FarmerID', 'FarmName', 'ArableLandSize']))
                }
                console.log(this.farms)
            })
    }
}
</script>