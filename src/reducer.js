
const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART'){
        return{...state, cart: []}
    };

    if (action.type === 'TOGGLE_QTY'){
        const tempCart = state.cart.map(item => {
            if(item.id === action.payload.id){
 
                if ( action.payload.operation === 'inc'){

                    return {...item, amount: item.amount + 1};
                };

                if (action.payload.operation === 'dec'){
                    return {...item, amount: item.amount <= 0 ? 0 : item.amount - 1};
                };
            };
            return item;
        });
        return {...state, cart: tempCart};
    };

    if (action.type === 'DISPLAY_TOTAL'){
        let totalQty = 0;
        let totalPrice = 0;
        state.cart.map(el => (totalQty += el.amount,
                              totalPrice += el.amount * el.price));

        totalPrice = parseFloat(totalPrice.toFixed(2));

        return {...state, amount: totalQty, total: totalPrice};
    }

    if (action.type === 'REMOVE_ITEM'){
        const tempCart = state.cart.filter( 
            el => el.id !== action.payload);
        
        return {...state, cart: tempCart};
    }

    return state;
};

export default reducer;