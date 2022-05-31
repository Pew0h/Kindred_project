import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import '../styles/main.scss';
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <SWRConfig value={{ provider: () => new Map() }}><ChakraProvider>{getLayout(
    <Component {...pageProps} />
  )}</ChakraProvider></SWRConfig>;
}

export default MyApp
