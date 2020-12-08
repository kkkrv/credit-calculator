import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, {Component} from "react";
import './CreditParameters.css';
import '../App.css';

class InitialRate extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onInitialRateChange(e.target.value)
    }

    render() {
        const rate = this.props.rate;
        return (
            <InputGroup>
                <Form.Group controlId="InitialRate">
                    <Form.Label>Процентная ставка</Form.Label>
                    <div className="input-group suffix">
                        <Form.Control type="number"
                                      className="initial-rate"
                                      value={ rate }
                                      onChange={ this.handleChange }
                                      min="0"
                                      max="100" />
                        <span className="input-group-addon "> % </span>
                    </div>


                </Form.Group>
            </InputGroup>
        );
    }
}

export default InitialRate;