import React from 'react';
import { FileText } from 'lucide-react';

interface Referencia {
  numero: number;
  texto: string;
}

interface ParrafoConReferencias {
  texto: string;
  referencias: number[];
  enfasis?: boolean;
}

interface ReferenciasNumeradasProps {
  parrafos: ParrafoConReferencias[];
  referencias: Referencia[];
}

export function TextoConReferencias({ 
  texto, 
  referencias = []
}: { 
  texto: string; 
  referencias?: number[];
}) {
  if (!referencias || referencias.length === 0) {
    return <>{renderTextWithBold(texto || '')}</>;
  }

  return (
    <>
      {renderTextWithBold(texto || '')}
      {referencias.map((num, idx) => (
        <sup key={idx} className="text-blue-600 ml-0.5">
          [{num}]
        </sup>
      ))}
    </>
  );
}

// Función auxiliar para procesar texto con formato **negrita** y *cursiva*
function renderTextWithBold(texto: string) {
  if (typeof texto !== 'string') return texto;
  // Primero dividimos por negritas
  const parts = texto.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      // Procesar cursivas dentro de negritas si existieran
      return <strong key={idx}>{renderItalics(boldText)}</strong>;
    }
    // Procesar cursivas en el texto normal
    return <span key={idx}>{renderItalics(part)}</span>;
  });
}

// Función auxiliar para procesar texto con formato *cursiva*
function renderItalics(texto: string) {
  if (typeof texto !== 'string') return texto;
  const parts = texto.split(/(\*.*?\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function SeccionReferencias({ referencias }: { referencias: Referencia[] | string[] }) {
  if (!referencias || referencias.length === 0) return null;

  // Convertir strings a objetos Referencia si es necesario
  const referenciasNormalizadas: Referencia[] = referencias.map((ref, idx) => {
    if (typeof ref === 'string') {
      return { numero: idx + 1, texto: ref };
    }
    return ref;
  });

  return (
    <div className="border-t-2 border-gray-300 pt-6 mt-8">
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-[#6F7271] flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="mb-3">
            <strong>Fuentes Documentales:</strong>
          </p>
          <div className="space-y-2">
            {referenciasNormalizadas.map((ref) => (
              <div key={ref.numero} className="flex gap-2">
                <span className="text-blue-600 font-medium flex-shrink-0">[{ref.numero}]</span>
                <a
                  href="#"
                  className="text-[#6F7271] hover:text-[#13322e] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Abrir PDF:', ref.texto);
                  }}
                >
                  {ref.texto}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CajaArticulo({ 
  titulo, 
  contenido,
  referencias = [],
  fuente,
  className = '' 
}: { 
  titulo: string; 
  contenido: string;
  referencias?: number[];
  fuente?: string;
  className?: string;
}) {
  return (
    <div className={`bg-blue-100 border-2 border-blue-300 rounded-lg p-6 texto-legal-cursiva ${className}`}>
      <p className="mb-3">
        <strong>
          {titulo}
          {referencias.length > 0 && referencias.map((num, idx) => (
            <sup key={idx} className="text-blue-600 ml-0.5">
              [{num}]
            </sup>
          ))}
        </strong>
      </p>
      <p className="text-gray-700 leading-relaxed">
        {contenido}
      </p>
      {fuente && (
        <p className="text-sm text-right text-blue-700 mt-4">
          Fuente: <a href="#" className="hover:underline">{fuente}</a>
        </p>
      )}
    </div>
  );
}