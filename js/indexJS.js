const letterArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ']; //maps letters to indices
const map = new Map(); //new map object
const lettersLeft = []; //makes a programmic "bag" of tiles to refer to for picking random tiles from 
const rackOfLetters = [] //rack that holds the letters
var score = 0; //game score

//makes a map of all of the letters with their information in a object
map.set('a',{value: 1, tiles: 9, background: "Scrabble_Tile_A.jpg"});
map.set('b',{value: 3, tiles: 2, background: "Scrabble_Tile_B.jpg"});
map.set('c',{value: 3, tiles: 2, background: "Scrabble_Tile_C.jpg"});
map.set('d',{value: 2, tiles: 4, background: "Scrabble_Tile_D.jpg"});
map.set('e',{value: 1, tiles: 12, background: "Scrabble_Tile_E.jpg"});
map.set('f',{value: 4, tiles: 2, background: "Scrabble_Tile_F.jpg"});
map.set('g',{value: 2, tiles: 3, background: "Scrabble_Tile_G.jpg"});
map.set('h',{value: 4, tiles: 2, background: "Scrabble_Tile_H.jpg"});
map.set('i',{value: 1, tiles: 9, background: "Scrabble_Tile_I.jpg"});
map.set('j',{value: 8, tiles: 1, background: "Scrabble_Tile_J.jpg"});
map.set('k',{value: 5, tiles: 1, background: "Scrabble_Tile_K.jpg"});
map.set('l',{value: 1, tiles: 4, background: "Scrabble_Tile_L.jpg"});
map.set('m',{value: 3, tiles: 2, background: "Scrabble_Tile_M.jpg"});
map.set('n',{value: 1, tiles: 6, background: "Scrabble_Tile_N.jpg"});
map.set('o',{value: 1, tiles: 8, background: "Scrabble_Tile_O.jpg"});
map.set('p',{value: 3, tiles: 2, background: "Scrabble_Tile_P.jpg"});
map.set('q',{value: 10, tiles: 1, background: "Scrabble_Tile_Q.jpg"});
map.set('r',{value: 1, tiles: 6, background: "Scrabble_Tile_R.jpg"});
map.set('s',{value: 1, tiles: 4, background: "Scrabble_Tile_S.jpg"});
map.set('t',{value: 1, tiles: 6, background: "Scrabble_Tile_T.jpg"});
map.set('u',{value: 1, tiles: 4, background: "Scrabble_Tile_U.jpg"});
map.set('v',{value: 4, tiles: 2, background: "Scrabble_Tile_V.jpg"});
map.set('w',{value: 4, tiles: 2, background: "Scrabble_Tile_W.jpg"});
map.set('x',{value: 8, tiles: 1, background: "Scrabble_Tile_X.jpg"});
map.set('y',{value: 4, tiles: 2, background: "Scrabble_Tile_Y.jpg"});
map.set('z',{value: 10, tiles: 1, background: "Scrabble_Tile_Z.jpg"});
map.set(' ',{value: 0, tiles: 2, background: "Scrabble_Tile_Blank.jpg"});

//generates the "bag" of tiles
for(let i = 0; i < letterArr.length; i++){
    for(let j = 0; j < map.get(letterArr[i]).tiles; j++){
        lettersLeft.push(letterArr[i]);
    }
}

//function that gets random letters and removes a tile from the tiles left in the "bag"
function getRandomLetter(){
    let letterIndex = parseInt(Math.random() * lettersLeft.length);
    let randLetter = lettersLeft[letterIndex];
    lettersLeft.splice(lettersLeft.indexOf(randLetter),1);

    return randLetter; 
}

//makes 7 random tiles
for(let i = 0; i < 7; i++){
    rackOfLetters[i] = getRandomLetter();
    let letter_value = rackOfLetters[i];
    let letter_bg = map.get(rackOfLetters[i]).background;
    $('#tile_rack').append(`<div style='background-image: url("tiles/${letter_bg}")' class='Tile onRack' value='${letter_value}'></div>`);
}

$('#TilesLeft').html(`Tiles Left: ${lettersLeft.length}`);

$('.Tile').draggable({ revert: "invalid" }); //draggable for all the tiles

$('.Slot').droppable({
    accept: '.Tile:not(.visited)'
}); //normal board space

$('.DoubleSlot').droppable({
    accept: '.Tile:not(.visited)'
}); //double board space

$('#tile_rack').droppable({
    accept: '.Tile:not(.onRack)'
}); // so you can put a tile back on the rack

