import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Signup from './apps/Signup'
import Login from './apps/Login'
import Homepage from './apps/Homepage'
import Checkout from './apps/Checkout'
import Profile from './apps/Profile'
import Fof from './apps/Fof'

import { Compforprotectionb } from './Compforprotection'
import Compforprotectiona from './Compforprotection'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to='login' />} />

                <Route path='/signup' element={<Compforprotectionb element={<Signup />} />} />
                <Route path='/login' element={<Compforprotectionb element={<Login />} />} />

                <Route path='/checkout' element={<Compforprotectiona element={<Checkout />} />} />
                <Route path='/profile' element={<Compforprotectiona element={<Profile />} />} />
                <Route path='/homepage' element={<Compforprotectiona element={<Homepage />} />} />

                <Route path='*' element={<Fof />} />
            </Routes>
        </Router>
    )
}

export default App