import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, {Component} from "react";
import '../App.css';
import './CreditParameters.css'
import CurrencyInput from 'react-currency-input-field';


class InitialFee extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onInitialFeeValueChange(e);
    }

    render() {

        const initialFee = this.props.initialFee;

        return (
            <InputGroup>
                <Form.Group controlId="InitialFee">
                    <Form.Label>Первоначальный взнос</Form.Label>
                    <div className="input-group suffix">
                        <CurrencyInput
                            className="form-control initial-fee"
                            allowNegativeValue={ false }
                            prefix=""
                            decimalSeparator=","
                            groupSeparator=" "
                            value={ initialFee }
                            onChange={ (value) => this.handleChange(value) } />
                        <span className="input-group-addon "> ₽ </span>
                    </div>
                    </Form.Group>
            </InputGroup>
        );
    }
}

export default InitialFee;