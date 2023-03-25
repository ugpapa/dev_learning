import { useEffect, useState } from "react";

export default function People() {
    const [people, setPeople] = useState([
        { id: 0, name: 'Gavin' },
        { id: 1, name: 'Nguyen' },
        { id: 2, name: 'Phuong' },
        { id: 3, name: 'Bereket' },
        { id: 4, name: 'Yang' },
        { id: 5, name: 'Tweety' }
    ]);

    const getPeople = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const people = await response.json();
        setPeople(people);
    };

    useEffect(() => {
        getPeople();
    }, []);

    return <div>
        <h2>People</h2>
        <ul>
            {people.map((person, i) => <li key={person.id}>{person.name}</li>)}
        </ul>

    </div>;
}