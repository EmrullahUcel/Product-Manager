import Products from "./components/Products";
import "./App.css";
import Sales from "./components/Sales";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/SalesSlice";
import Scanner from "./components/Scanner";
import { account } from "./db/appwrite";
import { useNavigate } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    
    const promise = account.deleteSession("current");
    
    promise.then(
      async function (response) {
        try{
          dispatch(login(null))
        }catch(error) {
          console.log(error);
        }
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
