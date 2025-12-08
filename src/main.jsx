import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Compforcontext from './Compforcontext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Compforcontext>
      <App />
    </Compforcontext>
  </StrictMode>,
)


export default App