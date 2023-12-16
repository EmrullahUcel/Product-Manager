import Products from "./components/Products";
import "./App.css";
import Sales from "./components/Sales";
import { Account, Client } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/SalesSlice";
import Scanner from "./components/Scanner";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleLogout = async () => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65704f186517aeac4eda");

    const account = new Account(client);

    const promise = account.deleteSession("current");

    promise.then(
      function (response) {
        console.log(response);
        dispatch(login(false));
        navigate("/");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <div className="mainDiv">
      <div className="productWrapper">
        <Products />
      </div>
      <Sales />
      <button onClick={handleLogout}>Çıkış yap</button>
      <Scanner/>
    </div>
  );
}

export default App;
