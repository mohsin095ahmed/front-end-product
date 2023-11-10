import { createSlice } from '@reduxjs/toolkit'



const initialState ={
    cart:[],
    totalqnt:0,
    totalpri:0

} 
const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        add(state, action){
            let find = state.cart.findIndex(item => item.id === action.payload.id);
            if(find >=0){
                state.cart[find].Qantity+=1;
            }else{
                state.cart.push(action.payload)
            }
;
        },
        
       remove(state, action){
        state.cart =state.filter(item => item.id !== action.payload)
        }
    }
});


export const { add , remove}= cartSlice.actions;
export default cartSlice.reducer;