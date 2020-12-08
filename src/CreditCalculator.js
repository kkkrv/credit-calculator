import Col from "react-bootstrap/Col";
import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import CreditParameters from "./CreditParameters/CreditParameters";
import ResultCard from "./ResultCard/ResultCard";
const store = require('store');


class CreditCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
        this.handleInitialFeeChange = this.handleInitialFeeChange.bind(this);
        this.handleInitialFeePercentChange = this.handleInitialFeePercentChange.bind(this);
        this.handleClickOnSave = this.handleClickOnSave.bind(this);
    }

    getInitialState = () => ({
        propertyValue: '',
        initialFeeValue: '',
        from: '',
        initialFeePercent: '',
        creditTerm: '',
        initialRate: ''
    })

    resetState = () => {
        this.setState(this.getInitialState());
    }

    handlePropertyChange(cost) {
        this.setState({ propertyValue: Number(cost),
            from: 'v' });
    }

    calculateInitialFee() {
        const cost = this.state.propertyValue;
        const initialFeePercent = this.state.initialFeePercent;
        let newInitialFeeValueRounded;

        if (cost) {
            let newInitialFeeValue = cost * initialFeePercent / 100;
            newInitialFeeValueRounded = Math.round(newInitialFeeValue * 1000) / 1000;
        } else {
            newInitialFeeValueRounded = 0;
        }
        return newInitialFeeValueRounded;
    }

    handleInitialFeeChange(initialFee) {
        this.setState({ initialFeeValue: Number(initialFee),
            from: 'f' });
    }

    calculatePropertyValue() {
        const initialFee = this.state.initialFeeValue;
        const initialFeePercent = this.state.initialFeePercent;
        let newPropertyValueRounded;
        if (initialFee) {
            let newPropertyValue = initialFee * 100 / initialFeePercent;
            newPropertyValueRounded = Math.round(newPropertyValue * 1000) / 1000;
        } else {
            newPropertyValueRounded = 0;
        }
        return newPropertyValueRounded;
    }

    handleInitialFeePercentChange(event) {
        const selectedOption = event.currentTarget.value
        this.setState({ initialFeePercent: selectedOption });
    }

    componentDidMount() {
        const propertyValue = store.get('propertyValue') ;
        const initialFeeValue = store.get('initialFeeValue');
        const initialFeePercent = store.get('initialFeePercent');
        const creditTerm = store.get('creditTerm');
        const initialRate = store.get('initialRate');
        const from = store.get('from');

        this.setState({ propertyValue, initialFeeValue, creditTerm, initialFeePercent, initialRate, from });
    }

    handleClickOnSave() {
        console.log('Writing');

        const setValueAndFee = this.getActualSetOfValueAndFee();

        store.set('propertyValue', setValueAndFee.propertyValue);
        store.set('initialFeeValue', setValueAndFee.initialFeeValue);
        store.set('initialFeePercent', this.state.initialFeePercent);
        store.set('creditTerm', this.state.creditTerm);
        store.set('initialRate', this.state.initialRate);
        store.set('from', this.state.from);
    }

    getActualSetOfValueAndFee() {
        const from = this.state.from;
        const initialFeePercent = this.state.initialFeePercent;
        let cost, initialFee;

        if ( initialFeePercent ) {
            initialFee = from === 'v' ? this.calculateInitialFee() : this.state.initialFeeValue;
            cost = from === 'f' ? this.calculatePropertyValue() : this.state.propertyValue;
        } else {
            initialFee = this.state.initialFeeValue;
            cost = this.state.propertyValue;
        }

        return ({propertyValue: cost, initialFeeValue: initialFee});
    }


    render() {
        const initialFeePercent = this.state.initialFeePercent;
        const term = this.state.creditTerm;
        const rate = this.state.initialRate;
        const costAndFee = this.getActualSetOfValueAndFee();
        const initialFee = costAndFee.initialFeeValue;
        const cost = costAndFee.propertyValue;

        return(
            <Row>
                <Col>
                    <CreditParameters
                        initialFee={ initialFee }
                        initialFeePercent={ initialFeePercent }
                        cost={ cost }
                        onPropertyValueChange={ this.handlePropertyChange }
                        onInitialFeeValueChange={ this.handleInitialFeeChange }
                        onInitialFeePercentChange={ this.handleInitialFeePercentChange }
                        onInitialRateChange={ (value) =>  this.setState({initialRate: Number(value) }) }
                        onCreditTermChange={ (value) => this.setState({creditTerm: Number(value) }) }
                        term={ term }
                        rate={ rate }
                        onClickSaveButton={ this.handleClickOnSave }
                        onClickResetButton={ this.resetState }/>
                </Col>
                <Col>
                    <ResultCard
                        initialFee={ initialFee }
                        cost={ cost }
                        rate={ rate }
                        term={ term } />
                </Col>
            </Row>
        );
    }

}

export default CreditCalculator;