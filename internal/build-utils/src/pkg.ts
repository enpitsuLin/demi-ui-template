export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', '__test__', 'dist', '.d.ts', '.config.ts'];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};
