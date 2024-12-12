export const units = [
    {
        id: 1,
        name: 'Student',
        baseCost: 10,
        costEquation: (owned, baseCost) => {
            

            return Math.floor((1 / 126) * Math.pow(owned - 10, 3) + baseCost)
        },
        productionRate: 0.1,
        prodMod:0.05,
        owned: 0,
        cap: 2,
        
    },
    {
        id: 2,
        name: 'Junior Dev',
        baseCost: 453,
        costEquation: (owned, baseCost) => {
            

            return Math.floor((1 / 126) * Math.pow(owned - 37, 3) + baseCost)
        },
        productionRate: 1.0,
        prodMod:0.04,
        owned: 0,
        cap: 10,
        unlock: {money: 50},
    },
    {
        id: 3,
        name: 'Senior Dev',
        baseCost: 1008,
        costEquation: (owned, baseCost) => {
            

            return Math.floor((1 / 126) * Math.pow(owned - 40, 3) + baseCost)
        },
        productionRate: 10.0,
        prodMod:0.03,
        owned: 0,
        cap: 10,
        unlock: {money: 100},
    },
    {
        id: 4,
        name: 'Manager',
        baseCost: 1008,
        costEquation: (owned, baseCost) => {
           

            return Math.floor((1 / 126) * Math.pow(owned - 40, 3) + baseCost)
        },
        productionRate: 50.0,
        prodMod:-0.1,
        owned: 0,
        cap: 10,
        unlock: {money: 500},
    },
    
];

/*  Notes
beginer 10-20 words low end 0.0011574/ higher 0.011574
junior 30-40 words
senior 50-60 words
86400 sec/day

calc 30 lines


*/
