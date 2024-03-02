import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../component/navbar";
import { Ethereum } from "@thirdweb-dev/chains";
import { extendTheme } from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: ({
      body: {
        bg: mode('pink.50', 'pink.900'),
        color: mode('pink.900', 'pink.50')
      }
    })
  }
 });

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Ethereum;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;