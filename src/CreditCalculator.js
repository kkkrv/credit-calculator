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
        cost: '',
        initialFee: '',
        from: '',
        initialFeePercent: '',
        term: '',
        rate: ''
    })

    resetState = () => {
        this.setState(this.getInitialState());
    }

    handlePropertyChange(cost) {
        this.setState({ cost: Number(cost),
            from: 'v' });
    }

    calculateInitialFee() {
        const cost = this.state.cost;
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
        this.setState({ initialFee: Number(initialFee),
            from: 'f' });
    }

    calculatePropertyValue() {
        const initialFee = this.state.initialFee;
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
        const cost = store.get('cost') ;
        const initialFee = store.get('initialFee');
        const initialFeePercent = store.get('initialFeePercent');
        const term = store.get('term');
        const rate = store.get('rate');
        const from = store.get('from');

        this.setState({ cost, initialFee, term, initialFeePercent, rate, from });
    }

    handleClickOnSave() {
        console.log('Writing');

        const setValueAndFee = this.getActualSetOfValueAndFee();

        store.set('cost', setValueAndFee.cost);
        store.set('initialFee', setValueAndFee.initialFee);
        store.set('initialFeePercent', this.state.initialFeePercent);
        store.set('term', this.state.term);
        store.set('rate', this.state.rate);
        store.set('from', this.state.from);
    }

    getActualSetOfValueAndFee() {
        const from = this.state.from;
        const initialFeePercent = this.state.initialFeePercent;
        let cost, initialFee;

        if ( initialFeePercent ) {
            initialFee = from === 'v' ? this.calculateInitialFee() : this.state.initialFee;
            cost = from === 'f' ? this.calculatePropertyValue() : this.state.cost;
        } else {
            initialFee = this.state.initialFee;
            cost = this.state.cost;
        }

        return ({cost: cost, initialFee: initialFee});
    }


    render() {
        const initialFeePercent = this.state.initialFeePercent;
        const term = this.state.term;
        const rate = this.state.rate;
        const costAndFee = this.getActualSetOfValueAndFee();
        const initialFee = costAndFee.initialFee;
        const cost = costAndFee.cost;

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
                        onInitialRateChange={ (value) =>  this.setState({rate: Number(value) }) }
                        onCreditTermChange={ (value) => this.setState({term: Number(value) }) }
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