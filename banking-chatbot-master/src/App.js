import "./App.css";
import image2 from "./img/bot_image.jpg";
import image1 from "./img/voice.png";
import React, { useState, useRef, useEffect } from "react";
import Axios from 'axios';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
let user="";
let newUser="";
let amount="";
let phone="";
let checkingUser="";
let newCheckingUser="";
let printContent="";
mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  
  const humanMessage = useRef();
  const botmessage = useRef();
  const input = useRef();

  const date = new Date();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      console.log(event.results);
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const callFunction=()=>{
    setIsListening(prevState => !prevState);
    document.querySelector("#input").value=note;
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
//------------------------------------------------Chatbot Queries---------------------------------------------
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [time, setTime] = useState(`${hours}:${seconds}`);
  const [dateTime, setDateTime] = useState(
    `${days[day]}, ${months[month]} ${year}`
  );

  const checkStatus = (e) => {
    let isActive = true;
    if (dateTime === "Thursday, Aug 13 2022") {
      isActive = false;
    }
    const status = document.querySelector(".status");
    // selecting the status class
    if (isActive === true) {
      //if the bot is active
      status.innerHTML = "Active";
      status.style.color = "green";
    } else {
      status.innerHTML = "Not Active";
      status.style.color = "red";
    }
  };
  const handleInput = () => {
    const inputRef = input.current;
    const getHumanMessage = humanMessage.current;
    const getBotMessage = botmessage.current;

    let badwords = ["fuck|bad|stupid|useless|bitch|crazy|nonsense"];
    let words = new RegExp(badwords);
    if (words.test(document.querySelector("#input").value)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Please do not use bad words!"; // display the message
        inputRef.value = ""; // clear the input
      }, 2000);
    }
    let welcome = [
      "HI||Hi||hi|hello|Hello|hey|sup|yo|wassup|whats up| ",
    ];
    let words2 = new RegExp(welcome);
    if (words2.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      // if the input contains welcome words
      getBotMessage.innerText = "Typing...";
      
      setTimeout(() => {
        getBotMessage.innerText = "Dear Customer, I'm your personal Banking Assistant.\n\nThank You for showing your interest.\nEnter\n1. For transaction related queries.\n2. For cashback related queries.\n3. For voucher related queries.\n 4. Others.\n 5. For creating new account.\n 6.For checking balance.";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = ""; // clear the input
      }, 2000);
    }


    let code_zero = [
      "0|zero|go home",
    ];
    let zero = new RegExp(code_zero);
    if (zero.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear Customer, I'm your personal Banking Assistant.\n\nThank You for showing your interest.\nEnter\n1. For transaction related queries.\n2. For cashback related queries.\n3. For voucher related queries.\n 4. Others.\n 5. For creating new account.\n 6. For checking balance.";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let code_one = [
      "1|one|transaction issue",
    ];
    let one = new RegExp(code_one);
    if (one.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "For more information on transaction related issues, enter a,b,c... as\na] Account details\nb] Transaction Issue\nc] Change pin\np0] Return back to main menu\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let one_a = [
      "A|a|account details",
    ];
    let one__a = new RegExp(one_a);
    if (one__a.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Account Details:\nAccount Number:6031452875\nAccount Owner: Rahul Ponnuru\nIFSC Code:PNB0001242\nAddress: Kothrud Pune-411046";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let one_b = [
      "B|b|recent transaction",
    ];
    let one__b = new RegExp(one_b);
    if (one__b.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear Customer, Your transaction with transaction id:124585475 for the payment of Rs.231/- has been unsuccessful.\nPlease wait for atleast 24 hours as we are processing your refund amount.\nYour refund amount will be credited to your linked bank account.\nThank You\nEnter:\n2] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let one_c = [
      "C|c|change UPI pin|pin",
    ];
    let one__c = new RegExp(one_c);
    if (one__c.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, to change your UPI Pin, please login on Gov-UPI site.\nThank you.\nEnter:\n2] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }


    let code_two = [
      "2|two|cashback related|cashback",
    ];
    let two = new RegExp(code_two);
    if (two.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "For more information on cashback related issues, enter p,q,0 as\np] Cashback amount related issue.\nq] Cashback not credited\n0] Return back to main menu\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }

    let two_p = [
      "P|p",
    ];
    let two__p = new RegExp(two_p);
    if (two__p.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, the cashback amount given to you are as per the banking norms.\nIf you have any issue please feel free to dial the toll free number:\n1800-100-2584\n\nThank you.\nEnter:\n2] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let two_q = [
      "Q|q",
    ];
    let two__q = new RegExp(two_q);
    if (two__q.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, please wait for atleast 24 hours to get your cashback credited into your account.\nThank you.\nEnter:\n2] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }


    let code_three = [
      "3|three|voucher issue|voucher",
    ];
    let three = new RegExp(code_three);
    if (three.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "For more information on voucher related issues, enter x,y,0 as\nx] Total coupons in your account.\ny] Voucher not credited\n0] Return back to main menu\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let three_x = [
      "X|x",
    ];
    let three__x = new RegExp(three_x);
    if (three__x.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, you have 24 active vouchers in your account.\nThank you.\nEnter:\n3] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let three_y = [
      "Y|y",
    ];
    let three__y = new RegExp(three_y);
    if (three__y.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, please wait for atleast 24 hours to get your voucher credited into your account.\nEnter:\n3] Return back to previous menu.\n0] Return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let code_five = [
      "5|five|create new account|reate new account",
    ];
    let five = new RegExp(code_five);
    if (five.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your username as 'username - xyz@'\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    // let user="";
    let user_name=[
      "username",
    ];
    let username=new RegExp(user_name);
    if (username.test(document.querySelector("#input").value)) {
      user=document.querySelector("#input").value;
      newUser = user.replace("username -", "");
      const status = document.querySelector(".status");
      console.log(newUser);
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your password \n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let password="";
    let pass=[
      "password",
    ];
    let password_N=new RegExp(pass);
    if (password_N.test(document.querySelector("#input").value)) {
      password=document.querySelector("#input").value;
      const status = document.querySelector(".status");
      console.log(password);
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your name \n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let name="";
    let na=[
      "name",
    ];
    let nam_e=new RegExp(na);
    if (nam_e.test(document.querySelector("#input").value)) {
      name=document.querySelector("#input").value;
      const status = document.querySelector(".status");
      console.log(name);
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your phone number as 'phone - XXXXXXXXX'\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    // let phone="";
    let num=[
      "phone",
    ];
    let phoneNUM=new RegExp(num);
    if (phoneNUM.test(document.querySelector("#input").value)) {
      phone=document.querySelector("#input").value;
      const status = document.querySelector(".status");
      console.log(phone);
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your amount that has to be credited as 'amount - XXX'\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    // let amount="";
    let amu=[
      "amount",
    ];
    let tot_amount=new RegExp(amu);
    if (tot_amount.test(document.querySelector("#input").value)) {
      amount=document.querySelector("#input").value;
      const status = document.querySelector(".status");
      console.log(amount);
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer if you entered your all details enter done \n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let code_done = [
      "done",
    ];
    let done = new RegExp(code_done);
    if (done.test(document.querySelector("#input").value)) {
      console.log(user,amount,phone);
      Axios.post("http://localhost:3001/insert",{
        user:newUser,
        amount:amount,
        phone:phone
    });
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Your details have been saved. Thankyou";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }

    let code_six = [
      "6|six|checkbalance|my balance",
    ];
    let six = new RegExp(code_six);
    if (six.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer enter your username as 'code - xyz@' \n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }
    let code_user=[
      "code",
    ];
    let userCheck = new RegExp(code_user);
    if (userCheck.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      checkingUser=document.querySelector("#input").value;
      newCheckingUser = checkingUser.replace("code -", "");
      console.log("newCheckingUser"+newCheckingUser);
      Axios.post("http://localhost:3001/check",{
        newItem:newCheckingUser
    });
      getBotMessage.innerText = "Typing...";
      Axios.get("http://localhost:3001/read").then((response)=>{
          console.log("hello"+response.data);
          printContent = "Hello "+response.data.user+".\n Your account balance is "+response.data.amount+
          ".\n"+"Your Account Number "+response.data._id+ "\nPress 0 to return back to main menu.\n";
        });
      setTimeout(() => {
        getBotMessage.innerText = printContent;
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }

    let code_four = [
      "4|four",
    ];
    let four = new RegExp(code_four);
    if (four.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Dear customer, for more queries kindly visit below link\nhttps://bankofmaharashtra.in/.\nPress [0] to return back to main menu.\n";
        status.innerText = "Active";
        status.style.color = "green";
        inputRef.value = "";
      }, 2000);
    }


    let bye = ["bye|Bye|goodbye|see you later|cya|goodnight|goodbye"];
    let words3 = new RegExp(bye);
    if (words3.test(document.querySelector("#input").value)) {
      const status = document.querySelector(".status");
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "Bye, hope we solved your query.";
        inputRef.value = "";
      }, 2000);
      setTimeout(() => {
        status.innerText = "Not active";
        status.style.color = "red";
      }, 5000);
    }


    let thanks = [
      "Thanks|thanks|thank you|thank you very much|Thank you very much",
    ];
    let words4 = new RegExp(thanks);
    if (words4.test(document.querySelector("#input").value)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "You are welcome.";
        inputRef.value = "";
      }, 2000);
    }

    let nameAsk = [
      "What's your name?|what's your name?|What is your name?|what is your name?",
    ];
    let words8 = new RegExp(nameAsk);
    if (words8.test(document.querySelector("#input").value)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "My name is Banking Chatbot.";
        inputRef.value = ""; // clear the input
      }, 2000);
    }

    let owner = [
      "Who is the owner|who is the owner|Who is the owner of this bot|who is the owner of this bot|Who made you|who made you|Who is your maker|Who made you|who is your maker|who is your owner|Who is your owner",
    ];
    let words9 = new RegExp(owner);
    if (words9.test(document.querySelector("#input").value)) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = "The owner of this bot is EDI Group 53";
        inputRef.value = "";
      }, 2000);
    }

    getHumanMessage.innerText = inputRef.value; // display the message
  };
  return (
    <div className="App" onLoad={checkStatus}>
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
             <img src="https://cdn-images-1.medium.com/max/1200/1*VINVguiAqltu7hsHzbQIBw.jpeg"/>
            </div>
            <div className="right">
              <div className="name">Banking ChatBot</div>
              <div className="group-name">Let me help you...</div>
              <div className="status">Active</div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div
                  className="bot-message"
                  id="message1"
                  ref={botmessage}
                ></div>
                <div
                  className="human-message"
                  id="message2"
                  ref={humanMessage}
                ></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
            
            <div className="button-mic" onClick={callFunction}>
            <img className="voiceImg" src={image1}/>
          </div>

              <div className="input">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  ref={input}
                />
              </div>
              <div className="btn">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i> Send
                </button>
              </div>
      
            </div>
          </div>
        </div>
        <p className="text-bottom" >Chatbot by CS-C-EDI-Group 53</p>
        {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
        <>
        
      {/* <h1>Voice Notes</h1>
        <h3>Current Note</h3> */}
          {/* {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>} */}
          {/* <button className="button-mic" onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button> */}
          {/* <button className="button-mic" onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button> */}
          {/* <p>{note}</p> */}
          {/* <h3>Saved Notes</h3>
          {savedNotes.map(n => (<p key={n}>{n}</p>))} */}
    </>
      </div>
    </div>
  );
}

export default App;