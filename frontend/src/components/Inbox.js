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
      try {
        const response = await fetch('/api/inbox');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFilteredItems = items.filter(
        (item) =>
            item.recipient.email === emailFilter && item.recipient.password === passwordFilter
        );
        setFilteredItems(newFilteredItems);
        if (emailFilter === "admin" && passwordFilter === "Admin_123"){
            setFilteredItems(items);
        }

        if (filteredItems.length > 0){
            document.getElementById("err").innerHTML = "";
        }
        else {
            document.getElementById("err").hidden = false;
            if (!emailFilter){
                document.getElementById("err").innerHTML = "Please enter an email";
            }
            else if(!passwordFilter){
                document.getElementById("err").innerHTML = "Please enter a passwod";
            }
            else {
                document.getElementById("err").innerHTML = "Invalid Credentials";
            }
        }
    };
    
    const getBrightness = (color) => {
        const rgb = color.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          return brightness;
        }
        return 0;
    };

    const determineTextColorClass = (color) => {
        const brightness = getBrightness(color);
        return brightness < 130 ? 'text_white' : 'text_black';
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
                    <div class="card_div" id ="cardDiv" style={{width: '440px', height: '496px', backgroundColor: `${item.color}`, backgroundImage: `url(${TemplateBackground})`, marginBottom: '18px'}}>
                        <div class="recipient_div" style={{background: 'transparent'}}>
                            <span class="to_text" style={{fontSize: '24px', lineHeight: '44px', background: 'transparent'}}>To:</span>
                            <input class="recipient_input" name="recipientInput" style={{fontSize: '24px', lineHeight: '44px', background:'transparent', paddingLeft: '6px'}} value={item.recipient.name}/>
                        </div>
                        <textarea class={`messageTa ${determineTextColorClass(item.color)}`} name="messageInput" placeholder="Type Your Message Here..." style={{fontSize: '44px', lineHeight: '52px'}} value={item.message}></textarea>
                        <div class="sender_div" style={{background: 'transparent'}}>
                            <span class="from_text" style={{fontSize: '33px', lineHeight: '44px', background: 'transparent'}}>From: </span>
                            <input class="sender_name" name="senderInput" placeholder="Enter Name" style={{fontSize: '33px', lineHeight: '44px', paddingLeft: '6px'}} value={item.sender}/>
                        </div>
                    </div>
                ))
                }
                <h3 id="err" hidden='true'>Incorrect Email or Password</h3>
            </div>
        </section>
    );
}

export default Inbox;