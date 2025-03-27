<template>
  <div>
    <h2>Until I change the CORS on the main site please <button @click="openCVRR">Click Me!</button> to open a new tab with the website. </h2>
    <p> Additionally there will be different deployment methods for this</p>
    <img src="/cvrr.png" />
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    methods:{
        openCVRR() {
            window.open('https://skate.cvrr.com/', '_blank');
        }
    }
}
</script>

<style>

</style>