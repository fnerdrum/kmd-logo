import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';

const consants = {
    k: 210,
    b: 15,
    ki: 500,
    krandom: 300000000,
    fcap: 10000
};

function percent(value, range) {
    return (100 * (value / range)).toFixed(2) + '%';
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            constants: consants,
            mode: 'DEFAULT',
        };
    }

    render() {
        const { width, constants, mode } = this.state;
        const { k, b, ki, krandom, fcap } = constants;
        return (
            <div>
                <div>
                    <input id="width" type="range" min={0} max={1500} value={width} onChange={(event) => this.setState({width: parseInt(event.target.value)})}/>
                    <label style={{marginLeft: 10}} htmlFor="width">Width: {width}px</label>
                </div>

                <div>
                    <input id="k" type="range" min={0} max={300} value={k} onChange={(event) => this.setState({constants: Object.assign({}, constants, {k: parseInt(event.target.value)})})}/>
                    <label style={{marginLeft: 10}} htmlFor="k">Spring stiffness: {percent(k, 300)} </label>
                </div>

                <div>
                    <input id="b" type="range" min={0} max={50} value={b} onChange={(event) => this.setState({constants: Object.assign({}, constants, {b: parseInt(event.target.value)})})}/>
                    <label style={{marginLeft: 10}} htmlFor="b">Spring damping: {percent(b,50)} </label>
                </div>

                <div>
                    <input id="ki" type="range" min={0} max={100000} value={ki} onChange={(event) => this.setState({constants: Object.assign({}, constants, {ki: parseInt(event.target.value)})})}/>
                    <label style={{marginLeft: 10}} htmlFor="ki">Interaction force constant: {percent(ki,100000)} </label>
                </div>

                <div>
                    <input id="krandom" type="range" min={0} max={10000000000} value={krandom} onChange={(event) => this.setState({constants: Object.assign({}, constants, {krandom: parseInt(event.target.value)})})}/>
                    <label style={{marginLeft: 10}} htmlFor="krandom">Noice: {percent(krandom,10000000000)} </label>
                </div>

                <div>
                    <input id="fcap" type="range" min={0} max={200000} value={fcap} onChange={(event) => this.setState({constants: Object.assign({}, constants, {fcap: parseInt(event.target.value)})})}/>
                    <label style={{marginLeft: 10}} htmlFor="fcap">Max force: {percent(fcap,200000)} </label>
                </div>

                <div>
                    <button style={{height: 30, width:80}} type="button" onClick={() => {this.setState({mode: 'KUNST'})}}>Kunst</button>
                    <button style={{height: 30, width:80}} type="button" onClick={() => {this.setState({mode: 'MUSIKK'})}}>Musikk</button>
                    <button style={{height: 30, width:80}} type="button" onClick={() => {this.setState({mode: 'DESIGN'})}}>Design</button>
                    <button style={{height: 30, width:80}} type="button" onClick={() => {this.setState({mode: 'DEFAULT'})}}>Standard</button>
                    <span style={{marginLeft: 10}}>Bokstavplassering</span>
                </div>
                <Logo width={width} constants={constants} mode={mode} />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
