// Module 2-2: Gestión del tiempo y productividad

export const module22Content = (
  <>
    <h1>Gestión del tiempo y productividad</h1>
    
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="font-semibold text-blue-900">💡 Objetivo del módulo</p>
      <p className="text-blue-800">Aprender técnicas para gestionar tu tiempo efectivamente y aumentar tu productividad.</p>
    </div>

    <h2>Principios de gestión del tiempo</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900">🎯 Priorización</h4>
        <p className="text-sm text-blue-800">
          No todo es urgente. Identifica lo verdaderamente importante
        </p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-green-900">📅 Planificación</h4>
        <p className="text-sm text-green-800">
          Planifica tu día, semana y mes. No dejes todo al azar
        </p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold text-purple-900">🚫 Eliminación</h4>
        <p className="text-sm text-purple-800">
          Elimina o delega tareas que no aportan valor
        </p>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-semibold text-orange-900">⚡ Enfoque</h4>
        <p className="text-sm text-orange-800">
          Concéntrate en una tarea a la vez. El multitasking es un mito
        </p>
      </div>
    </div>

    <h2>Matriz de Eisenhower</h2>
    
    <div className="bg-gray-50 p-6 rounded-lg my-6">
      <p className="font-semibold mb-4">Clasifica tus tareas en 4 cuadrantes:</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-100 p-4 rounded border-2 border-red-500">
          <h4 className="font-bold text-red-900">🔥 Urgente e Importante</h4>
          <p className="text-sm text-red-800">HAZ AHORA</p>
          <p className="text-xs text-red-700 mt-2">Crisis, deadlines, emergencias</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded border-2 border-blue-500">
          <h4 className="font-bold text-blue-900">📅 No Urgente pero Importante</h4>
          <p className="text-sm text-blue-800">PLANIFICA</p>
          <p className="text-xs text-blue-700 mt-2">Planificación, desarrollo, relaciones</p>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded border-2 border-yellow-500">
          <h4 className="font-bold text-yellow-900">⚡ Urgente pero No Importante</h4>
          <p className="text-sm text-yellow-800">DELEGA</p>
          <p className="text-xs text-yellow-700 mt-2">Interrupciones, algunas reuniones</p>
        </div>
        
        <div className="bg-gray-200 p-4 rounded border-2 border-gray-500">
          <h4 className="font-bold text-gray-900">🗑️ Ni Urgente ni Importante</h4>
          <p className="text-sm text-gray-800">ELIMINA</p>
          <p className="text-xs text-gray-700 mt-2">Distracciones, tiempo perdido</p>
        </div>
      </div>
    </div>

    <h2>Técnicas de productividad</h2>

    <h3>🍅 Técnica Pomodoro</h3>
    <div className="bg-red-50 p-4 rounded-lg my-4">
      <ol className="space-y-2">
        <li><strong>1.</strong> Elige una tarea</li>
        <li><strong>2.</strong> Trabaja 25 minutos sin interrupciones</li>
        <li><strong>3.</strong> Toma un descanso de 5 minutos</li>
        <li><strong>4.</strong> Repite 4 veces</li>
        <li><strong>5.</strong> Toma un descanso largo de 15-30 minutos</li>
      </ol>
    </div>

    <h3>📋 Time Blocking</h3>
    <ul>
      <li><strong>Bloques de tiempo:</strong> Asigna bloques específicos para tareas</li>
      <li><strong>Deep work:</strong> Reserva tiempo sin interrupciones para trabajo profundo</li>
      <li><strong>Batching:</strong> Agrupa tareas similares juntas</li>
      <li><strong>Buffer time:</strong> Deja espacios entre reuniones</li>
    </ul>

    <h3>✅ Método GTD (Getting Things Done)</h3>
    <div className="bg-gray-50 p-4 rounded-lg my-4">
      <ol className="space-y-2">
        <li><strong>Captura:</strong> Anota todo lo que tienes que hacer</li>
        <li><strong>Clarifica:</strong> ¿Qué es? ¿Es accionable?</li>
        <li><strong>Organiza:</strong> Categoriza y prioriza</li>
        <li><strong>Reflexiona:</strong> Revisa regularmente</li>
        <li><strong>Ejecuta:</strong> Haz las tareas</li>
      </ol>
    </div>

    <h2>Gestión de distracciones</h2>

    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
      <h4 className="text-yellow-900 font-semibold">⚠️ Ladrones de tiempo comunes</h4>
      <ul className="text-yellow-800">
        <li>📱 <strong>Redes sociales:</strong> Usa bloqueadores de sitios durante trabajo</li>
        <li>📧 <strong>Email constante:</strong> Revisa email en horarios específicos</li>
        <li>💬 <strong>Mensajes:</strong> Silencia notificaciones durante deep work</li>
        <li>🗣️ <strong>Interrupciones:</strong> Comunica cuando necesitas concentrarte</li>
        <li>🎯 <strong>Perfeccionismo:</strong> Hecho es mejor que perfecto</li>
      </ul>
    </div>

    <h2>Herramientas útiles</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900">📝 Gestión de tareas</h4>
        <ul className="text-sm text-blue-800">
          <li>• Todoist</li>
          <li>• Trello</li>
          <li>• Asana</li>
          <li>• Notion</li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-green-900">⏰ Tiempo</h4>
        <ul className="text-sm text-green-800">
          <li>• Toggl</li>
          <li>• RescueTime</li>
          <li>• Forest</li>
          <li>• Focus@Will</li>
        </ul>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-semibold text-purple-900">📅 Calendario</h4>
        <ul className="text-sm text-purple-800">
          <li>• Google Calendar</li>
          <li>• Outlook</li>
          <li>• Calendly</li>
          <li>• TimeBloc</li>
        </ul>
      </div>
    </div>

    <h2>Hábitos de productividad</h2>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
      <h3 className="text-green-900 font-semibold">✅ Rutinas diarias</h3>
      <div className="text-green-800">
        <p className="font-semibold mt-2">🌅 Mañana:</p>
        <ul>
          <li>Revisa tu agenda del día</li>
          <li>Identifica tus 3 tareas más importantes</li>
          <li>Haz la tarea más difícil primero</li>
        </ul>
        
        <p className="font-semibold mt-4">🌆 Tarde:</p>
        <ul>
          <li>Revisa lo completado</li>
          <li>Planifica el día siguiente</li>
          <li>Limpia tu espacio de trabajo</li>
        </ul>
      </div>
    </div>

    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
      <h4 className="text-red-900 font-semibold">🚫 Evita estos errores</h4>
      <ul className="text-red-800">
        <li>❌ Revisar email a primera hora</li>
        <li>❌ Decir sí a todo</li>
        <li>❌ No tomar descansos</li>
        <li>❌ Trabajar sin plan</li>
        <li>❌ No delegar cuando puedes</li>
      </ul>
    </div>

    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
      <p className="font-semibold text-blue-900">🎯 Conclusión</p>
      <p className="text-blue-800">
        La gestión del tiempo no se trata de hacer más cosas, sino de hacer las cosas correctas.
        Prioriza, planifica, elimina distracciones y mantén el enfoque. Con práctica, estos
        hábitos se volverán naturales y verás un gran aumento en tu productividad.
      </p>
    </div>
  </>
);
