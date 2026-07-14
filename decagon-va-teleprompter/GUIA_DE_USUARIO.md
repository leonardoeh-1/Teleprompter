# Guía de usuario — Decagon VA Teleprompter

Esta guía explica cómo usar la aplicación durante una sesión de grabación con actores de voz. La app **no graba audio**: es un teleprompter y una biblioteca de guiones que muestra las frases en pantalla y te permite gestionarlas.

---

## 1. Conceptos clave (léelo una vez)

La app maneja **dos idiomas distintos e independientes**:

- **Idioma de la aplicación (sistema):** el idioma de la *interfaz* (botones, menús). Español, English o Deutsch. Sirve para que cada ingeniero trabaje en su idioma. **No cambia los guiones.**
- **Idioma y región de los guiones:** el idioma + país del *contenido* que lee el actor (es-ES, es-MX, es-419, es-AR, en-US, de-DE, ca-ES…). Define el acento y las variantes. **No cambia la interfaz.**

Y separa dos tipos de contenido:

- **Instrucciones del sistema:** el *briefing* para el actor (ritmo, cómo leer, qué evitar). Se editan aparte y son independientes de la región.
- **Secciones para grabar:** los guiones y frases reales, agrupados en secciones, propios de cada región.

---

## 2. Pantalla de bienvenida

Al abrir la app verás:

1. **Idioma de la aplicación** — selector vertical (Español / English / Deutsch). Elige el tuyo.
2. **Idioma y región de los guiones** — elige la variante que leerá el actor (p. ej. 🇲🇽 Español · México).
3. **Entrar a la biblioteca** — abre la consola de la sesión.
4. **Importar JSON** — si ya tienes un set de guiones preparado, puedes cargarlo directo.

Puedes cambiar ambos idiomas en cualquier momento desde la barra superior; no hace falta volver aquí.

---

## 3. Barra superior (siempre visible)

- **Logo Decagon** → vuelve a la pantalla de bienvenida.
- **Selector "Sistema"** (icono de letras) → cambia el idioma de la interfaz.
- **Selector de región** (icono de globo) → cambia el idioma/país de los guiones. Al cambiar de región se carga **otra biblioteca de secciones**.
- **Botón de inicio** (icono de casa) → vuelve a la bienvenida.
- Dentro del teleprompter, la flecha **← Biblioteca** vuelve a la lista de secciones.

---

## 4. La biblioteca (consola de la sesión)

Aquí gestionas todo el contenido de la región activa.

### Tarjeta "Instrucciones del sistema"
Arriba del todo. Es independiente de las secciones de grabación y de la región.
- **Leer** — abre las instrucciones en modo lectura (con control de tamaño).
- **Editar** — modifica el texto del briefing.

### Encabezado de región
Muestra la región activa (p. ej. *Secciones para grabar · 🇪🇸 Español · España*) y cuántas secciones hay.

### Lista de secciones
Cada tarjeta es una sección. Tipos:
- **Frases** — líneas cortas, con emoción opcional.
- **Guiones** — textos largos para lectura continua.

Acciones por sección:
- **▶ (play)** o **Abrir teleprompter** — abre la sección para leerla.
- **Desplegar** — muestra los elementos de la sección.
- **Gestionar** (lápiz) — edita nombre, tipo e indicación de la sección.
- **Eliminar** (papelera) — borra la sección (pide confirmación).
- **Añadir elemento** — crea una frase o guion nuevo.

Acciones globales (arriba a la derecha):
- **Importar JSON** — carga guiones desde archivo o pegando texto.
- **Exportar JSON** — descarga la biblioteca de la región actual.
- **Nueva sección** — crea una sección desde cero.

---

## 5. El teleprompter (pantalla de lectura)

Al abrir una sección:

- **Texto grande y centrado.** Si el elemento tiene emoción, aparece arriba a la derecha el **emoji + nombre** de la emoción.
- **Selector de secciones** (arriba a la izquierda) — salta a otra sección sin volver a la biblioteca.
- **A− / A+** — ajusta el tamaño del texto (útil en sesiones largas).
- **Autoscroll** — solo en guiones largos; desplaza el texto automáticamente. Se detiene al llegar al final o al pulsarlo de nuevo.
- **Lápiz (editar)** — edita el elemento actual sin salir.
- **Anterior / Siguiente** — navega entre elementos. En frases hay puntos de progreso clicables.
- **Marcar cubierto** — marca el elemento como ya grabado/cubierto. El progreso (x/total) se ve en la barra superior. Sirve para saltar por secciones según el tiempo disponible.

---

## 6. Crear y editar contenido

### Añadir/editar un elemento
Campos:
- **Título** (opcional) — para identificar la toma.
- **Texto** — el contenido a leer.
- **Emoción** (opcional) — texto libre (p. ej. *Entusiasta*, *Enthusiastic*, *Begeistert*). El emoji se asigna solo.

### Añadir/editar una sección
Campos:
- **Nombre**.
- **Tipo** — Frases o Guiones.
- **Indicación** (opcional) — una nota de contexto que se muestra bajo el título.

Los cambios viven en memoria durante la sesión. Para conservarlos, usa **Exportar JSON**.

---

## 7. Importar y exportar (JSON)

### Exportar
Biblioteca → **Exportar JSON**. Descarga un archivo `decagon-scripts-<región>.json` con todas las secciones de la región activa. Guárdalo o versiónalo en el repositorio (`data/`).

### Importar
Biblioteca → **Importar JSON**:
1. **Elegir archivo** (.json) o **pegar** el contenido.
2. Elegir modo:
   - **Reemplazar biblioteca** — sustituye las secciones de la región actual.
   - **Añadir a la biblioteca** — las agrega a lo que ya hay.
3. **Importar**.

También puedes **Descargar plantilla** para ver el formato exacto.

### Formato mínimo
```json
{
  "sections": [
    { "title": "Frases", "kind": "phrases",
      "items": [ { "text": "Hola, ¿en qué puedo ayudarle?", "emotion": "Amigable" } ] },
    { "title": "Guion", "kind": "scripts",
      "items": [ { "title": "Escenario 1", "text": "Gracias por llamar..." } ] }
  ]
}
```

---

## 8. Idiomas y variantes de acento

- **Español:** `es-ES` trae el corpus completo. `es-MX`, `es-419` y `es-AR` se generan a partir de es-ES adaptando **modismos y variables**: moneda (€→$, euros→pesos/dólares, céntimos→centavos), léxico (móvil→celular, coche→auto/carro, ordenador→computadora…) y marcas (Glovo→Rappi, Iberia→Aeroméxico/LATAM…).
- **Inglés, Alemán, Catalán:** traen una **guía núcleo completa** por tipo de sección. Puedes ampliarlas importando más guiones por JSON.
- **Catalán:** viene precargado y además tienes el archivo `data/decagon-scripts-ca-ES.json` para importarlo o compartirlo.

### Añadir una región nueva
Si necesitas otra región (p. ej. pt-BR), edita `SCRIPT_LOCALES` en `src/App.jsx` y luego carga su JSON desde la app.

---

## 9. Consejos para la sesión

- Antes de empezar, revisa **Instrucciones del sistema** con el actor.
- Ajusta el **tamaño de texto** a la distancia de lectura del actor.
- Usa **Marcar cubierto** para no repetir y para saber qué falta si vas saltando por tiempo.
- Al terminar (o durante), **Exporta el JSON** para no perder ediciones.
- Cambiar de **región** cambia el set completo de secciones; si estabas en el teleprompter, te devuelve a la biblioteca.

---

¿Dudas o mejoras? Abre un *issue* en el repositorio.
