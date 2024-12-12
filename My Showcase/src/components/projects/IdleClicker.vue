<template>
    <!-- I'm hating all of this so shut up -->
    <div class="idleContainer">
        <div class="version">{{ version }}</div>
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
            <div class="upgradeTab" v-for="up in upgrades" :key="up.id" v-show="isUpViss" @click.stop>
                
                <div class="upgrades" >
                    <h3>{{ up.name }}</h3>
                    <p>{{ calcUpCost(up.id) }}</p>
                    <button class="buyUpBTN" @click="buyUpgradeAct(up)">Buy</button>
                    <!-- <p class="toolTip">{{ up.description }}</p> -->
                </div>
            </div>

            <div class="achievements" v-show="isAchViss" @click.stop>
                <h3>This is Achiev tab</h3>
                Under construction!!!
            </div>

            <div class="prestige" v-show="isPristViss" @click.stop>
                <h3>This is the prestige tab</h3>
                Under construction!!!
            </div>

            <div class="settingsTab" v-show="isSettViss" @click.stop>
                Under construction!!!
                <div class="options">
                    <div class="saveInterval">
                        Save Interval<br>
                        <input type="number" :value="settings.saveInterval / 1000" :min="10" :max="120" :step="1"
                            @input="saveIntervalUpdate($event.target.value)" @keydown.prevent />
                    </div>
                    reset will reload the page
                    <button @click="resetGame">Reset Game</button>
                    <!-- add patchnotes -->
                </div>
            </div>

        </div>



        <div class="whale">
            <button @click="whaleClickAct"><img src="/tempWhale.png" /></button>
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
                <p>Lines Required {{ calcProdCost(prod.id).toFixed(2) }}</p>

                <button @click="sellProdAct(prod.id)">Sell for ${{ prod.baseValue }}</button>
            </div>
        </div>
        <!-- {{ $store.state }} -->
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
        ...mapState('clickerGame', ['money', 'clickCount', 'linesOcode', 'units', 'moneyRate', 'products', 'upgrades', 'achievements', 'prestige', 'settings', 'version']),
        ...mapGetters('clickerGame', ['calcUnitCost', 'linesRate', 'buyUnitText', 'calcModUpgrade', 'calcProdCost', 'calcUpCost',]),
        unitsAvail() {
            return this.units.filter((unit) => unit.available)
        }
    },
    methods: {
        ...mapMutations('clickerGame', ['buyUnit', 'saveIntervalUpdate']),
        ...mapActions('clickerGame', ['sellProdAct', 'buyUpgradeAct', 'loadGame', 'saveGame', 'resetGame', 'whaleClickAct','tick',]),
        // getNextCost(unitId) {
        //     return this.calcUnitCost(unitId);
        // },
        updateGame() {
            this.$store.dispatch('clickerGame/tick');
        },
        // Don't be judging I'm having a hard time with these stupid windows
        // Open a specific menu
        openMenu(menu) {
            this.closeAllMenus()
            this.isMenuOpen = true;
            this[menu] = true;
            // console.log('Menu Opened:', menu, this[menu]); //debuggin shit
        },

        // Close all menus
        closeAllMenus() {
            this.isMenuOpen = false;
            this.isUpViss = false;
            this.isAchViss = false;
            this.isPristViss = false;
            this.isSettViss = false;
            // console.log('All menus closed'); // check in out the view
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


        setSaveInterval(){
            clearInterval(this.saveInterval)
            this.saveInterval = setInterval(() => {
            this.$store.dispatch('clickerGame/saveGame');
        }, this.settings.saveInterval)
        }



    },
    watch: {
        "settings.saveInterval": "setSaveInterval"
    },
    mounted() {
        this.gameInterval = setInterval(this.updateGame, 1000);
        this.setSaveInterval();
    },
    beforeDestroy() {
        clearInterval(this.gameInterval);
        clearInterval(this.saveInterval);
    },
    created() {
        this.$store.dispatch('clickerGame/loadGame');
    }

}
</script>

<style>
.idleContainer {
    user-select: none;
}

.topInfo {
    display: flex;
}


.stats {
    background-color: red;
    width: 250px;
    height: 100px;
}


.menuTab {

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
    overflow: visible;

}

/* this is STUPID */
.upgradeTab {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 40px;
    overflow: auto;
}

.upgrades {
    position: relative;
    background-color: #9c9a9a;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 150px;
    /* cursor: pointer; */
}

/* .upgrades .toolTip {
    visibility: hidden; 
    width: 200px; 
    background-color: rgba(0, 0, 0, 0.8); 
    color: #fff; 
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: fixed;
    z-index: 11;
    bottom: 100%;
    left: 50%;
    transform: translateX(-100%);
    opacity: 0; 
    transition: opacity 0.3s; 
    
}

.upgrades:hover .toolTip {
    visibility: visible; 
    opacity: 1; 
} */

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

.settingsTab {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 40px;
    overflow: auto;
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

@media (max-width: 500px) {
    .backhome {
        position: fixed;
        top: 5px;
        left: 5px;
    }

    .version {
        position: fixed;
        top: 5px;
        left: 100px;
    }

    .stats {
        position: fixed;
        top: 30px;
        left: 5px;
        padding: 8px;
        font-size: 12px;
        width: 200px;
    }

    .menuBar {
        position: fixed;
        top: 30px;
        left: 207px;

        width: auto;
    }

    .whale {
        position: fixed;
        top: 250px;
    }

    .productBar {
        position: fixed;
        top: 370px;
        left: 10px;
    }

    .menuTab {
        width: 75%;
        height: 50%;

    }

    .unitBar {
        position: fixed;
        top: 370px;
        left: 230px;
    }


}
</style>