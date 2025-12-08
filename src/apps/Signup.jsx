import { useState } from 'react'
import styles from '../css/signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
const url = import.meta.env.VITE_ONLINE_BACKEND_URL
let localurl = 'http://localhost:5000'

const Signup = () => {
  const navigate = useNavigate()
  const [un, setun] = useState('')
  const [pw, setpw] = useState('')
  const [rn, setrn] = useState('')
  const [err, seterr] = useState('')
  const [suc, setsuc] = useState('')
  function invalidcredentials() {

    let haslower = /[a-z]/.test(pw)
    let hasupper = /[A-Z]/.test(pw)
    let hasnumber = /\d/.test(pw)

    if (rn.trim().length === 0) {
      seterr('real name cant be empty')
      return true
    }
    if (un.trim().length < 8) {
      seterr('username has to be 8 in length')
      return true
    }

    if (!(pw.trim().length >= 8 && haslower && hasupper && hasnumber)) {
      seterr('password must be 8 in length and include an uppercase a lowercase a numbers')
      return true
    }

    return false

  }

  async function submit(e) {
    e.preventDefault()
    seterr('')
    if (invalidcredentials()) { return }

    try {
      let resp = await fetch(
        `${url}/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ un, pw, rn })
        }
      )

      let data = await resp.json()

      if (resp.ok) {
        setsuc(data.umessage)
        setrn(''); setun(''); seterr(''); setpw('')
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }

      else {
        throw new Error(data.umessage)
      }

    } catch (error) {
      seterr(error.message)
    }
  }

  return (
    <div className={styles.main}>
      <h3>have an account?  <Link to='/login'>login</Link></h3>
      {
        err && <h3 style={{ color: 'red', width: '500px', textAlign: 'center' }}>{err}</h3>
      }
      {
        suc && <h3 style={{ color: 'green' }}>{suc}</h3>
      }
      <form className={styles.suform} onSubmit={submit}>
        <input type="text" placeholder='real name' value={rn} onChange={(e) => { setrn(e.target.value) }} />
        <br />
        <input type="text" placeholder='username' value={un} onChange={(e) => { setun(e.target.value) }} />
        <br />
        <input type="text" placeholder='password' value={pw} onChange={(e) => { setpw(e.target.value) }} />
        <br />
        <button>signup</button>
      </form>
    </div>
  )
}
export default Signup