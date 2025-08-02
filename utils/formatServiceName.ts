export function formatServiceName(serviceValue: string): string {
  return serviceValue
    .replace(/-/g, " ") // Reemplaza todos los guiones por espacios
    .split(" ") // Divide la cadena por espacios
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(" "); // Une las palabras de nuevo con espacios
}
