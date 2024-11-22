<template>
    <!-- I'm hating all of this so shut up -->
    <div class="idleContainer">
        V 0.0.1
        <div class="topInfo">
            <div class="stats">
                Money: {{ money.toFixed(2) }} <span class="moneyRate">+{{ moneyRate.toFixed(2) }}/sec</span><br>
                Lines of Code: {{ linesOcode.toFixed(2) }} <span class="linesRate">+{{ linesRate.toFixed(2)
                    }}/sec</span><br>
                Clicks: {{ clickCount }}
            </div>

            <div class="menuBar">
                <button @click="openMenu('isUpViss')">Upgrades</button>
                <button @click="openMenu('isAchViss')">Achievements</button>
                <button @click="openMenu('isPristViss')">Presitge</button>
                <button @click="openMenu('isSettViss')">Settings</button>

            </div>


        </div>

        <div class="menuTab" v-show="isMenuOpen">
            <button class="close-btn" @click="closeAllMenus">X</button>
            <div class="upgrades" v-for="up in upgrades" :key="up.id" v-show="isUpViss" @click.stop>
                <h3>{{ up.name }}</h3>
                <p>{{ up.cost }}</p>
                <button class="buyUpBTN" >Buy</button>
            </div>

            <div class="achievements" v-show="isAchViss" @click.stop>
                <h3>This is Achiev tab</h3>
            </div>

            <div class="prestige" v-show="isPristViss" @click.stop>
                <h3>This is the prestige tab</h3>
            </div>

            <div class="settings" v-show="isSettViss" @click.stop>
                <h3>This is the setting tab</h3>
                <!-- add patchnotes -->
            </div>

        </div>



        <div class="whale">
            <button @click="WhaleClick"><img src="/tempWhale.png" /></button>
        </div>
        <div class="unitBar">
            <div class="unit" v-for="unit in unitsAvail" :key="unit.id">
                <h3>{{ unit.name }}</h3>
                <p>QTY: {{ unit.owned }}</p>
                <p>Cost: {{ calcUnitCost(unit.id) }}</p>
                <button @click="buyUnit(unit.id)">{{ buyUnitText(unit.id) }}</button>


            </div>
        </div>
        <div class="productBar">
            <div class="product" v-for="prod in products" :key="prod.id">
                <h3>{{ prod.name }}</h3>
                <!-- Change to func to calc mod -->
                <p>Lines Required {{ prod.cost }}</p> 

                <button @click="sellProd(prod.id)">Sell for ${{ prod.baseValue }}</button>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            isMenuOpen: false,
            isUpViss: false,
            isAchViss: false,
            isPristViss: false,
            isSettViss: false,
        }
    },

    computed: {
        ...mapState('clickerGame', ['money', 'clickCount', 'linesOcode', 'units', 'moneyRate', 'products', 'upgrades', 'achievements', 'prestige', 'settings']),
        ...mapGetters('clickerGame', ['calcUnitCost', 'linesRate', 'buyUnitText', 'calcModUpgrade',]),
        unitsAvail() {
            return this.units.filter((unit) => unit.available)
        }
    },
    methods: {
        ...mapMutations('clickerGame', ['WhaleClick', 'buyUnit', 'sellProd',]),

        // getNextCost(unitId) {
        //     return this.calcUnitCost(unitId);
        // },
        updateGame() {
            this.$store.commit('clickerGame/produceResources');
        },
        // Don't be judging I'm having a hard time with these stupid windows
        // Open a specific menu
        openMenu(menu) {
            this.closeAllMenus()
            this.isMenuOpen = true;
            this[menu] = true;
        },

        // Close all menus
        closeAllMenus() {
            this.isMenuOpen = false;
            this.isUpViss = false;
            this.isAchViss = false;
            this.isPristViss = false;
            this.isSettViss = false;
        },

        // Close specific menus
        closeUpgradeMenu() {
            this.isUpViss = false;
            this.isMenuOpen = false;
        },
        closeAchievementsMenu() {
            this.isAchViss = false;
            this.isMenuOpen = false;
        },
        closePrestigeMenu() {
            this.isPristViss = false;
            this.isMenuOpen = false;
        },
        closeSettingsMenu() {
            this.isSettViss = false;
            this.isMenuOpen = false;
        },

        // Close the open menu when clicking outside
        handleClickOutside(event) {
            const menu = this.$el;
            if (!menu.contains(event.target)) {
                this.closeAllMenus();
            }
        }

    },
    created() {
        this.gameInterval = setInterval(this.updateGame, 1000);
    },
    destroyed() {
        clearInterval(this.gameInterval)
    },
    mounted() {
        // Attach a global click listener to close menu when clicking outside
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        // Clean up the event listener when the component is destroyed
        document.removeEventListener('click', this.handleClickOutside);
    }

}
</script>

<style>
.topInfo {
    display: flex;
}


.stats {
    background-color: red;
    width: 250px;
    height: 100px;
}

.menuTab {
    display: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 500px;
    height: 500px;
    background-color: #ccc;
    z-index: 10;
    /* Set a higher z-index if shit being weird. Also hate all of this */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    text-align: center;
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}



.moneyRate {
    display: none;
}

.whale {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.whale img {
    width: 200px;
    height: auto;
}

.productBar {
    width: 170px;
}

.product {
    background-color: #9c9a9a;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.unitBar {
    position: absolute;
    right: 0;
    width: 150px;
    background-color: #f4f4f4;
    border-left: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.unit {
    background-color: #9c9a9a;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>