//when a tile is drop on a normal space
$('.Slot').on("drop", function(event, ui){
    $(this).droppable('option', 'accept', [ui.draggable, ':not(.visited)']); //make it so only one tile can be placed on this slot
    let tile = ui.draggable
    let slot = $(this)
    tile.removeClass('onRack') //removes the onRack flag so it canbe reracked
    tile.addClass('visited'); //if the tile already visited a tile
    rackOfLetters.splice(rackOfLetters.indexOf(tile.attr('value')), 1); //remove it from the rack array that keep track of the tiles
    tile.detach().css({top:0, left:0,}).appendTo(slot); //removes from the rack and appends to the slot its drop on so it snaps to it
    score += parseInt(map.get(tile.attr('value')).value); //add tp score
    $('#Score').html(`Score: ${score}`); //updates html of the score
    updateWord(); //update the word on the board
});

//when a tile is drop on a double space
$('.DoubleSlot').on("drop", function(event, ui){
    $(this).droppable('option', 'accept', [ui.draggable, ':not(.visited)']); //make it so only one tile can be placed on this slot
    let tile = ui.draggable
    let slot = $(this)
    tile.removeClass('onRack') //removes the onRack flag so it canbe reracked
    tile.addClass('visited'); //if the tile already visited a tile
    rackOfLetters.splice(rackOfLetters.indexOf(tile.attr('value')), 1); //remove it from the rack array that keep track of the tiles
    tile.detach().css({top:0, left:0,}).appendTo(slot); //removes from the rack and appends to the slot its drop on so it snaps to it
    score += parseInt(map.get(tile.attr('value')).value) * 2; //add to score
    $('#Score').html(`Score: ${score}`);  //update the html of the score
    tile.addClass('double') //set double flag
    updateWord(); //update the word on the board
});

$('#tile_rack').on("drop", function(event, ui){
    let tile = ui.draggable
    let rack = $(this)
    tile.detach().css({top:0, left:0,}).appendTo(rack); //removes from the slot and appends to the rack
    tile.removeClass('visited') //returned to the rack
    tile.addClass('onRack') //adds the onRack flag to make sure the user can't tank the score

    //checks if the tile came from a double spot or not so that it update accordingly
    if(tile.hasClass('double')) {
        tile.removeClass('double') //removes the double flag
        rackOfLetters.push(tile.attr('value'));
        score -= parseInt(map.get(tile.attr('value')).value) * 2;
    } else {
        rackOfLetters.push(tile.attr('value'));
        score -= parseInt(map.get(tile.attr('value')).value);
    }

    $('#Score').html(`Score: ${score}`); //updates score
    updateWord(); //update the word on the board
});

//runs when the next word button is pressed
function next_word(){
    $('.Slot > div').remove(); //clears previous tiles
    $('.Slot').droppable('option', 'accept', '.Tile:not(.visited)'); //resets board acceptable slots
    $('.DoubleSlot > div').remove(); //clears previous tiles
    $('.DoubleSlot').droppable('option', 'accept', '.Tile:not(.visited)'); //resets board acceptable slots

    //fills in the blank spots in the rack and adds the tiles to the screen
    let spots = rackOfLetters.length
    for(let i = 0; i < 7 - spots; i++){
        if (lettersLeft.length > 0) {
            rackOfLetters.push(getRandomLetter());
            let letter_value = rackOfLetters[rackOfLetters.length - 1];
            let letter_bg = map.get(rackOfLetters[rackOfLetters.length - 1]).background;
            $('#tile_rack').append(`<div style='background-image: url("tiles/${letter_bg}")' class='Tile onRack' value='${letter_value}'></div>`);
        }
    }
    $('.Tile').draggable({ revert: "invalid" });
    $('#TilesLeft').html(`Tiles Left: ${lettersLeft.length}`);
    updateWord(); //update the word on the board
}

//function to iterate over all the slots and check if there is a letter or not
function updateWord() {
    let word = ''
    for(i = 1; i <= 15; i++){
        if($(`#game_board_slot-${i}`).children('.Tile').length > 0){
            word += $(`#game_board_slot-${i}`).children('.Tile').attr('value')
        } else {
            word += ' ';
            $(`#game_board_slot-${i}`).droppable('option', 'accept', '.Tile:not(.visited)') //reallows the slot to take a tile
        }
    }
    
    $('#currentWord').html(`Word: ${word.toString()}`); //updates the current words text
}