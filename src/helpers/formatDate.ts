export const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
