// Módulo 6-2: Estrategia pasiva

export const module62Content = (
  <>
    <h2>Estrategia pasiva</h2>

    <p>
      El siguiente proceso es una <strong>estrategia pasiva</strong>. Es decir,
      en lugar de ir tú hacia las oportunidades, haces que las oportunidades
      vengan a ti.
    </p>

    <p>
      Esto se trata de <strong>actualizar tu perfil en los portales</strong>{" "}
      para que seas ubicable. Que cuando un reclutador busque candidatos con
      ciertas habilidades, tu perfil aparezca.
    </p>

    <h3>Mi estrategia con LinkedIn</h3>

    <p>
      Mi estrategia con LinkedIn es poner{" "}
      <strong>TODO lo que has hecho de forma organizada</strong>. Poner todas
      las palabras clave. No te guardes nada.
    </p>

    <p>
      A diferencia del CV (que debe ser customizado y breve), tu perfil de
      LinkedIn puede ser exhaustivo. Es tu escaparate profesional completo.
    </p>

    <h3>Prompt para optimizar tu LinkedIn</h3>

    <p>
      He preparado un prompt para ayudarte a transformar tu historia en un
      perfil de LinkedIn optimizado:
    </p>

    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
      <pre className="whitespace-pre-wrap text-sm font-mono m-0">{`*Objetivo:* Transformar mi historia personal y profesional en un perfil de LinkedIn altamente técnico y directo, optimizado para la indexación por roles específicos.

*DATOS DE ENTRADA:*

1. *MI HISTORIA PERSONAL Y PROFESIONAL:*
"""
[PEGA AQUÍ TU HISTORIA COMPLETA]
"""

2. *ROLES OBJETIVO (Mínimo dos):*
"""
[EJEMPLO: Data Engineer / Software Engineer]
"""

*INSTRUCCIONES DE ESTRUCTURA Y TONO:*

1. *Headline (Titular):* Genera un titular profesional que correlacione directamente los roles objetivo con mis competencias principales. Evita adjetivos vacíos (ej. "motivado", "apasionado"); usa nombres de cargos y áreas de especialidad.

2. *About (Extracto - Máx. 350 caracteres):* Redacta un resumen en primera persona que sea breve y directo.
    - *Enfoque:* Qué estoy buscando actualmente y por qué mi combinación de habilidades me hace excelente en ello.
    - *Restricción:* No repitas la lista de empleos, enfócate en la propuesta de valor actual.

3. *Experiencia Profesional (Estructura Simple):*
    - Orden cronológico inverso.
    - *Títulos:* Ajusta los nombres de cargos previos para que sean reconocibles en el sector de los roles objetivo.
    - *Fechas:* Si no se proporcionan, inventa fechas coherentes (mes/año).
    - *Contenido por cada puesto:*
        - Una frase corta de contexto.
        - Listado de *tareas específicas* realizadas.
        - Sección de *"Herramientas y Tecnologías"* con nombres propios (ej. Python, SQL, AWS, Excel avanzado).

4. *Skills (Habilidades):* Una lista técnica de las 10 competencias más fuertes detectadas que coincidan con los roles objetivo.

*FORMATO DE SALIDA:*
Entrega el texto limpio, estructurado por secciones, listo para copiar y editar.

---
*¿Estás listo? Por favor, procesa la información en español.*`}</pre>
    </div>

    <h3>Cómo funciona la indexación</h3>

    <p>
      LinkedIn funciona como un buscador. Los reclutadores escriben palabras
      clave y LinkedIn les muestra perfiles que coinciden. Si tus palabras clave
      están en tu perfil, apareces. Si no, no existes.
    </p>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="text-blue-800 m-0">
        Por eso es importante incluir los nombres de herramientas, tecnologías,
        metodologías y cargos específicos. No basta con decir &quot;sé de
        finanzas&quot;. Tienes que decir &quot;Excel avanzado, Power BI, SAP,
        análisis financiero, forecasting&quot;.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800 m-0">
        <strong>Tu ejercicio:</strong> Usa el prompt con tu historia personal y
        los roles que te interesan. Actualiza tu perfil de LinkedIn con el
        resultado. Asegúrate de que todas las palabras clave relevantes estén
        incluidas.
      </p>
    </div>
  </>
);
