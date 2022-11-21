import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ConfirmCart from './components/paginas/ConfirmCart';
import CreateFormContainer from './components/paginas/CreateFormContainer';
import ProductList from './components/paginas/ProductList';
import EditFormContainer from './components/paginas/EditFormContainer';
import LoginContainer from './components/paginas/LoginContainer';
import NavBar from './components/NavBar';
import { UserContextProvider } from './components/context/UserContext';

function App() {
  return (
    <div>
    <UserContextProvider>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/formulario/agregarnuevoproducto' element={<CreateFormContainer/>}/>
        <Route path='/formulario/:id' element={<EditFormContainer/>}/>
        <Route path='/confirmar/:id' element={<ConfirmCart/>}/>
        <Route path='/login' element={<LoginContainer/>}/>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
    </div>
  );
}

export default App;
