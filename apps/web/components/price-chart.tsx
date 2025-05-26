'use client';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function PriceChart({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [{ data: [], type: 'line' }],
    });
    return () => chart.dispose();
  }, []);

  return <div ref={ref} className="h-40 w-full" />;
}
