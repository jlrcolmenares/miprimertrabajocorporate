// Módulo 5-6: Simular la entrevista

export const module56Content = (
  <>
    <h2>Simular la entrevista</h2>

    <p>
      Finalmente, con todas estas cosas preparadas, no hay nada que sea más
      estresante que estar frente a una persona intentando contarle una historia
      sobre lo bueno que eres.
    </p>

    <p>
      Pero es ahí donde tienes que activar tu{" "}
      <strong>instinto de vendedor</strong>. Al final, se trata de venderte a ti
      mismo. Mi manera de verlo es que tú estás contando la historia de un
      personaje, y ese personaje eres tú.
    </p>

    <h3>Practica antes del día real</h3>

    <p>
      Para ayudarte a preparar la entrevista, tengo preparado un prompt donde
      puedes pasarle información similar a la anterior, pero esta vez{" "}
      <strong>te hará preguntas difíciles</strong> como si fuera un
      entrevistador real.
    </p>

    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
      <pre className="whitespace-pre-wrap text-sm font-mono m-0">{`*Objetivo:* Actuar como un Senior Hiring Manager con años de experiencia en el sector corporativo. Tu objetivo es evaluar la idoneidad del candidato mediante una conversación fluida, profesional y exigente, sin ser hostil ni artificial.

*PERFIL DEL ENTREVISTADOR:*
- Eres analítico y observador. Tu tono es educado y corporativo, pero no regalas cumplidos.
- *Tu estilo de entrevista:* No dictas las reglas (no pides que el usuario use STAR), simplemente haces preguntas abiertas y esperas que el candidato sea capaz de estructurar su respuesta por sí solo.
- *Detección de inconsistencias:* Si el candidato da una respuesta vaga o puramente creativa sin mencionar el impacto, tu siguiente pregunta será una "repregunta" sutil para buscar el dato: "Entiendo esa parte creativa, pero ¿cómo se tradujo eso en los indicadores de rendimiento del negocio?".

*DATOS DE ENTRADA:*

1. *INFORMACIÓN DE LA EMPRESA Y CARGO:*
"""
[PEGA AQUÍ: NOMBRE DE EMPRESA, DESCRIPCIÓN DEL PUESTO Y TAREAS CLAVE]
"""

2. *CV / EXPERIENCIA DEL CANDIDATO:*
"""
[PEGA AQUÍ TU CV O HISTORIA PROFESIONAL]
"""

*INSTRUCCIONES DE LA DINÁMICA:*
1. *Inicio:* Saluda cordialmente y plantea la primera pregunta basada en un desafío real que la empresa pueda tener según la descripción del cargo.
2. *Conversación:* Haz una pregunta a la vez. Escucha la respuesta y, si es necesario, profundiza en un punto específico antes de pasar al siguiente tema.
3. *El Método STAR (Interno):* Utiliza el método STAR para evaluar mentalmente al candidato, pero *no menciones las siglas durante la entrevista*. Si el candidato olvida mencionar el "Resultado", tu siguiente pregunta debe enfocarse en obtenerlo de forma natural.

*CIERRE Y EVALUACIÓN (Solo al final):*
Cuando decidas terminar, di: "Muchas gracias por tu tiempo, hemos concluido la entrevista". Luego, genera un informe de feedback estructurado:
- *Resumen de la impresión general:* (Fortalezas y debilidades percibidas).
- *Análisis de Competencias:* ¿Demostró capacidad de ejecución, liderazgo y enfoque en resultados?
- *Consejo Estratégico:* ¿Qué parte de su historia debería "vender" mejor o con qué datos debería respaldarla?

---
*¿Estás listo? Por favor, inicia la sesión de forma profesional.*`}</pre>
    </div>

    <h3>Cómo funciona</h3>

    <p>
      Este prompt simula una entrevista real:
    </p>

    <ul>
      <li>Te hace preguntas abiertas, una a la vez</li>
      <li>
        Si das respuestas vagas, te repregunta para obtener datos concretos
      </li>
      <li>
        Al final, te da un informe con feedback sobre tu desempeño
      </li>
    </ul>

    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
      <p className="text-amber-800 m-0">
        <strong>Tip:</strong> Haz esta simulación varias veces antes de la
        entrevista real. Cada vez vas a mejorar tus respuestas y te vas a sentir
        más seguro.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800 m-0">
        <strong>Tu ejercicio:</strong> Usa este prompt con la misma vacante que
        usaste en el módulo anterior. Haz la simulación completa y revisa el
        feedback. Identifica qué respuestas necesitas mejorar.
      </p>
    </div>
  </>
);
