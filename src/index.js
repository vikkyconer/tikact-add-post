import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';



const logger = createLogger({ collapsed: true });
const store = createStore(rootReducer, applyMiddleware(thunk,logger));

import MainScreen from "./navigation/MainScreen";

const Index = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
    </Provider>
  );
};

export default Index;
