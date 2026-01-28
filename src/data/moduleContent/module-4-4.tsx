// Módulo 4-4: Estructurar tu historia

export const module44Content = (
  <>
    <h2>Estructurar tu historia</h2>

    <p>
      Ya tienes tu historia personal escrita (módulo 1.1), ya identificaste tu
      línea conductora (módulo anterior), y ya sabes qué posiciones te
      interesan. Ahora toca darle forma a todo eso.
    </p>

    <h3>El problema de la historia en bruto</h3>

    <p>
      Cuando escribiste tu historia personal, probablemente lo hiciste de forma
      cronológica y exhaustiva. Eso está bien como ejercicio de autoconocimiento,
      pero no es la mejor forma de presentarte en un CV o una entrevista.
    </p>

    <p>
      La historia en bruto necesita ser{" "}
      <strong>estructurada y editada</strong> para que:
    </p>

    <ul>
      <li>Resalte lo más relevante para la posición que buscas</li>
      <li>Tenga una narrativa clara (tu línea conductora)</li>
      <li>Sea interesante y memorable</li>
      <li>Se pueda contar en diferentes formatos (CV, elevator pitch, entrevista)</li>
    </ul>

    <h3>Usando AI para estructurar</h3>

    <p>
      Para ayudarte con esto, he preparado un prompt que toma el resultado de lo
      que escribiste en el módulo 1.1 (tu historia personal) y te ayuda a
      estructurarlo de forma que aporte más valor y la haga más interesante.
    </p>

    <p>
      Este prompt utiliza el concepto de{" "}
      <strong>&quot;crecimiento en espiral&quot;</strong> que mencionamos en el
      módulo anterior: cada experiencia se presenta como una evolución natural
      de la anterior, mostrando cómo has ido creciendo en complejidad y
      responsabilidad sobre tu eje de maestría.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="text-blue-800 font-semibold mb-2">
        El prompt para estructurar tu historia:
      </p>
    </div>

    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
      <pre className="whitespace-pre-wrap text-sm font-mono m-0">{`*Objetivo:* Generar un borrador de CV de alto impacto que fusione mi historia personal con una vacante específica, utilizando una narrativa de "crecimiento en espiral" y terminología corporativa.

*CONTEXTO PARA EL ANÁLISIS:*
Utilizarás los dos bloques de texto multilínea proporcionados al final para:
1. *Identificar el "Eje de Maestría":* Encuentra el hilo conductor (ej. resolución de problemas, logística, atención al cliente) que atraviesa toda mi historia.
2. *Elevación de Roles (Rebranding):* Renombra mis cargos anteriores con títulos corporativos creativos y estratégicos que encajen en una estructura organizacional (ej. de "Mozo de almacén" a "Logistics Operations Associate").
3. *Escalamiento en Espiral:* Redacta cada experiencia de modo que la siguiente se sienta como una evolución en complejidad y responsabilidad sobre el mismo eje.

*INSTRUCCIONES DE FORMATO DE SALIDA:*

### 1. Perfil Profesional (Un sólo párrafo, dividido en 3 partes):
- *Parte A (Identidad):* Quién soy, formación académica y profesión principal.
- *Parte B (Valor):* Qué he hecho y qué domino específicamente en relación al cargo objetivo.
- *Parte C (Propósito):* Qué busco aportar, alineado directamente con la visión de la descripción del puesto.

### 2. Experiencia Profesional (Estructura en Espiral):
Para cada puesto (orden cronológico inverso):
- *Título Elevado | Empresa*
- Una frase resumen que defina el propósito estratégico del cargo.
- *Logros clave (Máximo 3):* Enfocados en resultados y beneficios para la empresa, no en tareas manuales.

### 3. Habilidades y Competencias (Skills):
- Una lista de *habilidades adicionales y transversales* (soft skills y herramientas) que complementen el perfil pero que no hayan sido detalladas en los logros.

---
*INPUTS (DATOS DE ENTRADA):*

*1. MI HISTORIA PERSONAL Y PROFESIONAL:*
"""
[PEGA AQUÍ TU TEXTO LARGO DE HISTORIA PERSONAL]
"""

*2. SOBRE EL CARGO (ABOUT THE ROLE / ABOUT YOU):*
"""
[PEGA AQUÍ EL TEXTO LARGO DE LA DESCRIPCIÓN DE LA VACANTE]
"""

*Instrucción Final:* Por favor, genera la respuesta íntegramente en español, manteniendo un tono profesional, ejecutivo y creativo.`}</pre>
    </div>

    <h3>Cómo usar el prompt</h3>

    <ol>
      <li>Copia el prompt completo de arriba</li>
      <li>
        Reemplaza el primer bloque con tu historia personal del módulo 1.1
      </li>
      <li>
        Reemplaza el segundo bloque con la descripción de la vacante a la que
        quieres aplicar
      </li>
      <li>Pega todo en tu LLM favorito (ChatGPT, Claude, etc.)</li>
    </ol>

    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
      <p className="text-amber-800 m-0">
        <strong>Importante:</strong> El resultado es un <strong>borrador</strong>
        . Revísalo, ajústalo con tu voz, y asegúrate de que todo sea verdad. La
        AI te ayuda a estructurar, pero tú eres quien conoce tu historia.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800 m-0">
        <strong>Tu ejercicio:</strong> Elige una de las ofertas de trabajo que
        guardaste en el módulo 3.3 y usa el prompt para generar tu primer
        borrador de CV. Luego repite el proceso para las otras posiciones que te
        interesan.
      </p>
    </div>
  </>
);
