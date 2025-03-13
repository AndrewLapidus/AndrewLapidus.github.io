<template>
  <main id="homeViewMain">
    <h1 class='header'>
      Welcome to my page. And excuse the dust while things get setup here!
      Currently switching over to vue. NOTE: Not all projects are currently avalible and cannot be accesed during this transition. V 0.1.14
    </h1>



    <h2>These links are active</h2>
    <project-widg :projects="completeProg"/>
    <h2>These links are still locked</h2>
    <project-widg :projects="project1"/>
    <div>
      
      <p>Note to everyone here. there is no reason apple os should make black text grey and mostly invisable </p>
      
      <ul>



      </ul>
    </div>
  </main>
</template>

<script>
  import projectwidg from "../components/ProjectsWidget.vue"
  import temp from "../components/TempQR.vue"
  export default{
    components: {
      'projectWidg': projectwidg,
      'temp': temp
    },
    data() {
    return {
      showSecret: false,
      completeProg:[
      {
                    id: 1,
                    tagline: 'Random Generator',
                    name: 'Spin Master: The Ultimate Random Generator',
                    description: 'Spin Master is your go-to tool for effortlessly generating random selections from a customizable list. Whether you’re making a decision, organizing a game, or just having fun, Spin Master makes the process exciting and engaging.',
                    link: 'WheelSpinner',
                    img: 'Spinner.png'
                },
                {
                    id: 2,
                    tagline: 'VR Mods',
                    name: 'Pavlov VR',
                    description: 'Dive into the immersive world of Pavlov VR, where creativity knows no bounds. As a dedicated creator for Meta Quest, I specialize in crafting custom maps, game modes, and assets using the powerful tools of Unreal Engine 5 and Blender. With a passion for innovation and game design, my creations have garnered over 2000 unique downloads, captivating players with unique experiences.',
                    link: 'Pavlov',
                    img: 'Pavlov.png'
                },
                {
                    id: 3,
                    tagline: 'Game Development',
                    name: 'Unreal Engine Mobile Game Development',
                    description: 'Description soon to come. Using C++ and Unreal Engine 5 blueprints to develop games.',
                    link: 'UEDev',
                    img: 'UELogo.png'
                },
                {
                    id: 4,
                    tagline: "Lowe's Safety Tool",
                    name: 'Safety and AP Reporting Tool',
                    description: "Lowe's Safety and AP Reporting Tool revolutionizes safety management by providing detailed insights into store safety through comprehensive data analysis. Designed to integrate seamlessly with DoneSafe's CSV files, this tool offers a robust platform for evaluating safety performance across departments and among associates.",
                    link: 'LTool',
                    img: 'lowesLogo.png'
                },
                {
                  id: 5,
                  tagline:'Plant watering tool',
                  name: 'Plant watering',
                  description: 'Still being written and being tested',
                  link: 'PlantTool',
                  img: 'favicon.ico'
                },
                {
                    id: 6,
                    tagline: 'Idle Clicker Game',
                    name: 'TE Programing School of JB(WIP)',
                    description: 'Currently moving from Java to here!!!  Welcome to Code School Tycoon, an idle clicker game, where you embark on a journey to build and manage a thriving programming school that doubles as a product development company. Begin by training aspiring programmers and harness their coding output to create and sell innovative products to consumers worldwide.',
                    link: 'IdleClicker',
                    img: 'IdleClicker.png'
                },
                {
                  id:7,
                  tagline:'Chagrin Valley Roller Rink',
                  name: 'Website I manage',
                  description: 'Designed this site using Wordpress, making constant updates according to the needs of the roller rink. Updating calender info, managing Google analytics, and making post for the rink ',
                  link: 'CVRR',
                  img: 'cvrr.png'
                }

                
      ],
      project1: [
            
                
                
                
                {
                    id: 5,
                    tagline: 'Virtual Vending Machine',
                    name: 'Virtual Vending Machine Capstone #1',
                    description: 'Introducing Vendo-Matic 3000, the cutting-edge virtual vending machine CLI application developed for Umbrella Corp. This innovative software allows customers to seamlessly purchase products using their bank accounts directly from their computers, revolutionizing convenience and accessibility.',
                    link: 'tempp',
                    img: 'Vending.png'
                },
                {
                    id: 6,
                    tagline: 'Shane is sane',
                    name: 'Christan cartoon',
                    description: 'Introducing Vendo-Matic 3000, the cutting-edge virtual vending machine CLI application developed for Umbrella Corp. This innovative software allows customers to seamlessly purchase products using their bank accounts directly from their computers, revolutionizing convenience and accessibility.',
                    link: 'tempp',
                    img: 'Vending.png'
                },
              
                
                // {
                //     id: 6,
                //     tagline: 'Venmo Clone',
                //     name: 'Tenmo Money Transfer Service',
                //     description: 'temper',
                //     link: 'tempp',
                //     img: null
                // },
                // {
                //     id: 7,
                //     tagline: 'Property Managment',
                //     name: 'Property Managment Application',
                //     description: 'temper',
                //     link: 'tempp',
                //     img: null
                // },
                // {
                //     id: 8,
                //     tagline: "Lowe's Installed Sales Tools",
                //     name: 'temp',
                //     description: 'temper',
                //     link: 'tempp',
                //     img: null
                // },
                // {
                //     id: 9,
                //     tagline: '',
                //     name: 'temp',
                //     description: 'temper',
                //     link: 'tempp',
                //     img: null
                // },
                // {
                //     id: 10,
                //     tagline: 'tag10',
                //     name: 'temp',
                //     description: 'temper',
                //     link: 'tempp',
                //     img: null
                // },
                
            ]
    };
  },
  mounted() {
    // Expose the Mark Function???
    window.mark = this.mark;
  },
  methods: {
    mark() {
      this.showSecret = !this.showSecret;
      console.log(
        `QR component is now ${this.showSecret ? 'visible' : 'hidden'} Now Get Those Leads!!!.`
      );
    }
  }
  }
</script>


<style scoped>
.header {
  top: 0;
  left: 0;
}

</style>