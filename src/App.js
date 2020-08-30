import React, { Fragment, useState } from 'react';
import Game from './components/Game';
import Start from './components/Start';

const App = () => {
    const [ userNames, setUserNames ] = useState({});
    const [ tossWinner, setTossWinner ] = useState(null);
    const [ step, setStep ] = useState(1);

    const moveToGame = (userNames, tossWiner) => {
        setUserNames(userNames);
        setTossWinner(tossWiner);
        setStep(2);
    }

    return (
        <Fragment>
            {
                step === 1
                    ? <Start moveToGame={moveToGame}/>
                    : <Game tossWinner={tossWinner} userNames={userNames}/>
            }
        </Fragment>
    )
};

export default App;
