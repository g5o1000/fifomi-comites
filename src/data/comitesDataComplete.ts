// Datos COMPLETOS de los 4 comités basados en las 42 páginas del documento "Diagramas subdata"
// Con sistema de referencias numeradas y contenido exacto de las imágenes

export interface Integrante {
  cargo: string;
  nombre: string;
  puesto: string;
  seccion?: string; // Para diferenciar secciones como "Invitados Permanentes"
  suplente?: {
    cargo: string;
    nombre: string;
    puesto: string;
  };
}

export interface SesionData {
  numeroSesion: number;
  nombreSesion: string;
  tipoSesion: 'Ordinaria' | 'Extraordinaria';
  fecha: string;
  acta: string;
  carpeta: string;
  tieneCarpeta: boolean;
  anexos?: boolean;
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

export interface ReferenciaBibliografica {
  numero: number;
  texto: string;
}

// =============================================================================
// COMITÉ TÉCNICO - CONTENIDO COMPLETO DE LAS IMÁGENES 1-14
// =============================================================================

export const comiteTecnicoData = {
  configuracion: {
    paginacionSesiones: 15,
    paginacionAcuerdos: 5,
    estatusAcuerdos: 'Aprobado',
    tieneEstadisticas: true,
    tieneGeneradorReportes: true,
  },

  antecedentes: {
    titulo: 'Antecedentes',
    parrafos: [
      {
        texto: 'El FIFOMI se constituyó en 1990 con el propósito de promover el desarrollo de la minería metálica y no metálica, a través del apoyo técnico y financiero de las pequeñas y medianas empresas, y particulares que estuviesen involucrados en cualquiera de las etapas del ciclo minero: exploración, explotación, beneficio, procesamiento, industrialización y comercialización, así como con las empresas de la industria, áreas consideradas estratégicas para el desarrollo social y económico de México.',
        referencias: [1],
      },
      {
        texto: 'En 1994 el FIFOMI pasó a formar parte del sector coordinado por la Secretaría de Comercio y Fomento Industrial, dentro de las entidades a cargo de la Coordinación General de Minería, operando con recursos propios gracias al fondo generado por los programas financiados por el Banco Internacional de Reconstrucción y Fomento, por un crédito para la reestructuración del sector minero.',
        referencias: [1],
      },
      {
        texto: 'A partir de 2001, el FIFOMI se encuentra sectorizado a la Secretaría de Economía y opera como una Institución financiera que brinda servicios de financiamiento, capacitación y asistencia técnica.',
        referencias: [2],
      },
      {
        texto: 'Desde su creación, el Fideicomiso de Fomento Minero (FIFOMI) tuvo tres modificaciones en su denominación que fueron las siguientes:',
        referencias: [],
      },
    ],
    tablaCreacion: {
      titulo: 'Creación del Comité Técnico:',
      columnas: ['Denominación', 'Fecha'],
      filas: [
        { denominacion: 'Comisión de Fomento Minero (COFOMI),', fecha: '31 de agosto de 1934' },
        { denominacion: 'Fideicomiso de Minerales no Metálicos Mexicanos', fecha: '30 de octubre de 1974' },
        { denominacion: 'Fideicomiso de Fomento Minero (FIFOMI)', fecha: '02 de febrero de 1990' },
      ],
    },
    parrafosLegales: [
      {
        texto: 'Y de conformidad con lo que establece el artículo 40 de la **Ley Federal de Entidades Paraestatales**, que a la letra dice:',
        referencias: [3],
      },
    ],
    articulosLegales: [
      {
        titulo: 'Artículo 40.-',
        contenido: 'Los fideicomisos públicos que se establezcan por la Administración Pública Federal, que se organicen de manera análoga a los organismos descentralizados o empresas de participación estatal mayoritaria, que tengan como propósito auxiliar al Ejecutivo mediante la realización de actividades prioritarias, serán los que se consideren entidades paraestatales conforme a lo dispuesto en la Ley Orgánica de la Administración Pública Federal y quedarán sujetos a las disposiciones de esta Ley.\n\nLos Comités Técnicos y los directores generales de los fideicomisos públicos citados en primer término se ajustarán en cuanto a su integración, facultades y funcionamiento a las disposiciones que en el Capítulo V de esta Ley se establecen para los órganos de gobierno y para los directores generales, en cuanto sea compatible a su naturaleza.',
        enfasis: true,
      },
    ],
    textoTransicion: 'Por su parte el **Reglamento de la Ley Federal de las Entidades Paraestatales** en su artículo 16 refiere lo siguiente:',
    articulosLegales2: [
      {
        titulo: 'Artículo 16.-',
        contenido: 'El órgano de gobierno será presidido conforme a los siguientes criterios:\n\nI. En las entidades consideradas como estratégicas y en las prioritarias que determine el Ejecutivo Federal, el titular de la coordinadora de sector deberá presidir el órgano de gobierno, y\n\nII. En las demás entidades prioritarias, no contempladas en la fracción anterior, el titular de la coordinadora de sector designará al servidor público que presidirá el órgano de gobierno, cuyo nivel no será inferior al de director general o su equivalente.',
        enfasis: true,
      },
    ],
    parrafosCierre: [
      {
        texto: 'La integración, funcionamiento y facultades del Comité Técnico de la entidad se regulan en su convenio modificatorio de creación, celebrado el 16 de julio de 1990, siendo Nacional Financiera, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo (NAFIN), la fiduciaria.',
        referencias: [4],
      },
      {
        texto: 'Cuenta también con las facultades establecidas en el artículo 58 de la Ley Federal de las Entidades Paraestatales, que son compatibles con su naturaleza, y demás que sean necesarias para el cumplimiento de los fines del fideicomiso.',
        referencias: [3, 5],
      },
    ],
    seccionLeyOrganica: {
      introduccion: 'En la Ley Orgánica de la Administración Pública Federal, se señalan fracciones y artículos que le aplican al FIFOMI como Entidad Paraestatal, tal es el caso:',
      contenido: `**Artículo 3o.-** El Poder Ejecutivo de la Unión se auxiliará en los términos de las disposiciones legales correspondientes, de las siguientes entidades de la administración pública paraestatal:

**Fracción III.-** Fideicomisos

**Artículo 34.-** A la Secretaría de Economía corresponde el despacho de los siguientes asuntos:

**Fracción XXVII.-** Formular y conducir la política nacional en materia minera y

**Artículo 47.-** Los fideicomisos públicos a que se refiere el Artículo 3o. fracción III, de esta Ley, son aquellos que el gobierno federal o alguna de las demás entidades paraestatales constituyen, con el propósito de auxiliar al Ejecutivo Federal en las atribuciones del Estado para impulsar las áreas prioritarias del desarrollo, que cuenten con una estructura orgánica análoga a las otras entidades y que tengan comités técnicos.`,
      referencia: 6,
    },
    referencias: [
      { numero: 1, texto: 'Acuerdo Fideicomiso Minerales No Metálicos Mexicanos 1 de noviembre 1974' },
      { numero: 2, texto: 'Contrato de Fideicomiso en Nacional Financiera, Banca de Desarrollo, S.N.C. del 18 de diciembre de 1975' },
      { numero: 3, texto: 'Ley Federal de las Entidades Paraestatales' },
      { numero: 4, texto: 'Convenio Modificatorio del 16 de julio de 1990' },
      { numero: 5, texto: 'Reglamento de la Ley Federal de las Entidades Paraestatales' },
      { numero: 6, texto: 'Ley Orgánica de la Administración Pública Federal' },
    ],
  },

  lineamientos: {
    titulo: 'Lineamientos de Operación',
    parrafosIntroductorios: [
      {
        texto: 'La integración, **funcionamiento** y facultades del Comité Técnico de la entidad se regulan en su convenio modificatorio de creación, celebrado el 16 de julio de 1990, siendo Nacional Financiera, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo (NAFIN), la fiduciaria.',
        referencias: [1, 2],
      },
    ],
    parrafoReglamento: {
      texto: 'El Comité Técnico regula también sus funciones el artículo 18 del Reglamento de la Ley Federal de Entidades Paraestatales.',
      referencias: [3],
    },
    articulo18: {
      titulo: 'Artículo 18',
      subtitulo: 'El funcionamiento del órgano de gobierno se sujetará a los siguientes lineamientos:',
      fracciones: [
        'Se reunirá una vez cada tres meses, cuando menos, de acuerdo con un calendario que será aprobado en la primera sesión ordinaria del ejercicio, pudiendo además celebrar las reuniones extraordinarias que se requieran;',
        'Para la celebración de las reuniones, la convocatoria deberá ir acompañada del orden del día y de la documentación correspondiente, los cuales deberán ser enviados por el titular de la entidad o del secretario técnico, en su caso, y recibidos por los miembros del órgano de gobierno y comisarios públicos, con una antelación de cuando menos 5 días hábiles.',
        'En caso de que la reunión convocada no pudiera llevarse a cabo en la fecha programada, deberá celebrarse entre los cinco y quince días hábiles siguientes;',
        'Para la validez de las reuniones del órgano de gobierno se requerirá de la asistencia de por lo menos la mitad más uno de sus miembros, así como que la mayoría de los asistentes sean representantes de la Administración Pública Federal;',
        'Las resoluciones del órgano de gobierno se tomarán por mayoría de votos de los miembros presentes, teniendo el presidente voto de calidad para el caso de empate, y',
        'La falta de asistencia injustificada de los servidores públicos a las sesiones a que sean convocados, dará lugar a la aplicación de las sanciones previstas en la Ley Federal de Responsabilidades de los Servidores Públicos.',
      ],
    },
    parrafoCierre: {
      texto: 'El Comité Técnico también encuentra la regulación de su funcionamiento en los siguientes ordenamientos jurídicos:',
      referencias: [],
    },
    ordenamientos: [
      {
        nombre: 'Ley Orgánica de la Administración Pública Federal',
        articulos: ['Artículos 3, fracción III, 34 y 47'],
        urlTexto: 'Ley Orgánica de la Administración Pública Federal',
        referencias: [4],
      },
      {
        nombre: 'Ley Federal de las Entidades Paraestatales',
        articulos: [
          'Artículo 58',
          'Capítulo II, sección A, Capítulo IV, V',
          'Artículos 9, 40, 43, 44, 56 y 58',
        ],
        urlTexto: 'Ley Federal de las Entidades Paraestatales',
        referencias: [5],
      },
      {
        nombre: 'Reglamento de la Ley Federal de las Entidades Paraestatales',
        articulos: [
          'Capítulo IV',
          'Artículos 2 fracción II, Artículo 16, 18, 19, 29.',
        ],
        urlTexto: 'Reglamento de la Ley Federal de las Entidades Paraestatales',
        referencias: [3],
      },
    ],
    referencias: [
      { numero: 1, texto: 'Contrato de Fideicomiso en Nacional Financiera, Banca de Desarrollo, S.N.C. del 18 de diciembre de 1975' },
      { numero: 2, texto: 'Convenio Modificatorio del 16 de julio de 1990' },
      { numero: 3, texto: 'Reglamento de la Ley Federal de las Entidades Paraestatales' },
      { numero: 4, texto: 'Ley Orgánica de la Administración Pública Federal' },
      { numero: 5, texto: 'Ley Federal de las Entidades Paraestatales' },
    ],
  },

  integracionIntro: {
    texto: 'El Comité Técnico del FIFOMI está integrado de conformidad con los artículos 16 al 21 del Reglamento de la Ley Federal de las Entidades Paraestatales de la siguiente manera:',
    referencias: [3],
  },

  integracion: [
    { 
      cargo: 'Presidente', 
      nombre: 'Dra. Tatiana Clouthier', 
      puesto: 'Secretaria de Economía',
      suplente: {
        cargo: 'Suplente del Presidente',
        nombre: '',
        puesto: 'Subsecretario de Minería'
      }
    },
    { 
      cargo: 'Secretario', 
      nombre: 'Dr. Jorge Luis Silva Méndez', 
      puesto: 'Abogado General de la Secretaría de Economía',
      suplente: {
        cargo: 'Prosecretaria',
        nombre: 'Mtra. María Adriana Marín Colmenares',
        puesto: 'Subdirectora Jurídica del Fideicomiso de Fomento Minero'
      }
    },
    { cargo: 'Consejero Propietario', nombre: 'Dr. Enrique Flores Magón', puesto: 'Director General de Minas' },
    { cargo: 'Consejera Propietaria', nombre: 'Mtra. Flor de María Harp Iturribarria', puesto: 'Directora General del Servicio Geológico Mexicano' },
    { cargo: 'Consejero Propietario', nombre: 'Lic. Noé Reyes Mejía', puesto: 'Encargado del despacho de la Dirección General de Desarrollo Minero' },
    { cargo: 'Secretaría de Desarrollo Social', nombre: '', puesto: '' },
    { 
      cargo: 'Consejero Propietario', 
      nombre: 'Mtro. Juan Manuel Martínez Louvier', 
      puesto: 'Director General del Instituto Nacional de la Economía Social',
      suplente: {
        cargo: 'Suplente del Consejero Propietario',
        nombre: 'Lic. Adriana Liceth García Castro',
        puesto: 'Subdirectora de Innovación y Desarrollo en la Coordinación General de Operación'
      }
    },
    { cargo: 'Secretaría de Desarrollo Agrario Territorial y Urbano', nombre: '', puesto: '' },
    { cargo: 'Consejero Propietario', nombre: 'Mtro. Román Guillermo Meyer Falcón', puesto: 'Secretario' },
    { cargo: 'Secretaría de Hacienda y Crédito Público', nombre: '', puesto: '' },
    { 
      cargo: 'Consejera Propietaria', 
      nombre: 'Lic. Victoria Rodríguez Ceja', 
      puesto: 'Subsecretaria de Egresos',
      suplente: {
        cargo: 'Suplente de la Consejera Propietaria',
        nombre: 'Lic. Armando Argandoña Armas',
        puesto: 'Director General de Programación y Presupuesto "B"'
      }
    },
    { cargo: 'Suplente', nombre: 'Lic. Armando Argandoña Armas', puesto: 'Director General de Programación y Presupuesto "B"' },
    { cargo: 'Consejero Propietario', nombre: 'Dr. José de Luna Martínez', puesto: 'Titular de la Unidad de Banca de Desarrollo' },
    { cargo: 'Secretaría de la Función Pública', nombre: '', puesto: '' },
    { 
      cargo: 'Comisario Propietario', 
      nombre: 'Lic. Rubén Estrada Arellano', 
      puesto: 'Comisario Público y Delegado del Sector Desarrollo Económico',
      suplente: {
        cargo: 'Suplente del Comisario Propietario',
        nombre: 'Lic. Consuelo Patricia Maldonado Pérez',
        puesto: 'Comisaria Suplente y Subdelegada del Sector Desarrollo Económico'
      }
    },
    { cargo: 'Fideicomiso de Fomento Minero', nombre: '', puesto: '' },
    { cargo: 'Ponente', nombre: '', puesto: 'Director General del Fideicomiso de Fomento Minero' },
  ],

  invitadosPermanentes: [
    { cargo: 'Nacional Financiera, S.N.C.', nombre: '', puesto: '' },
    { 
      cargo: 'Invitada Titular', 
      nombre: 'Lic. Nydia Fabiola Bran Sosa', 
      puesto: 'Directora Fiduciaria',
      suplente: {
        cargo: 'Suplente de la Invitada Titular',
        nombre: 'Lic. Odele Legalez Ortíz',
        puesto: 'Subdirectora de Negocios Fiduciarios'
      }
    },
    { cargo: 'Secretaría de Economía', nombre: '', puesto: '' },
    { 
      cargo: 'Invitado Titular', 
      nombre: 'Mtra. Miriam Zaragoza Monroy', 
      puesto: 'Director General de Recursos Humanos',
      suplente: {
        cargo: 'Suplente del Invitado Titular',
        nombre: 'Lic. María Eugenia Gómez Enríquez',
        puesto: 'Directora de Coordinación Sectorial'
      }
    },
    { 
      cargo: 'Invitado Titular', 
      nombre: 'Mtro. Héctor García González', 
      puesto: 'Titular del Órgano Interno de Control de la Secretaría de Economía',
      suplente: {
        cargo: 'Suplente del Invitado Titular',
        nombre: 'Ing. Lucero Adriana Zamora García',
        puesto: 'Titular del Área de Auditoría del OIC'
      }
    },
    { 
      cargo: 'Invitada Titular', 
      nombre: 'Lic. María del Rosario González Arriaga', 
      puesto: 'Directora General de Programación, Organización y Presupuesto',
      suplente: {
        cargo: 'Suplente de la Invitada Titular',
        nombre: 'Lic. Sandra Patricia Luy Solís',
        puesto: 'Directora General Adjunta de Programación, Evaluación y de Seguimiento Sectorial'
      }
    },
    { cargo: 'Invitado Titular Permanente', nombre: 'C.P. Gustavo Serrano López', puesto: 'Titular del Órgano Interno de Control en el Fideicomiso de Fomento Minero' },
  ],

  atribuciones: {
    parrafosIntroductorios: [
      { texto: 'La integración y funcionamiento del Comité Técnico está regulado por el Contrato de Fideicomiso en Nacional Financiera, Banca de Desarrollo, S.N.C. del 18 de diciembre de 1975 y Convenio Modificatorio del 16 de julio de 1990.', referencias: [1] },
      { texto: 'Las funciones están determinadas en en artículo 58 de la Ley Federal de Entidades Paraestatales', referencias: [5] },
    ],
    articulo58: {
      titulo: 'Artículo 58',
      subtitulo: 'Los órganos de gobierno de las entidades paraestatales, tendrán las siguientes atribuciones indelegables:',
      fracciones: [
        'Establecer en congruencia con los programas sectoriales, las políticas generales y definir las prioridades a las que deberá sujetarse la entidad paraestatal relativa a producción, productividad, comercialización, finanzas, investigación, desarrollo tecnológico y administración general;',
        'Aprobar los programas y presupuestos de la entidad paraestatal, así como sus modificaciones, en los términos de la legislación aplicable. En lo tocante a los presupuestos y a los programas financieros, con excepción de aquellos incluidos en el Presupuesto de Egresos Anual de la Federación o del Distrito Federal, bastará con la aprobación del Órgano de Gobierno respectivo',
        'Fijar y ajustar los precios de bienes y servicios que produzca o preste la entidad paraestatal con excepción de los de aquéllos que se determinen por acuerdo del Ejecutivo Federal;',
        'Aprobar la concertación de los préstamos para el financiamiento de la entidad paraestatal con créditos internos y externos, así como observar los lineamientos que dicten las autoridades competentes en materia de manejo de disponibilidades financieras. Respecto a los créditos externos se estará a lo que se dispone en el artículo 54 de esta Ley;',
        'Expedir las normas o bases generales con arreglo a las cuales, cuando fuere necesario, el Director General pueda disponer de los activos fijos de la entidad que no correspondan a las operaciones propias del objeto de la misma;',
        'Aprobar anualmente previo informe de los comisarios, y dictamen de los auditores externos, los estados financieros de la entidad paraestatal y autorizar la publicación de los mismos;',
        'Aprobar de acuerdo con las leyes aplicables y el reglamento de esta Ley, las políticas, bases y programas generales que regulen los convenios, contratos, pedidos o acuerdos que deba celebrar la entidad paraestatal con terceros en obras públicas, adquisiciones, arrendamientos y prestación de servicios relacionados con bienes muebles. El Director General de la Entidad y en su caso los servidores públicos que deban intervenir de conformidad a las normas orgánicas de la misma realizarán tales actos bajo su responsabilidad con sujeción a las directrices fijadas por el Órgano de Gobierno;',
        'Aprobar la estructura básica de la organización de la entidad paraestatal, y las modificaciones que procedan a la misma. Aprobar asimismo y en su caso el estatuto orgánico tratándose de organismos descentralizados;',
        'Proponer al Ejecutivo Federal, por conducto de la Secretaría de Hacienda y Crédito Público, los convenios de fusión con otras entidades. Fracción reformada DOF 24-07-1992 X. Autorizar la creación de comités de apoyo;',
        'Autorizar la creación de comités de apoyo;',
        'Nombrar y remover a propuesta del Director General, a los servidores públicos de la entidad paraestatal que ocupen cargos con las dos jerarquías administrativas inferiores a la de aquél, aprobar la fijación de sus sueldos y prestaciones, y a los demás que señalen los estatutos y concederles licencias;',
        'Nombrar y remover a propuesta de su Presidente, entre personas ajenas a la entidad, el Secretario quien podrá ser miembro o no del mismo; así como designar o remover a propuesta del Director General de la entidad al Prosecretario del citado Órgano de Gobierno, quien podrá ser o no miembro de dicho órgano de la entidad;',
        'Aprobar la constitución de reservas y aplicación de las utilidades de las empresas de participación estatal mayoritaria. En los casos de los excedentes económicos de los organismos descentralizados, proponer la constitución de reservas y su aplicación para su determinación por el Ejecutivo Federal a través de la Secretaría de Hacienda y Crédito Público;',
        'Establecer, con sujeción a las disposiciones legales relativas, sin intervención de cualquiera otra dependencia, las normas y bases para la adquisición, arrendamiento y enajenación de inmuebles que la entidad paraestatal requiera para la prestación de sus servicios, con excepción de aquellos inmuebles de organismos descentralizados que la Ley General de Bienes Nacionales considere como del dominio público de la Federación. El Reglamento de la presente Ley establecerá los procedimientos respectivos;',
        'Analizar y aprobar en su caso, los informes periódicos que rinda el Director General con la intervención que corresponda a los Comisarios;',
        'Acordar con sujeción a las disposiciones legales relativas los donativos o pagos extraordinarios y verificar que los mismos se apliquen precisamente a los fines señalados, en las instrucciones de la coordinadora del sector correspondiente; y',
        'Acordar con sujeción a las disposiciones legales relativas los donativos o pagos extraordinarios y verificar que los mismos se apliquen precisamente a los fines señalados, en las instrucciones de la coordinadora del sector correspondiente;',
        'Aprobar las normas y bases para cancelar adeudos a cargo de terceros y a favor de la entidad paraestatal cuando fuere notoria la imposibilidad práctica de su cobro, informando a la Secretaría de Hacienda y Crédito Público, por conducto de la Coordinadora de Sector.',
      ],
    },
    referencias: [
      { numero: 1, texto: 'Contrato de Fideicomiso en Nacional Financiera, Banca de Desarrollo, S.N.C. del 18 de diciembre de 1975' },
      { numero: 5, texto: 'Ley Federal de las Entidades Paraestatales' },
    ],
  },

  sesionesIntro: {
    parrafos: [
      {
        texto: 'Con fundamento en el artículo 18, fracción I, del Reglamento de la Ley Federal de las Entidades Paraestatales, los miembros del Comité Técnico deberán reunirse una vez cada tres meses, cuando menos, de acuerdo con un calendario que será aprobado en la primera sesión ordinaria del ejercicio, pudiendo además celebrar las reuniones extraordinarias que se requieran; aprueban el calendario de sesiones ordinarias a celebrarse durante el ejercicio.',
        referencias: [],
      },
    ],
  },

  sesiones: [
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', acta: 'Acta 199 Sesión Ordinaria 2024', carpeta: 'Carpeta 199', tieneCarpeta: true },
    { numeroSesion: 5, nombreSesion: 'Quinta Sesión Extraordinaria 2024', tipoSesion: 'Extraordinaria', fecha: '2024-10-30', acta: 'Acta 5a Sesión Extraordinaria 2024', carpeta: 'Carpeta 5', tieneCarpeta: true },
    { numeroSesion: 198, nombreSesion: 'Centésima Nonagésima Octava Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-08-29', acta: 'Acta 198 Sesión Ordinaria 2024', carpeta: 'Carpeta 198', tieneCarpeta: true },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Extraordinaria 2024', tipoSesion: 'Extraordinaria', fecha: '2024-07-11', acta: 'Acta 3a Sesión Extraordinaria 2024', carpeta: 'Carpeta 3', tieneCarpeta: true },
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Extraordinaria 2024', tipoSesion: 'Extraordinaria', fecha: '2024-06-27', acta: 'Acta 4a Sesión Extraordinaria 2024', carpeta: 'Carpeta 4', tieneCarpeta: true },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Extraordinaria 2024', tipoSesion: 'Extraordinaria', fecha: '2024-05-30', acta: 'Acta 1a Sesión Extraordinaria 2024', carpeta: 'Carpeta 1', tieneCarpeta: true },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Extraordinaria 2024', tipoSesion: 'Extraordinaria', fecha: '2024-05-23', acta: 'Acta 2a Sesión Extraordinaria 2024', carpeta: 'Carpeta 2', tieneCarpeta: true },
    { numeroSesion: 197, nombreSesion: 'Centésima Nonagésima Séptima Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-05-23', acta: 'Acta 197 Sesión Ordinaria 2024', carpeta: 'Carpeta 197', tieneCarpeta: true },
    { numeroSesion: 196, nombreSesion: 'Centésima Nonagésima Sexta Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-02-22', acta: 'Acta 196 Sesión Ordinaria 2024', carpeta: 'Carpeta 196', tieneCarpeta: true },
    { numeroSesion: 195, nombreSesion: 'Centésima Nonagésima Quinta Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-11-30', acta: 'Acta 195 Sesión Ordinaria 2023', carpeta: 'Carpeta 195', tieneCarpeta: true },
  ],

