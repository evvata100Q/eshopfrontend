import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../css/login.module.css'
const url = import.meta.env.VITE_ONLINE_BACKEND_URL
const localurl = 'http://localhost:5000'

const Login = () => {
    const [un, setun] = useState('')
    const [pw, setpw] = useState('')
    const [err, seterr] = useState('')
    let navigate = useNavigate()

    async function submit(e) {
        e.preventDefault()
        seterr('')
        try {
            let resp = await fetch(
                `${url}/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ un, pw })
                }
            )
            if (resp.status === 200) {
                let data = await resp.json()
                localStorage.setItem('bstoken', JSON.stringify(data.token))
                navigate('/homepage')
            }
            else {
                let data = await resp.json()
                seterr(data.umessage)
            }
        }
        catch (error) {
            seterr(error.message)
        }

    }

    return (
        <div className={styles.main}>
            <h3>dont have an account?  <Link to='/signup'>signup</Link></h3>
            {
                err && <h3 style={{ color: 'red' }}>{err}</h3>
            }
            <form className={styles.liform} onSubmit={submit}>
                <input type="text" placeholder='username' value={un} onChange={(e) => { setun(e.target.value) }} />
                <br />
                <input type="password" placeholder='password' value={pw} onChange={(e) => { setpw(e.target.value) }} />
                <br />
                <button>login</button>
            </form>
        </div>
    )

}

export default Login