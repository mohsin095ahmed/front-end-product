import axios from "axios";
import { useRef, useState } from "react";
export default function Add({render}){
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
          
        const add = async(e)=>{
            e.preventDefault()
            let categoryinp = document.getElementById("cat");
            let priceinp = document.getElementById("pri");
            const image = img;
             const category = categoryinp.value;
             const price = priceinp.value;
             

             await axios.post("http://localhost:2000/",{
                category,
                price,
                image
            }).then(res => {render("yes");
                  //console.log(res)
                  alert("product add");
                  
                    categoryinp.value = "";
                    priceinp.value ="";
                  
        }).catch( err => console.log("err--->",err));
        }
       
    return(
        <>
           <form onSubmit={add}>
              <label for ="cat">CATEGORY:</label>
              <input id="cat" ref={categoryref} type="text"/>
              <br></br><br></br>
              
              <label for ="pri">PRICE:</label>
              <input id="pri" ref={priceref} type="number"/>
              <br></br><br></br>
              
              
             <input type="file" ref={imageref}  id="fileSaver"className="hidden"/>
             <span for="" id="save" className="pointer"  onClick={save} ref={saveref}>save the image</span>
            <br></br><br></br>
              <button type="submit" id="add" className={bool?"block":"hidden"}  ref={btnref} >ADD A PRODUCT</button>
           
           </form>

           

        </>
    )
}