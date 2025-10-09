import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AuthProvider } from "./context/AuthContext.tsx"; // ✅ thêm dòng này
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider> {/* ✅ bọc App bên trong */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
