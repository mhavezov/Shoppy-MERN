import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterUserPage} />
            <Route path='/profile' component={UserProfilePage} />
            <Route path='/shipping' component={ShippingPage} />
            <Route path='/payment' component={PaymentPage} />
            <Route path='/placeorder' component={PlaceOrderPage} />
            <Route path='/products/:id' component={ProductsPage} />
            <Route path='/cart/:id?' component={CartPage} />
            <Route exact path='/' component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