  acuerdos: [
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', resolucion: '2064-FFM-199-O', tema: 'Aprobación del Presupuesto de Egresos del FIFOMI para el ejercicio fiscal 2025', acuerdo: 'SE APRUEBA EL PRESUPUESTO DE EGRESOS DEL FIFOMI PARA EL EJERCICIO FISCAL 2025', estatus: 'Aprobado' },
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', resolucion: '2065-FFM-199-O', tema: 'Programa Anual de Trabajo del FIFOMI correspondiente al ejercicio fiscal 2025', acuerdo: 'SE APRUEBA EL PROGRAMA ANUAL DE TRABAJO DEL FIFOMI 2025', estatus: 'Aprobado' },
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', resolucion: '2066-FFM-199-O', tema: 'Estados Financieros del FIFOMI al 30 de septiembre de 2024', acuerdo: 'SE APRUEBAN LOS ESTADOS FINANCIEROS AL 30 DE SEPTIEMBRE DE 2024', estatus: 'Aprobado' },
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', resolucion: '2067-FFM-199-O', tema: 'Informe sobre el Desempeño de los Indicadores y Resultados del Tercer Trimestre 2024', acuerdo: 'SE TOMA NOTA DEL INFORME PRESENTADO', estatus: 'Enterados' },
    { numeroSesion: 199, nombreSesion: 'Centésima Nonagésima Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-28', resolucion: '2068-FFM-199-O', tema: 'Informe de Actividades del Tercer Trimestre 2024', acuerdo: 'SE TOMA NOTA DEL INFORME DE ACTIVIDADES DEL TERCER TRIMESTRE 2024', estatus: 'Enterados' },
  ],

