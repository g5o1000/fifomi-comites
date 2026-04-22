# Plan de Corrección Definitivo - Sistema FIFOMI

## ✅ Estado Actual Verificado

### Componentes Ya Corregidos
1. ✅ `tooltip.tsx` - Tiene `filterFigmaProps` aplicado
2. ✅ `select.tsx` - Tiene filtrado manual de props `_fg*`

### Componentes que NO necesitan filtrado de props (no usan Radix primitives directamente)
- `button.tsx` - Solo usa elemento nativo con spread props controlado
- `input.tsx` - Solo usa elemento nativo
- `card.tsx` - Solo usa elementos nativos div
- `alert.tsx` - Solo usa elementos nativos div

### Componentes que NECESITAN filtrado de props de Figma

1. ❌ **dialog.tsx** - Usa DialogPrimitive sin filtrar props
2. ❌ **dropdown-menu.tsx** - Usa DropdownMenuPrimitive sin filtrar props  
3. ❌ **popover.tsx** - Usa PopoverPrimitive sin filtrar props
4. ⚠️ **custom-calendar.tsx** - Usa Select internamente (necesita revisión)

## 🎯 Problema Principal Identificado

### Los Selects No Funcionan
**Causa más probable:** Los componentes de Radix UI (Dialog, Popover, DropdownMenu) están recibiendo props `_fg*` de Figma que:
1. Generan warnings en consola
2. **Potencialmente** interfieren con event handlers de Radix
3. **Potencialmente** rompen el portal mounting de Radix

### La Pantalla Gris
**Causa más probable:**
1. Error de JavaScript no capturado que rompe el render
2. Los warnings acumulados están causando que React entre en error boundary
3. Un componente está lanzando excepción

## 📋 Plan de Acción Paso a Paso

### PASO 1: Aplicar Helper Function a Componentes UI (BAJO RIESGO)
Agregar la función `filterFigmaProps` a:

**Archivos a modificar:**
1. `/components/ui/dialog.tsx`
2. `/components/ui/dropdown-menu.tsx`
3. `/components/ui/popover.tsx`

**Cambios:**
```typescript
// Helper function to filter out Figma inspector props
const filterFigmaProps = <T extends Record<string, any>>(props: T): Partial<T> => {
  const filtered = { ...props };
  Object.keys(filtered).forEach(key => {
    if (key.startsWith('_fg')) {
      delete filtered[key];
    }
  });
  return filtered;
};
```

Luego aplicar `{...filterFigmaProps(props)}` en cada primitive component.

**Impacto esperado:** 
- ✅ Eliminará warnings de React
- ✅ Potencialmente arreglará los Selects que no abren
- ⚠️ Riesgo BAJO - solo filtramos props, no cambiamos lógica

### PASO 2: Verificar Custom Calendar (MEDIO RIESGO)
El CustomCalendar usa Select internamente. Si los Selects no funcionan, el calendario tampoco.

**Acción:** Solo verificar después de PASO 1, NO modificar a menos que sea necesario.

### PASO 3: Verificar Imágenes (BAJO RIESGO)
Revisar que las imágenes `figma:asset` estén cargando correctamente.

**Acción:** Solo verificación, no cambios.

## 🚨 LO QUE NO SE DEBE TOCAR

### Componentes Críticos - NO MODIFICAR sin razón específica:
1. `ModificarSesionDialog.tsx` - Componente reutilizable
2. `CustomCalendar.tsx` - Componente reutilizable (solo si PASO 1 no lo arregla)
3. `comitesDataComplete.ts` - Datos trabajados
4. `ReferenciasNumeradas.tsx` - Sistema de referencias funcionando

### Componentes Recientemente Modificados - Verificar pero no cambiar:
1. `Dashboard.tsx` - Solo se agregó `font-bold`
2. `LoginPage.tsx` - Solo se agregó `font-bold`
3. `ComiteSeccionCompleta.tsx` - Solo se agregó `font-bold`
4. Otros componentes donde solo se agregó `font-bold`

## 🔍 Verificaciones Post-Corrección

Después de cada cambio, verificar:

1. ✅ Los Select/dropdowns abren y funcionan
2. ✅ No hay pantallas grises
3. ✅ No hay warnings de React en consola
4. ✅ El CustomCalendar funciona
5. ✅ Los Dialog funcionan
6. ✅ Los DropdownMenu funcionan
7. ✅ Los Popover funcionan
8. ✅ Las imágenes cargan correctamente
9. ✅ Los componentes reutilizables siguen funcionando

## 📊 Orden de Ejecución

1. **PRIMERO:** Aplicar filterFigmaProps a dialog.tsx
2. **SEGUNDO:** Aplicar filterFigmaProps a dropdown-menu.tsx
3. **TERCERO:** Aplicar filterFigmaProps a popover.tsx
4. **CUARTO:** Probar TODOS los Selects en RegistroSesionesForm
5. **QUINTO:** Solo si necesario, revisar CustomCalendar
6. **SEXTO:** Verificación completa de la app

## 💰 Nota Importante

El usuario ha indicado que:
- Esto le está costando mucho dinero
- Ya se ha retrabajado 3 veces
- Los cambios necesitan ser quirúrgicos y precisos
- No se puede romper nada que ya funciona

Por lo tanto:
- ✅ Hacer UN cambio a la vez
- ✅ Verificar después de cada cambio
- ✅ No asumir nada
- ✅ Documentar todo
- ❌ NO hacer cambios experimentales
- ❌ NO modificar componentes que funcionan
- ❌ NO reescribir código que ya está bien
