import { useContext, useEffect, useState } from 'react'
import Header from './subapps/Header.jsx'
import styles from '../css/homepage.module.css'
let filters = ['tops', 'bottoms', 'headwear', 'footwear', 'other']
let initprdata = ''
import { cartcontext } from '../Compforcontext'
let url = import.meta.env.VITE_ONLINE_BACKEND_URL
let localurl = 'http://localhost:5000'

const Homepage = () => {
    const [filtersopen, setfiltersopen] = useState(false)
    const [filterspicked, setfilterspicked] = useState([])
    const [sort, setsort] = useState('')
    const [prdata, setprdata] = useState([])
    const [err, seterr] = useState('')
    const [loading, setloading] = useState(false)

    function filterclicked(e) {
        setfilterspicked(prev => {
            if (prev.includes(e.target.value)) {
                return prev.filter(each => each !== e.target.value)
            }
            else {
                return [...prev, e.target.value]
            }
        })
    }
    function applyfilter() {
        if (filterspicked.length === 0) { setprdata([...initprdata]) }
        else { setprdata([...initprdata].filter(each => filterspicked.includes(each.category))) }
    }

    useEffect(() => {
        if (sort === "d") {
            setprdata(prev => {
                let copy = [...prev]
                return copy.sort((a, b) => { return b.price - a.price })
            })
        }
        if (sort === 'a') {
            setprdata(prev => {
                let copy = [...prev]
                return copy.sort((a, b) => { return a.price - b.price })
            })
        }
    }, [sort])


    useEffect(() => {
        async function fetchproducts() {
            setloading(true)
            try {
                let resp = await fetch(`${url}/products`)
                if (!resp.ok) {
                    throw new Error('some kind of error')
                }
                let data = await resp.json()
                setprdata(data.products)
                initprdata = data.products

            }
            catch (error) {
                seterr(error.message)
            }

            finally {
                setloading(false)
            }
        }
        fetchproducts()
    }, [])



    const { cartdispatch, curcart } = useContext(cartcontext)
    let a = useContext(cartcontext)
    let { curtheme } = a
    const themestyles = { backgroundColor: curtheme ? 'white' : 'black', color: curtheme ? 'black' : 'white' }


    useEffect(() => {
        window.localStorage.setItem('ucart', JSON.stringify(curcart))
    }, [curcart])


    return (
        <div className={styles.main} style={themestyles}>

            <Header />


            <div className={styles.fands}>
                <button onClick={() => { setfiltersopen(prev => !prev) }}>filters</button>
                <select onChange={(e) => { setsort(e.target.value) }}>
                    <option disabled selected>sort</option>
                    <option value='a'>price: low to high </option>
                    <option value='d'>price: high to low</option>
                </select>
            </div>


            <div className={`${styles.filters} ${filtersopen === true ? styles.openfilters : ''}`}>
                <div className={styles.filterstable}>
                    {filters.map((each) => {
                        return <div>
                            <input id={each} type="checkbox" value={each} onChange={(e) => { filterclicked(e) }} />
                            <label for={each}>{each}</label>
                        </div>
                    })}
                </div>
                <button onClick={applyfilter}>apply</button>
            </div>


            <div className={styles.display}>
                {
                    prdata.length > 0 && prdata.map(each => {
                        return <div className={styles.item}>
                            <img src={each.imagepath} alt="" />
                            <div className={styles.namepriceadd}>
                                <h3>{each.name}</h3>
                                <h2>${each.price}</h2>
                                <button onClick={() => {
                                    cartdispatch({ type: 'add', entireproduct: each })
                                }}>+</button>
                            </div>
                        </div>
                    })
                }
            </div>



            {
                loading && <h1>loading..</h1>
            }



            {
                err && <div className={styles.errc}>
                    <h1>{err}</h1>
                </div>
            }


            <div className={styles.footer} >
                {
                    ['terms & conditions', 'privacy policy', 'cookie policy', 'cookie settings'].map(each => {
                        return <a href='' style={themestyles}>{each}</a>
                    })
                }
            </div>


        </div >
    )
}

export default Homepage