# ANÁLISIS COMPLETO DEL PROBLEMA DE PANTALLA GRIS

## Fecha: 13 de Marzo 2026
## Investigación exhaustiva realizada

---

## 🔍 INVESTIGACIÓN COMPLETA REALIZADA

### ✅ Componentes UI Revisados:

1. **`/components/ui/dialog.tsx`**
   - ✅ Está bien estructurado
   - ✅ NO tiene filtrado de props de Figma
   - ✅ Overlay gris es NORMAL: `bg-black/50` (línea 42)
   - ⚠️ Pasa props directamente sin filtrar: `{...props}` (líneas 12, 18, 24, 30, 45, 65)

2. **`/components/ui/popover.tsx`**
   - ✅ Está bien estructurado
   - ✅ NO tiene filtrado de props de Figma
   - ⚠️ Pasa props directamente sin filtrar: `{...props}` (líneas 11, 17, 36, 45)

3. **`/components/ui/dropdown-menu.tsx`**
   - ✅ Está bien estructurado
   - ✅ NO tiene filtrado de props de Figma
   - ⚠️ Pasa props directamente sin filtrar: `{...props}` en TODOS sus componentes

4. **`/components/ui/select.tsx`**
   - ✅ SÍ tiene filtrado de props de Figma
   - ✅ Filtra en SelectTrigger (líneas 55-62)
   - ✅ Filtra en SelectItem (líneas 133-142)
   - ✅ Usa CleanIcon para iconos (líneas 14-26)

5. **`/components/ui/tooltip.tsx`**
   - ✅ SÍ tiene filtrado de props de Figma
   - ✅ Usa función `filterFigmaProps()` (líneas 8-17)

---

## 🎯 HIPÓTESIS COMBINADAS

### PROBLEMA 1: Radix UI Select es defectuoso (YA DOCUMENTADO)

**Evidencia:**
- Documento `/SOLUCION_WARNING_REACT_KEYS.md` confirma que Radix Select tiene bugs
- Ya se creó solución: `NativeSelect` (/components/ui/native-select.tsx)
- Ya funciona en RegistroAcuerdosForm.tsx
- **8 archivos AÚN usan Radix Select**

### PROBLEMA 2: Props de Figma sin filtrar (POSIBLE)

**Evidencia:**
- Dialog, Popover, Dropdown NO filtran props de Figma
- Tooltip y Select SÍ lo hacen
- Props `_fgT`, `_fgt`, `_fgS`, etc. podrían romper Radix UI

**Componentes que pasan props sin filtrar:**
- Dialog (6 subcomponentes)
- Popover (4 subcomponentes)  
- DropdownMenu (16 subcomponentes)

---

## 🔴 CAUSA PROBABLE DE LA PANTALLA GRIS

### Escenario Más Probable:

La **pantalla gris** NO es un error, ES EL OVERLAY del Dialog o Popover.

**Razones:**

1. **El Dialog tiene overlay gris por diseño:**
   ```tsx
   // dialog.tsx línea 42
   className="fixed inset-0 z-[70] bg-black/50"
   ```

2. **Si el Dialog/Popover crashea:**
   - El overlay SE QUEDA ahí
   - El contenido NO se renderiza (error de JavaScript)
   - Resultado: Pantalla gris sin contenido

3. **Posibles causas del crash:**
   - Props de Figma (`_fg*`) pasadas a Radix UI primitives
   - Select dentro de Dialog que crashea
   - Error de JavaScript en event handlers

---

## 🧪 PRUEBA DIAGNÓSTICA

### ¿Qué Archivos Usan Dialog/Popover con Select dentro?

**Archivos críticos encontrados:**

1. **`ModificarSesionDialog.tsx`** ← Usa Dialog + Select de Radix
2. **`ModificarAcuerdoDialog.tsx`** ← Usa Dialog + Select de Radix
3. **`CustomCalendar.tsx`** ← Usa Select de Radix (se usa en Popovers)

**ESTOS SON LOS SOSPECHOSOS PRINCIPALES**

---

## ✅ SOLUCIÓN INTEGRAL PROPUESTA

### FASE 1: Reemplazar Radix Select (8 archivos)

**Prioridad CRÍTICA** (causan el problema visible):

1. ✅ `RegistroSesionesForm.tsx` ← Ya identificado
2. ✅ `ModificarSesionDialog.tsx` ← Usa Dialog + Select
3. ✅ `ModificarAcuerdoDialog.tsx` ← Usa Dialog + Select
4. ✅ `CustomCalendar.tsx` ← Usado dentro de Popovers

**Prioridad ALTA:**

5. ⚠️ `DataTable.tsx` ← Select de paginación
6. ⚠️ `EstadisticasComite.tsx` ← Filtros con Select
7. ⚠️ `GeneradorReportesAcuerdos.tsx` ← Filtros con Select
8. ⚠️ `GeneradorReportesSesiones.tsx` ← Filtros con Select

### FASE 2: Filtrar Props de Figma en Dialog/Popover/Dropdown

**SOLO si FASE 1 no resuelve completamente el problema.**

Archivos a modificar:
- `/components/ui/dialog.tsx`
- `/components/ui/popover.tsx`
- `/components/ui/dropdown-menu.tsx`

Cambio: Agregar función `filterFigmaProps()` como en tooltip.tsx

---

## 📊 ORDEN DE EJECUCIÓN RECOMENDADO

### PASO 1: Solución Inmediata (2 archivos críticos)

