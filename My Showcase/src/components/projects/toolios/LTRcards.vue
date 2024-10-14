<template>
  <!-- the worst yet -->
    <div class="grid-container">
      <div v-for="(item, index) in gridItems" :key="index" class="grid-item">
        <p class="note">
          We hope you are happy with our service today, please take the survey at the bottom of your receipt and give us a 10!
          <br>
          Mention my name <span class="name">{{ item.name }}</span>
        </p>
        <img  alt="QR Code" class="qr-code">
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        names: [], // Array of names
        qrData: 'https://survey.medallia.com/?lowes-pos' //for notes later
      };
    },
    computed: {
      gridItems() {
        const totalCells = 6; // 2x3 grid
        const names = this.names.length ? this.names : ['']; // Default to one empty string if no names but not yet working
        const items = Array(totalCells).fill().map((_, index) => {
          const nameIndex = Math.floor(index * names.length / totalCells);
          return {
            name: names[nameIndex] || '',
          };
        });
        return items;
      }
    },
    methods: {
      
    },
    mounted() {
      // Example of names
      this.names = ['Alice', 'Bob', 'Charlie']; // Replace with actual names from textbox
    }
  };
  </script>
  
  <style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
    height: 100%;
  }
  
  .grid-item {
    border: 1px solid #ddd;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .note {
    font-size: 12px;
  }
  
  .name {
    text-decoration: underline;
  }
  
  .qr-code {
    display: block;
    margin: 0 auto;
    max-width: 100px;
  }
  </style>