<template>
  <div v-if="columns!=null">
    <UTable :colums="columns" :rows="jsonData" />
  </div>
  <center>
    <NuxtLink to="/farmer/farmeronboarding">
      <UButton>Add Farmer</UButton>
    </NuxtLink>
    <!-- <NuxtLink to="/farmer/nokonboarding"><UButton>Add Farmer Next of Kin</UButton></NuxtLink> -->
  </center>
</template>

<script>
import axios from 'axios'
import { reactive } from 'vue'

export default {
  data() {
    return {
      url: 'http://localhost:5000/api',
      farmersURL: 'http://localhost:5000/api/farmer-dashboard',
      jsonData: [],
      columns: reactive([]),
      transformedJsonData: [],
      farmers: []
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
        const data = response.data
        const transformedData = data.map(item => {
          const { FarmerNextOfKin, ...rest } = item;
          return {
            ...rest,
            //   FarmerNextOfKin: null,
            SpouseFirstName: FarmerNextOfKin?.SpouseFirstName ?? null,
            SpouseSurname: FarmerNextOfKin?.SpouseSurname ?? null,
            SpouseAddress: FarmerNextOfKin?.SpouseAddress ?? null,
            SpousePhoneNumber: FarmerNextOfKin?.SpousePhoneNumber ?? null,
          };
        });
        
        this.jsonData = transformedData
        const cols = Object.keys(this.jsonData[0])
        for(let i=0; i<cols.length; i++){
          this.columns.push({
            key: `${cols[i]}`,
            label: `${cols[i]}`,
            sortable: true
          })
        }
        console.log(JSON.stringify(this.columns))
        // console.log(cols)
        
        /*
        this.jsonData = transformedData
        const cols = Object.keys(this.jsonData)
        console.log('Cols')
        console.log(cols)
        for(let i=0; i<transformedData.length; i++){
          this.columns.push({
            key: `${Object.keys(transformedData[i])}`,
            label: `${Object.keys(transformedData[i])}`,
            sortable: true
          })
        }
        console.log('Columns')
        console.log(this.columns)
        */
        // console.log(data)

        // this.jsonData = _.pick(response.data[0], ['NationalID', 'Title', 'FirstName', 'Surname', 'EmailAddress'])
        // console.log(JSON.stringify(this.jsonData))
        // console.log('Appending to farmers')
        // for (let i = 0; i < this.jsonData.length; i++) {
        //   // console.log(this.jsonData[i])
        //   if (this.jsonData[i]['FarmerNextOfKin'] != null) {
        //     this.moreJsonData.push(_.pick(this.jsonData[i], ['FarmerNextOfKin']))
        //   }
        // }
        // console.log(this.moreJsonData)
      })
  }
}
</script>
