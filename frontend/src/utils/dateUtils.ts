export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isOverdue = (dueDate: string, status: string): boolean => {
  return new Date(dueDate) < new Date() && status !== 'completed';
};