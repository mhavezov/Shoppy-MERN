import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main className='py-3'>
          <Container>
            <Route exact path='/' component={HomePage} />
            <Route path='/products/:id' component={ProductsPage} />
          </Container>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
