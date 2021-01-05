import React, { useContext, useReducer, useEffect, createContext} from 'react';
import data from './data';
import reducer from './reducer';

const AppContext = createContext();

const initialState = {
    loading: false,
    cart: data,
    total: 0,
    amount:0,
};

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearItems = () => {
        dispatch({type:'CLEAR_CART'});
    };

    const toggleQty = (id, operation) => {
        dispatch({type: 'TOGGLE_QTY', payload: {id, operation}});
    };

    const displayTotalQty = () => {
        dispatch({type: 'DISPLAY_TOTAL'});
    };

    const removeItem = (id) => {
        dispatch({type:'REMOVE_ITEM', payload: id})
    };

    useEffect(()=>{
        displayTotalQty();
    }, [state.cart]);

    return (
    <AppContext.Provider value={{...state,
                                clearItems,
                                toggleQty,
                                removeItem
                                }}>
        {children}
    </AppContext.Provider>);
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider};