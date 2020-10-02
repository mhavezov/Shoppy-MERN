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

      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/products/:id' component={ProductsPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
