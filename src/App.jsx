import Router from "./Router";
import AuthProvider from "./contexts/Auth";
import OrderProvider from "./contexts/Order";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

function App() {
  return (
    <OrderProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </OrderProvider>
  );
}

export default App;
