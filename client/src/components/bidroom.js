import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const socket = io.connect("http://localhost:5000");
const Bidroom = () => {
    const [startPrice, setstartPrice] = useState(1000);
    const [currPrice, setcurrPrice] = useState(1000);
    const [username, setusername] = useState("");
    const [room, setRoom] = useState("");
    let [historyofbid, sethistoryofbid] = useState([]);
    const [participatebidder, setparticipatebidder] = useState(false)
   const [seconds,setseconds]=useState(100);
   var timer;
   useEffect(()=>{
    timer=setInterval(()=>{
        setseconds(seconds-1);
    },1000);
    if(seconds==0){
        const soldto=historyofbid[historyofbid.length-1]?.username;
        if(!soldto){
            setseconds(100);
            return;
        }
        else{
            console.log("sold to " +soldto);
            setparticipatebidder(false);
           clearInterval(timer);
           socket.emit("winner",username);
        }
        setseconds(100);
    }
    return () => clearInterval(timer);
   });
   const bidmadeunder30sec=()=>{
    setseconds(100);
   }

    const Leavebid = () => {
        setparticipatebidder(false);
    }
    const increasebid = () => {
        if (participatebidder)
            setcurrPrice(currPrice + 200);
    }
    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room) // used to send the data to backend
            setparticipatebidder(true);
        }
    }


    useEffect(()=>{
        socket.on("receive_updated_timer", (data) =>{
setseconds(100);
console.log(data);
        },[socket])
    })
// async function senddata(username, currPrice, room ){

// console.log("hihi")
// console.log("function called ",username, currPrice, room)
// const response =await fetch('http://localhost:5000/history',{
//     method:"POST",
//     headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials:'include',
//   body: JSON.stringify({
//     username,
//     currPrice,
//     room
//   })

// })
// const data = await response.json();
// console.log("message from backednd",data)


// }
    const notify = () => toast("Wow so easy!");
    const dobid = async () => {
        if (participatebidder) {
            historyofbid.push({ username, currPrice, room });
            // ================//=

        // senddata(username, currPrice, room );


            // ======================
            sethistoryofbid(historyofbid);
            setcurrPrice(currPrice);
            socket.emit("bid_done", currPrice);
            console.log(historyofbid);
            // notify();
            await socket.emit("send_updated_timer",60);
            bidmadeunder30sec();
            await socket.emit("send_updated_bid", { username, currPrice, room });
        }
    }
    useEffect(() => {
        socket.on("receive_updated_bid", (data) => {
            const user = data.username;
            historyofbid.push({ user, currPrice, room });
            sethistoryofbid(historyofbid);
            setcurrPrice(data.currPrice);
            // console.log(data);
            console.log(historyofbid);
        })
    }, [socket])
    return (
        <div className='flex flex-col w-[400px] h-[300px]'>
            Participating : {`${participatebidder}`}
            <h3 className='text-[40px]'>Bidroom</h3>
            <div>Name :<input type="text" onChange={(event) => {
                setusername(event.target.value);
            }} placeholder='John' />
            </div>
            <div> RoomID: <input className='mb-[10px]' type="number" onChange={(event) => {
                setRoom(event.target.value);
            }} placeholder='RoomID' />
            </div>
            <div className="timer">{seconds}</div>
            <div className="prices flex justify-evenly">
                <div className='bg-blue-400 w-[100px] rounded-[20px] text-white'>
                    <div>startBid</div>₹{startPrice}
                </div>
                <div className='bg-red-500 w-[100px] rounded-[20px] text-white'>
                    <div>currBid</div>₹{currPrice}
                </div>
            </div>
            <div className='flex justify-evenly '>
                <button className={`border-[3px]   w-[100px] my-[10px] ${participatebidder}? {'notactive':'border-green-400'} ${participatebidder}? {'': 'bg-green-400'}`} onClick={increasebid}>Increase Bid</button>
                <button className={`border-[3px]  w-[100px] my-[10px] ${participatebidder}? {'notactive':'border-green-400'} ${participatebidder}? {'': 'bg-green-400'}`} onClick={dobid}>Dobid</button>
            </div>
            <div className='flex justify-evenly'>
                <button className='border-[3px] w-[100px] my-[10px]  border-green-400' onClick={joinRoom}>Join room</button>
                <button className='border-[3px]  w-[100px] my-[10px] border-green-400' onClick={Leavebid}>LeaveBid</button>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Bidroom