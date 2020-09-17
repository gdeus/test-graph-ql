import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import HomeScreen from './screens/homeScreen'
import AppBar from './components/appBar/appBar'

function App() {
  return (
    <ApolloProvider client={client}>
      <AppBar/>
        <HomeScreen/>
    </ApolloProvider>
  );
}

export default App;
