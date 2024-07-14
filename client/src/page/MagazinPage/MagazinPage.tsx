import React, { useState } from 'react';
import { useAppSelector } from '../../app/store/store';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FigureItem from '../../entities/figures/ui/FigureItem';
import { Figure } from '../../entities/figures/types/figureTypes';
import { Link } from 'react-router-dom';

type PriceRange = [number, number];

type Figures = {
    figure: Figure;
}

const MagazinPage = (): JSX.Element => {
    const [selectCategor, setSelectCategor] = useState<string>('');
    const [statePseudonym, setStatePseudonym] = useState<string>('');
    const [stateMaterial, setStateMaterial] = useState<string>('');
    const [stateWidth, setStateWidth] = useState<PriceRange>([1, 7000]); 
    const [stateHeight, setStateHeight] = useState<PriceRange>([1, 7000]); 
    const [stateTitle, setStateTitle] = useState<string>('');
    const [stateDate, setStateDate] = useState<PriceRange>([1, 2025]); 
    const [priceRange, setPriceRange] = useState<PriceRange>([100, 1000000]);
    const [filteredFigures, setFilteredFigures] = useState<Figures[]>([]);

    const { categories } = useAppSelector((state) => state.categories);
    const { figures } = useAppSelector((state) => state.figures);

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

    const onHandleGetCart = () => {
        const filtered = figures.filter(({ pseudonym, materials, price, width, height, title, date }) => {
            return (
                (!selectCategor || pseudonym.toLowerCase().includes(selectCategor.toLowerCase())) &&
                (!statePseudonym.trim() || pseudonym.toLowerCase().includes(statePseudonym.toLowerCase())) &&
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
        }).map((filteredFigure) => ({ figure: filteredFigure }))
    
        setFilteredFigures(filtered);
    };

    return (
        <div className='MagazinPage'>
            <div className="contener">  
                <div className="categor">
                    <div className="selector-categor">
                        <select 
                            value={selectCategor}
                            onChange={(e) => setSelectCategor(e.target.value)}>
                            <option value="">--выберите роль--</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="pseudonym">
                    <input 
                        type="text"
                        value={statePseudonym}
                        onChange={(e) => setStatePseudonym(e.target.value)} 
                    />
                </div>
                <div className="title">
                    <input 
                        type="text"
                        value={stateTitle}
                        onChange={(e) => setStateTitle(e.target.value)} 
                    />
                </div>
                <div className="price">
                    <div style={{ marginTop: '20px' }}>
                        <p>Ширина картины: от {stateWidth[0]} до {stateWidth[1]}</p>
                        <Slider
                            range
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
                        <p>Высота картины: от {stateHeight[0]} до {stateHeight[1]}</p>
                        <Slider
                            range
                            min={1}
                            max={7000}
                            step={1}
                            value={stateHeight}
                            onChange={handleStateHeight}
                        />
                    </div>
                </div>    
                <div className="material">
                    <input 
                        type="text"
                        value={stateMaterial}
                        onChange={(e) => setStateMaterial(e.target.value)} 
                    />
                </div>
                <div className="date">
                    <div style={{ marginTop: '20px' }}>
                        <p>Дата: от {stateDate[0]} до {stateDate[1]}</p>
                        <Slider
                            range
                            min={0}
                            max={2025}
                            step={1}
                            value={stateDate}
                            onChange={handleStateDate}
                        />
                    </div>
                </div>    
                <div className="price">
                    <div style={{ marginTop: '20px' }}>
                        <p>Цена: от {priceRange[0]} до {priceRange[1]}</p>
                        <Slider
                            range
                            min={100}
                            max={1000000}
                            step={10}
                            value={priceRange}
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>   
                <div className="results">
                    <button onClick={onHandleGetCart}>Найти</button>
                    <h2>Результаты поиска:</h2>
                    <ul>
                        {filteredFigures.map(({ figure }) => (
                            <Link to='*'>
                            <FigureItem figure={figure} key={figure.id}/>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MagazinPage;