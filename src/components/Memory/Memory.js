import React from 'react'
import '../Memory/Memory.css'
import { useEffect, useState } from 'react'

const MemoryCard = (props) => {
  return (
    <div>
      <button className='card' onClick={() => props.setShow(props.id)} style={props.isFound ? {backroundColor:'green' , visibility:'hidden'} : {}}>
        {props.show ? <h1>{props.cardValue}</h1> : <p><b>?</b></p>}
        
      </button>
    </div>
  )
};


function Memory() {

  const [data,setData] = useState([
    {id:'00',show:false,cardValue:0,isFound:false},
    {id:'01',show:false,cardValue:0,isFound:false},
    {id:'02',show:false,cardValue:0,isFound:false},
    {id:'03',show:false,cardValue:0,isFound:false},
    {id:'04',show:false,cardValue:0,isFound:false},
    {id:'05',show:false,cardValue:0,isFound:false},
    {id:'10',show:false,cardValue:0,isFound:false},
    {id:'11',show:false,cardValue:0,isFound:false},
    {id:'12',show:false,cardValue:0,isFound:false},
    {id:'13',show:false,cardValue:0,isFound:false},
    {id:'14',show:false,cardValue:0,isFound:false},
    {id:'15',show:false,cardValue:0,isFound:false}
  ]);

  const [numberOfClicks,setNumberOfClicks] = useState(0);
  const [clickedCards,setClickedCards] = useState([]);

  useEffect(()=>{
    console.log(data);
  });
  
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const cardValues = [1,2,3,4,5,6,1,2,3,4,5,6]
  const setCardValues = (cardValues) => {
    shuffle(cardValues);
    let i = 0;
    let newArr = data.map(e=>{
      e.cardValue = cardValues[i];
      e.show=false;
      e.isFound=false;
      i++; 
      return e;
    })
    setData(newArr);
    setNumberOfClicks(0);
  }
  
  const showCard = (id) => {
    let newArr = data.map(e=>{
      if(e.id==id){
        e.show = !e.show;
        setNumberOfClicks(numberOfClicks+1);
        return e;
      }
      else return e;
    })
    setData(newArr);

    data.forEach(e=>{
      if(e.show==true && !clickedCards.includes(e)){
        let temp = clickedCards
        temp.push(e);
        setClickedCards(temp);
        console.log(clickedCards.map(e=>e.id))
      }
    })
    if(clickedCards.length==2){
      setTimeout(() => {
        if(clickedCards[0].cardValue === clickedCards[1].cardValue){
        let newArr = data.map(e=>{
          if(e.id==clickedCards[0].id || e.id==clickedCards[1].id){
            e.isFound=true;
            e.show=false;
            return e;
          }
          else return e;
        })
          setData(newArr);
          console.log('reset if');
          setClickedCards([]);
      }
      else{
        let newArr = data.map(e=>{
          if(e.isFound==false && e.show==true){
            e.show=false;
            return e;
          }
          else return e;
        })
          setData(newArr);
          console.log(clickedCards.map(e=>e.cardValue));
          console.log('reset else');
          setClickedCards([]);
      }
      }, 800);
    
    }
  }
  
  return (
    <>
    <h1 className='heading'>Memory Game</h1>
    <button className='newGame' onClick={() => setCardValues(cardValues)}>New Game</button>
    <h4>Number of clicks: {numberOfClicks}</h4>
    <div className='flexContainer'>
      <div className='container'>
          {data.map(e => <MemoryCard key={e.id} id={e.id} show={e.show} setShow={showCard} cardValue={e.cardValue} isFound={e.isFound}/>)}      
      </div>
    </div>
    </>
  )
}

export default Memory
