import type React from "react";
import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";

export interface CartItem {
    id: number;
    title: string;
    category: string;
    image: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "ADD_TO_CART", payload: Omit<CartItem, "quantity"> }
    | { type: "REMOVE_FROM_CART", payload: number }
    | { type: "INCREMENT", payload: number }
    | { type: "DECREMENT", payload: number }
    | { type: "EMPTY" }

const initialState: CartState = { items: [] }

const icrementItem = (state: CartState, itemIndex: number): CartItem[] => {
    const updatedItems = [...state.items];
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity + 1 }
    return updatedItems;
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const itemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );
            //STATE={items:[{},{},{}]}//2
            //si el elemento ya fue agregado al menos una sola ves
            if (itemIndex >= 0) {
                return { ...state, items: icrementItem(state, itemIndex) };
            }

            //si el elemento no existe en el state|array
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            };

        }
        case "REMOVE_FROM_CART": {
            return {
                ...state,
                items: state.items.filter(item => (item.id != action.payload))
            };
        }
        case "INCREMENT": {
            const itemIndex = state.items.findIndex(
                item => item.id === action.payload
            );
            return { ...state, items: icrementItem(state, itemIndex) };
        }
        case "DECREMENT": {
            return {
                ...state,
                items: state.items.map(
                    item => item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };
        }
        case "EMPTY": {
            return {
                ...state,
                items: []
            };
        }
        default:
            return state
    }
}

interface CartContextType {
    state: CartState,
    dispatch: React.Dispatch<CartAction>
}

const CartContext = createContext<CartContextType | undefined>(undefined)
//queda pendiente separar dispatc y state en dos contextos para optimizar rendimiento
export const CartProvider = ({ children }: { children: ReactNode }) => {

    const initializer = (): CartState => {
        const storerCart = localStorage.getItem("cart");
        return storerCart ? JSON.parse(storerCart) : initialState
    }
    const [state, dispatch] = useReducer(cartReducer, initialState, initializer);
    // const value = useMemo(() => ({ state, dispatch }), [state])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state))
    }, [state]);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider")
    }
    return context;
}
//{value:{state,dispatch}}
//const [state,dispach] = useReducer(cartReducer,initialvalue)
//dispach = (action:A)=>void = React.Dispach<A>
//{items:[{},{},{}]}