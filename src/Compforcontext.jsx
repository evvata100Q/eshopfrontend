import { createContext, useReducer } from 'react'
export const cartcontext = createContext()
const initcart = window.localStorage.getItem('ucart') ? JSON.parse(window.localStorage.getItem('ucart')) : []

function cartreducer(state, action) {
    switch (action.type) {
        case 'add':
            const existingProduct = state.find(suborder => suborder.prodobj._id === action.entireproduct._id)
            if (existingProduct) {
                return state.map(suborder => suborder.prodobj._id === action.entireproduct._id ? { ...suborder, quantity: suborder.quantity + 1 } : suborder)
            } else {
                return [...state, { prodobj: action.entireproduct, quantity: 1 }]
            }

        case 'subtract':
            return state.map(suborder => suborder.prodobj._id === action.entireproduct._id ? { ...suborder, quantity: suborder.quantity - 1 } : suborder).filter(each => each.quantity > 0)

        case 'clear':
            return []
    }
}
let inittheme = window.localStorage.getItem('utheme') ? JSON.parse(window.localStorage.getItem('utheme')) : true
function themereducer(state) {
    return !state
}

const Compforcontext = ({ children }) => {
    const [curcart, cartdispatch] = useReducer(cartreducer, initcart)
    const [curtheme, themedispatch] = useReducer(themereducer, inittheme)

    return (
        <cartcontext.Provider value={{ curcart, cartdispatch, curtheme, themedispatch }}>
            {children}
        </cartcontext.Provider>
    )
}
export default Compforcontext