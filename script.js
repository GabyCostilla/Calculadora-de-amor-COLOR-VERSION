document.addEventListener("DOMContentLoaded", function () {
  const color1Input = document.getElementById("color1");
  const color2Input = document.getElementById("color2");
  const calcularButton = document.getElementById("calcular");
  const porcentajeSpan = document.getElementById("porcentaje");

  calcularButton.addEventListener("click", function () {
    const color1 = color1Input.value;
    const color2 = color2Input.value;

    if ((color1 === "#FF0000" && color2 === "#00FF00") || (color1 === "#00FF00" && color2 === "#FF0000")) {
      porcentajeSpan.textContent = "100%";
      alert("ZAIBY CANON <3");
    } else {
      const porcentajeComplementariedad = calcularDiferenciaCromatica(color1, color2);
      porcentajeSpan.textContent = porcentajeComplementariedad.toFixed(2) + "%";
    }
  });
});

function calcularDiferenciaCromatica(color1, color2) {
  // Convertir los colores hexadecimales a RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Calcular los ángulos en el círculo cromático para ambos colores
  const hue1 = rgbToHue(rgb1);
  const hue2 = rgbToHue(rgb2);

  // Calcular la diferencia angular entre los dos ángulos
  let diferencia = Math.abs(hue1 - hue2);

  // Asegurarse de que la diferencia sea la más corta (menos de 180 grados)
  if (diferencia > 180) {
    diferencia = 360 - diferencia;
  }

  // Calcular el porcentaje de complementariedad
  const complementariedad = 100 - (diferencia / 1.8);

  return complementariedad;
}

// Función para convertir un color hexadecimal a RGB
function hexToRgb(hex) {
    // Eliminar el "#" si está presente
    hex = hex.replace(/^#/, '');
  
    // Dividir el valor en componentes r, g y b
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return { r, g, b };
  }
  

// Función para convertir RGB a ángulo en el círculo cromático
function rgbToHue(rgb) {
  const { r, g, b } = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let hue;

  if (max === r) {
    hue = (g - b) / (max - min);
  } else if (max === g) {
    hue = 2 + (b - r) / (max - min);
  } else {
    hue = 4 + (r - g) / (max - min);
  }

  hue *= 60;
  if (hue < 0) {
    hue += 360;
  }

  return hue;
}

const color1 = "#FF0000"; 
const color2 = "#00ff00"; 

const porcentajeComplementariedad = calcularDiferenciaCromatica(color1, color2);
console.log(`Porcentaje de complementariedad: ${porcentajeComplementariedad}%`);
