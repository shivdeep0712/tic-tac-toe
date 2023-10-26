import { useState } from 'react'
import Board from "./components/Board";
import {calculateWinner} from './winner'
import './styles.scss'
function App() {
  const [squares,setSquares] = useState(Array(9).fill(null));
    const [isXNext,setIsXNext] = useState(false);
    const winner = calculateWinner(squares);
    const nextPlayer = isXNext ? 'X' : 'O';
    const statusMessage = winner ? `Winner is ${winner}` : `Next player is ${nextPlayer}`; 
    const handleSquareClick = (clickedPosition)=>{
        //if square is already filled, function will not work
        if(squares[clickedPosition]){
            return ;
        }
        
        setSquares(currentSquares=>{
            return currentSquares.map((squareValue,position)=>{
                if(clickedPosition===position){
                    return isXNext ? 'X' : 'O';
                }
                else
                return squareValue;
            })

        });
        setIsXNext(currentIsXNext => !currentIsXNext);
    }
   return (
     <div className="app  ">
       <h2>{statusMessage} </h2>
         <Board squares={squares} handleSquareClick={handleSquareClick}/>
     </div>
   );
}

export default App;
