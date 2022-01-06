<template>
<div>
<div class="container">
  <div class="col-span-12 w-full">
    <div class="grid-col-12 w-full">
        <div class="col-span-12" style="background-color: black; height: 100vh; color: white;">
          <div id="myModal" class="modal" style="color:red">
            <p> hi this is bet page! </p>
            <p v-if="showResultText"> You {{result}} !</p>
            <input type="number"
            v-model="bet" 
            :min="1"
            :max="money"
            />
            {{bet}}
            <button @click="hideModalPlaceBet" :disabled="bet<= 0 || bet>money">Place Bet</button>
          </div>
          <div class="flex flex-col">
            <div class="h-80vh w-60vw mx-auto" style="background-color:green; position: relative;">
              <div class="w-24 h-8" style="position:absolute; background-color: black; top: 1rem; left: 35%; color: white;">
              {{DealerCards}}
              </div>
              <div class="w-10 h-8" style="position:absolute; background-color: white; top: 45%; left: 5%; color:black">
              <p> Money: </p>
              <p>{{money}}</p>
              </div>
              <div class="w-24 h-8 flex-row justify-between" style="position:absolute; background-color: white; top: 45%; left: 35%;">
              <button v-if="HitStay" @click="hitOrStay('stay')" class="w-8 h-4" style="margin-top: auto; margin-bottom: auto;">stay</button>
              <button v-if="HitStay" @click="hitOrStay('hit')" class="w-8 h-4" style="margin-top: auto; margin-bottom: auto;">hit</button>
              </div>
              <div class="w-10 h-8" style="position:absolute; background-color: white; top: 45%; right: 5%; color: black;">
              <p> Bet: </p>
              <p>{{bet}}</p>
              </div>
              <div class="w-24 h-8" style="position:absolute; background-color: black; bottom: 1rem; left: 35%; color: white;">
              {{PlayerCards}}
              value:{{getValue(PlayerCards)}}
              </div>
            </div>
            <p>index by name: '2 of Spades' is : {{getIndexByName('Ace of Spades')}}</p>
            <p>currentDeck length: {{currentDeck.length}}</p>
            <p>Deck length: {{deck.length}}</p>
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
//TODO: (exceptions for aces!), when money is 0, ui lol, fix weird deck not losing or gaining cards, probably just put making the deck into it's own method.

let deck: any[]=[];



// let currentDeck = deck.map((x) => x);

export default Vue.extend({
  name: 'HomeRouter',
  data() {
  return {
    gameSteps: ['bet', 'deal', 'game', 'result'],
    gameStep: 0,
    message: '',
    deck,
    currentDeck: [],
    bet: 0,
    money: 100,
    PlayerCards: [],
    DealerCards: [],
    HitStay: false,
    result: '',
    showResultText: false,
  }
 },
 mounted() {
   this.gameloop();
},
  methods: {
    getIndexByName(name: string): number{
    return this.currentDeck.map(function(e) { return e.name; }).indexOf(name);
   },
    removeCard<T>(nameOfCard: T): Array<T> {
    const index = this.currentDeck.map(function(e) { return e.name; }).indexOf(nameOfCard);
    if (index > -1) {
      this.currentDeck.splice(index, 1);
    }
  },
    getRandomCard(){
      let randomCard = this.currentDeck[Math.floor(Math.random() * this.currentDeck.length)];
      return randomCard;
    },
    dealTwoCards(): Array {
      let card1;
      let card2;
      card1 = this.getRandomCard();
      this.removeCard(card1.name);
      card2 = this.getRandomCard();
      this.removeCard(card2.name);
      return [card1, card2];
    },
    dealOneCard(): object{
      let card1;
      card1 = this.getRandomCard();
      this.removeCard(card1.name);
      return card1;
    },
    deal(){
    let cardSet1 = this.dealTwoCards();
    let cardSet2 = this.dealTwoCards();
    this.DealerCards = cardSet1;
    this.PlayerCards = cardSet2;
    this.gameStep++;
    this.gameloop();
    },
    hideModalPlaceBet(){
    document.getElementById("myModal").style.display="none";
    this.money = this.money - this.bet;
    this.gameStep++;
    this.gameloop();
    },
    getValue(arr: Array): Number{
      let sum=0;
      let valueArr = arr.map(function(e) { return e.value; });
      for (let i=0; i<valueArr.length; i++){
        sum+= valueArr[i];
      }
      return sum;
    },
    game(showResult = false){
      if(showResult === true){
        if (this.getValue(this.PlayerCards) > this.getValue(this.DealerCards)){
          this.win();
        }
        else if (this.getValue(this.PlayerCards) < this.getValue(this.DealerCards)){
          this.lose();
        }
      }
      else if (showResult === false){
        if (this.getValue(this.PlayerCards) === 21){
        this.win();
      }
      else if(this.getValue(this.DealerCards) === 21){
        this.lose();
      }
      else if (this.getValue(this.PlayerCards) > 21){
        this.lose();
      }
      else if (this.getValue(this.DealerCards) > 21){
        this.win();
      }
      else {
        this.showHitStay();
      }
      }
    },
    hitOrStay(decision){
      if (decision === 'stay'){
        console.log('stay');
        this.decideIfDealerHit();
        this.game(true);
      }
      if (decision === 'hit'){
        console.log('hit');
        this.PlayerCards.push(this.dealOneCard());
        this.decideIfDealerHit();
        this.game();
      }
    },
    decideIfDealerHit(){
      if (this.getValue(this.DealerCards) >= 17){
        return;
      }
      else {
        this.DealerCards.push(this.dealOneCard());
      }
    },
    showHitStay(){
      this.HitStay = true;
    },
    win() {
      this.bet = this.bet * 2;
      this.money += this.bet;
      this.bet = 0;
      this.result = 'win';
      this.gameStep++ ;
      this.gameloop();
    },
    lose() {
      this.bet = 0;
      this.result = 'lose';
      this.gameStep++ ;
      this.gameloop();
    },
    gameloop(){
      switch(this.gameSteps[this.gameStep]) {
  case 'bet':
    console.log('you need to bet!');
    this.currentDeck = [];
    this.makeDeck(this.currentDeck);
    console.log(this.currentDeck.length);
    document.getElementById("myModal").style.display="block";
    break;
  case 'deal':
    console.log('dealing!');
    this.deal();
    break;
  case 'game':
    console.log('lets play!');
    this.game();
    break;
  case 'result':
  this.showResult();
    break;
  default:
    console.log('plz return to game loop')
}
    },
  showResult(){
    document.getElementById("myModal").style.display="block";
    this.showResultText = true;
    this.gameStep = 0;
    this.currentDeck = this.deck.map((x)=>x);
    this.gameloop();
  },
  makeDeck(deck: Array): Array{
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

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}
</style>
