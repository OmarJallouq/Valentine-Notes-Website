import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateBackground from '../styles/template.png';
import '../styles/inbox.css';

function Inbox() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [emailFilter, setEmailFilter] = useState('');
    const [passwordFilter, setPasswordFilter] = useState('');
    const VALENTINESDAY = true

    useEffect(() => {
      fetchItems();
    }, []);
    
    const handleMessageClick = () => {
        // Navigate to another route within your SPA
        navigate('/send-a-message');
    };

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

        const userSelected = users.find(
            (user) =>
                user.email === emailFilter && user.password === passwordFilter
        );

        if (userSelected || (emailFilter === "admin" && passwordFilter === "Admin_123")){
            document.getElementById("err").hidden = true;
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

        setFilteredItems([{"_id":"65b83ad63372ee2ed894a1b1","sender":"SECRET ","recipient":null,"message":"HI URE CUTE","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83bc23372ee2ed894a1b7","sender":"Anonymous","recipient":null,"message":"I HAVE A BUNNY CALLED NESQUIK","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83bc93372ee2ed894a1bb","sender":"Anonymous","recipient":null,"message":"HES RLY CUTE","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83bd53372ee2ed894a1bf","sender":"Anonymous","recipient":null,"message":"HOW LONG OF A MESSAGE CAN I SEND\r\n","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83be93372ee2ed894a1c3","sender":"Anonymous","recipient":null,"message":"WHAT IF I WANT TO POUR MY HEART OUT TO SOMEONE","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83bf83372ee2ed894a1c7","sender":"Anonymous","recipient":null,"message":"IN A LONG ASS NOVEL CONFESSION\r\n","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83c3a3372ee2ed894a21d","sender":"Anonymous","recipient":null,"message":"DO U KNOW THT SONG THAT GOES \"LALALLALALA\"","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83c4d3372ee2ed894a2c7","sender":"Anonymous","recipient":null,"message":"ROSES ARE RED","BGcolor":"rgb(248, 027, 027)","TextColor":"#fff","__v":0},{"_id":"65b83c553372ee2ed894a2d2","sender":"Anonymous","recipient":null,"message":"VIOLETS ARE BLUE","BGcolor":"rgb(018, 039, 252)","TextColor":"#fff","__v":0},{"_id":"65b83c603372ee2ed894a375","sender":"Anonymous","recipient":null,"message":"IM GOING TO SLEEP NOW","BGcolor":"rgb(249, 120, 209)","TextColor":"#000","__v":0},{"_id":"65b83c6a3372ee2ed894a3f4","sender":"Anonymous","recipient":null,"message":"AND SO SHOULD U","BGcolor":"rgb(167, 254, 167)","TextColor":"#000","__v":0},{"_id":"65b83d963372ee2ed894a40b","sender":"Anonymous","recipient":{"_id":"65b83c443372ee2ed894a2b2","name":"Omar Jallouq","email":"omarjallouq@gmail.com","password":"123456","__v":0},"message":"UR CAT HAS A RLY COOL NAME","BGcolor":"rgb(249, 119, 036)","TextColor":"#000","__v":0},{"_id":"65b83dab3372ee2ed894a410","sender":"Anonymous","recipient":{"_id":"65b83c443372ee2ed894a2b2","name":"Omar Jallouq","email":"omarjallouq@gmail.com","password":"123456","__v":0},"message":"V IS SUCH A NICE LETTER","BGcolor":"rgb(113, 027, 207)","TextColor":"#fff","__v":0},{"_id":"65b83e703372ee2ed894a417","sender":"Anonymous","recipient":{"_id":"65b83c3b3372ee2ed894a230","name":"USER1","email":"aiyshatarawneh@gmail.com","password":"password","__v":0},"message":"I CANT WAIT TO RELEASE IT \r\n\r\nXOXO,\r\nGOSSIP GIRL","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83e853372ee2ed894a41e","sender":"Anonymous","recipient":{"_id":"65b83c3b3372ee2ed894a230","name":"USER1","email":"aiyshatarawneh@gmail.com","password":"password","__v":0},"message":"BTW I FEEL LIKE 85% of the messages will be us","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b83ea03372ee2ed894a425","sender":"hello","recipient":{"_id":"65b83c443372ee2ed894a2b2","name":"Omar Jallouq","email":"omarjallouq@gmail.com","password":"123456","__v":0},"message":"test","BGcolor":"rgb(248, 027, 027)","TextColor":"#fff","__v":0},{"_id":"65b83ea03372ee2ed894a429","sender":"Anonymous","recipient":{"_id":"65b83c3b3372ee2ed894a230","name":"USER1","email":"aiyshatarawneh@gmail.com","password":"password","__v":0},"message":"but we gotta do what we gotta do to save bai from antisocial behaviour","BGcolor":"rgb(255,255,255)","TextColor":"#fff","__v":0},{"_id":"65b8f4f18cfd6efa7edcaf12","sender":"babygaga","recipient":{"_id":"65b83c443372ee2ed894a2b2","name":"Omar Jallouq","email":"omarjallouq@gmail.com","password":"123456","__v":0},"message":"suck my monstrous COCK","BGcolor":"rgb(249, 120, 209)","TextColor":"#000","__v":0}]);
    };

    return(
        <section>
            {VALENTINESDAY ? (
                <div>
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
                            items.map(item => (
                                <div key={item.id} class="card_div" id ="cardDiv" style={{width: '440px', height: '496px', backgroundColor: `${item.BGcolor}`, backgroundImage: `url(${TemplateBackground})`, marginBottom: '18px'}}>
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
                    </div>
                    <h3 id="err" hidden='true'>Incorrect Email or Password</h3>
                </div>
            ) : (
                <div style={{paddingTop: '18px'}}>
                    <div class="wrapper" style={{justifyContent: 'center'}}>
                        <h3 style={{color: 'white'}}>You can access your messages on the 14th of February! Check back then!</h3>
                        <button onClick={handleMessageClick} style={{paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 8, border: '3px #FF82A9 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', margin: 'auto'}}>
                            <div style={{color: '#FF82A9', backgroundColor: 'transparent', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'normal', whiteSpace: 'nowrap', margin: 'auto'}}>Send a Message</div>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Inbox;