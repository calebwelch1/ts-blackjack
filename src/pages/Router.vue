<template>
<div>
<div class="container">
  <div class="col-span-12 w-full">
    <div class="grid-col-12 w-full">
        <div class="col-span-12" style="background-color: black; height: 100vh; color: white;">
          <div id="myModal" class="modal" style="color:white;">
            <div class="flex-row justify-center" style="font-weight: 700; font-size: 3rem; color: white; margin: 0rem;" v-if="gameStep === 0">
              <div>
                <p >Money</p>
                <p >${{money}}.00</p>
              </div>
              <p style="font-size: 5rem; margin-left: 3vw; margin-right: 3vw;">|</p>
               <div>
                <p >Bet</p>
                <p >${{bet}}.00</p>
              </div>
            </div>
            <input type="number"
            class="h-7 w-12"
            style="font-size: 3rem; margin-right: 3vw;"
            v-model="bet" 
            :min="1"
            :max="money"
            />
            <button @click="hideModalPlaceBet" :disabled="bet<= 0 || bet>money" class="w-10 h-10" style="background-color: blue; border: 2px solid white; border-radius: 1rem; color: white; font-size: 2rem;">Place Bet</button>
          </div>
          <div class="flex flex-col">
            <div class="h-88vh w-80vw mx-auto" style="background-color:green; position: relative; margin-top: 6vh;">
            <p v-if="winTextVisible" style="font-size: 2rem; font-weight: 700; position:absolute; background-color: white; top: 20%; left: 25%; color: black;"> {{result === 'win' ? 'You Win!' : 'Dealer Wins!'}}</p>
                <transition name="card">
                  <img
                  v-if="gameStep != 0 && showDealerOne"
                  id="dealer-card-1"
                  :src="currentCardback"
                  style="width: 12%; position: absolute; top: 8%; right: 26%;"
                  />
                  </transition>
                <transition name="card">
                  <img
                  v-if="gameStep != 0 && showDealerTwo"
                  id="dealer-card-2"
                  :src="DealerCards[1].img"
                  style="width: 12%; position: absolute; top: 8%; right: 12%;"
                  />
                  </transition>
              <p v-if="gameStep != 0" style="width: 12%; position: absolute; top: 44%; right: 12%; font-weight: 700; font-size: 3rem; color: white; margin: 0rem;">?</p>
              <div id="bet-container" class="w-10 h-8" style="position:absolute; background-color: white; top: 20%; left: 5%; color: black;">
              <p> Bet: </p>
              <p>{{bet}}</p>
              </div>
              <div class="w-10 h-8" style="position:absolute; background-color: white; top: 70%; left: 5%; color:black">
              <p> Money: </p>
              <p>{{money}}</p>
              </div>
              <div id="hit-stay-container" class="w-24 h-8 flex-row justify-between" style="position:absolute; top: 30%; left: 23%;">
              <button id="action-button" v-if="HitStay" @click="hitOrStay('stay')" class="w-8 h-4" style="margin-top: auto; margin-bottom: auto;">stay</button>
              <button id="action-button" v-if="HitStay" @click="hitOrStay('hit')" class="w-8 h-4" style="margin-top: auto; margin-bottom: auto;">hit</button>
              <button id="action-button" v-if="winTextVisible" @click="nextRound" class="w-8 h-4" style="margin-top: auto; margin-bottom: auto;">Next Round</button>
              </div>
              <p v-if="gameStep != 0" style="font-weight: 700; font-size: 3rem; color: white; margin: 0rem;">{{getValue(PlayerCards)}}</p>
                <transition name="card">
                  <img
                  v-if="gameStep != 0 && showPlayerOne"
                  id="player-card-1"
                  style="width: 12%; position:absolute; bottom: 9%; left: 22%;"
                  :src="PlayerCards[0].img"
                  />
                </transition>
                <transition name="card">
                <img
                v-if="gameStep != 0 && showPlayerTwo"
                id="player-card-2"
                :src="PlayerCards[1].img"
                style="width: 12%; position:absolute; bottom: 9%; left: 37%;"
                />
                </transition>
                <div id="deck" class="w-24 h-8" style="position:absolute; bottom: 25%; right: 5%; color: white;">
              <div v-if="gameStep != 0" class="flex-row justify-evenly">
                <img
                :src="currentCardback"
                style="width: 50%;"
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import Vue from "vue";
import two_of_clubs from './cards/two_of_clubs.svg'
import three_of_clubs from './cards/three_of_clubs.svg'
import four_of_clubs from './cards/four_of_clubs.svg'
import five_of_clubs from './cards/five_of_clubs.svg'
import six_of_clubs from './cards/six_of_clubs.svg'
import seven_of_clubs from './cards/seven_of_clubs.svg'
import eight_of_clubs from './cards/eight_of_clubs.svg'
import nine_of_clubs from './cards/nine_of_clubs.svg'
import ten_of_clubs from './cards/ten_of_clubs.svg'
import jack_of_clubs from './cards/jack_of_clubs.svg'
import queen_of_clubs from './cards/queen_of_clubs.svg'
import king_of_clubs from './cards/king_of_clubs.svg'
import ace_of_clubs from './cards/ace_of_clubs.svg'