  reportesAcuerdos: {
    tipos: [
      {
        id: 'porSesion',
        titulo: 'Por Sesión',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEstatus',
        titulo: 'Por Estatus',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'estatus', label: '', opciones: ['Todos'] },
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'temaAcuerdo',
        titulo: 'Tema & Acuerdo',
        descripcion: '',
        campos: [
          { tipo: 'text', nombre: 'busqueda', label: '', placeholder: 'Introduce el texto o la frase a buscar en el Tema o Acuerdo' },
        ],
      },
      {
        id: 'consolidado',
        titulo: 'Consolidado por Sesión',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEjercicio',
        titulo: 'Sesiones & Acuerdos por Ejercicio',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'ejercicio', label: '', opciones: ['Todos'] },
        ],
      },
    ],
  },
};

// =============================================================================
// COMITÉ DE ADQUISICIONES - CONTENIDO COMPLETO
// =============================================================================

export const comiteAdquisicionesData = {
  configuracion: {
    paginacionSesiones: 10,
    paginacionAcuerdos: 10,
    estatusAcuerdos: 'Autorizado',
    tieneEstadisticas: true,
    tieneGeneradorReportes: true,
  },

  antecedentes: {
    titulo: 'Antecedentes',
    parrafos: [
      {
        texto: 'La Ley otorga a los comités de adquisiciones, arrendamientos y servicios funciones y facultades específicas a fin de contribuir a que sus actos respondan a las exigencias de la normatividad que regula los procedimientos en que deben participar.',
        referencias: [1],
      },
      {
        texto: 'Por lo que es necesario puntualizar los aspectos que conduzcan a los servidores públicos que los integran, a asumir su participación con el más amplio sentido de responsabilidad en el análisis y dictamen de los asuntos sometidos a su consideración, de manera que se asegure el cumplimiento de los principios de eficiencia, eficacia, economía, imparcialidad y honradez, que debe observar el Fideicomiso de Fomento Minero en la administración de los recursos.',
        referencias: [2],
      },
      {
        texto: 'El Comité de Adquisiciones, Arrendamientos y Servicios se crea el 19 de mayo de 1997 en concordancia con el artículo 58 fracción X de la Ley Federal de las Entidades Paraestatales, y el Artículo 22 Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público.',
        referencias: [3, 1],
      },
    ],
    cajasArticulos: [
      {
        titulo: 'Artículo 58 Fracción X',
        contenido: 'Autorizar la creación de comités de apoyo.',
        tipo: 'caja',
        referencias: [],
        fuente: 'Ley Federal de las Entidades Paraestatales',
      },
      {
        titulo: 'Artículo 22',
        contenido: 'Las dependencias y entidades deberán establecer comités de adquisiciones, arrendamientos y servicios...',
        tipo: 'caja',
        referencias: [],
        fuente: 'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público',
      },
    ],
    referencias: [
      { numero: 1, texto: 'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público' },
      { numero: 2, texto: 'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI' },
      { numero: 3, texto: 'Ley Federal de las Entidades Paraestatales' },
    ],
  },

  lineamientos: {
    titulo: 'Lineamientos de Operación',
    parrafos: [
      {
        texto: 'La operación del Comité está determinada por el "Manual de Integraci��n y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI".',
        referencias: [1],
      },
      {
        texto: 'Contar con un procedimiento que regule el funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios, de acuerdo a los lineamientos que dicte el Ejecutivo Federal determinar y procurar que se obtengan las mejores condiciones de adquisición y contratación para la entidad, a fin de asegurar el cumplimiento de los principios de actuación previstos en la Constitución Política de los Estados Unidos Mexicanos, relativos a la eficiencia, eficacia, honradez, imparcialidad, economía y transparencia en los diferentes procesos de adjudicación y la optimización de los recursos disponibles y el cumplimiento de las metas de gasto corriente e inversión física.',
        referencias: [1],
      },
    ],
    marcoLegal: {
      titulo: 'Marco Legal',
      documentos: [
        'Constitución Política de los Estados Unidos Mexicanos (Artículo 134)',
        'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (Artículo 22)',
        'Reglamento de la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público',
        'Presupuesto de Egresos de la Federación',
        'Ley Federal de Presupuesto y Responsabilidad Hacendaria y su Reglamento',
        'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI',
      ],
    },
    parrafoFinal: {
      texto: 'El manual es de aplicación obligatoria en el Fideicomiso de Fomento Minero, en observancia a los procedimientos y lineamientos contenidos en la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público, su Reglamento y demás disposiciones legales y aplicables en la materia.',
      referencias: [],
    },
    referencias: [
      { numero: 1, texto: 'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI' },
      { numero: 2, texto: 'Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público' },
      { numero: 3, texto: 'Ley Federal de las Entidades Paraestatales' },
    ],
  },

  integracion: [
    { 
      cargo: 'Presidente', 
      nombre: 'Lic. Ricardo Miranda Burgos', 
      puesto: 'Director de Crédito, Finanzas y Administración',
      suplente: {
        cargo: 'Suplente del Presidente',
        nombre: 'C.P. Martha Graciela Camergo Nava',
        puesto: 'Subdirectora de Finanzas y Administración'
      }
    },
    { cargo: 'Secretario Técnico', nombre: 'L.C. Julio Hernández Franco', puesto: 'Subgerente de Adquisiciones' },
    { cargo: 'Vocal', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico' },
    { cargo: 'Vocal', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Vocal', nombre: '', puesto: 'Gerente de Recursos Materiales' },
    { cargo: 'Vocal', nombre: 'Lic. Lucio Martínez Arellano', puesto: 'Gerente de Presupuesto y Contabilidad' },
    { cargo: 'Asesor', nombre: 'Mtra. María Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica' },
    { 
      cargo: 'Asesor con derecho a voz', 
      nombre: 'Mtro. Daniel Lejarazu Gaona', 
      puesto: 'Titular del Órgano Interno de Control',
      suplente: {
        cargo: 'Asesor Suplente',
        nombre: 'Lic. Beatriz Eugenia del Toro Sánchez',
        puesto: 'Titular del área de Auditoría Interna del Órgano Interno de Control'
      }
    },
    { cargo: 'Asesor con derecho a voz', nombre: '', puesto: 'Servidor Público designado por la SFP' },
  ],

  integracionIntro: {
    texto: 'El Comité de Adquisiciones, Arrendamientos y Servicios deberá integrarse de conformidad con lo previsto en el Artículo Primero del "Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI".',
    referencias: [1],
  },

  articuloPrimero: {
    titulo: 'Artículo Primero',
    contenido: 'El Comité se integrará con los miembros siguientes:',
    referencias: [1],
  },

  invitados: {
    titulo: 'Invitados',
    parrafos: [
      {
        texto: 'Los servidores públicos cuya intervención considere necesaria el Presidente para aclarar aspectos técnicos o administrativos, relacionados con los asuntos sometidos a consideración del Comité.',
        referencias: [],
      },
      {
        texto: 'La responsabilidad de cada integrante quedará limitada al voto o comentario que emita u omita, en lo particular, respecto al asunto sometido a su consideración, con base en la documentación que le sea presentada. Cuando la documentación sea insuficiente a juicio del Comité, el asunto se tendrá como no presentado, quedando asentado en el acta respectiva. Los dictámenes de procedencia de las excepciones a la licitación pública que emitan los miembros del Comité, no comprenden las acciones u omisiones que posteriormente se generen durante el desarrollo de los procedimientos de contratación o en el cumplimiento de los contratos.',
        referencias: [],
      },
    ],
  },

  integracionReferencias: [
    { numero: 1, texto: 'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI' },
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

  sesionesIntro: {
    parrafos: [
      {
        texto: 'De conformidad con las fracciones I y II del Artículo Cuarto del "Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI", las reuniones del Comité se celebrarán en los términos siguientes:',
        referencias: [1],
      },
    ],
    tipos: [
      {
        numero: 'I',
        texto: 'Ordinarias, por lo menos una vez al mes, las cuales se podrán cancelar cuando no existan asuntos a tratar.',
        esArticulo: true,
      },
      {
        numero: 'II',
        texto: 'Extraordinarias, para tratar asuntos de carácter urgente debidamente justificados y a solicitud del titular del área o del área contratante.',
        esArticulo: true,
      },
    ],
    referencias: [
      { numero: 1, texto: 'Manual de Integración y Funcionamiento del Comité de Adquisiciones, Arrendamientos y Servicios del FIFOMI' },
    ],
  },

  sesiones: [
    { numeroSesion: 6, nombreSesion: 'Sexta Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-11-27', acta: 'Acta 6a Sesión Ordinaria 2024', carpeta: 'Carpeta 6a Sesión 2024', tieneCarpeta: true },
    { numeroSesion: 5, nombreSesion: 'Quinta Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-10-09', acta: 'Acta 5a Sesión Ordinaria 2024', carpeta: 'Carpeta 5a Sesión 2024', tieneCarpeta: true },
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-08-28', acta: 'Acta 4a Sesión Ordinaria 2024', carpeta: 'No se celebró', tieneCarpeta: false },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-07-24', acta: 'No se celebró', carpeta: 'No se celebró', tieneCarpeta: false },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Extraordinaria de 2024', tipoSesion: 'Extraordinaria', fecha: '2024-05-27', acta: 'Acta 2a Sesión Extraordinaria 2024', carpeta: 'Carpeta 2a Sesión Ext 2024', tieneCarpeta: true },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-05-27', acta: 'Acta 2a Sesión Ordinaria 2024', carpeta: 'No se celebró', tieneCarpeta: false },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Extraordinaria de 2024', tipoSesion: 'Extraordinaria', fecha: '2024-01-31', acta: 'Acta 1a Sesión Extraordinaria 2024', carpeta: 'Carpeta 1a Sesión Ext 2024', tieneCarpeta: true },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Ordinaria de 2024', tipoSesion: 'Ordinaria', fecha: '2024-01-31', acta: 'Acta 1a Sesión Ordinaria 2024', carpeta: 'Carpeta 1a Sesión 2024', tieneCarpeta: true },
    { numeroSesion: 6, nombreSesion: 'Sexta Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-11-29', acta: 'Acta 6a Sesión Ordinaria 2023', carpeta: 'Carpeta 6a Sesión 2023', tieneCarpeta: true },
    { numeroSesion: 5, nombreSesion: 'Quinta Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-10-25', acta: 'Acta 5a Sesión Ordinaria 2023', carpeta: 'Carpeta 5a Sesión 2023', tieneCarpeta: true },
    { numeroSesion: 4, nombreSesion: 'Cuarta Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-08-30', acta: 'Acta 4a Sesión Ordinaria 2023', carpeta: 'Carpeta 4a Sesión 2023', tieneCarpeta: true },
    { numeroSesion: 3, nombreSesion: 'Tercera Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-07-26', acta: 'Acta 3a Sesión Ordinaria 2023', carpeta: 'Carpeta 3a Sesión 2023', tieneCarpeta: true },
    { numeroSesion: 2, nombreSesion: 'Segunda Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-05-31', acta: 'Acta 2a Sesión Ordinaria 2023', carpeta: 'Carpeta 2a Sesión 2023', tieneCarpeta: true },
    { numeroSesion: 1, nombreSesion: 'Primera Sesión Ordinaria de 2023', tipoSesion: 'Ordinaria', fecha: '2023-01-25', acta: 'Acta 1a Sesión Ordinaria 2023', carpeta: 'Carpeta 1a Sesión 2023', tieneCarpeta: true },
  ],

  acuerdos: [
    { 
      numeroSesion: 6, 
      nombreSesion: 'Sexta Sesión Ordinaria de 2024', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-11-27', 
      resolucion: 'CAAS2ªExt/01/2024', 
      tema: 'Contratación del servicio de "Consultoría en SAP y Mesa de Ayuda" a través de Adjudicación Directa', 
      acuerdo: 'SE AUTORIZA LA CONTRATACIÓN DEL SERVICIO DE "CONSULTORÍA EN SAP Y MESA DE AYUDA" A TRAVÉS DE ADJUDICACIÓN DIRECTA CON FUNDAMENTO EN EL ARTÍCULO 41 FRACCIÓN I DE LA LEY DE ADQUISICIONES, ARRENDAMIENTOS Y SERVICIOS DEL SECTOR PÚBLICO', 
      estatus: 'Autorizado' 
    },
    { 
      numeroSesion: 5, 
      nombreSesion: 'Quinta Sesión Ordinaria de 2024', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-10-09', 
      resolucion: 'CAAS1ªExt/01/2024', 
      tema: 'Adquisición de Licencias de Software de Microsoft a través de Adjudicación Directa', 
      acuerdo: 'SE AUTORIZA LA ADQUISICIÓN DE LICENCIAS DE SOFTWARE DE MICROSOFT A TRAVÉS DE ADJUDICACIÓN DIRECTA CON FUNDAMENTO EN EL ARTÍCULO 41 FRACCIÓN I DE LA LEY', 
      estatus: 'Autorizado' 
    },
    { 
      numeroSesion: 2, 
      nombreSesion: 'Segunda Sesión Ordinaria de 2024', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-05-27', 
      resolucion: 'CAAS4ªOrdin/01/2024', 
      tema: 'Contratación del servicio de Mantenimiento Preventivo y Correctivo de Equipo de Cómputo', 
      acuerdo: 'SE AUTORIZA LA CONTRATACIÓN DEL SERVICIO A TRAVÉS DE ADJUDICACIÓN DIRECTA', 
      estatus: 'Autorizado' 
    },
    { 
      numeroSesion: 1, 
      nombreSesion: 'Primera Sesión Extraordinaria de 2024', 
      tipoSesion: 'Extraordinaria', 
      fecha: '2024-01-31', 
      resolucion: 'CAAS1ªExt/01/2024', 
      tema: 'Programa Anual de Adquisiciones, Arrendamientos y Servicios 2024', 
      acuerdo: 'SE APRUEBA EL PROGRAMA ANUAL DE ADQUISICIONES, ARRENDAMIENTOS Y SERVICIOS DEL FIFOMI PARA EL EJERCICIO FISCAL 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 1, 
      nombreSesion: 'Primera Sesión Ordinaria de 2024', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-01-31', 
      resolucion: 'CAAS1ªOrdin/01/2024', 
      tema: 'Calendario de Sesiones Ordinarias 2024', 
      acuerdo: 'SE APRUEBA EL CALENDARIO DE SESIONES ORDINARIAS DEL COMITÉ PARA EL EJERCICIO FISCAL 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 6, 
      nombreSesion: 'Sexta Sesión Ordinaria de 2023', 
      tipoSesion: 'Ordinaria', 
      fecha: '2023-11-29', 
      resolucion: 'CAAS6ªOrdin/01/2023', 
      tema: 'Informes de Actividades del Tercer Trimestre 2023', 
      acuerdo: 'SE TOMA NOTA DE LOS INFORMES PRESENTADOS', 
      estatus: 'Enterados' 
    },
  ],

  reportesAcuerdos: {
    tipos: [
      {
        id: 'porSesion',
        titulo: 'Por Sesión',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEstatus',
        titulo: 'Por Estatus',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'estatus', label: '', opciones: ['Todos'] },
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'temaAcuerdo',
        titulo: 'Tema & Acuerdo',
        descripcion: '',
        campos: [
          { tipo: 'text', nombre: 'busqueda', label: '', placeholder: 'Introduce el texto o la frase a buscar en el Tema o Acuerdo' },
        ],
      },
      {
        id: 'consolidado',
        titulo: 'Consolidado por Sesión',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEjercicio',
        titulo: 'Sesiones & Acuerdos por Ejercicio',
        descripcion: '',
        campos: [
          { tipo: 'select', nombre: 'ejercicio', label: '', opciones: ['Todos'] },
        ],
      },
    ],
  },
};

