import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, {Component} from "react";
import CurrencyInput from "react-currency-input-field";
import '../App.css';


class PropertyValue extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onPropertyValueChange(value);
    }

    render() {
        const cost = this.props.cost;
        return (
            <InputGroup>
                <Form.Group controlId="Cost">
                    <Form.Label>Стоимость недвижимости</Form.Label>
                    <div className="input-group suffix">
                        <CurrencyInput
                            className="form-control property-value"
                            decimalSeparator=","
                            groupSeparator=" "
                            allowNegativeValue={ false }
                            value={ cost }
                            onChange={ this.handleChange } />
                        <span className="input-group-addon "> ₽ </span>
                    </div>
                </Form.Group>
            </InputGroup>
        );
    }
}

export default PropertyValue;