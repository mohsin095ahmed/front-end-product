//import Image from 'next/image'
//import React from 'react';
import React , { useEffect, useRef, useState } from 'react';
import Post from './compents/Post';
import axios from 'axios';
import Add from './compents/Add';
import { Edit } from './compents/Edit';
import { io } from 'socket.io-client';

export default function () {
  const divRef = useRef();
   const [items, setItems ] = useState(null);
   const [count , setcount] = useState(0);
   const [productid, setproductid] = useState();
   const socket = io("http://localhost:2000/");

  
   const AllItems =  ()=>{
         axios.get("http://localhost:2000/").then((res) => {
   //         console.log(res.data);
             setItems( res.data);
            
         }).catch(err => console.log(err));
          
       }
       let pop = divRef.current;
        function edit(id){
         console.log(id);
         setproductid(id);
         console.log(pop);
         pop.classList.add("open-popup")
        }
        function closePop(){
          pop.classList.remove("open-popup")
        }

       const render =(d)=>{
       console.log(d);
       setcount(count + 1)
       }

       useEffect(()=>{
        AllItems()
      },[])

       useEffect(()=>{
  
        console.log("starat",  socket)
        socket.on ("connect", ()=>{
         console.log( "Socketid-->",socket.id)
        })
        socket.on("send", (data)=>{
          console.log("send-data",data);
          AllItems();
        })
      },)
    

     //console.log("res---> ", items);
  return (
         <>
            
               <h1> ASSIGMENT</h1>
               <Add render={render} socket={socket}></Add>
            <div >
              <div ref={divRef} className='popup'>
              <Edit productid={productid} socket={socket} closePop={closePop} render={render}></Edit>
              </div>
             
            <Post socket={socket} render={render} edit={edit} item ={items}></Post>
            </div>
            
          
         </>
  )
}
