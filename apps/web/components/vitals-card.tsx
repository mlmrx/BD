'use client';
import Link from 'next/link';

export default function VitalsCard({ asset }: { asset: any }) {
  return (
    <Link
      href={`/${asset.id}`}
      className="border rounded p-2 flex flex-col hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <span className="font-semibold">{asset.name}</span>
      {/* TODO: show metrics */}
    </Link>
  );
}
