import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreditCalculator from './CreditCalculator'
import Container from "react-bootstrap/Container";

function App() {
  return (
      <Container className="component">
            <CreditCalculator />
      </Container>
  );
}


export default App;
