'use client';
import { useState } from 'react';

export default function AskPage() {
  const [question, setQuestion] = useState('Which coin has lowest inflation?');
  const [answer, setAnswer] = useState('');

  async function submit() {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(`${data.answer}${data.source ? ` (source: ${data.source})` : ''}`);
  }

  return (
    <div className="p-4 space-y-2">
      <textarea
        className="w-full border p-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="border px-2 py-1" onClick={submit}>
        Ask
      </button>
      {answer && <div className="border p-2">{answer}</div>}
    </div>
  );
}
