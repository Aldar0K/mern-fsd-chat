export const getToken = (): string | null => {
  const item = localStorage.getItem('token');
  return item ? JSON.parse(item) : null;
};
