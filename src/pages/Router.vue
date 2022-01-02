<template>
<div>
<div class="container">
  <div class="col-span-12 w-full">
    <div class="grid-col-12 w-full">
        <div class="col-span-12" style="background-color: black; height: 100vh; color: white;">
          <div class="flex flex-col">
            <div class="h-80vh w-60vw mx-auto" style="background-color:green; position: relative;">
              <div class="w-24 h-8" style="position:absolute; background-color: black; top: 1rem; left: 35%; color: white;">
              {{DealerCards}}
              </div>
              <div class="w-10 h-8" style="position:absolute; background-color: white; top: 45%; left: 5%; color:black">
              <p> Money: </p>
              <p>{{money}}</p>
              </div>
              <div class="w-24 h-8" style="position:absolute; background-color: white; top: 45%; left: 35%;">
              </div>
              <div class="w-10 h-8" style="position:absolute; background-color: white; top: 45%; right: 5%; color: black;">
              <p> Bet: </p>
              <p>{{bet}}</p>
              </div>
              <div class="w-24 h-8" style="position:absolute; background-color: black; bottom: 1rem; left: 35%; color: white;">
              {{PlayerCards}}
              </div>
            </div>
            <p>index by name: '2 of Spades' is : {{getIndexByName('Ace of Spades')}}</p>
            <p>currentDeck length: {{currentDeck.length}}</p>
            <p>randomCard: {{getRandomCard()}}</p>
            <button @click="removeCard('9 of Spades')">click to remove a card by index name</button>
          </div>
        </div>
        <div class="col-span-12" style="background-color: blue; height: 100vh; color: white;">
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from "vue";

let cards: any[]=[ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

const suits: string[]=['Spades', 'Clubs', 'Diamonds', 'Hearts'];

type Card = {
    id: number,
    name: string,
    value: number,
    suit: string,
}
// 2 of spades is 0, ace of hearts is 51 = 52

let deck: any[]=[];

for (let i = 0; i<cards.length; i++){

  for (let j=0; j<suits.length; j++){

    let currentValue;

    if (cards[i] === 'Jack' || cards[i] === 'Queen' || cards[i] === 'King'){
      currentValue = 10;
    }
    else if (cards[i] === 'Ace'){
      currentValue = 11;
    }
    else currentValue = cards[i];

    let newCard: Card = {
      id: cards[i],
      name: cards[i].toString() + ` of ` + suits[j],
      value: currentValue,
      suit: suits[j],
    }
    deck.push(newCard);
  }
}
const currentDeck = deck;

export default Vue.extend({
  name: 'HomeRouter',
  data() {
  return {
    gameSteps: ['bet', 'deal', 'game', 'result'],
    gameStep: 0,
    message: 'hey there ;)',
    deck,
    currentDeck,
    bet: 0,
    money: 100,
    PlayerCards: [],
    DealerCards: [],
  }
 },
 mounted() {
   switch(this.gameSteps[this.gameStep]) {
  case 'bet':
    console.log('you need to bet!')
    break;
  case 'deal':
    // code block
    break;
  case 'game':
    // code block
    break;
  case 'result':
    // code block
    break;
  default:
    console.log('plz return to game loop')
}
},
  methods: {
    getIndexByName(name: string): number{
    return currentDeck.map(function(e) { return e.name; }).indexOf(name);
   },
  //  getIndexById(id: number): number{
  //   return currentDeck.map(function(e) { return e.id; }).indexOf(id);
  //  },
    removeCard<T>(nameOfCard: T): Array<T> {
    const index = currentDeck.map(function(e) { return e.name; }).indexOf(nameOfCard);
    if (index > -1) {
      currentDeck.splice(index, 1);
    }
  },
    getRandomCard(){
      // let namedDeck = currentDeck.map(function(e) { return e.name; });
      let randomCard = currentDeck[Math.floor(Math.random() * currentDeck.length)];
      return randomCard;
    },
    dealTwoCards(): Array {
      // targetArray = [getRandomCard(), getRandomCard()];
      let card1;
      let card2;
      card1 = this.getRandomCard();
      this.removeCard(card1.name);
      card2 = this.getRandomCard();
      this.removeCard(card2.name);
      return [card1, card2];
    },
 },
 computed:{
 },
});
</script>

<style lang="scss" scoped>

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

/deep/ body {
  margin: 0 !important;
}

.container{
display: grid;
grid-template-columns: repeat(12, minmax(0, 1fr));
height: 100%;
width:100%;
margin:0;
justify-items: center;
overflow: hidden;
}
/deep/.el-tabs__header{
  margin: 0;
}
/deep/.el-tabs__nav {
  float:none;
}
/deep/.el-tabs__active-bar{
  visibility: hidden;
}

/deep/.el-tabs__nav-wrap {
  color:white;
  background-color: black;
  justify-items:center;
}

/deep/.el-tabs__item.is-active {
  position: relative;
  color: white;
}

// /deep/.el-tabs__item.is-active::after {
//   position: absolute;
//   content: '';
//   width: 4rem;
//   height: 0.1rem;
//   top:2rem;
//   right:0.8rem;
//   background-color: white;
//   transition: all .3s;
// }

/deep/.el-tabs__item {
  color: #b7b7b7;
}
</style>
