/**
 * Вычисляет касательную к окружности по радиусу и углу
 * @param {number} angle
 * @param {number} radius
 * @param {number} [x0]
 * @param {number} [y0]
 * @return {{x: *, y: *}}
 */
export const computeCoordinates = (angle = 0, radius = 1, x0 = 0, y0 = 0) => {
    const x = radius * Math.sin(angle) + x0;
    const y = radius * Math.cos(angle) + y0;

    return {x: x, y: y}
};
