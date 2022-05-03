import '../styles/globals.css';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return <Provider store={store}><ChakraProvider>{getLayout(
    <Component {...pageProps} />
  )}</ChakraProvider></Provider>;
}

export default MyApp
