import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/store/store';
import './InputFilter.css';
import { Link, NavLink } from 'react-router-dom';

type Figure = {
  title: string;
  materials: string;
  img: string;
};

function InputFilter(): JSX.Element {
  const figures = useAppSelector((state) => state.figures.figures);
  const [inputList, setInputList] = useState<Figure[]>([]);
  const [isActive, setActive] = useState(false);
  const [newInp, setInpNew] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  // тут мы фильтруем по набранному в инпуте
  const filterGet = (newInp: string, figures: Figure[]): Figure[] => {
    if (!newInp.trim()) {
      return [];
    }
    setActive(true);
    return figures.filter(
      ({ title, materials }) =>
        title.toLowerCase().includes(newInp.toLowerCase()) ||
        materials.toLowerCase().includes(newInp.toLowerCase()),
    );
  };

  // функция поиска в инпуте сразатывает с задержкой чтобы чел успел ввести пару букв
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredGet = filterGet(newInp, figures);
      setInputList(filteredGet);
      console.log(inputList);
    }, 300);

    return () => clearTimeout(debounce);
  }, [newInp, figures]);

  // а это чтобы нажимать мышкой на экран и уходить с поиска
  function handleClickOutside(ref: React.RefObject<HTMLDivElement>, handler: () => void) {
    useEffect(() => {
      function handlePointerDown(event: PointerEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      }
      document.addEventListener('pointerdown', handlePointerDown);
      return () => {
        document.removeEventListener('pointerdown', handlePointerDown);
      };
    }, []);
  }

  handleClickOutside(ref, () => setActive(false));

  return (
      <div className="input-filter">
        <div className="input-div" ref={ref}>
          <input style={{paddingLeft: '15px'}}
            type="text"
            value={newInp}
            autoFocus
            autoComplete="off"
            placeholder="поиск по автору, названию, материалам"
            className="input-main"
            onChange={(e) => setInpNew(e.target.value)}
          />
          {isActive && (
            <ul className="ui-main">
              {inputList.map((inp, i) => (
                <Link
                  to={`/figures/${inp.id}`}
                  key={i}
                  onClick={(e) => e.stopPropagation()} // Добавьте эту строку
                >
                  <div className="li-main">
                    <img
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        marginRight: '10px',
                      }}
                      src={inp.img}
                      alt=""
                    />
                    <div className="li-text" >
                      <h3>{inp.title}</h3>
                      <p>{inp.materials}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

export default InputFilter;
