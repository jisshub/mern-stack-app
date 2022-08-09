import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Route path="/">
            <Home />
          </Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
