import axios from "axios";
import { useRef, useState } from "react";


export function Edit({productid, socket, closePop,render}){
    console.log(productid,"Edit")
      
    const imageref = useRef();
    const saveref = useRef();
    const categoryref = useRef();
    const priceref = useRef();
    const titleref= useRef();
    const btnref = useRef();
    const [bool , setbool]= useState(false);
    const [image , setimage] = useState();
    const [file , setfile] = useState();
     const changeCat = async(e)=>{
    
        e.preventDefault();
    let category = categoryref.current.value;
let cat = document.getElementById("cat");
     await axios.put("http://localhost:2000/",{productid,category}).then((res) => {render("yes");
     cat.value="";
     alert("category update")
     closePop()
      socket.emit("add product", productid)
    }).catch(err => console.log(err))
  }

  const changePri = async(e)=>{
    e.preventDefault();
    let price = priceref.current.value;
    let pri = document.getElementById("pri");
console.log(price)
     await axios.put("http://localhost:2000/",{productid,price}).then((res) => {
        render("yes");
        console.log(res)
        alert("price update")
        socket.emit("add product", productid)
        pri.value = " ";
        closePop();
     }).catch(err => console.log(err))
  }


  const changetiile = async(e)=>{
    e.preventDefault();
    let title = titleref.current.value;
  //  let pri = document.getElementById("pri");
//console.log(price)
     await axios.put("http://localhost:2000/",{productid,title}).then((res) => {
        render("yes");
        console.log(res)
        alert("title update")
    //    pri.value = " ";
        closePop();
        socket.emit("add product", productid)
     }).catch(err => console.log(err))
  }


  const save = ()=>{
    console.log(file);
    const formData = new FormData();
        formData.append("file",file );
        axios.post("http://localhost:2000/upload",formData)
        .then((res)=>{
            console.log(res)
           setimage(res.data.image);
           setbool(true)
           //socket.emit("add product", productid)
        })
        .catch(err=> console.log("err---->",err))
        
  }

  const Changeimge = async(e)=>{
    e.preventDefault();
    console.log("image--->",image)

     await axios.put("http://localhost:2000/",{productid,image}).then((res=>{
        alert("image change");
        render("yes");
        closePop();
        socket.emit("add product", productid)

     })).catch(err => console.log(err))
  }

    return(
        <>
           <h1> EDIT</h1>
            <br></br>

            <div>
            <h2>change the title</h2>
            <form onSubmit={changetiile}>
                <label for="">title</label>
                <input id="cat" required ref={titleref} type="text"></input>
                <br></br>
                <button type="submit"> change the title</button>
            </form>

           </div>



           <div>
            <h2>change the category</h2>
            <form onSubmit={changeCat}>
                <label for="">category</label>
                <input id="cat" required ref={categoryref} type="text"></input>
                <br></br>
                <button type="submit"> change the category</button>
            </form>

           </div>


           <div>
            <h2>change the price</h2>
            <form onSubmit={changePri}>
                <label for="">price</label>
                <input id="pri" ref={priceref} required type="number"></input>
                <br></br>
                <button type="submit">change the price</button>
            </form>

           </div>



           <div>
            <h2>change the image</h2>
            <form onSubmit={Changeimge}>
            <input type="file" onChange={(e)=>{setfile(e.target.files[0])}} ref={imageref}  id="fileSaver"className=""/>
             <span for="" id="save" className="pointer"  onClick={save} ref={saveref}>save the image</span>
            <br></br><br></br>  
                <button className={bool?"block":"hidden"} type="submit">change image</button>
            </form>

           </div>  

           <button onClick={closePop} > okay</button>
        </>
    )
}