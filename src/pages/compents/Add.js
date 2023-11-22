import axios from "axios";
//import { uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
export default function Add({render}){
    const imageref = useRef();
    const saveref = useRef();
    const categoryref = useRef();
    const priceref = useRef();
    const titleref = useRef()
    const btnref = useRef();
    const [bool , setbool]= useState(false);
    const [file , setfile] = useState();
    const [image , setimage] = useState();
    
       const upload = ()=>{
        //console.log(img);
        const formData = new FormData();
        formData.append("file",file );
        axios.post("http://localhost:2000/upload",formData)
        .then((res)=>{
           setimage(res.data.image);
           setbool(true)
        })
        .catch(err=> console.log("err---->",err))
        
       }        
        const add = async(e)=>{
            e.preventDefault()
            const category = categoryref.current.value;
            const price = priceref.current.value;
            const title = titleref.current.value;

             await axios.post("http://localhost:2000/",{
                category,
                price,
                title,
                image
            }).then(res => {render("yes");
                  //console.log(res)
                  alert("product add");
                  
                  
        }).catch( err => console.log("err--->",err));
        }
       
    return(
        <>
           <form onSubmit={add}>
              <label for ="tit">TITLE:</label>
              <input id="tit" ref={titleref} type="text"/>
              <br></br><br></br>
              


              <label for ="cat">CATEGORY:</label>
              <input id="cat" ref={categoryref} type="text"/>
              <br></br><br></br>
              
              <label for ="pri">PRICE:</label>
              <input id="pri" ref={priceref} type="number"/>
              <br></br><br></br>
              
              
             <input type="file" onChange={(e)=>{setfile(e.target.files[0])}} ref={imageref}  id="fileSaver"className=""/>
             <span for="" id="save" className="pointer"  onClick={upload} ref={saveref}>save the image</span>
            <br></br><br></br>
              <button type="submit" id="add" className={bool?"block":"hidden"}  ref={btnref} >ADD A PRODUCT</button>
           
           </form>

           

        </>
    )
}