function reconcile(cgData, cmcData) {
  const discrepancies = [];
  const fields = [
    ['price', 'price'],
    ['market_cap', 'market_cap'],
    ['volume_24h', 'volume_24h'],
  ];

  fields.forEach(([cgField, cmcField]) => {
    const cgVal = cgData[cgField];
    const cmcVal = cmcData[cmcField];
    if (typeof cgVal === 'number' && typeof cmcVal === 'number') {
      const avg = (cgVal + cmcVal) / 2;
      const diff = Math.abs(cgVal - cmcVal);
      if (avg > 0 && diff / avg > 0.05) {
        discrepancies.push({ field: cgField, cg: cgVal, cmc: cmcVal });
      }
    }
  });

  return discrepancies;
}

module.exports = { reconcile };
