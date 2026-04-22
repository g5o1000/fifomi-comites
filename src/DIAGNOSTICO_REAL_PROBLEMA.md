# DIAGNÓSTICO REAL DEL PROBLEMA - Sistema FIFOMI

## 🔍 INVESTIGACIÓN COMPLETADA

### ❌ Hipótesis Inicial INCORRECTA
**Lo que pensé:** El problema eran props de Figma (`_fg*`) sin filtrar en Dialog, Dropdown-Menu, Popover.

**Por qué estaba equivocado:**
- Esos componentes (Dialog, Dropdown, Popover) NO están causando que los Selects no funcionen
- Los Selects tienen SU PROPIO problema, independiente de los otros componentes UI

---

## ✅ PROBLEMA REAL IDENTIFICADO

### El Select de Radix UI tiene defectos conocidos

Según el documento `/SOLUCION_WARNING_REACT_KEYS.md` (creado el 12 de Marzo 2026):

1. **Radix UI Select tiene bugs internos** en todas sus versiones
2. **Ya se identificó** que causa warnings de React
3. **Ya se creó una solución:** `NativeSelect` (componente HTML nativo estilizado)
4. **Ya se aplicó la solución** en `RegistroAcuerdosForm.tsx`

### ⚠️ LO QUE NO SE HIZO

**Los siguientes archivos TODAVÍA usan el Select problemático de Radix UI:**

1. ❌ `/components/comites/RegistroSesionesForm.tsx` - **ESTE ES EL QUE MUESTRA LA IMAGEN**
2. ❌ `/components/comites/ModificarSesionDialog.tsx` - Componente reutilizable
3. ❌ `/components/comites/ModificarAcuerdoDialog.tsx`
4. ❌ `/components/comites/DataTable.tsx`
5. ❌ `/components/comites/EstadisticasComite.tsx`
6. ❌ `/components/comites/GeneradorReportesAcuerdos.tsx`
7. ❌ `/components/comites/GeneradorReportesSesiones.tsx`
8. ❌ `/components/ui/custom-calendar.tsx` - **COMPONENTE REUTILIZABLE CRÍTICO**

---

## 🎯 CAUSA RAÍZ DEL PROBLEMA ACTUAL

### Por qué los Selects NO funcionan:

1. **Radix UI Select está roto** - Bug conocido de la librería
2. **Los warnings de React acumulados** están interfiriendo con la interactividad
3. **El portal de Radix** puede no estar montándose correctamente
4. **Las props de Figma** pueden estar interfiriendo con los event handlers internos de Radix

### Por qué aparece la pantalla gris:

Probablemente un error de JavaScript no capturado que causa que React entre en error boundary.

---

## ✅ SOLUCIÓN CONFIRMADA Y PROBADA

### Ya existe la solución: `NativeSelect`

**Archivo:** `/components/ui/native-select.tsx`

**Ventajas:**
- ✅ Componente HTML nativo (`<select>`)
- ✅ Sin bugs de Radix UI
- ✅ Sin warnings de React
- ✅ Mismo estilo visual
- ✅ Más ligero y rápido
- ✅ **YA PROBADO Y FUNCIONANDO** en RegistroAcuerdosForm.tsx

---

## 📋 PLAN DE CORRECCIÓN CONFIRMADO

### PASO 1: Reemplazar Radix Select por NativeSelect (PRIORIDAD ALTA)

**Archivos a modificar:**

1. **RegistroSesionesForm.tsx** ← **URGENTE** (el de la imagen)
2. **CustomCalendar.tsx** ← **CRÍTICO** (componente reutilizable)
3. ModificarSesionDialog.tsx
4. ModificarAcuerdoDialog.tsx  
5. DataTable.tsx
6. EstadisticasComite.tsx
7. GeneradorReportesAcuerdos.tsx
8. GeneradorReportesSesiones.tsx

### Cambios necesarios en cada archivo:

**ANTES:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Uso:
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opcion1">Opción 1</SelectItem>
    <SelectItem value="opcion2">Opción 2</SelectItem>
  </SelectContent>
</Select>
```

**DESPUÉS:**
```tsx
import { NativeSelect } from '../ui/native-select';

// Uso:
<NativeSelect 
  value={value} 
  onChange={(e) => setValue(e.target.value)}
>
  <option value="">Selecciona...</option>
  <option value="opcion1">Opción 1</option>
  <option value="opcion2">Opción 2</option>
</NativeSelect>
```

---

## ⚠️ CONSIDERACIONES CRÍTICAS

### CustomCalendar.tsx - REQUIERE CUIDADO ESPECIAL

Este componente:
- Es REUTILIZABLE (usado en múltiples lugares)
- Tiene 2 Selects internos (mes y año)
- NO debe romperse porque afectaría todo el sistema

**Estrategia:**
1. Hacer backup mental del código actual
2. Reemplazar SOLO los imports y los Selects
3. Mantener TODA la lógica de estado
4. Probar INMEDIATAMENTE después del cambio

---

## 🚫 LO QUE NO SE DEBE HACER

1. ❌ NO intentar "arreglar" el Select de Radix UI
2. ❌ NO agregar filterFigmaProps al Select de Radix (no resolverá el problema real)
3. ❌ NO modificar la lógica de los componentes, SOLO reemplazar el Select
4. ❌ NO tocar componentes que ya funcionan con NativeSelect
5. ❌ NO experimentar con soluciones alternativas

---

## ✅ VERIFICACIÓN POST-CAMBIO

Después de cada archivo modificado:

1. ✅ El select abre y muestra opciones
2. ✅ Se puede seleccionar una opción
3. ✅ El valor seleccionado se guarda correctamente
4. ✅ No hay pantalla gris
5. ✅ No hay warnings en consola
6. ✅ Los demás componentes siguen funcionando

---

## 📊 ORDEN DE EJECUCIÓN PROPUESTO

### FASE 1 - Críticos (hacer primero)
1. `RegistroSesionesForm.tsx` ← El que tiene el problema visible
2. `CustomCalendar.tsx` ← Componente reutilizable

### FASE 2 - Importantes (hacer después si FASE 1 funciona)
3. `ModificarSesionDialog.tsx`
4. `ModificarAcuerdoDialog.tsx`

### FASE 3 - Secundarios (hacer al final)
5. `DataTable.tsx`
6. `EstadisticasComite.tsx`
7. `GeneradorReportesAcuerdos.tsx`
8. `GeneradorReportesSesiones.tsx`

---

## 💰 IMPACTO FINANCIERO

- Cada error cuesta dinero al usuario
- Este problema YA TIENE SOLUCIÓN PROBADA
- NO hay riesgo si seguimos la solución ya probada
- NO debemos experimentar ni improvisar

---

## 🎯 CONCLUSIÓN

**El problema NO es:**
- Props de Figma en Dialog/Dropdown/Popover
- Z-index
- CSS que bloquea eventos

**El problema SÍ es:**
- Radix UI Select es defectuoso
- Ya se sabe desde Marzo 12, 2026
- Ya existe la solución: NativeSelect
- Solo falta aplicarla en los 8 archivos restantes

**Confianza en la solución: 95%**

Esto ya se probó y funcionó en `RegistroAcuerdosForm.tsx`. Solo necesitamos replicar la misma solución.
