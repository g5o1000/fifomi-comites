import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFechaStr(fecha: string): string {
  if (!fecha) return fecha;
  
  // Asumiendo formato "YYYY-MM-DD"
  const partes = fecha.split('-');
  if (partes.length !== 3) return fecha;
  
  const [year, month, day] = partes;
  
  const meses = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  
  const mesIndex = parseInt(month, 10) - 1;
  const mesStr = mesIndex >= 0 && mesIndex < 12 ? meses[mesIndex] : month;
  
  return `${day}-${mesStr}-${year}`;
}
