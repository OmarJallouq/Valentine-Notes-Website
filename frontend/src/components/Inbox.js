import React, {useEffect, useState} from 'react';

function Inbox() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/inbox');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            {
            items.map(item => (
                <div>
                    <p>{item.to}</p>
                    <p>{item.message}</p>
                    <p>from: {item.from}</p>
                </div>
            ))
            }
        </section>
    );
}

export default Inbox;