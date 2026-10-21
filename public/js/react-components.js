

// Componente React simple - Contador de turnos
function TurnosCounter() {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Cargar datos desde el servidor
    fetch('/api/turnos/count')
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setCount(0);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return React.createElement('div', {
      className: 'card text-center bg-secondary text-white'
    }, 
      React.createElement('div', { className: 'card-body' },
        React.createElement('div', { className: 'loading' }),
        React.createElement('p', { className: 'card-text mt-2' }, 'Cargando...'),
        React.createElement('i', { className: 'fas fa-calendar-check fa-2x' })
      )
    );
  }

  return React.createElement('div', {
    className: 'card text-center bg-primary text-white'
  }, 
    React.createElement('div', { className: 'card-body' },
      React.createElement('h2', { className: 'card-title' }, count),
      React.createElement('p', { className: 'card-text' }, 'Total de Turnos'),
      React.createElement('i', { className: 'fas fa-calendar-check fa-2x' })
    )
  );
}

// Inicializar componente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const counterContainer = document.getElementById('turnos-counter');
  if (counterContainer) {
    ReactDOM.render(React.createElement(TurnosCounter), counterContainer);
  }
}); 