<template>
  <UTable :rows="farmers" />
  <center>
    <NuxtLink to="/farmer/farmeronboarding">
      <UButton>Add Farmer</UButton>
    </NuxtLink>
    <!-- <NuxtLink to="/farmer/nokonboarding"><UButton>Add Farmer Next of Kin</UButton></NuxtLink> -->
  </center>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      url: 'http://localhost:5000/api',
      farmersURL: 'http://localhost:5000/api/farmers',
      jsonData: [],
      farmers: [],
      columns: [
        {
          key: 'nationalid',
          label: 'National ID',
        },
        {
          key: 'title',
          label: 'Title',
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
          key: 'email',
          label: 'Email',
        },
      ]
      // columns: ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']
      // farmers: []
    }
  },

  methods: {
    doSomething() {
      console.log('Clicked')
    }
  },
  mounted() {
    axios.get(this.farmersURL)
      .then((response) => {
        this.jsonData = response.data
        console.log(this.jsonData)

        // this.jsonData = _.pick(response.data[0], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress'])
        // console.log(JSON.stringify(this.jsonData))
        console.log('Appending to farmers')
        for (let i = 0; i < this.jsonData.length; i++) {
          // console.log(this.jsonData[i])
          this.farmers.push(_.pick(this.jsonData[i], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']))
        }
        console.log(this.farmers)
      })
  }
}
</script>
