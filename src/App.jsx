import Router from "./Router";
import AuthProvider from "./contexts/Auth";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}

export default App;
  