import { Link } from 'react-router-dom'
import styles from '../../css/subcss/header.module.css'
import { useContext } from 'react'
import { cartcontext } from '../../Compforcontext'

const Header = () => {
    function welcomename() {
        let a = window.localStorage.getItem('bstoken')
        if (!a) { return 'user' }
        else {
            return JSON.parse(window.localStorage.getItem('bstoken')).slice(12)

        }
    }

    const { curcart } = useContext(cartcontext)

    let a = useContext(cartcontext)
    let { curtheme } = a
    const themestyles = { backgroundColor: curtheme ? 'white' : 'black', color: curtheme ? 'black' : 'white' }

    return (
        <div className={styles.header} style={{ themestyles }}>
            <Link to='/profile' style={themestyles}>
                <img src={curtheme ? './profile.svg' : './profilew.png'} className={styles.cartsvg} />
                <span>
                    hi,{welcomename()}
                </span>
            </Link>
            <Link to='/homepage'><img src={curtheme ? './logo.png' : './logow.png'} /></Link>
            <Link to='/checkout' style={themestyles}>
                <img src={curtheme ? './cart.svg' : './cartw.png'} className={styles.usersvg} />
                <span>
                    {
                        curcart.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                    }
                </span>
            </Link>
        </div>
    )
}

export default Header