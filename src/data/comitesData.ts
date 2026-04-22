// Datos completos de los 4 comités basados en el documento "Diagramas subdata"

export interface Integrante {
  cargo: string;
  nombre: string;
  puesto: string;
}

export interface SesionData {
  numeroSesion: number;
  nombreSesion: string;
  tipoSesion: 'Ordinaria' | 'Extraordinaria';
  fecha: string;
  acta: string;
  carpeta: string;
  tieneCarpeta: boolean;
  anexos?: string; // "Sí", "No", o vacío
}

export interface AcuerdoData {
  numeroSesion: number | string;
  nombreSesion: string;
  tipoSesion: 'Ordinaria' | 'Extraordinaria';
  fecha: string;
  resolucion: string;
  tema: string;
  acuerdo: string;
  estatus: string;
}

// =============================================================================
// COMITÉ TÉCNICO
// =============================================================================

export const comiteTecnicoData = {
  antecedentes: {
    texto: `El FIFOMI se constituyó en 1990 con el propósito de promover el desarrollo de la minería metálica y no metálica, a través del apoyo técnico y financiero de las pequeñas y medianas empresas, y particulares que estuviesen involucrados en cualquiera de las etapas del ciclo minero: exploración, explotación, beneficio, procesamiento, industrialización y comercialización, así como con las empresas de la industria, áreas consideradas estratégicas para el desarrollo social y económico de México.

En 1994 el FIFOMI pasó a formar parte del sector coordinado por la Secretaría de Comercio y Fomento Industrial, dentro de las entidades a cargo de la Coordinación General de Minería, operando con recursos propios gracias al fondo generado por los programas financiados por el Banco Internacional de Reconstrucción y Fomento, por un crédito para la reestructuración del sector minero.

A partir de 2001, el FIFOMI se encuentra sectorizado a la Secretaría de Economía y opera como una Institución financiera que brinda servicios de financiamiento, capacitación y asistencia técnica

Desde su creación, el Fideicomiso de Fomento Minero (FIFOMI) tuvo tres modificaciones en su denominación que fueron las siguientes:`,
    tablaCreacion: {
      titulo: 'Creación del Comité Técnico:',
      filas: [
        { denominacion: 'Comisión de Fomento Minero (COFOMI),', fecha: '31 de agosto de 1934' },
        { denominacion: 'Fideicomiso de Minerales no Metálicos Mexicanos', fecha: '30 de octubre de 1974' },
        { denominacion: 'Fideicomiso de Fomento Minero (FIFOMI)', fecha: '02 de febrero de 1990' },
      ],
    },
    textoLegal: `Y de conformidad con lo que establece el artículo 40 de la Ley Federal de Entidades Paraestatales, que a la letra dice:

**Artículo 40.-** Los fideicomisos públicos que se establezcan por la Administración Pública Federal, que se organicen de manera análoga a los organismos descentralizados o empresas de participación estatal mayoritaria, que tengan como propósito auxiliar al Ejecutivo mediante la realización de actividades prioritarias, serán los que se consideren entidades paraestatales conforme a lo dispuesto en la Ley Orgánica de la Administración Pública Federal y quedarán sujetos a las disposiciones de esta Ley.

Los Comités Técnicos y los directores generales de los fideicomisos públicos citados en primer término se ajustarán en cuanto a su integración, facultades y funcionamiento a las disposiciones que en el Capítulo V de esta Ley se establecen para los órganos de gobierno y para los directores generales, en cuanto sea compatible a su naturaleza.

Por su parte el Reglamento de la Ley Federal de las Entidades Paraestatales en su artículo 16 refiere lo siguiente:

**Artículo 16.-** El órgano de gobierno será presidido conforme a los siguientes criterios:

I. En las entidades consideradas como estratégicas y en las prioritarias que determine el Ejecutivo Federal, el titular de la coordinadora de sector deberá presidir el órgano de gobierno, y

II. En las demás entidades prioritarias, no contempladas en la fracción anterior, el titular de la coordinadora de sector designará al servidor público que presidirá el órgano de gobierno, cuyo nivel no será inferior al de director general o su equivalente.

La integración, funcionamiento y facultades del Comité Técnico de la entidad se regulan en su convenio modificatorio de creación, celebrado el 16 de julio de 1990, siendo Nacional Financiera, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo (NAFIN), la fiduciaria.

Cuenta también con las facultades establecidas en el artículo 58 de la Ley Federal de las Entidades Paraestatales, que son compatibles con su naturaleza, y demás que sean necesarias para el cumplimiento de los fines del fideicomiso.

En la Ley Orgánica de la Administración Pública Federal, se señalan fracciones y artículos que le aplican al FIFOMI como Entidad Paraestatal, tal es el caso:`,
    fuentes: [
      'Acuerdo Fideicomiso Minerales No Metálicos Mexicanos 1 de noviembre 1974',
      'Contrato de Fideicomiso en Nacional Financiera, Banca de Desarrollo, S.N.C. del 18 de diciembre de 1975',
      'Convenio Modificatorio al Contrato de Fideicomiso del 12 de julio de 1984',
      'Convenio Modificatorio del 16 de julio de 1990',
      'Ley Federal de las Entidades Paraestatales',
      'Reglamento de la Ley Federal de las Entidades Paraestatales',
    ],
  },
  
  lineamientos: {
    contenido: [
      'El Comité Técnico ejercerá sus funciones de conformidad con lo establecido en las disposiciones legales citadas en el apartado de Antecedentes.',
      'El Comité Técnico se reunirá con la periodicidad que determinen las necesidades del FIFOMI, por lo menos cada 3 meses en sesiones ordinarias.',
      'Las sesiones extraordinarias se celebrarán cuando el Presidente del Comité convoque a sesión.',
    ],
    fuentes: [
      'Ley Federal de las Entidades Paraestatales',
      'Reglamento de la Ley Federal de las Entidades Paraestatales',
      'Ley Orgánica de la Administración Pública Federal',
    ],
  },

  integracion: [
    { cargo: 'Presidente', nombre: '', puesto: 'Titular de la Subsecretaría de Minería de la Secretaría de Economía' },
    { cargo: 'Vocal', nombre: 'C.P. Martha Graciela Camargo Nava', puesto: 'Subdirector de Finanzas y Administración' },
    { cargo: 'Vocal', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Vocal', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico' },
    { cargo: 'Vocal', nombre: '', puesto: 'Representante de la Secretaría de Hacienda y Crédito Público' },
    { cargo: 'Vocal', nombre: '', puesto: 'Representante de la Secretaría de la Función Pública' },
    { cargo: 'Secretario', nombre: 'Lic. Ricardo Miranda Burgos', puesto: 'Director de Crédito, Finanzas y Administración' },
    { cargo: 'Prosecretario', nombre: 'Mtra. Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica' },
    { cargo: 'Comisario Público Propietario', nombre: '', puesto: 'Designado por la Secretaría de la Función Pública' },
    { cargo: 'Comisario Público Suplente', nombre: '', puesto: 'Designado por la Secretaría de la Función Pública' },
  ],

  atribuciones: {
    contenido: [
      { numero: 'I', texto: 'Establecer, en congruencia con los programas sectoriales las políticas generales y definir las prioridades a las que deberá sujetarse la paraestatal, para el cumplimiento de su objeto.' },
      { numero: 'II', texto: 'Aprobar, en su caso, y someter a la consideración del Ejecutivo Federal, a través de la Secretaría de Hacienda y Crédito Público, los programas institucionales y presupuestos de la entidad.' },
      { numero: 'III', texto: 'Aprobar la estructura básica de la organización de la entidad paraestatal, así como las modificaciones que se propongan.' },
      { numero: 'IV', texto: 'Aprobar el establecimiento de las normas, sistemas, procedimientos y demás instrumentación, necesarios para el buen funcionamiento de la entidad.' },
      { numero: 'V', texto: 'Conocer y aprobar, en su caso, los informes periódicos de las actividades que le presente el Director General.' },
    ],
    fuentes: [
      'Ley Federal de las Entidades Paraestatales',
      'Reglamento de la Ley Federal de las Entidades Paraestatales',
      'Manual de Procedimiento para la Integración y Funcionamiento del Comité de Inversiones',
    ],
  },

  sesiones: [
    { numeroSesion: 245, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-11-28', acta: 'Acta de la 4a Sesión Ordinaria 2023', carpeta: 'Carpeta 4a Sesión Ordinaria 2023', tieneCarpeta: true, anexos: 'No' },
    { numeroSesion: 244, nombreSesion: 'Tercera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-08-24', acta: 'Acta de la 3a Sesión Ordinaria 2023', carpeta: 'Carpeta 3a Sesión Ordinaria 2023', tieneCarpeta: true, anexos: 'No' },
    { numeroSesion: 243, nombreSesion: 'Segunda Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-05-24', acta: 'Acta de la 2a Sesión Ordinaria 2023', carpeta: 'Carpeta 2a Sesión Ordinaria 2023', tieneCarpeta: true, anexos: 'Sí' },
    { numeroSesion: 242, nombreSesion: 'Primera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-02-22', acta: 'Acta de la 1a Sesión Ordinaria 2023', carpeta: 'Carpeta 1a Sesión Ordinaria 2023', tieneCarpeta: true, anexos: 'No' },
    { numeroSesion: 241, nombreSesion: 'Cuarta Sesión Ordinaria 2022', tipoSesion: 'Ordinaria', fecha: '2022-11-23', acta: 'Acta de la 4a Sesión Ordinaria 2022', carpeta: 'Carpeta 4a Sesión Ordinaria 2022', tieneCarpeta: true, anexos: 'No' },
  ],

  acuerdos: [
    { numeroSesion: 245, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-11-28', resolucion: 'Acuerdo 245.1', tema: 'Aprobación del Presupuesto 2024', acuerdo: 'SE APRUEBA EL PRESUPUESTO DE EGRESOS PARA EL EJERCICIO FISCAL 2024', estatus: 'Aprobado' },
    { numeroSesion: 245, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-11-28', resolucion: 'Acuerdo 245.2', tema: 'Programa Anual de Trabajo 2024', acuerdo: 'SE APRUEBA EL PROGRAMA ANUAL DE TRABAJO 2024', estatus: 'Aprobado' },
    { numeroSesion: 244, nombreSesion: 'Tercera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-08-24', resolucion: 'Acuerdo 244.1', tema: 'Estados Financieros al 30 de junio de 2023', acuerdo: 'SE APRUEBAN LOS ESTADOS FINANCIEROS AL 30 DE JUNIO DE 2023', estatus: 'Aprobado' },
    { numeroSesion: 244, nombreSesion: 'Tercera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-08-24', resolucion: 'Acuerdo 244.2', tema: 'Informe de Actividades del Segundo Trimestre 2023', acuerdo: 'SE TOMA NOTA DEL INFORME DE ACTIVIDADES', estatus: 'Aprobado' },
    { numeroSesion: 243, nombreSesion: 'Segunda Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-05-24', resolucion: 'Acuerdo 243.1', tema: 'Estados Financieros al 31 de marzo de 2023', acuerdo: 'SE APRUEBAN LOS ESTADOS FINANCIEROS AL 31 DE MARZO DE 2023', estatus: 'Aprobado' },
  ],
};

// =============================================================================
// COMITÉ DE ADQUISICIONES
// =============================================================================

export const comiteAdquisicionesData = {
  antecedentes: {
    texto: `El Comité de Adquisiciones, Arrendamientos y Servicios tiene fundamento en la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público en sus artículos 21 y 22, en los cuales se establece que las dependencias y entidades contarán con un Comité de Adquisiciones, Arrendamientos y Servicios.`,
    fuentes: [
      'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público',
      'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI',
    ],
  },

  lineamientos: {
    contenido: [
      'El Comité se reunirá cuando menos cada tres meses de manera ordinaria.',
      'Las sesiones extraordinarias se celebrarán cuando el Presidente del Comité convoque a sesión.',
      'Las convocatorias a las sesiones se realizarán con cuando menos 48 horas de anticipación.',
    ],
    fuentes: [
      'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público',
      'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI',
    ],
  },

  integracion: [
    { cargo: 'Presidente', nombre: '', puesto: 'Director General del FIFOMI' },
    { cargo: 'Vocal', nombre: 'C.P. Martha Graciela Camargo Nava', puesto: 'Subdirector de Finanzas y Administración' },
    { cargo: 'Vocal', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Vocal', nombre: 'Lic. Ricardo Miranda Burgos', puesto: 'Director de Crédito, Finanzas y Administración' },
    { cargo: 'Vocal', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico' },
    { cargo: 'Secretario Ejecutivo', nombre: 'Mtra. Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica' },
  ],

  funciones: {
    introduccion: 'Las funciones del Comité de Adquisiciones, Arrendamientos y Servicios se encuentran descritas en el Artículo Tercero del "Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI".',
    articuloTitulo: 'Artículo Tercero.- El Comité señalará las siguientes funciones:',
    contenido: [
      { 
        numero: 'I', 
        texto: 'Revisar el programa y el presupuesto de adquisiciones, arrendamientos y servicios, así como sus modificaciones, y formular las observaciones y recomendaciones convenientes.' 
      },
      { 
        numero: 'II', 
        texto: 'Establecer su calendario de sesiones ordinarias del ejercicio inmediato posterior, que podrán ser quincenales, mensuales o bimestrales.' 
      },
      { 
        numero: 'III', 
        texto: 'Dictaminar previamente a la iniciación del procedimiento, sobre la procedencia de la excepción a la licitación pública por encontrarse en alguno de los supuestos a que se refieren las fracciones I, III, VIII, IX, párrafo décimo sexto, X, XIII, XV, XVII, XVIII y XIX del artículo 41 de esta Ley. Dicha función también podrá ser ejercida por el titular de la dependencia o entidad, o aquel servidor público en quien éste delegue dicha función. En ningún caso la delegación podrá recaer en servidor público con nivel inferior al de director general o su equivalente, en las dependencias y entidades.' 
      },
      { 
        numero: 'IV', 
        texto: 'Dictaminar los proyectos de políticas, bases y lineamientos en materia de adquisiciones, arrendamientos y servicios (Pobalines) que le presenten, así como someterlas a la consideración del titular de la de la dependencia, en su caso, autorizar los supuestos no previstos en las mismas.' 
      },
      { 
        numero: 'V', 
        texto: 'Los comités establecerán en los Pobalines, los aspectos de sustentabilidad ambiental, incluyendo la evaluación de las tecnologías que permitan la reducción de la emisión de gases de efecto invernadero y eficiencia energética, que deberán observarse en las adquisiciones, arrendamientos y servicios, con el objeto de optimizar y utilizar de forma sustentable los recursos para disminuir costos financieros y ambientales;' 
      },
      { 
        numero: 'VI', 
        texto: 'Analizar trimestralmente el informe de la conclusión y resultados generales de las contrataciones que se realicen, y, en su caso, recomendar las medidas necesarias para verificar que el programa y presupuesto de adquisiciones, arrendamientos y servicios, se ejecuten en tiempo y forma, así como proponer medidas tendientes a mejorar o corregir sus procesos de contratación y ejecución;' 
      },
      { 
        numero: 'VII', 
        texto: 'Autorizar, cuando se justifique, la creación de subcomités de adquisiciones, arrendamientos y servicios, así como aprobar la integración y funcionamiento de los mismos;' 
      },
      { 
        numero: 'VIII', 
        texto: 'Elaborar y aprobar el manual de integración y funcionamiento del comité, en el cual se deberán considerar cuando menos las siguientes bases:',
        subelementos: [
          { letra: 'a', texto: 'Será presidido por el Director de Crédito, Finanzas y Administración.' },
          { letra: 'b', texto: 'Los vocales titulares deberán tener un nivel jerárquico mínimo de Gerente o equivalente;' },
          { letra: 'c', texto: 'El número total de miembros del Comité deberá ser impar, quienes invariablemente deberán emitir su voto en cada uno de los asuntos que se sometan a su consideración.' },
          { letra: 'd', texto: 'El área jurídica y el órgano interno de control de la dependencia o entidad, deberán asistir a las sesiones del Comité, como asesor, con voz pero sin voto, debiendo pronunciarse de manera razonada en los asuntos que conozca el Comité. Los asesores titulares no podrán tener un nivel jerárquico inferior al de Gerente y' },
          { letra: 'e', texto: 'El Comité deberá dictaminar en la misma sesión los asuntos que se presenten a su consideración; el Reglamento de esta Ley establecerá las bases conforme a las cuales los comités podrán de manera excepcional dictaminar los asuntos en una siguiente sesión.' },
        ]
      },
      { 
        numero: 'IX', 
        texto: 'Coadyuvar al cumplimiento de esta Ley y demás disposiciones aplicables.' 
      },
    ],
    notaFinal: 'La Secretaría de la Función Pública podrá participar como asesor en los comités y subcomités a que se refiere este artículo, pronunciándose de manera fundada y motivada al emitir sus opiniones.',
    fuentes: [
      'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI',
      'Manual de Procedimiento para la Integración y Funcionamiento del Comité de Inversiones',
    ],
  },

  sesiones: [
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-12-15', acta: 'Acta de la 4a Sesión Ordinaria 2023', carpeta: 'Carpeta 4a Sesión Ordinaria 2023', tieneCarpeta: true },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-09-20', acta: 'Acta de la 3a Sesión Ordinaria 2023', carpeta: 'Carpeta 3a Sesión Ordinaria 2023', tieneCarpeta: true },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-06-15', acta: 'Acta de la 2a Sesión Ordinaria 2023', carpeta: 'Carpeta 2a Sesión Ordinaria 2023', tieneCarpeta: true },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-03-22', acta: 'Acta de la 1a Sesión Ordinaria 2023', carpeta: 'Carpeta 1a Sesión Ordinaria 2023', tieneCarpeta: true },
  ],

  acuerdos: [
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-12-15', resolucion: 'CAA-04/2023-01', tema: 'Programa Anual de Adquisiciones 2024', acuerdo: 'SE APRUEBA EL PROGRAMA ANUAL DE ADQUISICIONES, ARRENDAMIENTOS Y SERVICIOS 2024', estatus: 'Aprobado' },
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-12-15', resolucion: 'CAA-04/2023-02', tema: 'Contratación de Servicios de Limpieza', acuerdo: 'SE AUTORIZA LA CONTRATACIÓN MEDIANTE ADJUDICACIÓN DIRECTA', estatus: 'Aprobado' },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria 2023', tipoSesion: 'Ordinaria', fecha: '2023-09-20', resolucion: 'CAA-03/2023-01', tema: 'Adquisición de Equipo de Cómputo', acuerdo: 'SE APRUEBA LA ADQUISICIÓN DE EQUIPO DE CÓMPUTO', estatus: 'Aprobado' },
  ],
};

// =============================================================================
// COMITÉ DE AUDITORÍA
// =============================================================================

export const comiteAuditoriaData = {
  antecedentes: {
    texto: `El Comité de Auditoría se crea mediante el acuerdo no. 1459/FFM/VI/15, en la sesión Primera Sesión Extraordinaria de 2015, de fecha 1° de junio de 2015.

"Acuerdo N. 1459/FFM/VI/15 de junio de 2015.- Con fundamento en los artículos 58, fracción X de la Ley Federal de las Entidades Paraestatales; 1, fracción XVI y 152 de las "Disposiciones de carácter general aplicables a los Organismos de Fomento y Entidades de Fomento", publicadas por la Comisión Nacional Bancaria y de Valores en el Diario Oficial de la Federación el 1 de diciembre de 2014, así como la Cláusula Sexta fracción VII del Convenio de modificación al Contrato del Fideicomiso de fecha 18 de diciembre de 1975, por el que se constituyó el Fideicomiso denominado Minerales No Metálicos Mexicanos, este H. Comité Técnico **aprueba la creación del Comité de Auditoría** del Fideicomiso de Fomento Minero, a partir del 1 de junio de 2015."`,
    fuentes: [
      'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento',
      'Convenio Modificatorio al Contrato de Fideicomiso',
      'Acuerdo N. 1459/FFM/VI/15 de junio de 2015',
    ],
  },

  lineamientos: {
    contenido: [
      'El Comité de Auditoría sesionará de manera ordinaria por lo menos cuatro veces al año.',
      'El Comité podrá sesionar de manera extraordinaria cuando así lo determine el Presidente o la mayoría de sus integrantes.',
      'Las resoluciones del Comité se tomarán por mayoría de votos de los miembros presentes.',
    ],
    fuentes: [
      'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento',
      'Manual de Funcionamiento del Comité de Auditoría',
    ],
  },

  integracion: {
    contenidoNormativo: [
      {
        partes: [
          { texto: 'El Comité de Auditoría deberá integrarse de conformidad con lo previsto en el artículo 152 de las Disposiciones de Carácter General Aplicables a los Organismos de Fomento y Entidades de Fomento', referencias: [1] },
          { texto: ' en adelante “Las Disposiciones” y en todo caso, los miembros del citado Comité de Auditoría deberán ser seleccionados por su capacidad y prestigio profesional y cuando menos uno de sus integrantes deberá ser una persona que por sus conocimientos y desarrollo, tenga amplia experiencia en el área financiera o de auditoría y control interno.' }
        ]
      },
      {
        partes: [
          { texto: 'Así mismo en el artículo 155 de “Las Disposiciones”', referencias: [1] },
          { texto: ' El Comité de Auditoría de las Entidades de Fomento se integrará con al menos tres y no más de cinco miembros, designados por el Consejo, que podrán ser propietarios o suplentes, de los cuales cuando menos uno deberá ser Independiente y lo presidirá.' }
        ]
      },
      {
        partes: [
          { texto: 'Los consejeros propietarios o suplentes que sean miembros del Comité de Auditoría podrán ser suplidos por cualquier otro consejero. En caso de ausencia del presidente en alguna sesión del comité, los integrantes designarán de entre los consejeros independientes propietarios o suplentes del comité, a la persona que deba presidir esa sesión.' }
        ]
      },
      {
        partes: [
          { texto: 'De acuerdo al artículo 156 de las Disposiciones de Carácter General Aplicables a los Organismos de Fomento y Entidades de Fomento', referencias: [1] },
          { texto: ', los miembros del Comité de Auditoría serán designados por el Consejo.' }
        ]
      }
    ],
    referencias: [
      { numero: 1, texto: 'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento' },
      { numero: 2, texto: 'Manual de Funcionamiento del Comité de Auditoría' },
    ],
    textoIntroductorio: 'El Comité de Auditoría está integrado de conformidad con lo siguiente:',
    miembros: [
      { cargo: 'Presidente', nombre: 'C.P.C. Alfredo Cristalinas Kaulitz', puesto: 'Experto Independiente', seccion: 'Integrantes' },
      { cargo: 'Integrante', nombre: 'C.P.C. Fransco Javier García Sabaté Palazuelos', puesto: 'Experto Independiente', seccion: 'Integrantes' },
      { cargo: 'Integrante', nombre: 'C.P. Eduardo Ramírez Schuetz', puesto: 'Experto Independiente', seccion: 'Integrantes' },
      { cargo: 'Secretario', nombre: 'Lic. Luis Robeto Lagunes Alarcón', puesto: '', seccion: 'Integrantes' },
      { cargo: 'Invitados Permanente', nombre: '', puesto: 'Director General del FIFOMI', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'Lic. Ricardo Miranda Burgos', puesto: 'Director de Crédito, Finanzas y Administración', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'C.P. Martha Graciela Camargo Nava', puesto: 'Subdirectora de Finanzas y Administración', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'Mtra. María Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'Mtro. Jaime Valencia Rodríguez', puesto: 'Subdirector de Riesgos', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'Lic. Francisco Castellanos Arredondo', puesto: 'Auditor Interno', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: 'C.P. Lucio Martínez Arellano', puesto: 'Gerente de Presupuesto y Contabilidad', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado Permanente', nombre: '', puesto: 'Gerente de Cumplimiento Normativo', seccion: 'Invitados Permanentes' },
      { cargo: 'Invitado', nombre: '', puesto: 'Auditor Externo', seccion: 'Invitados' },
    ],
  },

  funciones: {
    contenido: [
      { numero: 'I', texto: 'Dar opinión al Comité Técnico sobre los estados financieros del FIFOMI y las notas que los complementan.' },
      { numero: 'II', texto: 'Proponer al Comité Técnico para su aprobación, al auditor externo que dictaminará los estados financieros.' },
      { numero: 'III', texto: 'Opinar sobre las operaciones relevantes o inusuales que realice el FIFOMI.' },
      { numero: 'IV', texto: 'Supervisar que la administración dé cumplimiento a las observaciones derivadas de las auditorías.' },
    ],
    fuentes: [
      'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento',
    ],
  },

  sesiones: [
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-06-20', acta: 'Acta de la 2a Sesión Ordinaria 2019', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-09-19', acta: 'Acta de la 3a Sesión Ordinaria 2019', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-12-12', acta: 'Acta de la 4a Sesión Ordinaria 2019', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
  ],

  acuerdos: [
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-06-20', resolucion: 'CA-02/2019-01', tema: 'Informe de la Auditoría en materia de Crédito', acuerdo: 'SE TOMA NOTA DEL INFORME PRESENTADO', estatus: 'Aprobado' },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-06-20', resolucion: 'CA-02/2019-02', tema: 'Informe de la Auditoría en materia Informática', acuerdo: 'SE TOMA NOTA DEL INFORME PRESENTADO', estatus: 'Aprobado' },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-06-20', resolucion: 'CA-02/2019-03', tema: 'Designación como Auditor Externo', acuerdo: 'SE PROPONE AL COMITÉ TÉCNICO LA DESIGNACIÓN DEL AUDITOR EXTERNO', estatus: 'Aprobado' },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria 2019', tipoSesion: 'Ordinaria', fecha: '2019-09-19', resolucion: 'CA-03/2019-01', tema: 'Estados Financieros del FIFOMI al 30 de junio de 2019', acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO', estatus: 'Aprobado' },
  ],
};

// =============================================================================
// COMITÉ DE CALIDAD
// =============================================================================

export const comiteCalidadData = {
  antecedentes: {
    texto: `El Comité de Calidad / Comisión de Calidad tiene su origen el 7 de abril de 2014. Derivado de la cancelación de la modificación de la estructura orgánica, y con el objeto de asegurar que se encuentren definidas la responsabilidad y autoridad dentro del Sistema de Gestión de Calidad, se establece el Comité de Calidad del Fideicomiso de Fomento Minero considerando la nomenclatura de puestos que prevalece actualmente en la entidad.`,
    fuentes: [
      'Formalización del Comité de Calidad',
    ],
  },

  lineamientos: {
    contenido: [
      'Área en proceso',
    ],
    fuentes: [
      'Manual del Sistema de Gestión de la Calidad',
    ],
  },

  integracion: [
    { cargo: 'Presidente', nombre: '', puesto: 'Director General del FIFOMI' },
    { cargo: 'Presidente Suplente', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Representante de la Dirección', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Integrante', nombre: 'Lic. Ricardo Miranda Burgos', puesto: 'Director de Crédito, Finanzas y Administración' },
    { cargo: 'Integrante', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico' },
    { cargo: 'Integrante', nombre: 'C.P. Martha Graciela Camargo Nava', puesto: 'Subdirector de Finanzas y Administración' },
    { cargo: 'Integrante', nombre: 'Mtra. Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica' },
    { cargo: 'Integrante', nombre: 'Lic. Besahel Méndez Toraño', puesto: 'Subdirector Técnico' },
    { cargo: 'Integrante', nombre: '', puesto: 'Gerente de Comunicación y Difusión' },
    { cargo: 'Responsable del Sistema de Gestión de la Calidad', nombre: 'Lic. Erika Hernández Calixto', puesto: 'Gerente de Recursos Humanos' },
  ],

  funciones: {
    contenido: [
      'Las funciones se encuentran descritas en el Manual del Sistema de Gestión de la Calidad.',
    ],
    fuentes: [
      'Manual del Sistema de Gestión de la Calidad',
    ],
  },

  sesiones: [
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Extraordinaria 2017', tipoSesion: 'Extraordinaria', fecha: '2017-03-09', acta: 'Acta de la 1a Sesión Extraordinaria 2017', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Extraordinaria 2016', tipoSesion: 'Extraordinaria', fecha: '2016-11-17', acta: 'Acta de la 1a Sesión Extraordinaria 2016', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Extraordinaria 2015', tipoSesion: 'Extraordinaria', fecha: '2015-04-28', acta: 'Acta de la 1a Sesión Extraordinaria 2015', carpeta: 'Sesión sin carpeta', tieneCarpeta: false },
  ],

  acuerdos: [
    { numeroSesion: 'NA', nombreSesion: 'Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-05-29', resolucion: 'NA', tema: 'NOTA INFORMATIVA', acuerdo: 'SE INFORMA LA CONCLUSIÓN DE LA FUNCIÓN DE LA COMISIÓN DE CALIDAD', estatus: 'Autorizado' },
  ],
};