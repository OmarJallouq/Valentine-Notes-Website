import React, {useEffect, useState} from 'react';
import TemplateBackground from '../styles/template.png';
import '../styles/inbox.css';

function Inbox() {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [emailFilter, setEmailFilter] = useState('');
    const [passwordFilter, setPasswordFilter] = useState('');
    const VALENTINESDAY = false;
  
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

      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
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
        if(VALENTINESDAY){
            setFilteredItems(newFilteredItems);
        }
        if (emailFilter === "admin" && passwordFilter === "Admin_123"){
            setFilteredItems(items);
        }

        const userSelected = users.filter(
            (user) =>
                user.email === emailFilter && user.password === passwordFilter
        );

        if (userSelected.length > 0 || (emailFilter === "admin" && passwordFilter === "Admin_123")){
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

    return(
        <section>
            <form class="form" onSubmit={handleSubmit}>
                <div class="wrapper">
                    <div class="title">Welcome,<br/><span>Enter credentials to continue</span></div>
                    <div>
                        <input class="input" type="text" name="emailInput" placeholder="Put your email here" onChange={(e) => setEmailFilter(e.target.value)}/>
                    </div>
                    <div>
                        <input class="input" type="password" name="passwordInput" placeholder="Put your password here" onChange={(e) => setPasswordFilter(e.target.value)}/>
                    </div>
                    <button class="button-confirm" type="submit">Submit</button>
                </div>
            </form>
            <div class="cards">
                { 
                filteredItems.map(item => (
                    <div class="card_div" id ="cardDiv" style={{width: '440px', height: '496px', backgroundColor: `${item.BGcolor}`, backgroundImage: `url(${TemplateBackground})`, marginBottom: '18px'}}>
                        <div class="recipient_div" style={{background: 'transparent'}}>
                            <span class="to_text" style={{fontSize: '24px', lineHeight: '44px', background: 'transparent'}}>To:</span>
                            <input class="recipient_input" name="recipientInput" style={{fontSize: '24px', lineHeight: '44px', background:'transparent', paddingLeft: '6px'}} value={item.recipient.name}/>
                        </div>
                        <textarea class="messageTA" name="messageInput" placeholder="Type Your Message Here..." style={{fontSize: '44px', lineHeight: '52px', color: item.TextColor ? item.TextColor : '#fff'}} value={item.message}></textarea>
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