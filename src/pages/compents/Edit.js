import axios from "axios";
import { useRef, useState } from "react";


export function Edit({productid, closePop,render}){
    console.log(productid)
      
    const imageref = useRef();
    const saveref = useRef();
    const categoryref = useRef();
    const priceref = useRef();
    const btnref = useRef();
    const [bool , setbool]= useState(false);
    const [img , setimg] = useState();
    let fileImage; 
    const save = () =>{
        let fileinput = document.getElementById("fileSaver");
        let save = document.getElementById("save");
        fileinput.addEventListener("change",async()=>{
            let file = fileinput.files[0];

             
             let reader = new FileReader();
             reader.readAsDataURL(file);
             reader.onloadend = async() =>{
                fileImage = reader.result;
                //console.log(fileImage);
                setbool(true);
                setimg(fileImage);
             }
                    });
        save.addEventListener("click", fileinput.click())
                }
  const changeCat = async(e)=>{
    e.preventDefault();
    let category = categoryref.current.value;
let cat = document.getElementById("cat");
     await axios.put("http://localhost:2000/",{productid,category}).then((res) => {render("yes");
     cat.value="";
     alert("category update")
     closePop()

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
        pri.value = " ";
        closePop();
     }).catch(err => console.log(err))
  }


  const Changeimge = async(e)=>{
    e.preventDefault();
    

     await axios.put("http://localhost:2000/",{productid,image:img}).then(res => console.log(res)).catch(err => console.log(err))
  }

    return(
        <>
           <h1> EDIT</h1>
            <br></br>
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
            <h2>change the category</h2>
            <form onSubmit={Changeimge}>
            <input type="file" ref={imageref}  id="fileSaver"className="hidden"/>
             <span for="" id="save" className="pointer"  onClick={save} ref={saveref}>save the image</span>
            <br></br><br></br>  
                <button type="submit">change image</button>
            </form>

           </div>  

           <button onClick={closePop} > okay</button>
        </>
    )
}