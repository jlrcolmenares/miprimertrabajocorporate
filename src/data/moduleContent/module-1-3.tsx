// Módulo 1-3: Un abanico de oportunidades

export const module13Content = (
  <>
    <h2>Un abanico de oportunidades</h2>

    <p>
      Al principio de este módulo, hablamos de la empleabilidad, y de que
      conseguir trabajo es tener habilidades para resolver problemas de otras
      personas.
    </p>

    <p>
      Al crear el taller, el perfil que tenía en mente es alguien que ha hecho
      muchas cosas pero que no sabe cómo encajarlas en un puesto real, que pueda
      conseguir en el mercado.
    </p>

    <p>
      Gran parte de nuestra identidad profesional está en la historia que nos
      contamos a nosotros mismos. Sobre eso hablaremos en la siguiente sección
      del curso. Pero en este punto quiero que veas algunas de las oportunidades
      que tienes frente a ti.
    </p>

    <h3>Descubre tus posibilidades</h3>

    <p>
      Vamos a utilizar el siguiente prompt para que un LLM analice tu historia y
      te sugiera puestos corporativos compatibles con tu perfil:
    </p>

    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm my-6">
      <code>{`**Objetivo:** Actuar como un Consultor de Empleabilidad experto para identificar puestos corporativos compatibles con el perfil del usuario, analizando sus capacidades actuales y señalando los retos para acceder a ellos.

**Instrucciones:**
- Comienza con una checklist concisa (3-5 puntos) que resuma tu proceso de análisis antes de entregar los resultados.

1. Analiza la narrativa personal y profesional suministrada para extraer habilidades técnicas (aptitudes), rasgos de personalidad (actitudes) y áreas de experticia.
2. Identifica entre 5 y 8 roles corporativos que encajen con este perfil.
3. Para cada rol, proporciona el título en español e inglés.
4. Detalla qué aptitudes y actitudes del usuario lo hacen apto para el puesto.
5. Identifica de forma crítica las "Barreras de Entrada" (qué conocimientos, herramientas o certificaciones le faltan actualmente para ser un candidato ideal).

---

**[PEGA AQUÍ TU HISTORIA PERSONAL Y PROFESIONAL COMPLETA]**

---

## Formato de Salida (Informe de Consultoría)

Si la historia está incompleta, indica: "No se pudo generar el análisis porque la historia profesional es insuficiente."

Si la información es suficiente, presenta el análisis siguiendo esta estructura para cada puesto:

### [Título en Español] / [Job Title in English]
- **Por qué encajas (Aptitudes y Actitudes):** Explica brevemente qué capacidades de tu historia validan que puedes hacer este trabajo.
- **Barreras de Entrada:** Enumera qué requisitos técnicos, formación específica o experiencia sectorial podrías no tener todavía y que el mercado suele exigir para este cargo.

---

Al final del listado, añade una breve conclusión de 2 líneas sobre cuál es el "sector" donde el usuario tiene más oportunidades de éxito inmediato.`}</code>
    </pre>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="font-semibold text-blue-900 mb-2">Recuerda</p>
      <p className="text-blue-800 m-0">
        Como te adelanté al inicio del taller, las tareas son importantes porque
        de una se irá alimentando la otra. Copia el texto de tu historia
        personal (de la tarea anterior) y pégalo en el prompt para obtener tu
        análisis personalizado.
      </p>
    </div>

    <h3>Cierre de la sección</h3>

    <p>
      Has llegado al final de la primera sección del curso. Tómate un momento
      para reconocer lo que has logrado: has documentado tu historia, has
      reflexionado sobre tus capacidades, y ahora tienes un mapa de
      oportunidades que quizás ni sabías que existían.
    </p>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800 m-0">
        <strong>El mercado laboral no busca personas perfectas</strong>, busca
        personas que sepan resolver problemas. Y tú ya tienes más herramientas
        de las que crees. Lo que viene ahora es aprender a contarlo de manera
        que otros lo vean también.
      </p>
    </div>

    <p>
      En la siguiente sección trabajaremos en cómo presentarte al mundo: tu CV,
      tu LinkedIn, y la narrativa que te abrirá puertas.{" "}
      <strong>Nos vemos ahí.</strong>
    </p>
  </>
);
