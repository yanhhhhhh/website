export function getVersion() {
  const version = import.meta.env.VITE_APP_VERSION;
  return {
    isPre: version === 'pre',
    isNext: version === 'next',
  };
}
