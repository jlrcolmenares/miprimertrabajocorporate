# Guía de Formato para Contenido de Módulos

Esta guía define los patrones visuales disponibles para dar formato al contenido del curso.

## Estructura de Archivos

Los módulos se encuentran en `src/data/moduleContent/module-X-Y.tsx` y exportan JSX que se renderiza dentro de un contenedor con clase `module-content`.

---

## Elementos de Texto Básicos

### Títulos

```tsx
<h2>Título de sección</h2>      // 1.5rem, bold, margen superior grande
<h3>Subtítulo</h3>              // 1.25rem, semibold
<h4>Sub-subtítulo</h4>          // Tamaño heredado, semibold
```

### Párrafos

```tsx
<p>Texto normal con espaciado automático.</p>
```

### Énfasis

```tsx
<strong>Texto en negrita</strong>   // Color oscuro #111827, peso 600
<em>Texto en cursiva</em>
```

**Cuándo usar negrita:**
- Nombres propios importantes (cursos, herramientas)
- Datos clave (años de experiencia, cifras)
- Frases que resumen una idea importante
- Metáforas o conceptos memorables

---

## Listas

### Lista con viñetas
```tsx
<ul>
  <li>Primer elemento</li>
  <li>Segundo elemento</li>
</ul>
```

### Lista numerada
```tsx
<ol>
  <li>Paso uno</li>
  <li>Paso dos</li>
</ol>
```

---

## Callout Boxes (Cajas Destacadas)

Usar con moderación: **máximo 1-2 por módulo** para no saturar visualmente.

### Azul - Información / Objetivo
Para: datos, objetivos del módulo, información neutral importante.

```tsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
  <p className="font-semibold text-blue-900 mb-2">Título del callout</p>
  <p className="text-blue-800 m-0">
    Contenido del callout aquí.
  </p>
</div>
```

### Amarillo - Importante / Atención
Para: advertencias, tips importantes, cosas que no olvidar.

```tsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
  <p className="font-semibold text-yellow-900 mb-2">Importante</p>
  <p className="text-yellow-800 m-0">
    Contenido del callout aquí.
  </p>
</div>
```

### Verde - Éxito / Siguiente Paso
Para: conclusiones positivas, transiciones, logros.

```tsx
<div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
  <p className="text-green-800 m-0">
    Contenido del callout aquí.
  </p>
</div>
```

### Rojo - Error / Evitar
Para: errores comunes, qué NO hacer, advertencias serias.

```tsx
<div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
  <p className="font-semibold text-red-900 mb-2">Evita esto</p>
  <p className="text-red-800 m-0">
    Contenido del callout aquí.
  </p>
</div>
```

---

## Callout sin Título

Para mensajes cortos que no necesitan encabezado:

```tsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
  <p className="text-blue-800 m-0">Mensaje corto aquí.</p>
</div>
```

---

## Citas / Blockquote

Para citas textuales o frases destacadas:

```tsx
<blockquote>
  "Una cita importante o frase memorable."
</blockquote>
```

Estilo automático: borde izquierdo, fondo gris claro, padding.

---

## Código

### Código inline
```tsx
<code>nombre_variable</code>
```

### Bloque de código
```tsx
<pre>
  <code>
    // Código aquí
  </code>
</pre>
```

---

## Enlaces

```tsx
<a href="https://ejemplo.com">Texto del enlace</a>
```

Estilo automático: color azul (#2563eb), subrayado.

---

## Espaciado Manual

Si necesitas ajustar espaciado:

```tsx
<div className="mt-8">Contenido con margen superior extra</div>
<div className="mb-4">Contenido con margen inferior</div>
<div className="my-6">Contenido con margen vertical</div>
```

---

## Resumen de Cuándo Usar Cada Elemento

| Necesidad | Elemento |
|-----------|----------|
| Destacar palabra/frase | `<strong>` |
| Sección nueva | `<h2>` o `<h3>` |
| Lista de items | `<ul>` o `<ol>` |
| Información clave (1 por página) | Callout azul |
| Advertencia importante | Callout amarillo |
| Conclusión/transición | Callout verde |
| Error común | Callout rojo |
| Cita textual | `<blockquote>` |

---

## Reglas de Uso

1. **Moderación**: No más de 2 callouts por módulo
2. **Jerarquía**: Usar `<strong>` antes de recurrir a callouts
3. **Consistencia**: Mismo color = mismo tipo de información en todo el curso
4. **Legibilidad**: Dejar respirar el texto, no saturar de formato
