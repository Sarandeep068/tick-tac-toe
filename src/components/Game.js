import React, { useState, Fragment, useEffect } from 'react';
import { calculateWinner } from '../helpers/calculate-winner';
import Board from './Board';

const styles = {
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

const resetStyles = {
    padding: '16px',
    backgroundColor: '#03ce03',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0px 4px 4px #333'
}

const playerStyles = {
    fontSize: '24px',
    padding: '16px',
    color: '#39b5a4'
}

const Game = ({ userNames, tossWinner }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(!tossWinner);
    const winner = calculateWinner(board);

    const handleClick = index => {
        const boardCopy = [...board];
        // If user click an occupied square or if game is won, return
        if (winner || boardCopy[index]) return;
        // Put an X or an O in the clicked square
        boardCopy[index] = xIsNext ? 'X' : 'O';
        setXisNext(!xIsNext);
        setBoard(boardCopy);
    }

    const renderMoves = () => (
        <button onClick={() => setBoard(Array(9).fill(null))} style={resetStyles}>
            {winner ? 'Start Over' : 'Reset'}
        </button>
    )

    return (
        <Fragment>
            <Board squares={board} onClick={handleClick} />
            <div style={styles}>
                {winner
                    ? <p style={playerStyles}>
                            {`${!xIsNext ? userNames.userName1 : userNames.userName2} Wins. Well Done!`}
                      </p>
                    : <p style={playerStyles}>
                            {`Next Player: ${xIsNext ? userNames.userName1 : userNames.userName2}`}
                      </p>
                }
                {renderMoves()}
            </div>
        </Fragment>
    )
}

export default Game;