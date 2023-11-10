import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), "data","product.json");


export function getAll(){
    const data = fs.readFileSync(filePath);
     return JSON.parse(data);

    
}
export function getById(id){
    const data = getAll();
    return data.find(p=> p.id === Number(id));
    
    

}

 export function save(name,price , color ,imageSrc){
    const data = getAll();
    data.push({
        name, price,color,imageSrc, 
        id:data.length + 1,
        Qantity:1,
    });
    fs.writeFileSync(filePath, JSON.stringify(data))

 }
