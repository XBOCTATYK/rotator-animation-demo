import parseTemplate from "../parseTemplate";
import {computeCoordinates} from "./computeCoordinates";

const defaultDrawOptions = {
    template: `<div></div>`,
    count: 1,
    radius: 100,
    angle: 360,
    angleOffset: 0,
    x0: 0,
    y0: 0,
    elementToRender: document.createElement('div'),
    offsetNum: 0
};

/**
 * Отрисовывает фигуру
 * @param opt
 * @return {[]}
 */
export const drawLines = (opt) => {
    const options = {...defaultDrawOptions, ...opt};
    const angleStep = (Math.PI / 180) * options.angle / options.count;
    let angle = options.angleOffset;
    let arrElements = [];

    for (let i = 0; i < options.count; i++) {
        const currentCoord = computeCoordinates(angle, options.radius, options.x0, options.y0);
        options.elementToRender.innerHTML += parseTemplate(options.template, {
            X: currentCoord.x,
            Y: currentCoord.y,
            NUMBER: i + options.offsetNum
        });

        const newElement = document.querySelector(`#element-${i + options.offsetNum}`);
        newElement.dataset.angle = angle;
        newElement.dataset.degrees = angle * 180/Math.PI.toFixed(4);
        angle += angleStep;
        arrElements.push(newElement);
    }

    return arrElements;
};
