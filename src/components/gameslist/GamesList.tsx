import React, { useEffect, useState } from 'react';
import classes from './GameList.module.scss';
import gamesData from '../../data/data.json';
import { AiFillCheckCircle, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import Loader from "../loader/Loader";



interface GameDataItem {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string[];
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  rating: string;
  multiplayer: boolean;
  players: string;
  languages: string[];
}

const GamesList = () => {
  const [ratingFilter, setRatingFilter] = useState<string>('highest');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [russianLanguageFilter, setRussianLanguageFilter] = useState<boolean>(false);
  const [multiplayerFilter, setMultiplayerFilter] = useState<boolean>(false);
  const [filteredGames, setFilteredGames] = useState<GameDataItem[] | null>(null);
  const [isLoading,setLoading] = useState<boolean>(false)
  const [error,setError] = useState<string>('По вашему запросу ничего не найдено')
  const [errorActive,setErrorActive] = useState(false)


  const applyFilters = () => {

    let filteredResult = gamesData.filter((game) => {

      if (ratingFilter === 'highest' && parseFloat(game.rating) < 3) return false;
      if (ratingFilter === 'lowest' && parseFloat(game.rating) >= 3) return false;


      if (platformFilter !== 'all' && !game.platform.includes(platformFilter)) return false;


      if (russianLanguageFilter && !game.languages.includes('RUS')) return false;


      if (multiplayerFilter && !game.multiplayer) return false;

      return true;
    });

    if (filteredResult.length === 0) {

      setErrorActive(true);
    } else {
      setErrorActive(false);
    }
    setFilteredGames(filteredResult as GameDataItem[]);
  };

  const searchHandler = () => {
    setLoading(true)
    setTimeout(() => {
      applyFilters()
      setLoading(false)
    },1000)
  }

  const scrollToElement = (scrollTarget: string) => {

    const element = document.getElementById(scrollTarget);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
  }, [ratingFilter, platformFilter, russianLanguageFilter, multiplayerFilter]);

  return (
    <div className={classes.gameslist}>
      {isLoading ? (
        <div className={classes.loader_block}>
        <Loader width={'100'} height={'100'}/>
        </div>
      ) : (
        <>
          <h1 className={classes.gamelist_title} id="scroll_up">Список игр</h1>
          <form onSubmit={searchHandler}>
            <label htmlFor="rating-filter">Сортировать по рейтингу:</label>
            <select id="rating-filter" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="highest">Высокий рейтинг</option>
              <option value="lowest">Низкий рейтинг</option>
            </select><br />
            <label htmlFor="platform-filter">Платформа:</label>
            <select id="platform-filter" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
              <option value="all">Все</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Web browser">Web browser</option>
              <option value="Xbox">Xbox</option>
            </select><br />
            <input type="checkbox" id="russian-language-filter" checked={russianLanguageFilter}
                   onChange={(e) => setRussianLanguageFilter(e.target.checked)} />
            <label htmlFor="russian-language-filter">Только с русским языком</label><br />
            <input type="checkbox" id="multiplayer-filter" checked={multiplayerFilter}
                   onChange={(e) => setMultiplayerFilter(e.target.checked)} />
            <label htmlFor="multiplayer-filter">Только мультиплеер</label><br />
            <button type="submit">Поиск</button>
          </form>

          <div className={classes.tableContainer}>

            {filteredGames && filteredGames.length > 0 && (
              <div className={classes.scroll_block} onClick={() => scrollToElement('scroll_down')}>
              <span className={classes.scroll_button}>
                Смотреть список вниз <AiOutlineArrowDown size={15} color="blue" />
              </span>
              </div>
            )}
            <table className={classes.table}>
              <thead>
              <tr>
                <th className={classes.headerCell}>Название</th>
                <th className={classes.headerCell}>Рейтинг</th>
                <th className={classes.headerCell}>Платформы</th>
                <th className={classes.headerCell}>Мультиплеер</th>
                <th className={classes.headerCell}>Язык</th>
                <th className={classes.headerCell}>Обложка</th>
              </tr>
              </thead>
              <tbody>
              {filteredGames && filteredGames.map((game, index) => (
                <tr key={index}>
                  <td className={classes.dataCell}>
                    <a href={game.freetogame_profile_url} target="_blank" rel="noopener noreferrer">
                      {game.title}
                    </a>
                  </td>
                  <td className={classes.dataCell}>{game.rating}</td>
                  <td className={classes.dataCell}>{Array.isArray(game.platform) ? game.platform.join(', ') : game.platform}</td>
                  <td className={`${classes.dataCell} ${game.multiplayer ? classes.daCenter : ''}`}>
                    {game.multiplayer ? <AiFillCheckCircle size={20} color='green' /> : <AiFillCheckCircle size={20} color='red' /> }
                  </td>
                  <td className={classes.dataCell}>{game.languages.join(', ')}</td>
                  <td className={classes.dataCell}>
                    <a href={game.freetogame_profile_url} target="_blank" rel="noopener noreferrer">
                      <img src={game.thumbnail} alt="Обложка игры" width="100" />
                    </a>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            {filteredGames && filteredGames.length > 0 && (
              <div className={classes.scroll_block} onClick={() => scrollToElement('scroll_up')}>
              <span className={classes.scroll_button} id="scroll_down">
                Смотреть список вверх <AiOutlineArrowUp size={15} color="blue" />
              </span>
              </div>
            )}
            {errorActive && <h2 className={classes.error}>{error}</h2>}
          </div>
        </>
      )}
    </div>
  );
    ;
};

export default GamesList;
