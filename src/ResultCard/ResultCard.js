import Card from "react-bootstrap/Card";
import React, {Component} from "react";
import '../App.css';

class ResultCard extends Component {

    constructor(props) {
        super(props);
    }

    calculateCreditBody(initialFee,cost) {
        if (cost && initialFee) {
            return Math.round((cost - initialFee) * 1000) / 1000;
        }
        return '-';
    }

    calculateMonthlyFee(creditBody,rate,term) {
        if (creditBody !== '-' && rate && term) {
            let IdividedBy1200 = rate / 1200;
            let monthlyFee = creditBody * (IdividedBy1200 + (IdividedBy1200 / (Math.pow(1 + IdividedBy1200, term) - 1)));

            let monthlyFeeRounded = Math.round(monthlyFee * 1000) / 1000;
            console.log(`Monthly: ${monthlyFeeRounded}`)
            return monthlyFeeRounded;
        }
        return '-';
    }

    calculateIncome(monthlyFee) {
        if (monthlyFee !== '-') {
            let income = Math.round(5 * monthlyFee / 3 * 1000) / 1000;
            console.log(`Income: ${income}`)
            return income;
        }
        return '-';
    }

    calculateOverpayment(monthlyFee,initialFee,term,cost) {
        if (monthlyFee !== '-' && initialFee && term && cost) {
            let overpayment = Math.round((monthlyFee * term - cost + initialFee) * 1000) / 1000;
            console.log(`Overpayment ${overpayment}`)
            return overpayment;
        }
        return '-';
    }

    render() {
        const initialFee = this.props.initialFee;
        const cost = this.props.cost;
        const rate = this.props.rate;
        const term = this.props.term;

        const creditBody = this.calculateCreditBody(initialFee,cost);
        const monthlyFee = this.calculateMonthlyFee(creditBody,rate,term);
        const income = this.calculateIncome(monthlyFee);
        const overpayment =this.calculateOverpayment(monthlyFee,initialFee,term,cost);

        return(
            <Card
                bg="light"
                className="mb-12 card-results">
                <Card.Body>
                    <Card.Text>
                        <div className="results">

                            <div className="result">
                                <div className="monthly-fee-title title">Ежемесячный платеж</div>
                                <div className="monthly-fee-value value">{ monthlyFee }</div>
                            </div>

                            <div className="result">
                                <div className="overpayment-title title">Переплата</div>
                                <div className="overpayment-value value">{ overpayment }</div>
                            </div>

                        </div>
                        <div className="results">

                            <div className="result">
                                <div className="income-title title">Необходимый доход</div>
                                <div className="income-value value">{ income }</div>
                            </div>

                            <div className="result">
                                <div className="credit-title title">Тело кредита</div>
                                <div className="credit-value value">{ creditBody }</div>
                            </div>

                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default ResultCard;