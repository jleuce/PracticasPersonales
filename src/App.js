import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmCart from './components/ConfirmCart';
import Formulario01 from './components/Formulario01';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/formulario/:id' element={<Formulario01/>}/>
        <Route path='/confirmar/:id' element={<ConfirmCart/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
