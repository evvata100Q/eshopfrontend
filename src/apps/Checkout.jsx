import { useContext, useEffect } from "react"
import { cartcontext } from "../Compforcontext"
import styles from '../css/checkout.module.css'
import { useState } from "react"
import Header from './subapps/Header.jsx'
const url = import.meta.env.VITE_ONLINE_BACKEND_URL
let localurl = 'http://localhost:5000'

const Checkout = () => {
    const [err, seterr] = useState('')
    const [suc, setsuc] = useState('')
    const { curcart, cartdispatch } = useContext(cartcontext)

    function ordertotal() {
        let ans = 0
        for (let i of curcart) {
            ans += i.quantity * i.prodobj.price
        }
        return ans
    }

    async function placeorder() {
        seterr('')
        let body =
        {
            who: JSON.parse(localStorage.getItem('bstoken')).slice(12),
            content: []
        }

        for (let i of curcart) {
            body.content.push({ productsid: i.prodobj._id, quant: i.quantity })
        }

        try {
            let resp = await fetch(
                `${url}/orders`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }
            )
            let data = await resp.json()
            if (resp.ok) {
                cartdispatch({ type: 'clear' })
                setsuc(data.umessage)
            }
            else {
                throw new Error(data.umessage)
            }
        } catch (mistake) {
            seterr(mistake.message)
        }

    }


    let a = useContext(cartcontext)
    let { curtheme } = a
    const themestyles = { backgroundColor: curtheme ? 'white' : 'black', color: curtheme ? 'black' : 'white' }


    useEffect(() => {
        window.localStorage.setItem('ucart', JSON.stringify(curcart))
    }, [curcart])


    return (
        <div className={styles.main} style={themestyles}>
            <Header />
            {
                err && <h1 style={{ color: 'red' }}>{err}</h1>
            }
            {
                suc && <h1 style={{ color: 'green' }}>{suc}</h1>
            }
            {
                curcart.length > 0 ? <>
                    <h1>cart</h1>
                    <br /><br /><br />
                    <table className={styles.carttable}>
                        <tr>
                            <th>name</th>
                            <th></th>
                            <th>quantity</th>
                            <th>subtotal</th>

                        </tr>
                        {
                            curcart.map(each => {
                                return <tr>
                                    <td>{each.prodobj.name}</td>
                                    <td><img src={each.prodobj.imagepath} width='10%' /></td>
                                    <td>
                                        <button onClick={() => { cartdispatch({ type: 'subtract', entireproduct: each.prodobj }) }}>-</button>
                                        {each.quantity}
                                        <button onClick={() => { cartdispatch({ type: 'add', entireproduct: each.prodobj }) }}>+</button>

                                    </td>
                                    <td>{each.quantity * each.prodobj.price}</td>
                                </tr>
                            })
                        }
                        <br />
                        <tr>
                            <th>total</th>
                            <th></th>
                            <th></th>
                            <th>${ordertotal()}</th>
                        </tr>
                    </table>
                    <br /><br />
                    <button onClick={placeorder}>place order</button>
                </> :
                    <h1>cart is empty</h1>
            }


        </div>
    )
}

export default Checkout