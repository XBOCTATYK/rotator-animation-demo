import parseTemplate from './parseTemplate';
import {RotatingFigure} from "./RotatingFigure";



window.addEventListener('DOMContentLoaded', function () {

    const template3 = `
    <div id="element-{NUMBER}" style="left: {X}px; top: {Y}px; position: absolute;">
        <div  style="width: 16px; left: -5px; height: 1.9px; background-color: #ffffff; position: absolute;"></div>
        <div  style="top: 6px; width: 21px; height: 4.8px; background-color: #ffffff; position: absolute;"></div>
        <div  style="top: 16px; left: 8px; width: 16px; height: 1.9px; background-color: #ffffff; position: absolute;"></div>
    </div>`;

    const getLogo = (opt) => {
        const options = {...opt};

        const Logo = new RotatingFigure({
            radius: options.radius,
            template: options.template,
            beginCoord: {
                x: 150,
                y: 150
            },
            animation: {
                startRad: 10,
                stepRad: 1,
                endRad: options.endStart,
                stepRotate: options.stepRotate
            },
            offsetNum: options.offsetNum,
            rotateFactor: options.rotateFactor
        });

        Logo.draw();
        Logo.animate()
    };

    let Logo1 = getLogo({
        radius: 10,
        endStart: 100,
        stepRotate: 0.08,
        offsetNum: 1,
        rotateFactor: 45,
        template: template3
    });
});

