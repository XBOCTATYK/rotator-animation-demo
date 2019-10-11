import {drawLines} from "./utils/drawLines";
import {computeCoordinates} from "./utils/computeCoordinates";

export class RotatingFigure {
    arrLines = [];
    angleOffset = 0;
    radius = 0;

    static defaultFigureOptions = {
        radius: 100,
        template: null,
        beginCoord: {x: 120, y: 120},
        animation: {
            startRad: 100,
            stepRad: 0,
            endRad: 9999,
            stepRotate: 0
        }
    };

    constructor(opt) {
        this.options = {};
        this.options.element = document.querySelector('body');
        this.options = {...this.options, ...RotatingFigure.defaultFigureOptions, ...opt};
        this.radius = this.options.radius;

        this._performAnimate = this._performAnimate.bind(this);
        this._end = this._end.bind(this);
        this._setPosition = this._setPosition.bind(this);
    }

    draw() {
        this.arrLines = [];

        this.arrLines = drawLines({
            template: this.options.template,
            count: 30,
            radius: this.options.radius,
            angle: 360,
            angleOffset: 0,
            y0: this.options.beginCoord.y,
            x0: this.options.beginCoord.x,
            elementToRender: this.options.element,
            offsetNum: this.options.offsetNum,
        });

        this.transform();
    };

    transform() {
        this.arrLines.forEach(item => {
            const element = document.getElementById(item.id);
            const angle = +item.dataset.degrees;
            element.style.transform = `rotate(${-angle+this.options.rotateFactor}deg)`
        })
    }

    animate() {
        window.requestAnimationFrame(this._performAnimate)
    }

    _performAnimate() {

        if (this.radius < this.options.animation.endRad) {

            this.radius += this.options.animation.stepRad;
            this.angleOffset += this.options.animation.stepRotate;

            this._setPosition();

            window.requestAnimationFrame(this._performAnimate)
        } else {
            this.stage = 2;
            this._end();
        }

    }

    _setPosition() {
        for (let index = 0; index < this.arrLines.length; index++) {
            const item = document.getElementById(this.arrLines[index].id);
            const angle = +item.dataset.angle + this.angleOffset;

            const newCoords = computeCoordinates(
                angle,
                this.radius,
                this.options.beginCoord.x,
                this.options.beginCoord.y
            );

            item.style.left = `${newCoords.x}px`;
            item.style.top = `${newCoords.y}px`;
        }
    }

    _end() {
        if (this.options.animation.stepRotate > 0) {
            this.options.animation.stepRotate -= 0.0006;
            this.angleOffset += this.options.animation.stepRotate;

            this._setPosition();
            this.transform();
            window.requestAnimationFrame(this._end)
        }


    }
}
