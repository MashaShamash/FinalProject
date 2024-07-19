import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from '../../app/store/store';
import 'rc-slider/assets/index.css';
import FigureItem from '../../entities/figures/ui/FigureItem';
import type { Figure } from '../../entities/figures/types/figureTypes';
import { Loader } from '../../widgets/Loading/Loader';
import CategoryPage from '../CategoryPage/CategoryPage';
import './MagazinPage.css';

type PriceRange = [number, number];

type Figures = {
  figure: Figure;
};

function MagazinPage(): JSX.Element {
  const { categories } = useAppSelector((state) => state.categories);
  const { figures } = useAppSelector((state) => state.figures);
  const [selectCategor, setSelectCategor] = useState<string>('');
  const [statePseudonym, setStatePseudonym] = useState<string>('');
  const [stateMaterial, setStateMaterial] = useState<string>('');
  const [stateWidth, setStateWidth] = useState<PriceRange>([1, 7000]);
  const [stateHeight, setStateHeight] = useState<PriceRange>([1, 7000]);
  const [stateTitle, setStateTitle] = useState<string>('');
  const [stateDate, setStateDate] = useState<PriceRange>([1, 2025]);
  const [priceRange, setPriceRange] = useState<PriceRange>([100, 1000000]);
  const [filteredFigures, setFilteredFigures] = useState<Figure[]>(figures);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(figures.slice(0, 20));
  const [isExpanded, setIsExpanded] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
    }, 2000);
    return () => clearTimeout(id);
  }, [loading]);

  const handlePriceChange = (value: number | number[]) => {
    setPriceRange(value as PriceRange);
  };

  const handleStateDate = (value: number | number[]) => {
    setStateDate(value as PriceRange);
  };

  const handleStateWidth = (value: number | number[]) => {
    setStateWidth(value as PriceRange);
  };

  const handleStateHeight = (value: number | number[]) => {
    setStateHeight(value as PriceRange);
  };

  const onHandleGetBasket = () => {
    const filteredFigures = figures.filter((figure) => {
      const { pseudonym, materials, price, width, height, title, date, categoryId } = figure;
      return (
        (!selectCategor || +selectCategor === figure.categoryId) &&
        (!statePseudonym.trim() ||
          pseudonym.toLowerCase().includes(statePseudonym.toLowerCase())) &&
        (!stateMaterial.trim() || materials.toLowerCase().includes(stateMaterial.toLowerCase())) &&
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        width >= stateWidth[0] &&
        width <= stateWidth[1] &&
        height >= stateHeight[0] &&
        height <= stateHeight[1] &&
        date >= stateDate[0] &&
        date <= stateDate[1] &&
        (!stateTitle.trim() || title.toLowerCase().includes(stateTitle.toLowerCase()))
      );
    });

    setFilteredFigures(filteredFigures);
    setIsOpen(true);

    setItems(filteredFigures.slice(0, 20));
  };
  const fetchMoreData = () => {
    if (items.length >= figures.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(figures.slice(items.length, items.length + 20)));
    }, 1500);
  };


  const onHeandleWrite = (): void => {
    setSelectCategor('');
    setStatePseudonym('');
    setStateMaterial('');
    setStateWidth([1, 7000]);
    setStateHeight([1, 7000]);
    setStateTitle('');
    setStateDate([1, 2025]);
    setPriceRange([100, 1000000]);
    setFilteredFigures(figures);
    setIsOpen(false);
  };

  return (
    <>
    {loading ? (
    <div className="wrappers">
      <div className="MagazinPage">
        <div className='sautBar'>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Скрыть' : 'Показать'} фильтры
          </button>
          <div className={`contener ${isExpanded ? 'active' : ''}`}>
            <div className="categor">
              <div className="selector-categor">
                <span className="material-span">Категория: </span>
                <select
                  value={selectCategor}
                  className="category-sel"
                  onChange={(e) => setSelectCategor(e.target.value)}
                >
                  <option value="">Выбрать категорию</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pseudonym">
                <span className="material-span">Псевдоним автора: </span>
                <input
                  className="pseudonym-input"
                  type="text"
                  value={statePseudonym}
                  onChange={(e) => setStatePseudonym(e.target.value)}
                />
              </div>
              <div className="title">
                <span className="material-span">Название картины: </span>
                <input
                  type="text"
                  className="title-input"
                  value={stateTitle}
                  onChange={(e) => setStateTitle(e.target.value)}
                />
              </div>
              <div className="material">
                <span className="material-span">Материал: </span>
                <input
                  type="text"
                  className="material-input"
                  value={stateMaterial}
                  onChange={(e) => setStateMaterial(e.target.value)}
                />
              </div>
            </div>
            <div className="conteiner-slider">
              <div className="price">
                <div style={{ marginTop: '20px' }}>
                  <p className="material-spa">Ширина картины: от {stateWidth[0]} до {stateWidth[1]} мм</p>
                  <Slider
                    range
                    className="price-slider"
                    min={1}
                    max={7000}
                    step={1}
                    value={stateWidth}
                    onChange={handleStateWidth}
                  />
                </div>
              </div>
              <div className="height">
                <div style={{ marginTop: '20px' }}>
                  <p className="material-spa">Высота картины: от {stateHeight[0]} до {stateHeight[1]} мм</p>
                  <Slider
                    range
                    className="height-slider"
                    min={1}
                    max={7000}
                    step={1}
                    value={stateHeight}
                    onChange={handleStateHeight}
                  />
                </div>
              </div>
              <div className="date">
                <div style={{ marginTop: '20px' }}>
                  <p className="material-spa">Дата: от {stateDate[0]} до {stateDate[1]} года</p>
                  <Slider
                    range
                    min={0}
                    className="date-slider"
                    max={2025}
                    step={1}
                    value={stateDate}
                    onChange={handleStateDate}
                  />
                </div>
              </div>
              <div className="price">
                <div style={{ marginTop: '20px' }}>
                  <p className="material-spa">Цена: от {priceRange[0]} до {priceRange[1]} рублей</p>
                  <Slider
                    range
                    className="price-slider"
                    min={100}
                    max={1000000}
                    step={10}
                    value={priceRange}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
            <div className="buttonSearch">
              <button onClick={() => onHandleGetBasket()}>Найти</button>
              <button onClick={()=> onHeandleWrite()}>Очистить</button>
            </div>
          </div>
        </div>
        <div className='hpo'>
        <div className='jhg'>
          <CategoryPage />
        </div>
        <div className="results">
          {isOpen ? (
            <h2>По вашему запросу найдено: {filteredFigures.length} произведений исскуств</h2>
          ) : (
            <h2>Предлагаем к просмотру: {figures.length} произведений исскуств.</h2>
          )}
          <InfiniteScroll
            style={{
              height: 'auto',
              overflow: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more figures to display</p>}
          >
            {filteredFigures &&
              filteredFigures.map((figure) => (
                <div key={figure.id}>
                  <FigureItem figure={figure} key={figure.id} />
                </div>
              ))}
          </InfiniteScroll>
        </div>
        </div>
      </div>
    </div>) : (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
        <header>
          <h1>Welcome to Website</h1>
        </header>
      </div>
    )}
    </>
  );
}
export default MagazinPage;
