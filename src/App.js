import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Parada from "./paginas/Parada";
import Linea from "./paginas/Linea";

function App() {
  return (
    <Router>
      <div className="contenedor">
        <Switch>
          <Route path="/parada" exact>
            <Parada></Parada>
          </Route>
          <Route path="/linea/:id" exact>
            <Linea />
          </Route>
          <Route path="/" exact>
            <Redirect to="/parada" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
