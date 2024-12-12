export const upgrades = [
    
    {
        id: 1,
        name: "Student Cap",
        description: "Does what you think it does",
        costEquation: (own, baseCost, cap) =>{
            if (own <= cap){
                return (own*2)+baseCost
            }
            return 0
        },
        
        targetModEquation: (upOwn) =>{
            return (upOwn*2)+3
        },
        baseCost:10,
        own: 0,
        cap: 10,
        object: 'units',
        Oid: 1,
        target: 'cap',

    },
    // {
    //     id: 2,
    //     name: "Junior Cap",
    //     description: "You should know this by now",
    //     costEquation: (own, baseCost, cap) =>{
    //         if (own <= cap){
    //             return (own*2)+baseCost
    //         }
    //         return 0
    //     },
        
    //     targetModEquation: (upOwn) =>{
    //         return (upOwn*2)+3
    //     },
    //     baseCost: 100,
    //     own: 0,
    //     cap: 10,
    //     object: 'units',
    //     Oid: '2',
    //     target: 'cap'
    // },
    // {
    //     id: 3,
    //     name: "Senior Cap",
    //     description: "Why are you reading this?",
    //     costEquation: (own, baseCost, cap) =>{
    //         if (own <= cap){
    //             return (own*2)+baseCost
    //         }
    //         return 0
    //     },
        
    //     targetModEquation: (upOwn) =>{
    //         return (upOwn*2)+3
    //     },
    //     baseCost: 1000,
    //     own: 0,
    //     cap: 10,
    //     object: 'units',
    //     Oid: '3',
    //     target: 'cap'
    // },
    // {
    //     id: 4,
    //     name: "Manager Cap",
    //     description: "There is nothing to be said",
    //     costEquation: (own, baseCost, cap) =>{
    //         if (own <= cap){
    //             return (own*2)+baseCost
    //         }
    //         return 0
    //     },
        
    //     targetModEquation: (upOwn) =>{
    //         return (upOwn*2)+3
    //     },
    //     baseCost: 10000,
    //     own: 0,
    //     cap: 10,
    //     object: 'units',
    //     Oid: '4',
    //     target: 'cap'
    // },
    {
        id: 5,
        name: "Whale Power",
        description: "Increases clicking power",
        costEquation: (own, baseCost, cap) =>{
            if (own <= cap){
                return (own*2)+baseCost
            }
            return 0
        },
        
        targetModEquation: (upOwn) =>{
            return (upOwn*.1)
        },
        baseCost: 10,
        own: 0,
        cap: 15,
        object: 'state',

    },
    // {
    //     id: 6,
    //     name: "Project Efficiency Boost",
    //     description: "Decrease Cost of projects by half",
    //     costEquation: (own, baseCost, cap) =>{
    //         if (own <= cap){
    //             return (own*2)+baseCost
    //         }
    //         return 0
    //     },
        
    //     targetModEquation: (upOwn) =>{
    //         return (upOwn+1)*.5
    //     },
    //     baseCost: 10,
    //     own: 0,
    //     cap: 10,
    //     object: 'projects',
    //     Oid: '0',
    //     target: 'cost'
    // },
    
    
    
]