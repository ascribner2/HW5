const letterArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ']; //maps letters to indices
const map = new Map(); //new map object
const lettersLeft = []; //makes a programmic "bag" of tiles to refer to for picking random tiles from 
const rackOfLetters = [] //rack that holds the letters

//makes a map of all of the letters with their information
map.set('a',{value: 1, tiles: 9});
map.set('b',{value: 3, tiles: 2});
map.set('c',{value: 3, tiles: 2});
map.set('d',{value: 2, tiles: 4});
map.set('e',{value: 1, tiles: 12});
map.set('f',{value: 4, tiles: 2});
map.set('g',{value: 2, tiles: 3});
map.set('h',{value: 4, tiles: 2});
map.set('i',{value: 1, tiles: 9});
map.set('j',{value: 8, tiles: 1});
map.set('k',{value: 5, tiles: 1});
map.set('l',{value: 1, tiles: 4});
map.set('m',{value: 3, tiles: 2});
map.set('n',{value: 1, tiles: 6});
map.set('o',{value: 1, tiles: 8});
map.set('p',{value: 3, tiles: 2});
map.set('q',{value: 10, tiles: 1});
map.set('r',{value: 1, tiles: 6});
map.set('s',{value: 1, tiles: 4});
map.set('t',{value: 1, tiles: 6});
map.set('u',{value: 1, tiles: 4});
map.set('v',{value: 4, tiles: 2});
map.set('w',{value: 4, tiles: 2});
map.set('x',{value: 8, tiles: 1});
map.set('y',{value: 4, tiles: 2});
map.set('z',{value: 10, tiles: 1});
map.set(' ',{value: 0, tiles: 2});

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

for(let i = 0; i < 7; i++){
    rackOfLetters[i] = getRandomLetter();
}

$('.Tile').draggable({ revert: "invalid" });
$('.Slot').droppable();

//alert("Length: " + lettersLeft.length);
//alert(rackOfLetters.toString());