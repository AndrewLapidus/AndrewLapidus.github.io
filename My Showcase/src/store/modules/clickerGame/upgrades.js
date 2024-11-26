export const upgrades = [
    
    {
        id: 1,
        name: "Student Cap",
        description: "use",
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
        id: '0',
        target: 'cap',

    },
    
    
]