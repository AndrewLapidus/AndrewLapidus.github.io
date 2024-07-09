<template>
    <div id="projectsWidgetMain">
        <div class="record_wrap">


            <section class="record" v-for="item in projects" :key="item.id">
                <router-link id="routerHere" v-bind:to="{name: 'projectView', params: {projectN: item.link}}">
                    <div id="record" class="record-display" :style="{ backgroundImage: setBackgroundImg(item) }">
                        <div id="tagline">{{ item.tagline }}</div>
                    </div>
                    <div class="record-desc">
                        <h1>{{ item.name }}</h1>
                        <p>
                            {{ item.description }}
                        </p>
                    </div>
                </router-link>
            </section>




        </div>

    </div>
</template>

<script>
import defaultImg from '../assets/defaultShowcase.webp'
// import defaultImg from '../assets/download.png'
export default {
    props: {
        projects: {
            type: Array,
            required: true
        }
    },
    components: {
        'defaultImg': defaultImg
    },

    methods: {
        setBackgroundImg(item) {
            return item.img ? `url(${item.img})` : `url(${defaultImg})`;


        }
    },
    mounted() {
        window.vm = this;
        window.projects = this.projects;
    }
}
</script>

<style>
/* remove later or change i dunno */
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
    font-family: "Roboto", sans-serif;
}

a {
    cursor: pointer;
}

.card {
    display: block;
    width: 95px;
    min-height: 95px;
    background: #f4f4f4;
    padding: 1rem;
    transition: all 250ms;
    margin: 50px;
}

.card:hover,
.card:focus {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    transform: translateY(-5px);
}

.card:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transform: translateY(-2px);
}

.card-bel {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
}

.card-ab {
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.12), 0 -1px 2px rgba(0, 0, 0, 0.24);
}

body {
    background-color: #f2f2f2;
}

.record_wrap {
    width: 90%;
    margin: 100px auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    width: 90%;
    margin: 100px auto;
    /* justify-content: space-between; */
}

.record {
    position: relative;
    /* width: 30%;
    height: 20vw; */
    overflow: hidden;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow 300ms;
    height: 300px;
}

.record:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}


.record-display {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
}

.record:hover .record-display {
    height: 20%;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
}

.record-desc {
    margin: 20px 0 0 10px;
    opacity: 0;
    transition: opacity 400ms ease-in-out 190ms;
}

.record-desc h1 {
    color: black;
    margin: 5px 0;
    font-size: 1.3em;
    font-weight: 700;
}

.record-desc p {
    font-size: 0.75em;
    line-height: 1.4em;
    color: #666;
}

/* reminder that this is for transition speed and location of adjusting stufff ff */
#record {
    transition: height 700ms cubic-bezier(0.54, 0.21, 0.18, 1.35);
}

.record:hover .record-desc {
    opacity: 1;
}

#tagline {
    margin-bottom: 10px;
    padding: 5px 10px;
    color: #fff;
    background-color: rgba(128, 128, 128, 0.8);
    border-radius: 5px;
    font-size: 1em;
    text-align: center;
    position: relative;
    z-index: 1;
}
</style>