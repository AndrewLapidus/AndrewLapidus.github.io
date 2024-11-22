import { units } from "./units";
import { products } from "./products";
import { upgrades } from "./upgrades"
export const clickerGame = {
    namespaced: true,
    state: {
        clickCount: 0,
        money: 0,
        moneyRate:0,
        linesOcode: 0,
        linesRate:0,
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

        buyUnit(state, unitId) {
            const unit = state.units.find((u) => u.id === unitId);
            const cost = unit.costEquation(unit.owned, unit.baseCost);
            if (unit.owned >= unit.cap){
                return
            }
            if (state.money >= cost) {
                state.money -= cost;
                unit.owned++;
            }
        },
        sellProd(state, prodId){
            const prod = state.products.find((p) => p.id = prodId)
            const cost = prod.cost
            if (state.linesOcode >= cost){
                state.money += prod.baseValue;
                state.linesOcode -= prod.cost
            }
        },
        produceResources(state) {
            // Calculate linesRate directly
            const linesRate = state.units.reduce(
              (total, unit) => total + unit.productionRate * unit.owned,
              0
            );
            state.linesOcode += linesRate;
          },
    },
    getters: {
         
        calcUnitCost: (state) => (unitId) => {
            const unit = state.units.find(u => u.id === unitId);
            if (unit){
                return unit.costEquation(unit.owned, unit.baseCost);
            }
          return 0
        },
        linesRate(state) {
            return state.units.reduce(
                (total, unit) => total + unit.productionRate * unit.owned,
                0
            );
        },
        
        buyUnitText: (state) => (unitId) =>{
            const unit = state.units.find(u => u.id === unitId);
            if (unit.owned >= unit.cap){
                return unit.name + ' is capped'
            }
            return 'Buy More'
        },
        calcModUpgrade: (state) => (upId) =>{
            const up = state.upgrades.find(u => u.id === upId)
            if (up){
                return up.modEquation(up.own)
            }
        }
      },
    };