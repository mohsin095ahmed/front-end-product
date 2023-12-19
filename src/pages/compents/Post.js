import axios from "axios";


export default function Post({item, render, edit, socket}){
    console.log("post--->", item)

   function remove(productid){
    console.log(productid)
    const decide = confirm("Are you Sure Any Item Delete");
    if(decide === true){
        axios.delete("http://localhost:2000/",{data:{productid}}).then((res) =>{
          render("yes");
          socket.emit("add product", productid)
        } )
    }
   }
       function Edit(productid){
         edit(productid);
         console.log("edit--->",productid);
        
       }
    return(
        <>
        <div className=" flex">
          {item && item.map((i)=>(
            <div className="box" >
                <img src={i.image} className="img"/><br></br>
                <span className="pri">PRICE: {i.price}$</span>
                <span className="pan">  
                <button className="btn" onClick={()=>{remove(i._id)}}>Delete</button>
                <button  className="btn" onClick={()=>{Edit(i._id)}}>Edit</button>
                </span>
            </div>
            
          ))}
         </div>   
        </>
    )
}