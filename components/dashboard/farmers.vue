<template>
  <UTable :columns="columns" :rows="people" />
</template>

<script setup lang="ts">
// import { useAsyncData } from 'nuxt/app';

// const client = useSupabaseClient()
// const { data: farmers } = await useAsyncData('farmers', async () => {
//   const { data } = await client.from('farmers').select('*')
// console.log('data', data)
//   return data
// })
// console.log('farmers', farmers)

const columns = [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "title",
          label: "Title",
          sortable: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          direction: "desc",
        },
        {
          key: "role",
          label: "Role",
        },
      ];
      const people= [
        {
          id: 1,
          name: "Lindsay Walton",
          title: "Front-end Developer",
          email: "lindsay.walton@example.com",
          role: "Member",
        },
        {
          id: 2,
          name: "Courtney Henry",
          title: "Designer",
          email: "courtney.henry@example.com",
          role: "Admin",
        },
        {
          id: 1,
          name: "Lindsay Walton",
          title: "Front-end Developer",
          email: "lindsay.walton@example.com",
          role: "Member",
        },
        {
          id: 2,
          name: "Courtney Henry",
          title: "Designer",
          email: "courtney.henry@example.com",
          role: "Admin",
        },
        {
          id: 3,
          name: "Tom Cook",
          title: "Director of Product",
          email: "tom.cook@example.com",
          role: "Member",
        },
        {
          id: 2,
          name: "Courtney Henry",
          title: "Designer",
          email: "courtney.henry@example.com",
          role: "Admin",
        },
        {
          id: 3,
          name: "Tom Cook",
          title: "Director of Product",
          email: "tom.cook@example.com",
          role: "Member",
        },
        {
          id: 4,
          name: "Whitney Francis",
          title: "Copywriter",
          email: "whitney.francis@example.com",
          role: "Admin",
        },
        {
          id: 3,
          name: "Tom Cook",
          title: "Director of Product",
          email: "tom.cook@example.com",
          role: "Member",
        },
        {
          id: 4,
          name: "Whitney Francis",
          title: "Copywriter",
          email: "whitney.francis@example.com",
          role: "Admin",
        },
        {
          id: 5,
          name: "Leonard Krasner",
          title: "Senior Designer",
          email: "leonard.krasner@example.com",
          role: "Owner",
        },
        {
          id: 6,
          name: "Floyd Miles",
          title: "Principal Designer",
          email: "floyd.miles@example.com",
          role: "Member",
        },
        {
          id: 6,
          name: "Floyd Miles",
          title: "Principal Designer",
          email: "floyd.miles@example.com",
          role: "Member",
        },
        {
          id: 6,
          name: "Floyd Miles",
          title: "Principal Designer",
          email: "floyd.miles@example.com",
          role: "Member",
        },
        {
          id: 6,
          name: "Floyd Miles",
          title: "Principal Designer",
          email: "floyd.miles@example.com",
          role: "Member",
        },
      ];

    const  getRandomName= async()=> {
        const firstNames = [
          "Lindsay",
          "Courtney",
          "Tom",
          "Whitney",
          "Leonard",
          "Floyd",
        ]
        const lastNames = [
          "Walton",
          "Henry",
          "Cook",
          "Francis",
          "Krasner",
          "Miles",
        ]

        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
    };
    const getRandomTitle= async() =>{
        const titles = [
          "Front-end Developer",
          "Designer",
          "Director of Product",
          "Copywriter",
          "Senior Designer",
          "Principal Designer",
        ]

        return titles[Math.floor(Math.random() * titles.length)]
    };
    const getRandomEmail=async() =>{
        return `${getRandomName().toLowerCase().replace(" ", ".")}@example.com`
    };
   const animateTableRows=async() =>{
      const timeout = 3000;
      setInterval(() => {
        // Create a new row
        const newRow = {
          id: people.length + 1,
          name: getRandomName(),
          title: getRandomTitle(),
          email: getRandomEmail(),
          role: "Member",
        };

        // Add the new row to the top and remove the last one
        people.unshift(newRow);
        people.pop();
      }, timeout);
    }      
    animateTableRows();


function useSupabaseClient() {
  throw new Error('Function not implemented.');
}
</script>

<style scoped>
/* Optional: Add some basic styling for your table */
</style>
