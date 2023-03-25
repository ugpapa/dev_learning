import { useRef, useEffect, useState } from "react";

export default function Clicker({ incrementCount, keyName, color = "blue" }) {
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));

    const buttonRef = useRef();

    // call once after first render
    useEffect(() => {
        // don't forget to add '.current'
        buttonRef.current.style.backgroundColor = 'papayawhip';
        buttonRef.current.style.color = 'salmon';

        // dispose component
        return () => {
            localStorage.removeItem(keyName);
            console.log('component disposed');
        };
    }, []);

    // update on count variable change
    useEffect(() => {
        localStorage.setItem(keyName, count);
    }, [count]);

    const buttonClick = () => {
        setCount(v => v + 1);
        incrementCount();
    };

    return <div>
        <div style={{ color: color }}>Click count: {count}</div>
        <button ref={buttonRef} onClick={buttonClick}>Click me</button>
    </div>;
}