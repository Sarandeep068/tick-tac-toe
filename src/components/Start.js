import React, { Fragment, memo, useState } from 'react';

const style = {
    width: '400px',
    margin: '24px auto',
    display: 'flex',
    flexDirection: 'column'
};

const buttonStyles = {
    padding: '16px',
    backgroundColor: '#03ce03',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0px 4px 4px #333',
    marginTop: '16px'
}

const inputStyles = {
    border: '1px solid #3b3be0',
    height: '32px',
    fontSize: '16px',
    marginBottom: '16px',
}

const labelStyles = {
    fontSize: '20px',
    color: '#3b3be0'
}

const Start = ({ moveToGame }) => {
    const [ step, setStep ] = useState(1);
    const [ userName1, setUserName1 ] = useState('');
    const [ userName2, setUserName2 ] = useState('');
    const [ tossSide, setTossSide ] = useState(null);

    const inputChangeHandler = (type, e) => {
        const val = e.target.value;
        type === 'userName1' ? setUserName1(val) : setUserName2(val);
    }

    const tossSideSelectionHandler = type => {
        setTossSide(type);
        setStep(4)
    }

    const checkTossWinner = () => {
        const randomTossSide = ((Math.random() * 100) % 2) === 0 ? 'head' : 'tail';
        if(randomTossSide === tossSide) {
            return 0;
        }

        return 1;
    }

    const setupGame = () => {
        moveToGame({ userName1, userName2 }, checkTossWinner());
    }

    return (
        <div style={style}>
            {
                step === 1 &&
                <button onClick={() => setStep(2)} style={buttonStyles}>Start Game</button>
            }
            {
                step === 2 &&
                <Fragment>
                    <label for='userName1'>Enter First Player's Name</label>
                    <input
                        value={userName1}
                        onChange={(e) => inputChangeHandler('userName1', e)}
                        style={inputStyles}
                        name='userName1'
                    />
                    <label for='userName2'>Enter Second Player's Name</label>
                    <input
                        value={userName2}
                        onChange={(e) => inputChangeHandler('userName2', e)}
                        style={inputStyles}
                        name='userName2'
                    />
                    { userName1 && userName2 &&
                        <button
                            onClick={() => setStep(3)}
                            style={buttonStyles}
                        >
                                Let's Toss
                        </button>
                    }
                </Fragment>
            }
            {
                step === 3 &&
                <Fragment>
                    <label style={labelStyles}>{`Hi ${userName1}, please Choose`}</label>
                    <button onClick={() => tossSideSelectionHandler('head')} style={buttonStyles}>Head</button>
                    <button onClick={() => tossSideSelectionHandler('tail')} style={buttonStyles}>Tail</button>
                </Fragment>
            }
            {
                step === 4 &&
                <Fragment>
                    <label
                        style={labelStyles}
                    >
                        {`${!checkTossWinner() ? `${userName1}` : `${userName2}`} Wins!`}
                    </label>
                    <button
                        onClick={setupGame}
                        style={buttonStyles}
                    >
                        Let's Play
                    </button>
                </Fragment>
            }
        </div>
    )

}

export default memo(Start);