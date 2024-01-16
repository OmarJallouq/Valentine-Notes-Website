import React, {useEffect, useState} from 'react';
import TemplateBackground from '../styles/template.png';
import '../styles/inbox.css';

function Inbox() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [emailFilter, setEmailFilter] = useState('');
    const [passwordFilter, setPasswordFilter] = useState('');
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      const data = await fetch('/inbox');
      const items = await data.json();
      setItems(items);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newFilteredItems = items.filter(
        (item) =>
          item.recipient.email === emailFilter && item.recipient.password === passwordFilter
      );
      setFilteredItems(newFilteredItems);
    };

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <div id="loginForm">
                    <div>
                        <label>Email:</label>
                        <input type="text" name="emailInput" placeholder="Put your email here" onChange={(e) => setEmailFilter(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="passwordInput" placeholder="Put your password here" onChange={(e) => setPasswordFilter(e.target.value)}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div class="cards">
                {
                filteredItems.map(item => (
                    <div class="card_div" id ="cardDiv" style={{width: '440px', height: '496px', backgroundColor: `${item.color}`, backgroundImage: `url(${TemplateBackground})`}}>
                        <div class="recipient_div" style={{background: 'transparent'}}>
                            <span class="to_text" style={{fontSize: '24px', lineHeight: '44px', background: 'transparent'}}>To:</span>
                            <input class="recipient_input" name="recipientInput" style={{fontSize: '24px', lineHeight: '44px', background:'transparent', paddingLeft: '6px'}} value={item.recipient.name}/>
                        </div>
                        <textarea class="messageTA submit_lightScheme__lLwOA" name="messageInput" placeholder="Type Your Message Here..." style={{fontSize: '44px', lineHeight: '52px'}} value={item.message}></textarea>
                        <div class="sender_div" style={{background: 'transparent'}}>
                            <span class="from_text" style={{fontSize: '33px', lineHeight: '44px', background: 'transparent'}}>From: </span>
                            <input class="sender_name" name="senderInput" placeholder="Enter Name" style={{fontSize: '33px', lineHeight: '44px', paddingLeft: '6px'}} value={item.sender}/>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    );
}

export default Inbox;