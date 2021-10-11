import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Loadable from "react-loadable";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
// require('mapbox-gl/dist/mapbox-gl.css');

//Components
// import HomePage from './pages/homepage/homepage.component';
// import LiveinfoPage from './pages/liveinfopage/liveinfopage.component';
// import RetkeilyKohteetPage from './pages/retkeilykohteetpage/retkeilykohteetpage.component';
// import KyselyPage from './pages/kyselypage/kyselypage.component';
import MapPageHandler from "./pages/mappage/mappagehandler.component";
// import RuokaJaJuomaPage from './pages/ruokajajuomapage/ruokajajuoma.component';
// import OstoksetPage from './pages/ostoksetpage/ostokset.component';
// import MajoitusPage from './pages/majoituspage/majoitus.component';
// import KokousJaJuhlaPage from './pages/kokousjajuhlapage/kokousjajuhla.component';
// import TiedotteetPage from './pages/tiedotteetpage/tiedotteetpage.component';

// import TapahtumatPage from './pages/tapahtumatpage/tapahtumatpage.component';
import NavbarLeft from "./components/navbar-left/navbar-left.component";
// import NahtavyydetPage from './pages/nahtavyydetpage/nahtavyydetpage.component';
// import VikaIlmoituksetPage from './pages/vikailmoituksetpage/vikailmoitukset.component';
// import LiikennePage from './pages/liikennepage/liikennepage.component';
// import DexieTestPage from './pages/dexietestpage/dexietestpage.component';
// import ReactMapPage from './pages/dexietestpage/reactmappage.component';
// import MapPage from './pages/dexietestpage/mappage.component';
// import Testpage from './pages/testpage/testpage.component';
import EmergencyAnnouncement from "./components/emergency-announcement/announcement-container.component";
import LoadingScreen from "./components/loadingscreen/LoadingScreen.component";

const HomePage = Loadable({
  loader: () => import("./pages/homepage/homepage.component"),
  loading() {
    return <LoadingScreen title="Kotisivu" />;
  },
});

// const MapPageHandler = Loadable({
//   loader: () => import('./pages/mappage/mappagehandler.component'),
//   loading() {
//     return <div></div>
//   }
// })

const KyselyPage = Loadable({
  loader: () => import("./pages/kyselypage/kyselypage.component"),
  loading() {
    return <LoadingScreen title="Kyselyt" />;
  },
});

const InfoPage = Loadable({
  loader: () => import("./pages/infopage/infopage.component"),
  loading() {
    return <LoadingScreen title="Tietoa sovelluksesta" />;
  },
});

const TiedotteetPage = Loadable({
  loader: () => import("./pages/tiedotteetpage/tiedotteetpage.component"),
  loading() {
    return <LoadingScreen title="Tiedotteet" />;
  },
});

/*const TapahtumatPage = Loadable({
  loader: () => import('./pages/tapahtumatpage/tapahtumatpage.component'),
  loading() {
    return <LoadingScreen title="Tapahtumat"/>
  }
})*/

// const NavbarLeft = Loadable({
//   loader: () => import('./components/navbar-left/navbar-left.component'),
//   loading() {
//     return <div></div>
//   }
// })

/*const VikaIlmoituksetPage = Loadable({
  loader: () => import('./pages/vikailmoituksetpage/vikailmoitukset.component'),
  loading() {
    return <LoadingScreen title="Vikailmoitukset"/>
  },
})*/

const LiikennePage = Loadable({
  loader: () => import("./pages/liikennepage/liikennepage.component"),
  loading() {
    return <LoadingScreen title="Liikenne" />;
  },
});

const App = () => {
  const [alertData, setAlertData] = useState("");


  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.initial[0] < 25) {
        setSidebar(true);
      }
    },
    onSwipedLeft: (e) => {
      if (sidebar) {
        setSidebar(false);
      }
    },
  });

  //Väliaikainen componentti sivuille
  const Placeholderpage = () => {
    return (
      <div style={{ position: "relative", top: 150, textAlign: "center" }}>
        Page under construction
      </div>
    );
  };

  return (
    <>
      <div {...handlers}>
        <Router>
          {/* {alertData ? <EmergencyAnnouncement data={alertData} /> : null} */}
          <NavbarLeft isSidebar={sidebar} toggleSidebar={showSidebar} />
          <div onClick={() => setSidebar(false)}>
            <MapPageHandler />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/tiedotteet" exact component={TiedotteetPage} />
              {/*<Route path="/tapahtumat" component={TapahtumatPage} />*/}
              {/*<Route path="/liveinfo" component={LiveinfoPage} />*/}
              <Route path="/liikenne" component={LiikennePage} />
              <Route path="/kyselyt" component={KyselyPage} />
              {/*<Route path="/vikailmoitukset" component={VikaIlmoituksetPage} />*/}
              <Route path="/tietoasovelluksesta" component={InfoPage} />
              {/*<Route path="/tietoasovelluksesta" component={Placeholderpage} />*/}
              {/*<Route path="/map" component={MapPage} />*/}
              {/*<Route path="/reactmap" component={ReactMapPage} />*/}
              {/*<Route path="/test" component={Testpage} />*/}
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
