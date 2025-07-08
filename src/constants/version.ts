export function getVersion() {
  const a = 3;
  const b = 9;
  const versions = [];
  for (let i = 1; i <= a; i++) {
    for (let j = 0; j <= b; j++) {
      versions.push({
        label: `v${i}.${j}`,
        value: `v${i}.${j}`,
      });
    }
  }

  return versions;
}

export const version = getVersion();
