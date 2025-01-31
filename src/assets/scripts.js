/* Arreglo de los 100vh https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // Hacemos lo mismo pero al cambiar el tamaño de la ventana
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});