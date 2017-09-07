import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';

const constants = {
    k: 234,
    b: 18,
    ki: 389,
    krandom: 1992700730,
    fcap: 15036
};

const headerStyle = {
    fontSize: 20,
    margin: '30px 0 10px',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            mode: 'DEFAULT',
            constants,
        };
        this.range = this.range.bind(this);
    }

    range(id, name, min, max) {
        const { constants } = this.state;
        const value = constants[id];
        return (
             <div>
                 <input id={id} type="range" min={min} max={max} value={value} onChange={event => this.setState({ constants: { ...constants, [id]: parseInt(event.target.value) } })} />
                 <label style={{ marginLeft: 10 }} htmlFor={id}>{`${name}: ${(100 * (value / (max - min))).toFixed(2)}%`}</label>
             </div>
        );
    }

    render() {
        const { width } = this.state;
        return (
            <div style={{ padding: '0 25px' }}>
                <h1 style={headerStyle}>Physical constants</h1>
                {this.range('k', 'Spring stiffness', 0, 300)}
                {this.range('b', 'Spring damping', 0, 50)}
                {this.range('ki', 'Interaction force constant', 0, 100000)}
                {this.range('krandom', 'Noice', 0, 10000000000)}
                {this.range('fcap', 'Max force', 0, 200000)}

                <h1 style={headerStyle}>Emphasize word</h1>
                <div>
                    {['KUNST', 'MUSIKK', 'DESIGN', 'DEFAULT'].map(mode => <button key={mode} style={{ height: 30, width: 80 }} onClick={() => this.setState({ mode })}>{mode}</button>)}
                </div>

                <h1 style={headerStyle}>Logo</h1>
                <div>
                    <input id="width" type="range" min={100} max={1500} value={width} onChange={(event) => this.setState({width: parseInt(event.target.value)})}/>
                    <label style={{ marginLeft: 10 }} htmlFor="width">Width: {width}px</label>
                </div>
                <div style={{ position: 'relative', display: 'inline-block', border: '1px solid red' }}>
                    <Logo {...this.state} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
