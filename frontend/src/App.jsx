import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <main className='py-3'>
          <Container>
            <Route exact path='/' component={HomePage} />
            <Route path='/products/:id' component={ProductsPage} />
          </Container>
        </main>
        <Footer />
      </Switch>
    </>
  );
}

export default App;
