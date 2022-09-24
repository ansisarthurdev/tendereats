//screen navigation
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

//redux
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}


