import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/app.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Home from "./components/Home";
import Products from "./components/Products";
import productContext from "./contexts/productContext";
import Dashboard from "./components/Dashboard";
import SingleProduct from "./components/SingleProduct";
import NotFound from "./components/NotFound";
import loginUser from "./contexts/loginContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  // state for getting user's account information from the database
  const [loggedUser, setLoggedUser] = useState({});

  // state for getting product list from the database
  const [productlist, setProductList] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(
        "https://omar-market-api.herokuapp.com/api/signin",
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      if (data.user) {
        setLoggedUser(data.user);
      }
    };
    try {
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <productContext.Provider value={{ productlist, setProductList }}>
          <loginUser.Provider value={{ loggedUser, setLoggedUser }}>
            <Nav />
            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/sign-up" component={SignUp} />

              <Route path="/sign-in" component={SignIn} />

              <Route path="/products" component={Products} />

              <Route path="/about" component={About} />

              <Route path="/dashboard" component={Dashboard} />

              <Route path="/product/:id" component={SingleProduct} />

              <Route component={NotFound} />
            </Switch>
            <Footer />
          </loginUser.Provider>
        </productContext.Provider>
      </div>
    </Router>
  );
}

export default App;
