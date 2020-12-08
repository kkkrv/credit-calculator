import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropertyValue from "./PropertyValue"
import InitialFee from "./InitialFee";
import CreditTerm from "./CreditTerm";
import InitialRate from "./InitialRate";
import InitialFeePercent from "./InitialFeePercent";
import CustomAlert from "./CustomAlert";

class CreditParameters extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const cost = this.props.cost;
        const initialFee = this.props.initialFee;
        const initialFeePercent = this.props.initialFeePercent;
        const term = this.props.term;
        const rate = this.props.rate;

        return (
            <Form className="col-lg-10">

                <PropertyValue
                    cost={ cost }
                    onPropertyValueChange={ this.props.onPropertyValueChange } />

                <InitialFee
                    initialFee={ initialFee }
                    cost={ cost }
                    onInitialFeeValueChange={ this.props.onInitialFeeValueChange } />

                <InitialFeePercent
                    selectedInitialFeeOption={ initialFeePercent }
                    onInitialFeePercentChange={ this.props.onInitialFeePercentChange } />

                <CreditTerm
                    term={ term }
                    onCreditTermChange={ this.props.onCreditTermChange } />

                <InitialRate
                    rate={ rate }
                    onInitialRateChange={ this.props.onInitialRateChange } />

                <div className="buttons">
                    <Button variant="success"
                            className="col-lg-6"
                            onClick={ this.props.onClickSaveButton }>Save</Button>
                    <Button variant="light"
                            className="col-lg-6"
                            type="reset"
                            onClick={ this.props.onClickResetButton }>Clear</Button>
                </div>

                <CustomAlert initialFee={ initialFee }
                    cost={ cost } />

            </Form>
        );
    }
}

export default CreditParameters;