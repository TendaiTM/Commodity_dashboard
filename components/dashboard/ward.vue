<template>
    <UTable :rows="jsonData" />
    <center>
      <NuxtLink to="/farmer/wardonboarding">
        <UButton>Add Ward</UButton>
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
        // url: 'http://localhost:5000/api',
        wardsURL: 'http://localhost:5000/api/wards',
        jsonData: [],
        wards: [],
        /*
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
          */
        // columns: ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']
        // wards: []
      }
    },

    mounted() {
      axios.get(this.wardsURL)
        .then((response) => {
          this.jsonData = response.data
          console.log(this.jsonData)
  
          // this.jsonData = _.pick(response.data[0], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress'])
          // console.log(JSON.stringify(this.jsonData))
          console.log('Appending to wards')
          for (let i = 0; i < this.jsonData.length; i++) {
            // console.log(this.jsonData[i])
            this.wards.push(_.pick(this.jsonData[i], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress']))
          }
          console.log(this.wards)
        })
    }
  }
  </script>
  