import { Component } from "react";

class HalfScreen extends Component {
    render() {
        return (
            <div>
                <div className="split left">
                    <div className="centered">
                            <h2>Jane Flex</h2>
                            <p>Some text.</p>
                    </div>
                </div>

                <div className="split right">
                    <div className="centered">
                            <h2>John Doe</h2>
                            <p>Some text here too.</p>
                    </div>
                </div>
                <button className="bottom">Save</button>
            </div>
        )
    }
}

export default HalfScreen