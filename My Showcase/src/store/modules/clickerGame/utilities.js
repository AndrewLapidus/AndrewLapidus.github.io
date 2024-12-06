import { settings } from "./settings";
import { upgrades } from "./upgrades";

export const utilities = {
    mutations: {
        //version support

        //V0.0.4 t0 current
        V004(Cstate, Ostate) {
            // Take all current keys and match up with your version
            Object.keys(Cstate).forEach((key) => {
                if (key==='version'){
                    Cstate[key] = Cstate[key]
                }
                else if (key === 'units') {
                    const arrState = Cstate[key]
                    const arrOld = Ostate[key]

                    const oldMap = new Map(arrOld.map(unit => [unit.name, unit]));
                    const updatedUnits = arrState.map(currentUnit => {

                        if (oldMap.has(currentUnit.name)) {
                            return {
                                ...currentUnit,
                                owned: oldMap.get(currentUnit.name)['owned']
                            }
                        }
                        else {
                            return {
                                ...currentUnit,
                                owned: currentUnit.owned || 0
                            }
                        }
                    })
                    Cstate[key] = updatedUnits

                }
                else if (key === 'products') {
                    //edit later when product changes are made

                    // const arrState = Cstate[key]
                    // const arrOld = Ostate[key]

                    // const oldMap = new Map(arrOld.map(product => [product.name, product]));
                    // const updatedProduct = arrState.map(currentProduct => {

                    //     if (oldMap.has(currentProduct.name)){
                    //         return{
                    //             ...currentProduct,
                    //             owned: oldMap.get(currentProduct.name)
                    //         }
                    //     }
                    //     else{
                    //         return {
                    //             ...currentProduct,
                    //             owned: 0
                    //         }
                    //     }
                    // })
                    // Cstate[key] = updatedProduct

                }
                else if (key === 'upgrades') {
                    const arrState = Cstate[key]
                    const arrOld = Ostate[key]

                    const oldMap = new Map(arrOld.map(up => [up.name, up]));
                    const updatedUpgrade = arrState.map(currentUpgrade => {

                        if (oldMap.has(currentUpgrade.name)) {
                            return {
                                ...currentUpgrade,
                                own: oldMap.get(currentUpgrade.name)['own']
                            }
                        }
                        else {
                            return {
                                ...currentUpgrade,
                                own: 0
                            }
                        }
                    })
                    Cstate[key] = updatedUpgrade

                }
                // settings not yet implemented
                else if (key === 'settings') {
                    Cstate[key] = Cstate[key]
                }
                else{
                    Cstate[key] = Ostate[key]
                }
            })
            return Cstate

        }


        // {
        //     "version": "V 0.0.5",
        //     "clickCount": 21,
        //     "money": 15.100000000000001,
        //     "moneyRate": 0,
        //     "linesOcode": 53.20000000000045,
        //     "linesRate": 0,
        //     "units": [
        //         {
        //             "id": 1,
        //             "name": "Student",
        //             "baseCost": 10,
        //             "productionRate": 0.1,
        //             "prodMod": 0.3,
        //             "owned": 1,
        //             "cap": 2,
        //             "available": true
        //         },
        //         {
        //             "id": 2,
        //             "name": "Junior Dev",
        //             "baseCost": 453,
        //             "productionRate": 1,
        //             "prodMod": 0.5,
        //             "owned": 0,
        //             "cap": 10,
        //             "available": false
        //         },
        //         {
        //             "id": 3,
        //             "name": "Senior Dev",
        //             "baseCost": 1008,
        //             "productionRate": 10,
        //             "prodMod": 0.5,
        //             "owned": 0,
        //             "cap": 10,
        //             "available": false
        //         },
        //         {
        //             "id": 4,
        //             "name": "Manager",
        //             "baseCost": 1008,
        //             "productionRate": 50,
        //             "prodMod": 0.5,
        //             "owned": 0,
        //             "cap": 10,
        //             "available": false
        //         }
        //     ],
        //     "products": [
        //         {
        //             "id": 1,
        //             "name": "Hello World!",
        //             "cost": 3,
        //             "baseValue": 5,
        //             "mod": 1,
        //             "available": true
        //         }
        //     ],
        //     "upgrades": [
        //         {
        //             "id": "0",
        //             "name": "Student Cap",
        //             "description": "Does what you think it does",
        //             "baseCost": 10,
        //             "own": 0,
        //             "cap": 10,
        //             "object": "units",
        //             "target": "cap"
        //         }
        //     ],
        //     "settings": {
        //         "saveInterval": 60000
        //     },
        //     "whaleAmnt": 0.1,
        //     "achievements": []
        // }
    }
}