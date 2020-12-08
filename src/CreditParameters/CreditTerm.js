import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import '../App.css';
import './CreditParameters.css'
import FormGroup from "react-bootstrap/FormGroup";

class CreditTerm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onCreditTermChange(e.target.value);
    }

    render() {
        const term = this.props.term;
        return(
            <InputGroup>
                <FormGroup>
                    <Form.Label>Срок кредита</Form.Label>
                    <div className="input-group suffix">
                        <FormControl type="number"
                                     className="credit-term"
                                     min="0"
                                     onChange={ this.handleChange }
                                     value={ term }/>
                        <span className="input-group-addon "> лет </span>
                    </div>
                    </FormGroup>
            </InputGroup>

        );
    }
}

export default CreditTerm;