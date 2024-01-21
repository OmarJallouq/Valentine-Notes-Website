import React from 'react';
import '../styles/home.css';
import lettersPicture from '../styles/letters.jpg'
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();

    const handleMessageClick = () => {
      // Navigate to another route within your SPA
      navigate('/send-a-message');
    };

    const handleInboxClick = () => {
        // Navigate to another route within your SPA
        navigate('/inbox');
      };
  
      

    return(
        <section>
            <img src={lettersPicture} alt='Letters'></img>
            <div style={{width: '100%', height: '100%', position: 'relative', top: '120px'}}>
                <div style={{width: 839, height: 134, left: -20, top: 0, position: 'absolute', background: 'white', borderRadius: 20}} />
                <div style={{left: 31, top: 25, position: 'absolute', color: 'black', fontSize: 64, fontFamily: 'Jacques Francois Shadow', fontWeight: '400', wordWrap: 'break-word', backgroundColor: 'transparent'}}>CUPID’S IN THE AIR</div>
            </div>
            <div style={{width: '100%', height: '100%', position: 'relative', top: '280px'}}>
                <div style={{width: 469, height: 346, left: -20, position: 'absolute', background: 'white', borderRadius: 20}} />
                <div style={{width: 360, height: 294, left: 34, top: 20, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Itim', fontWeight: '400', wordWrap: 'break-word', backgroundColor: 'transparent'}}>Want to send someone a message? Maybe even anonymously? Now's your chance! Press Send a Message to send a letter to that special someone, or press Inbox to view the letters from your admirers!</div>
                <div style={{width: 225, height: 39, left: 65, top: 258, backgroundColor: 'transparent', position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex'}}>
                    <button onClick={handleMessageClick} style={{paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 8, border: '3px #FF82A9 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: '#FF82A9', backgroundColor: 'transparent', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'normal', whiteSpace: 'nowrap'}}>Send a Message</div>
                    </button>
                    <button onClick={handleInboxClick} style={{paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 10, background: '#FF82A9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{color: 'white', backgroundColor: 'transparent', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'normal'}}>Inbox</div>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Home;