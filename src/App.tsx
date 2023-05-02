import React from 'react'
import './App.css';
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaPostagem from './components/posts/listposts/ListaPostagem';
import ListaTema from './components/themes/listtheme/ListaTema';
import CadastroTema from './components/themes/registertheme/CadastroTema';
import DeletarTema from './components/themes/deletetheme/DeletarTema';
import CadastroPostagem from './components/posts/registerposts/CadastroPostagem';
import DeletarPostagem from './components/posts/deleteposts/DeletarPostagem';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />

            <Route path="/home" element={<Home />} />

            <Route path="/temas" element={<ListaTema />} />
            <Route path="/cadastrarTema" element={<CadastroTema />} />
            <Route path="/cadastrarTema/:id" element={<CadastroTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            
            <Route path="/postagens" element={<ListaPostagem />} />
            <Route path="/cadastrarPostagem" element={<CadastroPostagem />} />
            <Route path="/cadastrarPostagem/:id" element={<CadastroPostagem />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App