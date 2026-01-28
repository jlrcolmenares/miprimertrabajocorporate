// Módulo 5-4: Tu guión de entrevista

export const module54Content = (
  <>
    <h2>Tu guión de entrevista</h2>

    <p>
      En este módulo vamos a integrar lo que hemos hablado en los módulos
      anteriores. La idea es que toda entrevista tiene que tener un{" "}
      <strong>guión en mente</strong>.
    </p>

    <p>
      Este guión no es algo estricto. Cada reclutador tendrá su estilo y sus
      técnicas para hacer las preguntas. Pero la idea es que en tu mente tengas
      algunas respuestas preparadas para las preguntas más difíciles, de modo
      que no te quedes sin responder.
    </p>

    <h3>Prompt para preparar tu guión STAR</h3>

    <p>
      Para ayudarte, he preparado un prompt que junta la información de tu
      historia personal (o de tu CV), el &quot;sobre nosotros&quot; de la
      empresa, y la descripción del cargo que estás buscando:
    </p>

    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
      <pre className="whitespace-pre-wrap text-sm font-mono m-0">{`**Objetivo:** Actuar como un Estratega de Narrativa de Entrevista. Tu misión es ayudar al candidato a preparar historias de éxito bajo el método STAR, adaptándolas al contexto específico de la industria y rescatando información valiosa que podría faltar en su CV.

**INSTRUCCIONES DE ENTRADA (DATOS):**
Por favor, analiza la siguiente información proporcionada en bloques multilínea:

1. **PERFIL DEL CANDIDATO (CV/Historia):**
"""
[PEGA AQUÍ TU CV O HISTORIA - NO IMPORTA EL LARGO O LOS SALTOS DE LÍNEA]
"""

2. **DESCRIPCIÓN DEL PUESTO (Cargo y Tareas):**
"""
[PEGA AQUÍ LA DESCRIPCIÓN DE LA VACANTE]
"""

3. **CONTEXTO DE LA EMPRESA (Sector y Valores):**
"""
[PEGA AQUÍ EL "SOBRE NOSOTROS" O EL SECTOR DE LA EMPRESA]
"""

---

**DINÁMICA DE TRABAJO (PROCESO EN 2 PASOS):**

### PASO 1: Diagnóstico de Contexto e Interrogatorio
Antes de generar cualquier guion, analiza los datos anteriores. Tu tarea es encontrar 3 puntos donde la historia del candidato necesite más "músculo" para este sector específico.
- Hazme **3 preguntas directas** para desenterrar detalles que no están en el texto (ej. métricas, gestión de crisis específicas del sector o uso de herramientas no mencionadas).
- Detén tu respuesta aquí y espera a que yo te conteste.

### PASO 2: Generación de Guiones STAR
Una vez reciba mis respuestas, generarás **5 guiones de respuesta** listos para ser usados en entrevista.
- Cada guion debe seguir la estructura: **Situación, Tarea, Acción (detallada) y Resultado (medible).**
- Adapta el lenguaje al tono de la empresa (ej. corporativo, técnico, cercano, etc.).

---
**¿Entendido? Por favor, comienza con el PASO 1: analizando la información y haciéndome las 3 preguntas de profundización.**`}</pre>
    </div>

    <h3>Cómo usar el prompt</h3>

    <ol>
      <li>Copia el prompt completo</li>
      <li>Reemplaza el primer bloque con tu CV o historia personal</li>
      <li>Reemplaza el segundo bloque con la descripción de la vacante</li>
      <li>
        Reemplaza el tercer bloque con el &quot;sobre nosotros&quot; de la
        empresa
      </li>
      <li>Pega todo en tu LLM favorito</li>
      <li>Responde las 3 preguntas que te haga</li>
      <li>Recibe tus 5 guiones STAR personalizados</li>
    </ol>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="text-blue-800 m-0">
        El prompt primero te hará preguntas para profundizar en tu historia.
        Esto es intencional: te ayuda a recordar detalles que podrías haber
        olvidado y que son valiosos para la entrevista.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800 m-0">
        <strong>Tu ejercicio:</strong> Usa este prompt con una de las vacantes a
        las que quieres aplicar. Guarda los guiones STAR que genere — los vas a
        necesitar para practicar.
      </p>
    </div>
  </>
);
