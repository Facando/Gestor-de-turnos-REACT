const API_BASE = '/api';

// --- Turnos ---

export async function getTurnos() {
  const res = await fetch(`${API_BASE}/turnos`);
  if (!res.ok) throw new Error('Error al obtener turnos');
  return res.json();
}

export async function getTurnosCount() {
  const res = await fetch(`${API_BASE}/turnos/count`);
  if (!res.ok) throw new Error('Error al obtener contador');
  return res.json();
}

export async function getTurno(id) {
  const res = await fetch(`${API_BASE}/turnos/${id}`);
  if (!res.ok) throw new Error('Error al obtener turno');
  return res.json();
}

export async function createTurno(data) {
  const res = await fetch(`${API_BASE}/turnos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Error al crear turno');
  return json;
}

export async function updateTurno(id, data) {
  const res = await fetch(`${API_BASE}/turnos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Error al actualizar turno');
  return json;
}

export async function deleteTurno(id) {
  const res = await fetch(`${API_BASE}/turnos/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Error al eliminar turno');
  return json;
}

// --- Contacto ---

export async function sendContacto(data) {
  const res = await fetch(`${API_BASE}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Error al enviar mensaje');
  return json;
}