// =============================================================================
// COMITÉ DE AUDITORÍA - CONTENIDO COMPLETO DE LAS IMÁGENES 26-38
// =============================================================================

export const comiteAuditoriaData = {
  configuracion: {
    paginacionSesiones: 10,
    paginacionAcuerdos: 10,
    estatusAcuerdos: 'Aprobado',
    tieneEstadisticas: true,
    tieneGeneradorReportes: true,
    reportesConDescripciones: true,
  },

  antecedentes: {
    titulo: 'Antecedentes',
    parrafos: [
      {
        texto: 'El Comité de Auditoría se crea mediante el acuerdo no. 1459/FFM/VI/15, en la sesión Primera Sesión Extraordinaria de 2015, de fecha 1° de junio de 2015.',
        referencias: [3],
      },
      {
        texto: '"Acuerdo N. 1459/FFM/VI/15 de junio de 2015.- Con fundamento en los artículos 58, fracción X de la Ley Federal de las Entidades Paraestatales; 1, fracción XVI y 152 de las \\"Disposiciones de carácter general aplicables a los Organismos de Fomento y Entidades de Fomento\\", publicadas por la Comisión Nacional Bancaria y de Valores en el Diario Oficial de la Federación el 1 de diciembre de 2014, así como la Cláusula Sexta fracción VII del Convenio de modificación al Contrato del Fideicomiso de fecha 18 de diciembre de 1975, por el que se constituyó el Fideicomiso denominado Minerales No Metálicos Mexicanos, este H. Comité Técnico **aprueba la creación del Comité de Auditoría** del Fideicomiso de Fomento Minero, a partir del 1 de junio de 2015."',
        referencias: [1, 2],
        enfasis: true,
      },
    ],
    referencias: [
      { numero: 1, texto: 'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento' },
      { numero: 2, texto: 'Convenio Modificatorio al Contrato de Fideicomiso' },
      { numero: 3, texto: 'Acuerdo N. 1459/FFM/VI/15 de junio de 2015' },
    ],
  },

  lineamientos: {
    titulo: 'Lineamientos de Operación',
    parrafos: [
      {
        texto: 'Los lineamientos de operación, se encuentran establecidos en los artículos 151 al 160 de las "Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento".',
        referencias: [1],
      },
    ],
    articulos: [
      {
        numero: '151',
        contenido: 'El Comité de Auditoría deberá dar seguimiento a las actividades de Auditoría Interna y auditoría externa, así como de Contraloría Interna del Organismo de Fomento o Entidad de Fomento de que se trate, manteniendo informado al Consejo respecto del desempeño de dichas actividades.\nAsimismo, el Comité de Auditoría supervisará que la información financiera y contable se formule de conformidad con los lineamientos y disposiciones a que esté sujeto el Organismo de Fomento o la Entidad de Fomento de que se trate, así como con los principios de contabilidad que le sean aplicables.',
        enfasis: true,
      },
      {
        numero: '152',
        contenido: 'El Comité de Auditoría deberá integrarse de conformidad con lo previsto en estas disposiciones de acuerdo con lo establecido para cada Organismo de Fomento o Entidad de Fomento y en todo caso, los miembros del citado Comité de Auditoría deberán ser seleccionados por su capacidad y prestigio profesional y cuando menos uno de sus integrantes deberá ser una persona que por sus conocimientos y desarrollo, tenga amplia experiencia en el área financiera o de auditoría y control interno.',
        enfasis: true,
      },
      {
        numero: '153',
        contenido: 'Las sesiones del Comité de Auditoría serán válidas con la participación de la mayoría de sus miembros, siempre y cuando intervenga su presidente o su suplente. Los acuerdos que se emitan se tomarán por mayoría de votos de los miembros presentes, teniendo el presidente voto de calidad en caso de empate.\nEl responsable de las funciones de Auditoría Interna y el Titular del Organismo de Fomento o de la Entidad de Fomento, podrán someter a consideración del Comité de Auditoría, asuntos para su inclusión dentro del orden del día.\nEl Comité de Auditoría deberá sesionar, cuando menos, trimestralmente, con excepción del Fovissste y del Infonavit, cuyo Comité sesionará mensualmente; en todo caso se deberán hacer constar en actas los acuerdos tomados debidamente suscritas por todos y cada uno de los miembros participantes, en el entendido de que dichas sesiones podrán celebrarse por medios electrónicos, videoconferencia o teléfono.',
        enfasis: true,
      },
      {
        numero: '154',
        contenido: 'En ningún caso podrán ser designados como miembros del Comité de Auditoría los directivos y empleados del propio Organismo de Fomento o Entidad de Fomento de que se trate. Lo anterior, con excepción del Infonacot cuyo Comité de Auditoría solamente podrá incluir a un servidor público de dicho Instituto.',
        enfasis: true,
      },
      {
        numero: '155',
        contenido: 'El Comité de Auditoría del Infonacot, el Fovissste y las Entidades de Fomento se integrará con al menos tres y no más de cinco miembros, designados por el Consejo, que podrán ser propietarios o suplentes, de los cuales cuando menos uno deberá ser Independiente y lo presidirá.\nEl profesionista Independiente, respecto del Infonacot, Fovissste o Entidad de Fomento de que se trate, en ningún caso se podrá ubicar en cualquiera de los supuestos en los numerales de I al VII.',
        enfasis: true,
      },
      {
        numero: '156',
        contenido: 'El Infonacot, Fovissste o Entidad de Fomento de que se trate deberá recabar del profesionista Independiente, una declaración en la que manifieste que cumple con los requisitos del I al III:',
        enfasis: true,
      },
      {
        numero: '157',
        contenido: 'A las sesiones del Comité de Auditoría, podrán asistir como invitados con derecho a voz pero sin voto, el Titular, el responsable de las funciones de Auditoría Interna, el titular del Órgano Interno de Control, el o los responsables de las funciones de Contraloría Interna, así como cualquier otra persona a solicitud del presidente de dicho Comité cuando se considere apropiado en razón del tema a discutirse, debiendo retirarse cuando así lo estime conveniente este último, por la naturaleza de los asuntos a tratar o para llevar a cabo sus deliberaciones.',
        enfasis: true,
      },
      {
        numero: '158',
        contenido: 'Los miembros del Comité de Auditoría del Infonacot, Fovissste y las Entidades de Fomento podrán ser removidos por el Consejo, a propuesta fundada de su presidente o del titular de la Comisión, en este último caso con acuerdo de su junta de gobierno.',
        enfasis: true,
      },
    ],
    referencias: [
      { numero: 1, texto: 'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento' },
      { numero: 2, texto: 'Manual de Funcionamiento del Comité de Auditoría' },
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
    introduccion: 'Las funciones se encuentran descritas en los artículos 161 al 164, de las Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento.',
    introReferencias: [1],
    
    articulosLegales: [
      {
        titulo: 'Artículo 161',
        contenido: 'El Comité de Auditoría deberá proponer para aprobación del Consejo, el Sistema de Control Interno que el Organismo de Fomento o la Entidad requiera para su adecuado funcionamiento, así como sus actualizaciones.',
        referencias: [1]
      }
    ],
    
    parrafoIntermedio: 'Los objetivos y lineamientos del Sistema de Control Interno deberán atender lo dispuesto en los artículos 149 y 150 de "las disposiciones" y referirse, como mínimo, a los aspectos que se indican a continuación los cuales serán elaborados por el Titular y sometidos a la consideración del propio comité:',
    
    fracciones: [
      {
        numero: 'I',
        texto: 'Políticas generales relativas a la estructura organizacional del Organismo de Fomento o de la Entidad de Fomento, procurando que exista una clara segregación y delegación de funciones y responsabilidades entre las distintas unidades del propio Organismo de Fomento o Entidad de Fomento, así como la Independencia entre las unidades de: Funciones Operativas y de Control.\n\nLo anterior, sin perjuicio de las atribuciones que al respecto correspondan al Titular del FIFOMI, conforme a lo previsto en las presentes disposiciones.'
      },
      {
        numero: 'II',
        texto: 'Establecimiento de los canales de comunicación y de flujo de información entre las distintas unidades y áreas del FIFOMI, a efecto de que la Dirección General pueda implementar lo señalado en el inciso b) de la fracción V del artículo 169 de "Las Disposiciones".'
      },
      {
        numero: 'III',
        texto: 'Las políticas generales de operación, que servirán para la definición, documentación y revisión periódica de los procedimientos operativos del FIFOMI. Dichas políticas deberán:',
        subelementos: [
          {
            letra: 'a',
            texto: 'Establecer que las operaciones se llevan a cabo por el personal autorizado.'
          },
          {
            letra: 'b',
            texto: 'Prever el registro contable sistemático de operaciones activas, pasivas y de servicios, así como sus resultados, con el fin de que:',
            subnumericos: [
              {
                numero: '1',
                texto: 'La información financiera, económica, contable, jurídica y administrativa, sea completa, correcta, precisa, íntegra, confiable y oportuna, y que haya sido elaborada en apego a la normatividad aplicable.'
              },
              {
                numero: '2',
                texto: 'Se cuente con registro denominados "huellas de auditoría" que permitan reconstruir cronológicamente y constatar las transacciones.'
              },
              {
                numero: '3',
                texto: 'Se establezcan sistemas de verificación y reconciliación de cifras reportadas tanto al interior del Organismo de Fomento o Entidad de Fomento, como a las autoridades.'
              }
            ]
          }
        ]
      },
      {
        numero: 'IV',
        texto: 'El Plan de Continuidad de Negocio, el cual deberá ser sometido regularmente a pruebas de funcionamiento y hacerse del conocimiento del personal.'
      }
    ],
    
    articulosLegales2: [
      {
        titulo: 'Artículo 162',
        contenido: 'El Comité de Auditoría, en adición a lo señalado en el artículo anterior, deberá proponer para aprobación del Consejo del Organismo de Fomento o Entidad de Fomento, lo siguiente:'
      }
    ],
    
    incisos: [
      { numero: 'i', texto: 'La designación del auditor interno.' },
      { numero: 'ii', texto: '...' },
      { numero: 'iii', texto: 'El Código de Ética elaborado por la Dirección General.' },
      { numero: 'iv', texto: 'Los cambios, en su caso, a las políticas contables referentes al registro, valuación de rubros de los estados financieros y, presentación y revelación de información del FIFOMI, a fin de que esta última sea completa, correcta, precisa, íntegra, confiable y oportuna, elaborados por el Titular de acuerdo con la normatividad aplicable. La atribución a que se refiere esta fracción podrá ejercerse oyendo la opinión de la Dirección General.' },
      { numero: 'v', texto: 'Las normas que regirán el funcionamiento del propio Comité de Auditoría, enviándose posteriormente a la Comisión para su conocimiento.' },
      { numero: 'vi', texto: '...' }
    ],
    
    articulosLegales3: [
      {
        titulo: 'Artículo 163',
        contenido: 'El Comité de Auditoría, en el desarrollo de sus funciones, deberá, por lo menos, desempeñar las actividades siguientes:'
      }
    ],
    
    fracciones163: [
      {
        numero: 'I',
        texto: 'Contar con un registro permanentemente actualizado de los objetivos del Sistema de Control Interno, de los lineamientos para su implementación, así como de los manuales que se consideren relevantes para la operación acorde al objeto del FIFOMI, el cual deberá ser elaborado por el o los responsables de las funciones de Contraloría Interna del FIFOMI.'
      },
      {
        numero: 'II',
        texto: 'Revisar y vigilar, con apoyo de los responsables de las funciones de Auditoría Interna, que los referidos manuales de operación conforme al objeto del FIFOMI, se apeguen al Sistema de Control Interno.'
      },
      {
        numero: 'III',
        texto: 'Revisar, con base en los informes del área de Auditoría Interna y auditoría externa, cuando menos una vez al año o cuando lo requiera la Comisión, que el programa de Auditoría Interna se lleve a cabo de conformidad con estándares de calidad adecuados en materia contable y de controles internos y que las actividades del área de Auditoría Interna se realicen con efectividad.'
      },
      {
        numero: 'IV',
        texto: 'Vigilar la Independencia del área de Auditoría Interna respecto de las demás Unidades de Negocio y administrativas del FIFOMI. En caso de falta de Independencia, informar al Consejo.'
      },
      {
        numero: 'V',
        texto: 'Revisar, con apoyo de las Auditorías Interna y auditoría externa, la aplicación del Sistema de Control Interno, evaluando su eficiencia y efectividad.'
      },
      {
        numero: 'VI',
        texto: 'Informar al Consejo, cuando menos una vez al año, sobre la situación que guarda el Sistema de Control Interno. El informe deberá contener, como mínimo, lo siguiente:',
        subelementos: [
          {
            letra: 'a',
            texto: 'Las deficiencias, desviaciones o aspectos del Sistema de Control Interno que, en su caso, requieran una mejoría, tomando en cuenta para tal efecto los informes y dictámenes del Auditor Interno y auditor externo respectivamente, así como de los responsables de las funciones de Contraloría Interna.'
          },
          {
            letra: 'b',
            texto: 'La mención y seguimiento de la implementación de las medidas preventivas y correctivas derivadas de las observaciones de la Comisión y los resultados de las Auditorías Interna y auditoría externa, así como de la evaluación del Sistema de Control Interno realizada por el propio Comité de Auditoría.'
          },
          {
            letra: 'c',
            texto: 'La valoración del desempeño de las funciones de Contraloría Interna y del área de Auditoría Interna.'
          },
          {
            letra: 'd',
            texto: 'La evaluación del desempeño del Auditor Externo Independiente, así como de la calidad de su dictamen y de los reportes o informes que elabore, en cumplimiento a las disposiciones de carácter general aplicables, incluyendo las observaciones que al respecto realice la Comisión.'
          },
          {
            letra: 'e',
            texto: 'Los aspectos significativos del Sistema de Control Interno que pudieran afectar el desempeño de las actividades del FIFOMI.'
          },
          {
            letra: 'f',
            texto: 'Los resultados de la revisión del dictamen, informes, opiniones y comunicados del Auditor Externo Independiente.'
          },
          {
            letra: 'g',
            texto: 'Una evaluación del alcance y efectividad del Plan de Continuidad de Negocio, su divulgación entre las áreas pertinentes y la identificación, en su caso, de los ajustes necesarios para su actualización.'
          }
        ]
      },
      {
        numero: 'VII',
        texto: 'Revisar, en coordinación con la Dirección General al menos una vez al año o cuando existan cambios significativos en la operación del FIFOMI, los manuales a que se refiere la fracción II, así como el Código de Ética.'
      },
      {
        numero: 'VIII',
        texto: 'Aprobar, el programa anual de trabajo del área de Auditoría Interna, respecto del cual el Titular podrá manifestar su opinión, sin que esta sea vinculante.'
      },
      {
        numero: 'IX',
        texto: 'Informar a los Consejos de las irregularidades importantes detectadas con motivo del ejercicio de sus funciones y, en su caso, de las acciones correctivas adoptadas o proponer las que deban aplicarse.'
      },
      {
        numero: 'X',
        texto: 'Informar por escrito al titular del Órgano Interno de Control de las irregularidades detectadas con motivo del ejercicio de sus funciones, cuando considere que se trata de los temas de su competencia según lo previsto por las disposiciones legales aplicables.'
      },
      {
        numero: 'XI',
        texto: 'Recibir y conocer las irregularidades detectadas, procedimientos iniciados, y demás actividades que realice el titular del Órgano Interno de Control del FIFOMI, acerca de las materias objeto de su competencia de conformidad con lo previsto en las disposiciones legales aplicables, y que hayan presentado por escrito ante el Comité.'
      },
      {
        numero: 'XII',
        texto: 'Las demás que sean necesarias para el desempeño de sus funciones.'
      }
    ],
    
    parrafoFinal163: 'El Comité de Auditoría en el desarrollo de las actividades que se señalan en el presente artículo, establecerá los procedimientos necesarios para el desempeño en general de sus funciones. Los miembros del Comité tomarán como base para la realización de sus actividades, la información que elaboren el auditor interno y el Auditor Externo Independiente, así como la Contraloría Interna y a la Dirección General del Organismo de Fomento o Entidad de Fomento.',
    
    articulosLegales4: [
      {
        titulo: 'Artículo 164',
        contenido: 'El Comité de Auditoría, en la elaboración del informe a que refiere el artículo 163, fracción VI de las presentes disposiciones, escuchará al Titular, al auditor interno y al responsable o responsables de las funciones de la Contraloría Interna del Organismo de Fomento o Entidad de Fomento. En caso de existir diferencia de opinión con estos últimos, con respecto al Sistema de Control Interno, deberán incorporarse en dicho informe, tales diferencias.'
      }
    ],
    
    fuentes: [
      { numero: 1, texto: 'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento' }
    ],
  },

  sesionesIntro: {
    parrafos: [
      {
        texto: 'Con fundamento en el artículo 153 tercer párrafo de las Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento:',
        referencias: [1],
      },
    ],
    articulo153: {
      contenido: 'El Comité de Auditoría sesionará de manera ordinaria por lo menos cuatro veces al año. En el caso de Fovisste e Infonacot sesionará, cuando menos, una vez al mes.\n\nEn las sesiones del Comité se levantará acta correspondiente que deberá ser firmada por los asistentes. Las actas podrán ser digitalizadas y firmarse utilizando medios de identificación electrónica en los términos de las disposiciones aplicables.',
      enfasis: true,
      subrayado: ['Fovisste', 'Infonacot'],
    },
    referencias: [
      { numero: 1, texto: 'Disposiciones de Carácter General aplicables a los Organismos de Fomento y Entidades de Fomento' },
    ],
  },

  sesiones: [
    { numeroSesion: 17, nombreSesion: 'Decimoséptima Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-11-26', acta: 'Acta 17a Sesión Ordinaria 2024', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 16, nombreSesion: 'Decimosexta Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-08-27', acta: 'Acta 16a Sesión Ordinaria 2024', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 15, nombreSesion: 'Decimoquinta Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-05-28', acta: 'Acta 15a Sesión Ordinaria 2024', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 14, nombreSesion: 'Decimocuarta Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2024-02-27', acta: 'Acta 14a Sesión Ordinaria 2024', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 13, nombreSesion: 'Decimotercera Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-11-28', acta: 'Acta 13a Sesión Ordinaria 2023', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 12, nombreSesion: 'Decimosegunda Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-08-29', acta: 'Acta 12a Sesión Ordinaria 2023', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 11, nombreSesion: 'Decimoprimera Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-05-30', acta: 'Acta 11a Sesión Ordinaria 2023', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 10, nombreSesion: 'Décima Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2023-02-28', acta: 'Acta 10a Sesión Ordinaria 2023', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 9, nombreSesion: 'Novena Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2022-11-29', acta: 'Acta 9a Sesión Ordinaria 2022', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
    { numeroSesion: 8, nombreSesion: 'Octava Sesión Ordinaria', tipoSesion: 'Ordinaria', fecha: '2022-08-30', acta: 'Acta 8a Sesión Ordinaria 2022', carpeta: 'Sesión sin carpeta', tieneCarpeta: false, anexos: false },
  ],

  acuerdos: [
    { 
      numeroSesion: 17, 
      nombreSesion: 'Decimoséptima Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-11-26', 
      resolucion: 'CA/17-01/2024', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 30 de septiembre de 2024', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS AL 30 DE SEPTIEMBRE DE 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 17, 
      nombreSesion: 'Decimoséptima Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-11-26', 
      resolucion: 'CA/17-02/2024', 
      tema: 'Informe del Auditor Interno sobre las Auditorías realizadas en el tercer trimestre 2024', 
      acuerdo: 'SE TOMA NOTA DEL INFORME PRESENTADO POR EL AUDITOR INTERNO', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 16, 
      nombreSesion: 'Decimosexta Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-08-27', 
      resolucion: 'CA/16-01/2024', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 30 de junio de 2024', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS AL 30 DE JUNIO DE 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 16, 
      nombreSesion: 'Decimosexta Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-08-27', 
      resolucion: 'CA/16-02/2024', 
      tema: 'Aprobación del Programa Anual de Auditoría Interna 2025', 
      acuerdo: 'SE APRUEBA EL PROGRAMA ANUAL DE AUDITORÍA INTERNA PARA EL EJERCICIO FISCAL 2025', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 15, 
      nombreSesion: 'Decimoquinta Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-05-28', 
      resolucion: 'CA/15-01/2024', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 31 de marzo de 2024', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS AL 31 DE MARZO DE 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 14, 
      nombreSesion: 'Decimocuarta Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-02-27', 
      resolucion: 'CA/14-01/2024', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 31 de diciembre de 2023', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS DICTAMINADOS AL 31 DE DICIEMBRE DE 2023', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 14, 
      nombreSesion: 'Decimocuarta Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2024-02-27', 
      resolucion: 'CA/14-02/2024', 
      tema: 'Propuesta de designación del Auditor Externo para el ejercicio fiscal 2024', 
      acuerdo: 'SE APRUEBA PROPONER AL COMITÉ TÉCNICO LA DESIGNACIÓN DEL AUDITOR EXTERNO PARA EL EJERCICIO FISCAL 2024', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 13, 
      nombreSesion: 'Decimotercera Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2023-11-28', 
      resolucion: 'CA/13-01/2023', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 30 de septiembre de 2023', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS AL 30 DE SEPTIEMBRE DE 2023', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 12, 
      nombreSesion: 'Decimosegunda Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2023-08-29', 
      resolucion: 'CA/12-01/2023', 
      tema: 'Opinión Favorable sobre los Estados Financieros del FIFOMI al 30 de junio de 2023', 
      acuerdo: 'SE APRUEBA DAR OPINIÓN FAVORABLE AL COMITÉ TÉCNICO SOBRE LOS ESTADOS FINANCIEROS AL 30 DE JUNIO DE 2023', 
      estatus: 'Aprobado' 
    },
    { 
      numeroSesion: 9, 
      nombreSesion: 'Novena Sesión Ordinaria', 
      tipoSesion: 'Ordinaria', 
      fecha: '2022-11-29', 
      resolucion: 'CA/09-02/2022', 
      tema: 'Aprobación del Cuestionario de Evaluación del Auditor Externo correspondiente al ejercicio fiscal 2018', 
      acuerdo: 'SE APRUEBA EL CUESTIONARIO DE EVALUACIÓN DEL AUDITOR EXTERNO CORRESPONDIENTE AL EJERCICIO FISCAL 2018', 
      estatus: 'Aprobado' 
    },
  ],

  reportesAcuerdos: {
    tipos: [
      {
        id: 'porSesion',
        titulo: 'Por Sesión',
        descripcion: 'Genera un informe de los acuerdos del Comité tomados durante la sesión solicitada o de todas las sesiones hasta a la fecha',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEstatus',
        titulo: 'Por Estatus',
        descripcion: 'Genera un informe del Estatus de los acuerdos del Comité, desde una sesión o de todas las sesiones hasta la fecha',
        campos: [
          { tipo: 'select', nombre: 'estatus', label: '', opciones: ['Todos'] },
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'temaAcuerdo',
        titulo: 'Tema & Acuerdo',
        descripcion: 'Genera un informe específico del contenido de la información solicitada, se obtiene de los campos de tema y acuerdo',
        campos: [
          { tipo: 'text', nombre: 'busqueda', label: '', placeholder: 'Introduce el texto o la frase a buscar en el Tema o Acuerdo' },
        ],
      },
      {
        id: 'consolidado',
        titulo: 'Consolidado por Sesión',
        descripcion: 'Genera un Resumen de Acuerdos por Sesión.',
        campos: [
          { tipo: 'select', nombre: 'sesion', label: '', opciones: ['Todas las Sesiones'] },
        ],
      },
      {
        id: 'porEjercicio',
        titulo: 'Sesiones & Acuerdos por Ejercicio',
        descripcion: 'Genera un Informe de las sesiones realizadas en el ejercicio y un resumen de los acuerdos de las sesiones del Comité.',
        campos: [
          { tipo: 'select', nombre: 'ejercicio', label: '', opciones: ['Todos'] },
        ],
      },
    ],
  },
};

// =============================================================================
// COMITÉ DE CALIDAD - CONTENIDO COMPLETO DE LAS IMÁGENES 39-42
// =============================================================================

export const comiteCalidadData = {
  configuracion: {
    paginacionSesiones: 10,
    paginacionAcuerdos: 10,
    estatusAcuerdos: 'Aprobado',
    tieneEstadisticas: true,
    tieneGeneradorReportes: false,
    tieneAcuerdos: false,
  },

  antecedentes: {
    titulo: 'Antecedentes',
    parrafos: [
      {
        texto: 'El Comité de Calidad / Comisión de Calidad tiene su origen el 7 de abril de 2014. Derivado de la cancelación de la modificación de la estructura orgánica, y con el objeto de asegurar que se encuentren definidas la responsabilidad y autoridad dentro del Sistema de Gestión de Calidad, se establece el Comité de Calidad del Fideicomiso de Fomento Minero considerando la nomenclatura de puestos que prevalece actualmente en la entidad.',
        referencias: [1],
      },
    ],
    referencias: [
      { numero: 1, texto: 'Formalización del Comité de Calidad' },
    ],
  },

  lineamientos: {
    titulo: 'Lineamientos de Operación',
    contenido: 'Área en proceso',
    referencias: [
      { numero: 1, texto: 'Manual del Sistema de Gestión de la Calidad' },
    ],
  },

  integracion: [
    { cargo: 'Presidente', nombre: '', puesto: 'Director General del FIFOMI' },
    { cargo: 'Representante de la Dirección', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
    { cargo: 'Integrante', nombre: 'Lic. Ricardo Miranda Burgos', puesto: 'Director de Crédito, Finanzas y Administración' },
    { cargo: 'Integrante', nombre: 'Ing. Fernando Quiroga Wolberg', puesto: 'Director de Operación y Apoyo Técnico' },
    { cargo: 'Integrante', nombre: 'C.P. Martha Graciela Camargo Nava', puesto: 'Subdirectora de Finanzas y Administración' },
    { cargo: 'Integrante', nombre: 'Mtra. Adriana Marín Colmenares', puesto: 'Subdirectora Jurídica' },
    { cargo: 'Integrante', nombre: 'Lic. Beatabel Méndez Toriano', puesto: 'Subdirector Técnico' },
    { cargo: 'Integrante', nombre: '', puesto: 'Gerente de Comunicación y Difusión' },
    { cargo: 'Responsable del Sistema de Gestión de la Calidad', nombre: 'Lic. Erika Hernández Calixto', puesto: 'Gerente de Recursos Humanos' },
    { cargo: 'Presidente Suplente', nombre: 'Lic. Hugo Alberto López Cortés', puesto: 'Director de Coordinación Técnica y Planeación' },
  ],

  funciones: {
    contenido: 'Área en proceso',
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
