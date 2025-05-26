import VitalsCard from '../../components/vitals-card';

async function getAssets() {
  const res = await fetch('https://example.com/assets').catch(() => ({ json: async () => [] }));
  return res.json();
}

export default async function LeaguePage() {
  const assets = await getAssets();
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
      {assets.map((asset: any) => (
        <VitalsCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
