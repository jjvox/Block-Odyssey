import AdminPage from "./Component/AdminPage";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <AdminPage />
    </Provider>
  );
}

export default App;
