# Análisis Completo de Errores - Sistema FIFOMI

**Fecha:** $(date)
**Estado:** Pre-corrección - Solo análisis

## Problemas Identificados

### 1. Warnings de React sobre props no reconocidas (_fg*)
**Estado:** ✅ PARCIALMENTE CORREGIDO
- **Componente:** `tooltip.tsx` 
- **Corrección aplicada:** Agregada función `filterFigmaProps` que filtra props que comienzan con `_fg`
- **Componente:** `select.tsx`
- **Corrección aplicada:** Ya tiene filtrado de props de Figma en varios componentes

**Componentes que necesitan revisión:**
- `dialog.tsx` - No filtra props de Figma
- `dropdown-menu.tsx` - Necesita verificación
- `popover.tsx` - Necesita verificación
- Otros componentes UI de Radix que puedan recibir props de Figma

### 2. Pantalla gris con ícono de imagen rota
**Estado:** ⚠️ REQUIERE INVESTIGACIÓN
- **Síntoma:** Aparece pantalla gris con ícono de "broken image"
- **Posibles causas:**
  - Error en carga de imágenes `figma:asset`
  - Error de JavaScript que rompe el renderizado
  - Componente que lanza excepción
  - ImageWithFallback mostrando placeholder

**Ubicaciones de imágenes figma:asset:**
- `LoginPage.tsx`: backgroundImage, fifomiLogo
- `MainLayout.tsx`: backgroundImage
- `Navbar.tsx`: logoFifomi
- `Sidebar.tsx`: backgroundImage

### 3. Menús desplegables (Select) no funcionan
**Estado:** ⚠️ REQUIERE INVESTIGACIÓN PROFUNDA
- **Síntoma:** Los dropdowns/selects no abren o no responden al click
- **Ubicación:** `RegistroSesionesForm.tsx`
- **Componentes afectados:**
  - Select para "Selecciona el Comité"
  - Select para "Tipo de Sesión"
  
**Posibles causas:**
1. Z-index conflictos (ya se especifica `z-[100]` en SelectContent)
2. Props de Figma interfiriendo con event handlers
3. JavaScript error que rompe interactividad
4. Portal de Radix no funcionando correctamente
5. CSS que bloquea eventos de click

### 4. Cambios recientes que pueden haber causado problemas
**Últimas modificaciones:**
1. Agregado `font-bold` a múltiples títulos h2 y h3
2. Modificado `tooltip.tsx` para filtrar props de Figma
3. No se modificó estructura de Select ni Dialog

## Archivos Críticos para Backup

### Componentes UI (shadcn/Radix)
```
/components/ui/select.tsx
/components/ui/tooltip.tsx
/components/ui/dialog.tsx
/components/ui/dropdown-menu.tsx
/components/ui/popover.tsx
/components/ui/button.tsx
/components/ui/input.tsx
/components/ui/custom-calendar.tsx
```

### Componentes de aplicación
```
/components/comites/RegistroSesionesForm.tsx
/components/comites/ModificarSesionDialog.tsx
/components/comites/ComiteSeccionCompleta.tsx
/components/Dashboard.tsx
/components/LoginPage.tsx
/components/Navbar.tsx
/components/Sidebar.tsx
```

### Datos
```
/data/comitesDataComplete.ts
/data/comitesData.ts
/data/mockData.ts
```

### Contexto y tipos
```
/context/AuthContext.tsx
/types/routes.ts
/types/index.ts
```

### Utilidades
```
/lib/utils.ts
/utils/exportUtils.ts
/utils/excelExport.ts
```

## Plan de Acción Propuesto

### Fase 1: Backup Completo
1. Documentar estado actual de todos los archivos críticos
2. No hacer ningún cambio hasta confirmar el backup

### Fase 2: Investigación de Root Cause
1. Revisar Console errors en browser
2. Verificar que Select component funcione en aislamiento
3. Revisar si hay conflictos de z-index
4. Verificar que los event handlers no estén bloqueados

### Fase 3: Correcciones Quirúrgicas
1. **Solo si es necesario:** Agregar filterFigmaProps a otros componentes UI
2. **Solo si se identifica:** Corregir problemas de z-index o positioning
3. **Probar cada cambio individualmente**

### Fase 4: Verificación
1. Verificar que todos los Select funcionan
2. Verificar que no hay pantallas grises
3. Verificar que no hay warnings de React
4. Verificar que nada se rompió

## Componentes que NO deben modificarse sin razón crítica
- `ModificarSesionDialog.tsx` (componente reutilizable)
- `CustomCalendar.tsx` (componente reutilizable)  
- `comitesDataComplete.ts` (datos completos trabajados)
- `ReferenciasNumeradas.tsx` (sistema de referencias)

## Notas Importantes
- El usuario ha indicado que esto le está costando mucho dinero
- Se ha retrabajado el mismo código 3 veces
- Los dropdowns funcionaban antes
- Necesitamos ser extremadamente cuidadosos
- Cada cambio debe ser probado antes de hacer el siguiente
