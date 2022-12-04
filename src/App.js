import { Route, Link, Routes, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

//Import the pages
import Home from "./pages/Home";
import TrailDetail from "./pages/TrailDetail";
import TrailDetails from "./pages/TrailDetails";
import TrailDetailsIndex from "./pages/TrailDetailsIndex";
import TrailReports from "./pages/TrailReports";
import TrailReportsIndex from "./pages/TrailReportsIndex";
import TrailReport from "./pages/TrailReport";
import { extractTrailData } from "./helpers";
// Import app.css
import "./App.css";

// Load up our trails once
import { ectrails } from "./data/ectrails.js";
import FourOhFour from "./pages/404";

const trailInfo = extractTrailData(ectrails);
// console.log(trailInfo); // DEBUG

function App() {
  const location = useLocation();
  const activeKey = location.pathname;

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ECTrails</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={activeKey}>
              <Nav.Item>
                <Nav.Link eventKey="/" as={Link} to="/">
                  Map
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/trail-detail" as={Link} to="/trail-detail">
                  Trail Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/trail-report" as={Link} to="/trail-report">
                  Trail Reports
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home trails={ectrails} />} />

        {/* Trail Details */}
        <Route path="trail-detail" element={<TrailDetails />}>
          <Route index element={<TrailDetailsIndex trailInfo={trailInfo} />} />
          <Route
            path=":trailID"
            element={<TrailDetail trails={ectrails} trailInfo={trailInfo} />}
          />
        </Route>

        {/* Trail Reports */}
        <Route path="trail-report" element={<TrailReports trails={ectrails} />}>
          <Route index element={<TrailReportsIndex trailInfo={trailInfo} />} />
          <Route path=":trailID" element={<TrailReport trails={ectrails} />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<FourOhFour />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
