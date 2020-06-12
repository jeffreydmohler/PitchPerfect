import React from 'react';
import * as bs from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './index.scss';
import Header from './comps/header'
import Center from './comps/center'
import Report from './comps/report'
import Footer from './comps/footer'

function App() {
  return (
    <Router>
      <bs.Container fluid className="p-0 min-vh-100 d-flex flex-column">
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0 border-bottom shadow-sm" bg="secondary">
          <bs.Col >
            <Header />
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-1">
          <bs.Col>
            <Switch>
              <Route exact path="/">
                <Center />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
            </Switch>
          </bs.Col>
        </bs.Row>
        <bs.Row noGutters className="flex-grow-0 flex-shrink-0">
          <bs.Col  className="px-3 py-2 bg-primary text-light">
            <Footer style={{ position: "fixed", left: 0, bottom: 0 }} />
          </bs.Col>

        </bs.Row>
      </bs.Container>

    </Router>
  );
}

export default App;
