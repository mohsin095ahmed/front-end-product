import axios from "axios";


export default function Post({item, render, edit}){
    console.log("post--->", item)

   function remove(id){
    const decide = confirm("Are you Sure Any Item Delete");
    if(decide === true){
        axios.delete("http://localhost:2000/",{data:{id}}).then(res => render("yes"))
    }
   }
       function Edit(id){
         edit(id);
         console.log("edit--->",id)
       }
    return(
        <>
        <div className=" flex">
          {item && item.map((i)=>(
            
            <div className="box" >
                <img src={i.image} className="img"/><br></br>
                <span className="pri">PRICE: {i.price}$</span>
                <span className="pan">  
                <button className="btn" onClick={()=>{remove(i.id)}}>Delete</button>
                <button  className="btn" onClick={()=>{Edit(i.id)}}>Edit</button>
                </span>
            </div>
            
          ))}
         </div>   
        </>
    )
}