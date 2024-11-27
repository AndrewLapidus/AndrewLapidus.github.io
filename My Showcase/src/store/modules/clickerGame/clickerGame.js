import { units } from "./units";
import { products } from "./products";
import { upgrades } from "./upgrades"

export const clickerGame = {
    namespaced: true,
    state: {
        version: 'V 0.0.4',
        clickCount: 0,
        money: 0,
        moneyRate: 0,
        linesOcode: 0,
        linesRate: 0,
        units: units,
        products: products,
        upgrades: upgrades,
        whaleAmnt: 0.1,
        //reqLinesAdjust
        //products sold
        achievements: [],
    },
    mutations: {
        WhaleClick(state) {
            state.money += state.whaleAmnt;
            state.clickCount += 1;
        },
        // Buy section
        buyUnit(state, unitId) {
            const unit = state.units.find((u) => u.id === unitId);
            const cost = unit.costEquation(unit.owned, unit.baseCost);
            if (unit.owned >= unit.cap) {
                return
            }
            if (state.money >= cost) {
                state.money -= cost;
                unit.owned++;
            }
        },
        buyUp(state,{ up, req, targetMod}) {
            let id = up.id
        
            if (up.own >= up.cap){
                return
            }
            if (state.money >= req){
                state.money -= req
                state[up.object][up.id][up.target] = targetMod
                state.upgrades[id].own += 1;
                
                
            }
        },
        // Sell section
        sellProd(state, {prodId, req}) {
            const prod = state.products.find((p) => p.id === prodId)

            state.money += prod.baseValue;
            state.linesOcode -= req

        },
        produceResources(state) {
            // Calculate linesRate directly
            const linesRate = state.units.reduce(
                (total, unit) => total + unit.productionRate * unit.owned,
                0
            );
            state.linesOcode += linesRate;
        },


        // loading section
        // Do not under any circumstance ask me how this works. 
        // I removed a state[key]= from second Object.keys because I was frusterated and somehow everything loaded just fine.
        // I'm currently ripping out my hair over what bs i just witnessed
        loadState(state, newState) {
            Object.keys(state).forEach((key) => {
                let arrState = []
                let arrNew = []
                if (Array.isArray(newState[key])){
                    arrState = state[key]
                    arrNew = newState[key]
                    // itter through array object
                    arrState.map((item, index) =>{
                        //item object
                        Object.keys(item).forEach((key) => {
                            if(arrNew[index][key] !== undefined){
                                if (key !== "description"){
                                item[key] = arrNew[index][key]
                                }
                                
                            }
                            else{
                                item[key]=item[key]
                            }
                        })
                    })

                                    

                }
                else{
                    if (newState[key] !== undefined) {
                        state[key] = newState[key];
                    }}
                
               
            });
        },
        resetState(state) {
            Object.keys(defaultState).forEach((key) => {
                state[key] = JSON.parse(JSON.stringify(defaultState[key])); // Deep copy to avoid mutation issues
            });
            // console.log(state)
        },



        

    },
    getters: {
        // calcs iguess
        calcUnitCost: (state) => (unitId) => {
            const unit = state.units.find(u => u.id === unitId);
            if (unit) {
                return unit.costEquation(unit.owned, unit.baseCost);
            }
            return 0
        },
        calcProdCost: (state) => (prodId) => {
            const prod = state.products.find(p => p.id === prodId);
            let rateIncr = state.units.reduce(
                (total, unit) => total + unit.prodMod * unit.owned, 0
            );
            //add 1?
            rateIncr += 1
            return prod.cost * rateIncr

        },
        calcUpCost: (state) => (upId) =>{
            const upg = state.upgrades.find(u => u.id === upId);
            if (upg){
                return upg.costEquation(upg.own, upg.baseCost, upg.cap)
            }
        },
        linesRate(state) {
            return state.units.reduce(
                (total, unit) => total + unit.productionRate * unit.owned,
                0
            );
        },
        // rework to plain max and add target/focus so it can be reused
        buyUnitText: (state) => (unitId) => {
            const unit = state.units.find(u => u.id === unitId);
            if (unit.owned >= unit.cap) {
                return unit.name + ' is capped'
            }
            return 'Buy More'
        },
        // needs fixin
        calcModUpgrade: (state) =>(upId) => {
            const up = state.upgrades.find(u => u.id === upId);
            if (up) {
                return up.targetModEquation(up.own)
            }
        }
    },
    actions: {
        sellProdAct({ getters, commit, state }, prodId) {
            const require = getters.calcProdCost(prodId);
            if (state.linesOcode >= require) {
                commit('sellProd', { prodId, req: require })
            }
        },
        buyUpgradeAct({getters, commit, state}, up) {
            const require = getters.calcUpCost(up.id)
            const targMod = getters.calcModUpgrade(up.id)
            if (state.money >= require){
                commit('buyUp',{up, req: require, targetMod: targMod} )
            }
        },


        // saving and loading section
        saveGame({ state }) {
            const gameState = JSON.stringify(state);
            localStorage.setItem('clickerGameState', gameState);
            console.log('Game saved');
            // console.log(state)
        },


        loadGame({ commit }) {
            const savedState = localStorage.getItem('clickerGameState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                commit('loadState', parsedState);
                console.log('Game loaded');
            } else {
                console.log('No saved game found');
            }
        },

        resetGame({ commit }) {
            commit('resetState');
            localStorage.removeItem('clickerGameState'); // Clear saved game
            console.log('Game reset');
        },





       
    }

};


const defaultState = () =>({
    version: 'V 0.0.4',
        clickCount: 0,
        money: 0,
        moneyRate: 0,
        linesOcode: 0,
        linesRate: 0,
        units: [...units],
        products: [...products],
        upgrades: [...upgrades],
        whaleAmnt: 0.1,
        achievements: [],
})