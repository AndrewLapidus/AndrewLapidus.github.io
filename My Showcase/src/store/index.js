import { createStore } from 'vuex';
import { clickerGame } from './modules/clickerGame/clickerGame';


export const store = createStore({
    modules: {
        clickerGame, //so far only one game
    },
});