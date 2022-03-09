import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  AuthProvider, { useAppContext }  from './auth/authContext'
import SocketProvider  from './context/SocketContext';
import ChatProvider  from './context/chat/ChatContext';
import moment from "moment"
import 'moment/locale/es-mx'
moment.locale('es-mx');

function MyApp({ Component, pageProps }: AppProps) {
  /* return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} /> }
    </div>
  ) */
  /*const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });*/

  return(  
    
    <ChatProvider>
      <AuthProvider> 
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>

  );
}

export default MyApp
