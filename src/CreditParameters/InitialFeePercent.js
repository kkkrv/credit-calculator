import React, {Component} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import '../App.css';


class InitialFeePercent extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        const radios = [
            { name: '10%', value: '10' },
            { name: '15%', value: '15' },
            { name: '20%', value: '20' },
            { name: '25%', value: '25' },
            { name: '30%', value: '30' },
        ];
        const selectedOption = this.props.selectedInitialFeeOption;
        return (
            <Form.Group controlId="InitialFeePercent">
                <ButtonGroup toggle className="btn-block">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            className="initial-fee-percent"
                            key={idx}
                            type="radio"
                            variant="primary"
                            name="radio"
                            value={ radio.value }
                            checked={ selectedOption === radio.value }
                            onChange={ this.props.onInitialFeePercentChange }>
                            { radio.name }
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Form.Group>
        );
    }
}

export default InitialFeePercent;