import { useMemo, useState } from "react";
import Clicker from "./components/Clicker";
import People from "./components/People";

export default function App({ clickersCount, children }) {

    const [hasClicker, setHasClicker] = useState(true);
    const [count, setCount] = useState(0);

    const toggleClickerClick = () => {
        setHasClicker(!hasClicker);
    };

    const incrementCount = () => {
        setCount(count + 1);
    };

    const colors = useMemo(() => {
        const colors = [];

        for (let i = 0; i < clickersCount; i++) {
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
        }

        return colors;
    }, [clickersCount]);

    return <>
        {children}

        <div>Total count: {count}</div>

        <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} clicker</button>

        {/* toggle Clicker */}
        {hasClicker && <>
            {[...Array(clickersCount)].map((v, i) => {
                return <Clicker
                    key={i}
                    incrementCount={incrementCount}
                    keyName={`count${i}`}
                    color={colors[i]}
                />;
            })}
        </>}

        <People />
    </>;
}

