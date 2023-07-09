import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
// import './theme/variables.css';
import { Login } from "./pages/Auth/login";
import { SignUp } from "./pages/Auth/Signup/signup";
import { MainLayout } from "./pages/MainApp";
import { Notifications } from "@mantine/notifications";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Notifications />

    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/signup" exact component={SignUp} />
        <Route path="/app/*" exact component={MainLayout} />
        <Route path="/" exact>
          <Redirect to={"/app/feed"} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
