import "./App.css";
import Header from "./components/header/Header";
import Mainbody from "./components/mainbody/Mainbody";
import Templates from "./components/Templates/Templates";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormHeader from "./components/formHeader/FormHeader";
import CenteredTabs from "./components/centeredTabs/CenteredTabs";
import UsersForm from "./components/UsersForm/UsersForm";
import NotFound from "./pages/NotFound";

import Submitted from "./pages/Submitted";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <Templates />
            <Mainbody />
          </Route>
          <Route path="/form/:form_id">
            <FormHeader />
            <CenteredTabs />
          </Route>
          <Route path="/response/:form_id">
            <UsersForm />
          </Route>
          <Route path="/Submitted" exact>
            <Submitted />
          </Route>
          {/* 404 page */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
