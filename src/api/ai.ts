export function aiChat(body: { prompt: string; sessionId: string | null }) {
  return fetch(
    `${import.meta.env.VITE_APP_BASE_API}/basic/ai/chatHttpChunked`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
}
