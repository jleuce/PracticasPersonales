import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmCart from './components/paginas/ConfirmCart';
import CreateFormContainer from './components/paginas/CreateFormContainer';
import ProductList from './components/paginas/ProductList';
import EditFormContainer from './components/paginas/EditFormContainer';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/formulario/agregarnuevoproducto' element={<CreateFormContainer/>}/>
        <Route path='/formulario/:id' element={<EditFormContainer/>}/>
        <Route path='/confirmar/:id' element={<ConfirmCart/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