import two_of_hearts from './cards/two_of_hearts.svg'
import three_of_hearts from './cards/three_of_hearts.svg'
import four_of_hearts from './cards/four_of_hearts.svg'
import five_of_hearts from './cards/five_of_hearts.svg'
import six_of_hearts from './cards/six_of_hearts.svg'
import seven_of_hearts from './cards/seven_of_hearts.svg'
import eight_of_hearts from './cards/eight_of_hearts.svg'
import nine_of_hearts from './cards/nine_of_hearts.svg'
import ten_of_hearts from './cards/ten_of_hearts.svg'
import jack_of_hearts from './cards/jack_of_hearts.svg'
import queen_of_hearts from './cards/queen_of_hearts.svg'
import king_of_hearts from './cards/king_of_hearts.svg'
import ace_of_hearts from './cards/ace_of_hearts.svg'

import two_of_diamonds from './cards/two_of_diamonds.svg'
import three_of_diamonds from './cards/three_of_diamonds.svg'
import four_of_diamonds from './cards/four_of_diamonds.svg'
import five_of_diamonds from './cards/five_of_diamonds.svg'
import six_of_diamonds from './cards/six_of_diamonds.svg'
import seven_of_diamonds from './cards/seven_of_diamonds.svg'
import eight_of_diamonds from './cards/eight_of_diamonds.svg'
import nine_of_diamonds from './cards/nine_of_diamonds.svg'
import ten_of_diamonds from './cards/ten_of_diamonds.svg'
import jack_of_diamonds from './cards/jack_of_diamonds.svg'
import queen_of_diamonds from './cards/queen_of_diamonds.svg'
import king_of_diamonds from './cards/king_of_diamonds.svg'
import ace_of_diamonds from './cards/ace_of_diamonds.svg'

import two_of_spades from './cards/two_of_spades.svg'
import three_of_spades from './cards/three_of_spades.svg'
import four_of_spades from './cards/four_of_spades.svg'
import five_of_spades from './cards/five_of_spades.svg'
import six_of_spades from './cards/six_of_spades.svg'
import seven_of_spades from './cards/seven_of_spades.svg'
import eight_of_spades from './cards/eight_of_spades.svg'
import nine_of_spades from './cards/nine_of_spades.svg'
import ten_of_spades from './cards/ten_of_spades.svg'
import jack_of_spades from './cards/jack_of_spades.svg'
import queen_of_spades from './cards/queen_of_spades.svg'
import king_of_spades from './cards/king_of_spades.svg'
import ace_of_spades from './cards/ace_of_spades.svg'

import astro from './cardback/astro.jpg';
import bee from './cardback/bee.jpg';
import dog from './cardback/dog.jpg';
import dragon from './cardback/dragon.jpg';
import redflower from './cardback/redflower.jpg';

let cards: any[]=[ 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];

const suits: string[]=['clubs', 'hearts', 'diamonds', 'spades'];

