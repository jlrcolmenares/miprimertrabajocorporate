// Módulo 1-1: Tu historia personal y laboral

export const module11Content = (
  <>
    <h2>Tu historia personal y laboral</h2>

    <p>
      Nos pasa muchas veces que olvidamos que somos más que una profesión o lo
      último que hemos hecho. Es decir, el hecho de que me haya graduado de
      contabilidad no significa que solamente sea un contador. Quizás tienes un
      talento para las personas, o sabes cómo escribir.
    </p>

    <p>
      El punto es que las credenciales y las capacidades son cosas distintas,
      que no siempre tienen que ir de la mano. Queremos que los médicos tengan
      las credenciales para sanarnos y curarnos, y en general no los dejamos
      ejercer hasta que no han pasado cierto nivel de competencia, pero las
      credenciales no validan que no pueda haber malas praxis. ¿Me sigues?
    </p>

    <h3>Quiero saber de ti</h3>

    <p>
      Entonces, sabiendo que eres una persona multipotencial, que seguro ha
      estudiado y ha hecho muchas cosas, quiero que escribas sobre tu historia.
      Quiero que cuentes en lo que has trabajado y lo que has hecho.
    </p>

    <p>
      Te recomiendo hacerlo de forma temporal, siguiendo el orden cronológico de
      tu vida. Esto te ayudará a recordar mejor y a ver tu evolución.
    </p>

    <h4>1. Primeras experiencias</h4>
    <p>
      Usualmente empezamos ayudando a familiares en el trabajo: tíos, padres,
      conocidos. Son cosas que sabes porque las viste hacer a otros.{" "}
      <strong>Empieza escribiendo eso.</strong>
    </p>

    <h4>2. Proyectos académicos</h4>
    <p>
      Luego escribe sobre pequeños proyectos que hiciste en la universidad o en
      tu carrera. Trata de que sean cosas que disfrutaste, que recuerdes y
      digas: <em>&quot;esto estuvo bien&quot;</em>.
    </p>

    <h4>3. Experiencia laboral formal</h4>
    <p>
      Finalmente, entra en lo que la mayoría de la gente piensa que es &quot;la
      experiencia laboral&quot;. Es decir, todas aquellas labores o
      emprendimientos que has tenido. Lo que has hecho, los productos que has
      vendido y las cosas que has tenido que aprender.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="font-semibold text-blue-900 mb-2">Recomendación práctica</p>
      <p className="text-blue-800 m-0">
        Hazlo en un <strong>Google Doc</strong> y a través de{" "}
        <strong>varios días</strong>. Al menos un par de días. Esto te permite
        ir recordando cosas que de otra forma olvidarías.
      </p>
    </div>

    <h3>Ahora vamos con AI</h3>

    <p>
      Una vez tengas la primera versión del texto en Google Docs, vamos a
      intentar completarla y mejorarla utilizando el siguiente prompt en un
      chat:
    </p>

    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm my-6">
      <code>{`**Objetivo:** Actuar como un Biógrafo Personal encargado de documentar mi historia profesional con precisión. Tu labor es analizar mi narrativa para encontrar vacíos técnicos, entender la lógica detrás de mis cambios de empleo y capturar mi estado mental actual.

**INSTRUCCIONES DE ANÁLISIS:**

Analiza el texto proporcionado centrándote en estos tres pilares:

### Bloque 1: El Inventario Técnico (Vacíos de Información)
Identifica áreas donde la historia es vaga en cuanto a ejecución. Formula 3 o 4 preguntas para extraer:
- Herramientas, software o metodologías específicas utilizadas.
- Datos cuantificables (volúmenes, presupuestos, porcentajes o tiempos).

### Bloque 2: La Lógica de las Transiciones (Motivación vs. Oportunidad)
Analiza los momentos en los que cambié de un trabajo a otro. Formula preguntas para entender la naturaleza de esos saltos:
- En los cambios clave: ¿Hubo un objetivo claro o una motivación específica (aprender algo nuevo, cambiar de sector, etc.)?
- ¿O fue una decisión oportunista impulsada principalmente por una mejor oferta económica o circunstancias externas?

### Bloque 3: El Momento Presente (El "Por qué ahora")
Explora mi situación actual para dar sentido al capítulo que quiero escribir:
- ¿Qué tienes en mente para tu próximo paso? ¿Qué tipo de entorno o retos estás considerando?
- ¿Qué ha pasado en este momento de tu vida que te ha llevado a buscar ayuda para profesionalizar tu perfil ahora y no hace un año?

---

**ENTRADA (HISTORIA ACTUAL):**
"""
[PEGA AQUÍ TU HISTORIA PERSONAL/PROFESIONAL]
"""

**Instrucción de Salida:**
Por favor, genera estas preguntas de forma directa y profesional en español. Tu objetivo es que mis respuestas te den la materia prima más honesta y completa posible.`}</code>
    </pre>

    <p>
      Como ves, tienes que pegar tu historia personal donde dice{" "}
      <code>[PEGA AQUÍ TU HISTORIA PERSONAL/PROFESIONAL]</code> y continuar con
      la conversación hasta que el LLM haya completado todas sus preguntas.
    </p>

    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
      <p className="text-yellow-800 m-0">
        El prompt que he preparado te hará las preguntas que yo te haría en una
        sesión personalizada y que en general permiten conocer gran parte de los
        detalles de tu historia profesional.
      </p>
    </div>
  </>
);
