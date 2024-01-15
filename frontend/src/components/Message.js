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

    const [cardBackgroundColor, setCardBackgroundColor] = useState('');

    const ChangeColor = (color) => {
        setCardBackgroundColor(color);
    };

    return(
        <section>
            <form id="messagesForm" method="POST" action="/sendMessage">
                    <div class="input-group justify-content-center">
                        <input type="submit" value="Send" class="btn btn-primary mb-2" />
                    </div>
                <h1>NEXXXXTTTT</h1>
                <div class="submit_wrapper">
                    <div class="card_div" style={{width: '440px', height: '496px', backgroundColor: `${cardBackgroundColor}`, backgroundImage: `url(${TemplateBackground})`}}>
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
                            <span class="colorItem" onClick={() => ChangeColor('rgb(255, 255, 255)')} title="white" style={{ backgroundColor: 'rgb(255, 255, 255)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(162, 162, 162)')} title="light-grey" style={{ backgroundColor: 'rgb(162, 162, 162)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(107, 107, 107)')} title="grey" style={{ backgroundColor: 'rgb(107, 107, 107)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(000, 000, 000)')} title="black" style={{ backgroundColor: 'rgb(0, 0, 0)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(253, 164, 074)')} title="light-orange" style={{ backgroundColor: 'rgb(253, 164, 74)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(254, 254, 124)')} title="yellow" style={{ backgroundColor: 'rgb(254, 254, 124)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(237, 219, 186)')} title="tan" style={{ backgroundColor: 'rgb(237, 219, 186)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(162, 112, 064)')} title="brown" style={{ backgroundColor: 'rgb(162, 112, 64)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(169, 184, 187)')} title="blue-grey" style={{ backgroundColor: 'rgb(169, 184, 187)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(105, 140, 142)')} title="turquoise" style={{ backgroundColor: 'rgb(105, 140, 142)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(169, 209, 238)')} title="pale-blue" style={{ backgroundColor: 'rgb(169, 209, 238)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(070, 210, 252)')} title="light-blue" style={{ backgroundColor: 'rgb(70, 210, 252)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(113, 027, 207)')} title="purple" style={{ backgroundColor: 'rgb(113, 27, 207)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(163, 119, 251)')} title="light-purple" style={{ backgroundColor: 'rgb(163, 119, 251)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(140, 126, 150)')} title="dull-purple" style={{ backgroundColor: 'rgb(140, 126, 150)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(209, 197, 216)')} title="pale-purple" style={{ backgroundColor: 'rgb(209, 197, 216)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(137, 004, 004)')} title="maroon" style={{ backgroundColor: 'rgb(137, 4, 4)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(248, 027, 027)')} title="red" style={{ backgroundColor: 'rgb(248, 27, 27)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(249, 119, 036)')} title="orange" style={{ backgroundColor: 'rgb(249, 119, 36)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(253, 163, 126)')} title="tangerine" style={{ backgroundColor: 'rgb(253, 163, 126)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(113, 128, 091)')} title="army-green" style={{ backgroundColor: 'rgb(113, 128, 91)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(005, 112, 008)')} title="dark-green" style={{ backgroundColor: 'rgb(5, 112, 8)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(068, 208, 070)')} title="green" style={{ backgroundColor: 'rgb(68, 208, 70)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(167, 254, 167)')} title="light-green" style={{ backgroundColor: 'rgb(167, 254, 167)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(018, 039, 252)')} title="blue" style={{ backgroundColor: 'rgb(18, 39, 252)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(005, 062, 160)')} title="dark-blue" style={{ backgroundColor: 'rgb(5, 62, 160)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(096, 052, 066)')} title="wine" style={{ backgroundColor: 'rgb(96, 52, 66)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(052, 028, 063)')} title="dark-purple" style={{ backgroundColor: 'rgb(52, 28, 63)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(251, 224, 233)')} title="pale-pink" style={{ backgroundColor: 'rgb(251, 224, 233)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(253, 166, 253)')} title="light-pink" style={{ backgroundColor: 'rgb(253, 166, 253)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(249, 120, 209)')} title="pink" style={{ backgroundColor: 'rgb(249, 120, 209)' }}></span>
                            <span class="colorItem" onClick={() => ChangeColor('rgb(252, 209, 166)')} title="peach" style={{ backgroundColor: 'rgb(252, 209, 166)' }}></span>
                        </div>
                    </div>
                </div>
            </form>

            <script type="module" src="/src/componentsmain.js"></script>

        </section>
    );
}

export default Message;