type Card = {
    id: number,
    name: string,
    value: number,
    suit: string,
}
//TODO: (exceptions for aces!), when money is 0, ui lol,

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
    winTextVisible: false,
    showDealerOne: false,
    showDealerTwo: false,
    showPlayerOne: false,
    showPlayerTwo: false,
    cardbacks: [ astro,
    bee,
    dog,
    dragon,
    redflower,],
    cardImgs:[
    two_of_clubs,
    two_of_hearts,
    two_of_diamonds,
    two_of_spades,
    three_of_clubs,
    three_of_hearts,
    three_of_diamonds,
    three_of_spades,
    four_of_clubs,
    four_of_hearts,
    four_of_diamonds,
    four_of_spades,
    five_of_clubs,
    five_of_hearts,
    five_of_diamonds,
    five_of_spades,
    six_of_clubs,
    six_of_hearts,
    six_of_diamonds,
    six_of_spades,
    seven_of_clubs,
    seven_of_hearts,
    seven_of_diamonds,
    seven_of_spades,
    eight_of_clubs,
    eight_of_hearts,
    eight_of_diamonds,
    eight_of_spades,
    nine_of_clubs,
    nine_of_hearts,
    nine_of_diamonds,
    nine_of_spades,
    ten_of_clubs,
    ten_of_hearts,
    ten_of_diamonds,
    ten_of_spades,
    jack_of_clubs,
    jack_of_hearts,
    jack_of_diamonds,
    jack_of_spades,
    queen_of_clubs,
    queen_of_hearts,
    queen_of_diamonds,
    queen_of_spades,
    king_of_clubs,
    king_of_hearts,
    king_of_diamonds,
    king_of_spades,
    ace_of_clubs,
    ace_of_hearts,
    ace_of_diamonds,
    ace_of_spades,
    ],
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
    this.DealerCards = this.dealTwoCards();
    this.PlayerCards = this.dealTwoCards();
    this.showDealerOne = true;
    setTimeout(() => this.showPlayerOne = true, 500);
    setTimeout(() => this.showDealerTwo = true, 1000);
    setTimeout(() => this.showPlayerTwo = true, 1500);
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
      // fix this with winTextVisible
      if(showResult === true){
        console.log('result is true');
        if (this.getValue(this.PlayerCards) > this.getValue(this.DealerCards)){
          console.log('win');
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
      else 
      if (this.getValue(this.PlayerCards) > 21){
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
      // this.gameStep++ ;
      // this.gameloop();
      this.showWinText();
    },
    lose() {
      this.bet = 0;
      this.result = 'lose';
      // this.gameStep++ ;
      // this.gameloop();
      this.showWinText();
    },
    nextStep(){
      this.gameStep ++;
      this.gameloop();
    },
    nextRound(){
      this.winTextVisible = false;
      this.nextStep();
    },
    showWinText(){
      this.HitStay = false;
      this.winTextVisible = true;
      // do animation stuff here;
    },
    addImgs(){
      for (let i=0; i<this.currentDeck.length; i++){
        this.currentDeck[i].img = this.cardImgs[i];
      }
    },
    gameloop(){
      switch(this.gameSteps[this.gameStep]) {
  case 'bet':
    this.currentDeck = [];
    this.makeDeck(this.currentDeck);
    this.addImgs();
    document.getElementById("myModal").style.display="block"; 
    break;
  case 'deal':
    this.deal();
    break;
  case 'game':
    console.log('lets play!');
    this.game();
    break;
  case 'result':
  this.showResult();
  this.showDealerOne = false;
  this.showDealerTwo = false;
  this.showPlayerOne = false;
  this.showPlayerTwo = false;
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

        // if (cards[i] === 'jack' || cards[i] === 'queen' || cards[i] === 'king'){
        //   currentValue = 10;
        // }
        // else if (cards[i] === 'ace'){
        //   currentValue = 11;
        // }
        // else currentValue = cards[i];
        switch(cards[i]) {
              case 'one':
              currentValue = 1;
              break;
              case 'two':
              currentValue = 2;
              break;
              case 'three':
              currentValue = 3;
              break;
              case 'four':
              currentValue = 4;
              break;
              case 'five':
              currentValue = 5;
              break;
              case 'six':
              currentValue = 6;
              break;
              case 'seven':
              currentValue = 7;
              break;
              case 'eight':
              currentValue = 8;
              break;
              case 'nine':
              currentValue = 9;
              break;
              case 'ten':
              currentValue = 10;
              break;
              case 'jack':
              currentValue = 10;
              break;
              case 'queen':
              currentValue = 10;
              break;
              case 'king':
              currentValue = 10;
              break;
              case 'ace':
              currentValue = 11;
              break;
              default:
                console.log('you broke the deck')
            }
            let newName = cards[i].toString() + `_of_` + suits[j];
        let newCard: Card = {
          id: cards[i],
          name: newName,
          value: currentValue,
          suit: suits[j],
        }
        deck.push(newCard);
      }
    }
  },
 },
 computed:{
   currentCardback(){
     return this.cardbacks[2];
   },
 },
});
</script>

<style lang="scss" scoped>
#action-button {
  background-color: black;
  color: white;
  border: 2px solid slategrey;
  border-radius: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
}

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

// transitions

.card-enter-active {
  transition: all .3s ease;
}
.card-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.card-enter, .card-leave-to
/* .player-card-1-leave-active below version 2.1.8 */ {
  transform: translateY(-6rem);
  opacity: 0;
}
</style>
