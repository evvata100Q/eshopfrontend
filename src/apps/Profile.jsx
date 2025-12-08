import { useContext, useEffect, useRef } from "react"
import styles from '../css/profile.module.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./subapps/Header"
import { cartcontext } from "../Compforcontext"
const url = import.meta.env.VITE_ONLINE_BACKEND_URL
const localurl = 'http://localhost:5000'

const Profile = () => {
    const [err, seterr] = useState('')
    let navigate = useNavigate()
    const mref = useRef(null)
    const [orders, setorders] = useState([])

    useEffect(() => {
        async function fetchorders() {
            try {
                let resp = await fetch(`${url}/orders/${JSON.parse(localStorage.getItem('bstoken')).slice(12)}`)
                if (!resp.ok) {
                    throw new Error('some kind of error')
                }
                let data = await resp.json()
                setorders(data.orders)
            } catch (error) {
                seterr(error.message)
            }
        }
        fetchorders()
    }, [])

    function paid(ordersindex) {
        let a = 0
        for (let i of orders[ordersindex].suborders) {
            a += i.quantity * i.whichproductid.price
        }
        return a
    }

    const [worder, setworder] = useState('')

    function clickedorder(i) {
        setworder(i)
        mref.current.showModal()
    }

    let a = useContext(cartcontext)
    let { curtheme, themedispatch } = a
    const themestyles = { backgroundColor: curtheme ? 'white' : 'black', color: curtheme ? 'black' : 'white' }

    useEffect(() => {
        window.localStorage.setItem('utheme', JSON.stringify(curtheme))
    }, [curtheme])

    return (
        <div className={styles.main}
            style={themestyles}
        >
            <Header />
            <br />
            <div
                style={{ backgroundColor: curtheme ? 'white' : 'black' }}
                className={styles.themebutton}
                onClick={() => { themedispatch() }}
            >
                <div style={{ right: curtheme ? '70%' : '0%', backgroundColor: curtheme ? 'black' : 'white' }}></div>
            </div>
            <br />
            <br />
            <button onClick={
                () => {
                    localStorage.clear('bstoken')
                    localStorage.clear('utheme')
                    navigate('/login')
                }
            }>logout</button>
            <br /><br /><br />
            <h1>order history</h1>
            <br /><br /><br />

            {
                orders.length > 0 ? <table className={styles.table}>
                    <tr>
                        <th>s.no</th>
                        <th>id</th>
                        <th>paid</th>
                    </tr>

                    {orders && orders.map((each, index) => {
                        return <tr className={styles.order}>
                            <th><button onClick={() => { clickedorder(index) }}>{index + 1}</button></th>
                            <th>{each._id}</th>
                            <th>${paid(index)}</th>
                        </tr>
                    })
                    }

                </table> :
                    err ? <h1 style={{ textAlign: 'center' }}>{err}</h1> : <h1 style={{ textAlign: 'center' }}>no orders made</h1>
            }

            <dialog
                ref={mref}
                style={themestyles}
            >
                <button onClick={() => { mref.current.close() }}>esc</button>
                {
                    worder !== '' &&
                    orders[worder].suborders.map(each => {
                        return <div>
                            <span>{each.quantity}* </span>
                            <img src={each.whichproductid.imagepath} />
                            <span>=</span>
                            <span>{each.quantity * each.whichproductid.price}</span>
                        </div>
                    })
                }
            </dialog>


        </div >
    )
}

export default Profile