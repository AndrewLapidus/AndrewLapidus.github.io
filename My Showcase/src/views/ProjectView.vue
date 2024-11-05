<template>
    <div>
        <router-link v-bind:to="{ name: 'home' }" class="backhome">Back Home</router-link>
        <!-- <router-link v-bind:to="{ name: 'about' }" class="backhome">About</router-link> -->


        <component :is="projectComponent"></component>
    </div>
</template>

<script>
export default {
    props: ['projectN'],
    data() {
        return {
            projectComponent: null
        };
    },
    watch:{
        projectN: 'loadComponent'
    },
    methods:{
    async loadComponent() {
        try {
            // dynamic import to load the component
            const component = await import(`../components/projects/${this.projectN}.vue`);
            // Ensure that the component is assigned properly ... becaause somehow shit got messed up
            this.projectComponent = component.default || component;
        } catch (error) {
            console.error(`Failed to load component for project: ${this.projectN}`, error);
            // Load error comp when its angy :(
            const errorComponent = await import('../components/ProjectNotFound.vue');
            this.projectComponent = errorComponent.default || errorComponent;
        }
    }},
    created(){
        this.loadComponent()
    }
};
</script>

<style scoped>


</style>