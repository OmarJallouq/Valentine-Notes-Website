import React, {useEffect, useState} from 'react';
import '../styles/messageBox.css';
import TemplateBackground from '../styles/template.png';


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
                        <input type="submit" value="Send" class="btn btn-primary mb-2" />
                    </div>
                <h1>NEXXXXTTTT</h1>
                <div class="submit_wrapper">
                    <div class="card_div" style={{width: '440px', height: '496px', backgroundColor: 'rgb(0, 0, 0)', backgroundImage: `url(${TemplateBackground})`}}>
                        <div class="recipient_div" style={{background: 'transparent'}}>
                            <span class="to_text" style={{fontSize: '24px', lineHeight: '44px', background: 'transparent'}}>To:</span>
                            <select class="recipient_input" name="recipientInput" style={{fontSize: '24px', lineHeight: '44px', background:'transparent'}}>
                                {items.map(item => (
                                <option key={item._id} value={item.name}>
                                    {item.name}
                                </option>
                                ))}
                            </select>
                            {/* <input class="recipient_name" name="RecipientName" placeholder="Enter Name" style={{fontSize: '33px', lineHeight: '44px'}}/> */}
                        </div>
                        <textarea class="messageTA submit_lightScheme__lLwOA" name="messageInput" placeholder="Type Your Message Here..." style={{fontSize: '44px', lineHeight: '52px'}}></textarea>
                        <div class="sender_div" style={{background: 'transparent'}}>
                            <span class="from_text" style={{fontSize: '33px', lineHeight: '44px', background: 'transparent'}}>From: </span>
                            <input class="sender_name" name="senderInput" placeholder="Enter Name" style={{fontSize: '33px', lineHeight: '44px'}}/>
                        </div>
                    </div>
                    <div class="colors_div">
                        <div class="color_palette_div">
                            <span class="colorItem" title="white" style={{backgroundColor: 'rgb(255, 255, 255)',}}></span>
                            <span class="colorItem" title="light-grey" style={{backgroundColor: 'rgb(162, 162, 162)',}}></span>
                            <span class="colorItem" title="grey" style={{backgroundColor: 'rgb(107, 107, 107)',}}></span>
                            <span class="colorItem" title="black" style={{backgroundColor: 'rgb(0, 0, 0)',}}></span>
                            <span class="colorItem" title="light-orange" style={{backgroundColor: 'rgb(253, 164, 74)',}}></span>
                            <span class="colorItem" title="yellow" style={{backgroundColor: 'rgb(254, 254, 124)',}}></span>
                            <span class="colorItem" title="tan" style={{backgroundColor: 'rgb(237, 219, 186)',}}></span>
                            <span class="colorItem" title="brown" style={{backgroundColor: 'rgb(162, 112, 64)',}}></span>
                            <span class="colorItem" title="blue-grey" style={{backgroundColor: 'rgb(169, 184, 187)',}}></span>
                            <span class="colorItem" title="turquoise" style={{backgroundColor: 'rgb(105, 140, 142)',}}></span>
                            <span class="colorItem" title="pale-blue" style={{backgroundColor: 'rgb(169, 209, 238)',}}></span>
                            <span class="colorItem" title="light-blue" style={{backgroundColor: 'rgb(70, 210, 252)',}}></span>
                            <span class="colorItem" title="purple" style={{backgroundColor: 'rgb(113, 27, 207)',}}></span>
                            <span class="colorItem" title="light-purple" style={{backgroundColor: 'rgb(163, 119, 251)',}}></span>
                            <span class="colorItem" title="dull-purple" style={{backgroundColor: 'rgb(140, 126, 150)',}}></span>
                            <span class="colorItem" title="pale-purple" style={{backgroundColor: 'rgb(209, 197, 216)',}}></span>
                            <span class="colorItem" title="maroon" style={{backgroundColor: 'rgb(137, 4, 4)',}}></span>
                            <span class="colorItem" title="red" style={{backgroundColor: 'rgb(248, 27, 27)',}}></span>
                            <span class="colorItem" title="orange" style={{backgroundColor: 'rgb(249, 119, 36)',}}></span>
                            <span class="colorItem" title="tangerine" style={{backgroundColor: 'rgb(253, 163, 126)',}}></span>
                            <span class="colorItem" title="army-green" style={{backgroundColor: 'rgb(113, 128, 91)',}}></span>
                            <span class="colorItem" title="dark-green" style={{backgroundColor: 'rgb(5, 112, 8)',}}></span>
                            <span class="colorItem" title="green" style={{backgroundColor: 'rgb(68, 208, 70)',}}></span>
                            <span class="colorItem" title="light-green" style={{backgroundColor: 'rgb(167, 254, 167)',}}></span>
                            <span class="colorItem" title="blue" style={{backgroundColor: 'rgb(18, 39, 252)',}}></span>
                            <span class="colorItem" title="dark-blue" style={{backgroundColor: 'rgb(5, 62, 160)',}}></span>
                            <span class="colorItem" title="wine" style={{backgroundColor: 'rgb(96, 52, 66)',}}></span>
                            <span class="colorItem" title="dark-purple" style={{backgroundColor: 'rgb(52, 28, 63)',}}></span>
                            <span class="colorItem" title="pale-pink" style={{backgroundColor: 'rgb(251, 224, 233)',}}></span>
                            <span class="colorItem" title="light-pink" style={{backgroundColor: 'rgb(253, 166, 253)',}}></span>
                            <span class="colorItem" title="pink" style={{backgroundColor: 'rgb(249, 120, 209)',}}></span>
                            <span class="colorItem" title="peach" style={{backgroundColor: 'rgb(252, 209, 166)',}}></span>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Message;