import React from 'react';
import classes from './App.module.scss'
import GamesList from './components/gameslist/GamesList';

const App = () => {
    return (
        <div className={classes.App}>
            <GamesList/>
        </div>
    );
};

export default App;