import { Navigate } from "react-router-dom"


function loggedinornot() {
    let a = JSON.parse(localStorage.getItem('bstoken'))
    if (!a) { return false }
    return a.slice(0, 12) === 'randomstring'
}

const Compforprotectiona = ({ element }) => {
    return (loggedinornot() ? element : <Navigate to='/login' />)
}
export default Compforprotectiona


export const Compforprotectionb = ({ element }) => {
    return (!loggedinornot() ? element : <Navigate to='/homepage' />)
}
