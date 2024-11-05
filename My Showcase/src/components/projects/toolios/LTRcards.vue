<template>
  <div>
    <button @click="printReport">Print Report</button>
    <div class="LTR_container" >
      <div class="ltr_grid" v-for="i in 6" :key="i">
        <p id="note">
          We hope you are happy with our service today. Please take the survey at the bottom of your recipt and give us a 10!
        </p>
        <p id="name">
          Mention my name [insert name here]
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {

  methods:{
    printReport() {
            window.print();
        },
  }
}
</script>

<style>
.LTR_container{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 10px;
}
.ltr_grid{
  width: 600px;
  border: 2px solid;
}

@media print{
   #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
  .LTR_container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 0;
    width: 100%;
  }
  .ltr_grid {
    border: 1px solid #000;
    padding: 5px; 
  }

  @page {
    size: auto; 
    margin: 0; 
  }
}
</style>