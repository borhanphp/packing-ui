import { AppProvider } from "../context/AppContext";
import { AuthGate } from "../components/AuthGate";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthGate>
        <Component {...pageProps} />
      </AuthGate>
    </AppProvider>
  );
}
