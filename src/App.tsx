import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchFacts } from './store/factsSlice';
import './index.css'

interface Fact {
    id: number;
    fact: string;
}

function App(): JSX.Element {
    const dispatch: AppDispatch = useDispatch();
    const facts = useSelector((state: RootState) => state.facts.facts);
    const status = useSelector((state: RootState) => state.facts.status);
    const error = useSelector((state: RootState) => state.facts.error);
    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(fetchFacts(count));
    }, [count, dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCount = Number(event.target.value);
        if (newCount <= 5 && newCount >= 0) {
            setCount(newCount);
        }
    };

    const renderFacts = () => {
        if (status === 'loading') {
            return <div>Loading...</div>;
        }

        if (status === 'failed') {
            return <div>{error}</div>;
        }

        return (
            <>
                <ul className="list">
                    {facts.slice(0, count).map((fact: Fact) => (
                        <li className="list-item" key={fact.id}>{fact.fact}</li>
                    ))}
                </ul>
            </>

        );
    };

    return (
        <div className="container">
            <label className="label" htmlFor="count-input">Enter a number from 1 to 5:</label>
            <input
                id="count-input"
                className="input"
                type="number"
                min={1}
                max={5}
                pattern="[1-5]"
                value={count || ""}
                onChange={handleChange}
            />
            {renderFacts()}
        </div>
    );
}

export default App;
