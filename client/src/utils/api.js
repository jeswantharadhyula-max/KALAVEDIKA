const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const token = localStorage.getItem('kv_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (data) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  // Public endpoints
  getMembers:      (params = {}) => request('/api/members?' + new URLSearchParams(params)),
  getEvents:       (params = {}) => request('/api/events?' + new URLSearchParams(params)),
  getActivities:   ()            => request('/api/activities'),
  getAchievements: ()            => request('/api/achievements'),
  getFounders:     ()            => request('/api/founders'),
  submitFeedback:  (data)        => request('/api/feedback', { method: 'POST', body: JSON.stringify(data) }),

  // Admin — feedback
  getFeedback: () => request('/api/feedback'),
  deleteFeedback: (id) => request(`/api/feedback/${id}`, { method: 'DELETE' }),

  // Admin — members
  createMember: (data) => {
    const token = localStorage.getItem('kv_token');
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v !== undefined && fd.append(k, v));
    return fetch(`${BASE}/api/members`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    }).then(r => r.json());
  },
  deleteMember: (id) => request(`/api/members/${id}`, { method: 'DELETE' }),

  // Admin — events
  createEvent: (data) => request('/api/events', { method: 'POST', body: JSON.stringify(data) }),
  deleteEvent: (id)   => request(`/api/events/${id}`, { method: 'DELETE' }),
};
