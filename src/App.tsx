import { BrowserRouter } from 'react-router-dom'

import { GlobalProvider } from './contexts/GlobalContext'
import Menu from 'src/layouts/Menu'
import Routes from 'src/routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Menu>
            <Routes />
          </Menu>
        </GlobalProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