1. **`RegistroSesionesForm.tsx`** - Reemplazar Select por NativeSelect
2. **`CustomCalendar.tsx`** - Reemplazar Select por NativeSelect

**Razón:** Estos dos son los más usados y probablemente causan la mayoría de errores.

**Verificar:** ¿La pantalla gris desaparece?

---

### PASO 2: Componentes Dialog (2 archivos)

3. **`ModificarSesionDialog.tsx`** - Reemplazar Select por NativeSelect
4. **`ModificarAcuerdoDialog.tsx`** - Reemplazar Select por NativeSelect

**Verificar:** ¿Los diálogos abren correctamente sin pantalla gris?

---

### PASO 3: Componentes de Reportes (4 archivos)

5. `DataTable.tsx`
6. `EstadisticasComite.tsx`
7. `GeneradorReportesAcuerdos.tsx`
8. `GeneradorReportesSesiones.tsx`

**Verificar:** ¿Todo funciona correctamente?

---

### PASO 4: Si AÚN hay problemas - Filtrar props de Figma

9. Agregar `filterFigmaProps()` a Dialog
10. Agregar `filterFigmaProps()` a Popover
11. Agregar `filterFigmaProps()` a DropdownMenu

---

## 🎯 SOLUCIÓN ESPECÍFICA POR ARCHIVO

### 1. RegistroSesionesForm.tsx

**ANTES:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

<Select value={tipoSesion} onValueChange={setTipoSesion}>
  <SelectTrigger id="tipoSesion">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ordinaria">Ordinaria</SelectItem>
    <SelectItem value="extraordinaria">Extraordinaria</SelectItem>
  </SelectContent>
</Select>
```

**DESPUÉS:**
```tsx
import { NativeSelect } from '../ui/native-select';

<NativeSelect 
  id="tipoSesion" 
  value={tipoSesion} 
  onChange={(e) => setTipoSesion(e.target.value)}
>
  <option value="ordinaria">Ordinaria</option>
  <option value="extraordinaria">Extraordinaria</option>
</NativeSelect>
```

### 2. CustomCalendar.tsx

**ANTES:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

<Select
  value={currentMonth.getMonth().toString()}
  onValueChange={handleMonthChange}
>
  <SelectTrigger className="h-8 text-sm">
    <SelectValue />
  </SelectTrigger>
  <SelectContent className="z-[100]">
    {monthNames.map((month, index) => (
      <SelectItem key={index} value={index.toString()}>
        {month}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

**DESPUÉS:**
```tsx
import { NativeSelect } from './native-select';

<NativeSelect
  className="h-8 text-sm"
  value={currentMonth.getMonth().toString()}
  onChange={(e) => handleMonthChange(e.target.value)}
>
  {monthNames.map((month, index) => (
    <option key={index} value={index.toString()}>
      {month}
    </option>
  ))}
</NativeSelect>
```

---

## 🚨 CONFIRMACIÓN CRÍTICA ANTES DE PROCEDER

### Pregunta al Usuario:

**¿Cuándo aparece exactamente la pantalla gris?**

A. ¿Al hacer clic en un Select/dropdown?
B. ¿Al abrir un Dialog/modal?
C. ¿Al abrir el calendario?
D. ¿Aleatoriamente sin interacción específica?
E. ¿En una página específica? ¿Cuál?

**Esta información confirmaría qué archivo está causando el problema.**

---

## 💰 IMPACTO Y RIESGO

### Si procedo con FASE 1 (Reemplazar Selects):

**Riesgo:** BAJO
- Solución ya probada en RegistroAcuerdosForm.tsx
- Cambio simple y directo
- NO modifica lógica de negocio
- SOLO cambia componente UI

**Beneficio:** ALTO
- Elimina bugs conocidos de Radix Select
- Mejora rendimiento (componentes nativos)
- Elimina warnings de React
- Probablemente resuelve pantalla gris

### Si procedo con FASE 2 (Filtrar props):

**Riesgo:** MEDIO
- Modificar componentes base UI
- Podría afectar muchos archivos
- Requiere testing exhaustivo

**Beneficio:** MEDIO
- Previene futuros errores
- Código más robusto
- Consistencia con Tooltip/Select

---

## 🎯 RECOMENDACIÓN FINAL

### ESTRATEGIA PASO A PASO:

1. **PRIMERO:** Reemplazar 2 Selects críticos:
   - RegistroSesionesForm.tsx
   - CustomCalendar.tsx
   
2. **VERIFICAR:** ¿Problema resuelto?
   - SÍ → Continuar con los otros 6 archivos
   - NO → Investigar más (logs de consola, stack trace)

3. **SEGUNDO:** Completar reemplazo de 6 archivos restantes

4. **TERCERO (SOLO SI NECESARIO):** Filtrar props de Figma en Dialog/Popover

---

## ✋ ESPERANDO CONFIRMACIÓN

**NO PROCEDERÉ** sin confirmación explícita del usuario.

**Necesito saber:**
1. ¿Cuándo aparece exactamente la pantalla gris?
2. ¿Apruebas comenzar con FASE 1 - PASO 1 (2 archivos)?
3. ¿Hay algún otro síntoma o error que no hayamos discutido?

---

**Confianza en la solución: 85%**

- 70% de probabilidad que sea por Radix Select defectuoso
- 20% de probabilidad que sean props de Figma sin filtrar
- 10% de probabilidad que sea otro problema no identificado
