'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function EducateOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Cookies.get('educate-dismissed')) {
      setShow(true);
    }
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded">
        <p>Here is a metric explanation.</p>
        <button
          className="mt-2 border px-2 py-1"
          onClick={() => {
            Cookies.set('educate-dismissed', '1', { expires: 365 });
            setShow(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
