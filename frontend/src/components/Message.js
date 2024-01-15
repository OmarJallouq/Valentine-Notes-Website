import React, {useEffect, useState} from 'react';

function Message() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/users');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            <form id="messagesForm" method="POST" action="/sendMessage">
                    <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                            <input type="text" name="messageInput" placeholder="Message" class="form-control" />
                            <input type="text" name="senderInput" placeholder="Sender" class="form-control" />
                            <div class="form-control">
                                <h1>User Dropdown Menu with Search</h1>
                                {/* <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                /> */}
                                <label for="lang">Receiver</label>
                                <select name="receiverInput">
                                    {items.map(item => (
                                    <option key={item._id} value={item.name}>
                                        {item.name}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <input type="submit" value="Send" class="btn btn-primary mb-2" />
                        </div>
                    </div>
                </form>
        </section>
    );
}

export default Message;