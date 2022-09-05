import { Component } from "react";
import { Alert } from "react-bootstrap";

export class Notification extends Component {

    state = {
      show: false
    }

    componentDidMount() {
      if(this.props.show){
        this.setState({show: true})
      }
    }

    hide = () => {
      console.log('closing alert')
      this.setState({show: false});
    }
    render() {
        return (
            <Alert show={this.state.show} variant="success" onClose={this.hide} dismissible>
              <p> Deploy Info saved successfully </p>
            </Alert>
        )
    }
}