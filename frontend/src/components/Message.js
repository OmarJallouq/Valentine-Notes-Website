import React, {useEffect, useState, useCallback} from 'react';
import '../styles/message.css';
import TemplateBackground from '../styles/template.png';


function Message() {
    const [cardBackgroundColor, setCardBackgroundColor] = useState('rgb(0, 0, 0)');
    const ChangeTextColor = useCallback(() => {
        const getBrightness = (color) => {
          const rgb = color.match(/\d+/g);
          if (rgb) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            return brightness;
          }
          return 0;
        };
      
        const isDarkBackground =
          cardBackgroundColor === 'rgb(0, 0, 0)' || getBrightness(cardBackgroundColor) < 130;
        const textColor = isDarkBackground ? '#fff' : '#000';
        setTextColor(textColor);
      }, [cardBackgroundColor]);

    useEffect(() => {
        fetchItems();
        ChangeTextColor();
    }, [cardBackgroundColor, ChangeTextColor]);
    
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [messageCharacterError, setMessageCharacterError] = useState(false);
    const [senderCharacterError, setSenderCharacterError] = useState(false);
    const [textColor, setTextColor] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [defaultOptionDisabled, setDefaultOptionDisabled] = useState(false);


    const fetchItems = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const resetFormFields = () => {
        // Reset form fields using the form's reset method
        document.getElementById('messagesForm').reset();
      
        // Reset state variables
        setMessage('');
        setSender('');
        setRecipient('');
        setMessageCharacterError(false);
        setSenderCharacterError(false);
        setDefaultOptionDisabled(false); 
        setCardBackgroundColor('rgb(0, 0, 0)');
        const selectElement = document.getElementById('recipientInput');
        selectElement.selectedIndex = -1;
    };

    const ChangeColor = async (color) => {
        setCardBackgroundColor(color);
    };
      
    
    const handleTextAreaChange = (event) => {
        const newMessage = event.target.value;
        setMessage(newMessage);

        if (newMessage.length > 100) {
            // Set the character error state to true
            setMessageCharacterError(true);
        } else {
            // Set the character error state to false
            setMessageCharacterError(false);
        }
    };

    const handleRecipientChange = (e) => {
        const selectedValue = e.target.value;
        setRecipient(selectedValue);
    
        // Disable the default option after the user interacts
        setDefaultOptionDisabled(true);
    };

    const handleSenderChange = (event) => {
        const newSender = event.target.value;

        if (newSender.length > 20) {
            setSenderCharacterError(true);
        } else {
            setSenderCharacterError(false);
        }

        setSender(newSender);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (messageCharacterError || senderCharacterError || !recipient) {
          alert('There were errors with your submission. Please check the form.');
        } else {
          try {
            const response = await fetch('/api/sendMessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messageInput: message,
                senderInput: sender,
                recipientInput: recipient, 
                cardBackgroundColor: cardBackgroundColor,
              }),
            });
            if( response.ok ){
                resetFormFields();
                setShowConfirmation(true);
                setTimeout(() => {
                setShowConfirmation(false);
                }, 3000);
            }
            else{
                const errorData = await response.json();
                console.error('Error submitting message:', errorData.message);
                // Display an error message to the user
                alert(`Failed to submit message. Error: ${errorData.message}`);
                // Handle error accordingly (e.g., display an error message)    
            }
          } catch (error) {
            console.error('Error submitting message:', error);
            // Handle error accordingly (e.g., display an error message)
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      };
    

    return(
        <section>
            <form id="messagesForm" onSubmit={handleSubmit}>
                {messageCharacterError || senderCharacterError ? (
                    <div class="big_wrapper">
                        <div style={{width: '689px'}}class="error rounded-md bg-red-200 mb-4 p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg style={{background: 'transparent'}}class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 style={{textAlign: 'left'}}class="text-sm font-medium text-red-800">There were errors with your submission</h3>
                                    <div style={{background: 'transparent'}} class="mt-2 text-sm text-red-700">
                                        <ul class="list-disc pl-5 space-y-1">
                                            {messageCharacterError && (
                                                <li style={{ background: 'transparent' }}>Your message is too long! Please keep it under 100 characters</li>
                                            )}
                                            {senderCharacterError && (
                                                <li style={{ background: 'transparent' }}>The "From" field is too long! Please keep it under 20 characters</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                    <div class="submit_wrapper">
                        <div class="card_div" id ="cardDiv" style={{width: '440px', height: '496px', backgroundColor: `${cardBackgroundColor}`, backgroundImage: `url(${TemplateBackground})`}}>
                        <input type="hidden" id="cardBackgroundColor" name="cardBackgroundColor" value={cardBackgroundColor} />
                        <input type="hidden" id="textColor" name="textColor" value={textColor} />
                            <div class="recipient_div" style={{background: 'transparent'}}>
                                <span class="to_text" style={{fontSize: '24px', lineHeight: '44px', background: 'transparent'}}>To:</span>
                                <select class="recipient_input" name="recipientInput" style={{fontSize: '24px', lineHeight: '44px', background:'transparent'}} onChange={handleRecipientChange}>
                                <option value="" disabled={defaultOptionDisabled} hidden>Select a recipient</option>                                    
                                    {items.map(item => (
                                    <option key={item._id} value={item.name}>
                                        {item.name}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <textarea class={`messageTA`} name="messageInput" placeholder="Type Your Message Here..." style={{overflow: 'hidden', fontWeight: 'bold', fontSize: '44px', lineHeight: '52px', color: `${textColor}`}} onChange={handleTextAreaChange} value={message}></textarea>
                            <div class="sender_div" style={{background: 'transparent'}}>
                                <span class="from_text" style={{fontSize: '33px', lineHeight: '44px', background: 'transparent'}} value={sender}>From: </span>
                                <input class="sender_name" name="senderInput" placeholder="Enter Name" style={{fontSize: '33px', lineHeight: '44px', paddingLeft: '6px'}} onChange={handleSenderChange}/>
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
                    <input type="submit" value="Send" class="submitBtn" disabled={!message.trim() || messageCharacterError || senderCharacterError}/>
            </form>
            {showConfirmation && (
                <div className="confirmation-message">
                Message submitted successfully!
                </div>
            )}
        </section>
    );
}

export default Message;