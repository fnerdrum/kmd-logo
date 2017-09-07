import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';

const constants = {
    k: 210,
    b: 15,
    ki: 500,
    krandom: 300000000,
    fcap: 10000
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
            <div style={{ padding: 25 }}>
                {this.range('k', 'Spring stiffness', 0, 300)}
                {this.range('b', 'Spring damping', 0, 50)}
                {this.range('ki', 'Interaction force constant', 0, 100000)}
                {this.range('krandom', 'Noice', 0, 10000000000)}
                {this.range('fcap', 'Max force', 0, 200000)}
                <div style={{ margin: '25px 0' }}>
                    {['KUNST', 'MUSIKK', 'DESIGN', 'DEFAULT'].map(mode => <button key={mode} style={{ height: 30, width:80 }} onClick={() => this.setState({ mode })}>{mode}</button>)}
                    <span style={{ marginLeft: 10 }}>Emphasis</span>
                </div>
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
