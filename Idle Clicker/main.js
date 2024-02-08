
//this will update the screen
function tick(){
    //checking time elapsed and verifying program does'nt run too fast
    game.now = new Date - game.prevNow;
    if(game.now < 2*gameData.tickDuration){
        game.now = gameData.tickDuration;
    }

    // updating values
    game.prevNow = new Date;

    //updating all values/units and checks if valid i dunno.
    for(var i in units){
        $('#unit-tab').append(strDiv(i,10) +'\
        <div> \
        ' + strButton(i, i) +'\
        </div>\
        </div>')
    }

    window.setInterval(tick, gameData.tickDuration);
}

tick();


