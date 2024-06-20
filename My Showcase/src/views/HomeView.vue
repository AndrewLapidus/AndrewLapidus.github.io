<template>
  <main id="homeViewMain">
    <h1 class='header'>
      Welcome to my page. And excuse the dust while things get setup here!
      Currently switching over to vue. NOTE: All projects are currently disabled and cannot be accesed during this transition.
    </h1>
    <project-widg/>
    <div>
      
      <!-- <p>Here are a few projects I've done.</p>
      
      <ul>
        <li>Vending machine Placeholder</li>
        <li>Tenmo Placeholder</li>

        <li>Property Managment application</li>

        <li>Games in progress</li>
      </ul> -->
    </div>
  </main>
</template>

<script>
  import projectwidg from "../components/ProjectsWidget.vue"
  export default{
    components: {
      'projectWidg': projectwidg
    }
  }
</script>


<style scoped>
.header {
  
  top: 0;
  left: 0;
}

</style>