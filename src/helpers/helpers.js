export function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return '#ff0000';
    case 'medium':
      return '#ff9100';
    default:
      return '#0000ff';
  }
}

export const hex2rgba = (hex, alpha = 1) => {
  if (!hex) return;
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export function getStatusColor(status) {
  switch (status) {
    case 'overdue':
      return '#ff0000';
    case 'completed':
      return '#00ff00';
    case 'pending':
      return '#b100f8';
    default:
      return;
  }
}
