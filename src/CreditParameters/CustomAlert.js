import Alert from "react-bootstrap/Alert";
import React, {Component} from "react";

class CustomAlert extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let alert;
        if ( this.props.initialFee > this.props.cost ) {
            alert = "Первоначальный взнос не может быть больше стоимости недвижимости";
        }
        return (alert) ? <Alert className="custom-alert" variant="warning">{alert}</Alert> : null;
    }
}

export default CustomAlert;