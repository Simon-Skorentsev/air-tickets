import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changeCurrence, transferFilter } from '../ticketsList/ticketsListSlice';
import styles from "./Filter.module.css";
import cn from "classnames";

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(0);
    const firstRadio = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstRadio.current) firstRadio.current.checked = true;
    }, [])

    return (
        <div className={styles.filter}>
            <div className={styles.currency}>
                <span className={styles.announcement}>Валюта:</span><br/><hr/>
                <div className={styles.currencyButtons}>
                    <button className={cn(styles.rub, styles.currencyButton, {
                        [styles.active]: active === 0
                    })} onClick={() => {dispatch(changeCurrence("rub"));
                    setActive(0)}}>RUB</button>
                    <button className={cn(styles.usd, styles.currencyButton, {
                        [styles.active]: active === 1
                    })} onClick={() => {dispatch(changeCurrence("usd"));
                    setActive(1)}}>USD</button>
                    <button className={cn(styles.eur, styles.currencyButton, {
                        [styles.active]: active === 2
                    })} onClick={() => {dispatch(changeCurrence("eur"));
                    setActive(2)}}>EUR</button>
                </div>
            </div>
                
            <div className={styles.transferCheckers}>
                <span className={styles.announcement}>Количество пересадок:</span>
                <div className={styles.radioButtons}>
                    <div className={styles.radio}>
                        <input type="radio" name="numberOfTransfers" ref={firstRadio} onChange={() => dispatch(transferFilter("all"))}/>
                        <span>Все</span>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="numberOfTransfers" onChange={() => dispatch(transferFilter(0))}/>
                        <span>Без пересадок</span>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="numberOfTransfers" onChange={() => dispatch(transferFilter(1))}/>
                        <span>1 пересадка</span>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="numberOfTransfers" onChange={() => dispatch(transferFilter(2))}/>
                        <span>2 пересадки</span>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="numberOfTransfers" onChange={() => dispatch(transferFilter(3))}/>
                        <span>3 пересадки</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;