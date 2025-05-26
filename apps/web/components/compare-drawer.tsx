'use client';
import { useState } from 'react';

export default function CompareDrawer({ base }: { base: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="border px-2 py-1 rounded">
        Compare
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <p>Compare {base} to ...</p>
            {/* TODO: radar chart */}
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
