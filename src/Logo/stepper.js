const secondsPerFrame = 1 / 60;
const precision = 2;

function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

function stepper(x, v, destX, { k, b, others, ki, krandom, fcap } ) {
    const Fspring = -k * (x - destX);
    const Fdamper = -b * v;
    const Finteraction = sum(others.map(pos => (Math.sign(x - pos) * ki) / Math.max(Math.pow(x - pos, 2), 0.00000000001)));

    const sumDistances = sum(others.map(pos => Math.abs(x - pos)));
    const Frandom = (Math.random() - 0.5) * krandom / Math.max(Math.pow(sumDistances, 2), 0.0000000000001);

    const F = Fspring + Fdamper + Finteraction + Frandom;

    const Fcapped = Math.sign(F) * Math.min(Math.abs(F), fcap);
    const a = Fcapped;


    const newV = v + a * secondsPerFrame;
    const newX = x + newV * secondsPerFrame;

    if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
        return {
            newX: destX,
            newV: 0,
            done: true,
        };
    }

    return {
        newX,
        newV,
        done: false,
    }
}

module.exports = stepper;