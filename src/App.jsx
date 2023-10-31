import { useState } from 'react'
import Board from "./components/Board";
import {calculateWinner} from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import './styles.scss';
const NEW_GAME = [{squares: Array(9).fill(null), isXNext:false}];
function App() {
    const [history, setHistory] = useState(
        NEW_GAME
        );
        const [currentMove, setCurrentMove] = useState(0);
    
    const gamingBoard = history[currentMove];
    const {winner,winningSquares} = calculateWinner(gamingBoard.squares);

        //console.log({history,currentMove});
    
        const handleSquareClick = (clickedPosition)=>{
        //if square is already filled, function will not work
        if(gamingBoard.squares[clickedPosition] || winner){
            return ;
        }
        
        setHistory(currentHistory=>{
            const isTraversing = currentMove+1 !== currentHistory.length;
            const lastGamingState = isTraversing ? currentHistory[currentMove] : currentHistory[history.length - 1];  
            const nextSquaresState = lastGamingState.squares.map((squareValue,position)=>{
                if(clickedPosition===position){
                    return lastGamingState.isXNext ? 'X' : 'O';
                }
                else
                return squareValue;
            });
               const base = isTraversing 
               ? currentHistory.slice(0,currentHistory.indexOf(lastGamingState)+1)
               : currentHistory;
                   
                return base.concat({
                    squares: nextSquaresState, isXNext: !lastGamingState.isXNext,
                })
        });
        setCurrentMove(move=>move+1);
    };
    const moveTo = (move)=>{
        setCurrentMove(move);
    }
    const onNewGameStart = ()=>{
        setHistory(NEW_GAME);
        setCurrentMove(0);
    }
   return (
     <div className="app  ">
        <h1>Tic <span className='text-green'>Tac</span> Toe</h1>
        <StatusMessage winner={winner} gamingBoard={gamingBoard}/>
         <Board squares={gamingBoard.squares} winningSquares={winningSquares} handleSquareClick={handleSquareClick}/>
         <button type='button' className={`btn-reset ${winner? 'active' : ''}`} 
         onClick={onNewGameStart}>
            Start new game
            </button>
            <h2 style={{
                fontWeight: 'normal'
            }}>
                Current game history
            </h2>
        <History history={history} moveTo={moveTo} currentMove={currentMove}/>
        <div className='bg-balls'/>
     </div>
     
   );
}

export default App;
