import { useState, useEffect } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import './App.css'
import Header from './components/Header';
import Nav from './components/Nav';
import LoginModal from './components/Login-Modal';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [navVisible, setNavVisible] = useState(false);
  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const [cartVisible, setCartVisible] = useState(false);
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <ApolloProvider client={client}>
      <ScrollToTop />
      <Header onToggleModal={toggleModal} onToggleNav={toggleNav} onToggleCart={toggleCart} />
      <Nav onClose={toggleNav} navVisible={navVisible} />
      {modalVisible && <LoginModal onClose={toggleModal} />}
      <ShoppingCart onClose={toggleCart} cartVisible={cartVisible} />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;