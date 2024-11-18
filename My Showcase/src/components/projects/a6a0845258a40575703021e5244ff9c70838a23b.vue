<template>
  <div>
    <!-- Buttons for your enjoyment -->
    <button @click="selectProject('LTR')">LTR</button>
    <button @click="selectProject('Qr')">QR</button>
    <button @click="selectProject('Snappy')">Snappy</button>

    <!-- Conditional display of affection twords my projects -->
    <div v-show="selectedProject === 'LTR'">
      
      <LTR></LTR>
    </div>
    <div v-show="selectedProject === 'Qr'">
      
      <p>Showing content for QR project.</p>
      <Qr></Qr>
    </div>
    <div v-show="selectedProject === 'Snappy'">
      
     
      <Snappy></Snappy>
    </div>
  </div>
</template>

<script>
import LTRcards from './toolios/LTRcards.vue';
import SnapReport from './toolios/SnapReport.vue';
import QrCard from './toolios/QrCard.vue';
export default {
  components:{
    'LTR': LTRcards,
    'Qr': QrCard,
    'Snappy': SnapReport
  },
  data(){
    return{
      selectedProject:null
    };
  },
  methods: {
    selectProject(project) {
      this.selectedProject = project; 
    }
  }
}
</script>

<style>

</style>