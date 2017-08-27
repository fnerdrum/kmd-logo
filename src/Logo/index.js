import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import stepper from './stepper';
import D from './d.svg';
import E from './e.svg';
import G from './g.svg';
import I from './i.svg';
import K from './k.svg';
import M from './m.svg';
import N from './n.svg';
import S from './s.svg';
import T from './t.svg';
import U from './u.svg';

const KUNST = 'KUNST';
const MUSIKK = 'MUSIKK';
const DESIGN = 'DESIGN';
const DEFAULT = 'DEFAULT';

const letters = [K, U, N, S, T, M, U, S, I, K, K, D, E, S, I, G, N];
const lastLetterWidth = 57;

const anchors = {
    [KUNST]: [0, 0.11859929846017954, 0.24794251789945726, 0.3661171554513721, 0.48661044156241245, 0.6066875599833533, 0.6559793671420038, 0.6990937736217631, 0.7392582023254431, 0.747728771908964, 0.7872618713956905, 0.826794970882417, 0.8696291011627215, 0.9075484891980421, 0.9477129179017221, 0.9561834874852431, 1],
    [MUSIKK]: [0, 0.03816833536967032, 0.0797943436298185, 0.11782601208682172, 0.15660388188698735, 0.19524781811273922, 0.33801827509956184, 0.46289629988000636, 0.5792299092805033, 0.6037643534425029, 0.7182693595515138, 0.8327743656605249, 0.8741297734335922, 0.9107401059988575, 0.9495179757990231, 0.9576961238530229, 1],
    [DESIGN]: [0, 0.041969349511149036, 0.08774070612138168, 0.12955977867209262, 0.17219936342679554, 0.21469167676026912, 0.2670211199240199, 0.3127924765342526, 0.35543206128895555, 0.3644246346015707, 0.4063939841127197, 0.4483633336238687, 0.5847847583095644, 0.705553334796029, 0.8334720890601378, 0.8604498089979833, 1],
    [DEFAULT]: [0, 0.0663817569012973, 0.13877704305496794, 0.2049211110530094, 0.2723629604628279, 0.3395718747474556, 0.42233990463921206, 0.49473519079288264, 0.5621770402027011, 0.576400344173532, 0.6427821010748294, 0.7091638579761266, 0.7810885201013505, 0.8447606235055309, 0.9122024729153494, 0.9264257768861802, 1]
};

class Logo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            positions: anchors[props.mode].map(pos => pos * (props.width - lastLetterWidth)),
            velocities: letters.map(_ => 0),
        };

        this.updatePositions = this.updatePositions.bind(this);
    }


    updatePositions() {
        this.animationId = raf(() => {
            const newValues = letters.map((_, index) => {
                const params = { ...this.props.constants, others: this.state.positions.filter((_, i) => i !== index), width: (this.props.width - lastLetterWidth)};
                return  stepper(this.state.positions[index], this.state.velocities[index], anchors[this.props.mode][index] * (this.props.width - lastLetterWidth), params);
            });
            this.setState({ positions: newValues.map(val => val.newX), velocities: newValues.map(val => val.newV) });
            if (!newValues.every(result => result.done))  {
                this.updatePositions();
            }
        })
    }

    componentWillReceiveProps(newProps) {
        if (this.animationId !== null) {
            raf.cancel(this.animationId);
        }
        this.updatePositions(newProps);
    }

    render() {
        const style = { ...this.props.style, position: 'relative', display: 'block', backgroundImage: 'none', height: 81, width: this.props.width };
        return (
             <a style={style} href={this.props.mainPage} title="Til forsiden">
                 {letters.map((letter, index) => React.createElement(letter, { key: index, style: { position: 'absolute', left: this.state.positions[index] } }))}
             </a>
        )
    }
}

Logo.propTypes = {
    width: PropTypes.number.isRequired,
    mode: PropTypes.oneOf([KUNST, DESIGN, MUSIKK, DEFAULT]).isRequired
};

Logo.defaultProps = {
    mode: DEFAULT
};

module.exports = Logo;