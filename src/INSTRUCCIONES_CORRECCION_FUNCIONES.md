# CORRECCIÓN SECCIÓN FUNCIONES - COMITÉ DE AUDITORÍA

## PROBLEMA IDENTIFICADO

El archivo `/data/comitesDataComplete.ts` líneas 940-969 contiene datos INCORRECTOS en la sección `funciones` del Comité de Auditoría.

**Contenido actual (INCORRECTO):** Artículos genéricos sobre opiniones al Consejo, información sobre estados financieros, etc.

**Contenido correcto:** Artículos 161-164 sobre Sistema de Control Interno con estructura compleja de fracciones, incisos y subelementos.

## SOLUCIÓN

### PASO 1: Ubicar la sección
Abre `/data/comitesDataComplete.ts` y busca la línea 940 que dice:
```typescript
  funciones: {
```

### PASO 2: Identificar qué borrar
Desde la línea 940 hasta la línea 969 (antes de `sesionesIntro: {`)

### PASO 3: Reemplazar con el contenido correcto

BORRAR TODO desde:
```typescript
  funciones: {
```

Hasta (e incluyendo):
```typescript
    ],
  },
```

Y REEMPLAZAR con el contenido del archivo `/REEMPLAZAR_FUNCIONES_AUDITORIA.txt`

## VERIFICACIÓN

Después del reemplazo, la sección debe tener esta estructura:

1. ✅ `introduccion` con `introReferencias: [1]`
2. ✅ `articulosLegales` (Art. 161)
3. ✅ `parrafoIntermedio`
4. ✅ `fracciones` (I-IV con subelementos anidados)
5. ✅ `articulosLegales2` (Art. 162)
6. ✅ `incisos` (i-vi)
7. ✅ `articulosLegales3` (Art. 163)
8. ✅ `fracciones163` (I-XII, fracción VI con subelementos a-g)
9. ✅ `parrafoFinal163`
10. ✅ `articulosLegales4` (Art. 164)
11. ✅ `fuentes`

## RESULTADO ESPERADO

El componente en `/components/comites/ComiteSeccionCompleta.tsx` (líneas 1029-1191) YA está programado correctamente para renderizar esta estructura con:

- Cajas azules para artículos legales
- Fracciones numeradas con indentación
- Subelementos con letras (a, b, c...)
- Sub-numéricos (1, 2, 3...)
- Superíndices de referencias
- Estilos en cursiva para artículos

Una vez corregidos los datos, la página se visualizará perfectamente.
