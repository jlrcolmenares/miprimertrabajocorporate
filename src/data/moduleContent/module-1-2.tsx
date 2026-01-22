// Módulo 1-2: Tu historia personal y laboral

export const module12Content = (
  <>
    <h2>Tu historia personal y laboral</h2>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="font-semibold text-blue-900">Objetivo de esta tarea</p>
      <p className="text-blue-800">
        Escribir en un archivo de texto o documento de Word todo lo que has hecho por lo cual has recibido dinero,
        y también aquello que te ha gustado hacer.
      </p>
    </div>

    <h3>Cómo hacerlo: Un recorrido temporal</h3>

    <p>
      Te recomiendo hacerlo de forma temporal, siguiendo el orden cronológico de tu vida.
      Esto te ayudará a recordar mejor y a ver tu evolución.
    </p>

    <h4>1. Primeras experiencias</h4>
    <p>
      Usualmente empezamos ayudando a familiares en el trabajo: tíos, padres, conocidos.
      Son cosas que sabes porque las viste hacer a otros. <strong>Empieza escribiendo eso.</strong>
    </p>

    <h4>2. Proyectos académicos</h4>
    <p>
      Luego escribe sobre pequeños proyectos que hiciste en la universidad o en tu carrera.
      Trata de que sean cosas que disfrutaste, que recuerdes y digas: <em>&quot;esto estuvo bien&quot;</em>.
    </p>

    <h4>3. Experiencia laboral formal</h4>
    <p>
      Finalmente, entra en lo que la mayoría de la gente piensa que es &quot;la experiencia laboral&quot;.
      Es decir, todas aquellas labores o emprendimientos que has tenido.
    </p>

    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
      <p className="font-semibold text-yellow-900">Importante: Sé lo más descriptiva posible</p>
      <ul className="text-yellow-800 mt-2 space-y-1">
        <li>• Cuenta lo que aprendiste</li>
        <li>• Las herramientas que utilizaste</li>
        <li>• Las metodologías que seguiste (si las hubo)</li>
        <li>• Es un volcado total de lo que has hecho</li>
      </ul>
    </div>

    <h3>Recomendación práctica</h3>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <p className="text-green-800">
        <strong>Hazlo en un Google Doc y a través de varios días.</strong> Al menos un par de días.
        Esto te permite ir recordando cosas que de otra forma olvidarías.
      </p>
      <p className="text-green-800 mt-2">
        Una vez que lo tengas todo completo, lo pasaremos a un LLM con un prompt
        específico que te daré más adelante para convertirlo en un perfil profesional estructurado.
      </p>
    </div>
  </>
);
