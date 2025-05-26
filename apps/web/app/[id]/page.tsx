import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const PriceChart = dynamic(() => import('../../components/price-chart'), { ssr: false });
const CompareDrawer = dynamic(() => import('../../components/compare-drawer'), { ssr: false });

async function getAsset(id: string) {
  const res = await fetch(`https://example.com/assets/${id}`).catch(() => null);
  if (!res || !res.ok) return null;
  return res.json();
}

export default async function AssetDetail({ params }: { params: { id: string } }) {
  const asset = await getAsset(params.id);
  if (!asset) return notFound();
  return (
    <div className="p-4 space-y-4">
      <div className="border p-4 rounded">
        <PriceChart id={asset.id} />
      </div>
      <CompareDrawer base={asset.id} />
    </div>
  );
}
