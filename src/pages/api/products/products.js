// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAll, save } from '../../../../service/product';

export default function handler(req, res) {
  if(req.method === "GET"){
  const products = getAll();
   return res.status(200).json(products);
}else if(req.method ==="POST"){
  console.log(req.body);
  const{name, price, color, imageSrc} = req.body
  save(name, price, color,imageSrc)
  return res.status(201).send();
  
}
return res.status(404).send();

}
