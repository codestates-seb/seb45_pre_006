export default function getTimeAgoText(timestamp) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else if (diffInMinutes < 7 * 24 * 60) {
    const days = Math.floor(diffInMinutes / (24 * 60));
    return `${days} days ago`;
  } else if (diffInMinutes < 30 * 24 * 60) {
    const weeks = Math.floor(diffInMinutes / (7 * 24 * 60));
    return `${weeks} weeks ago`;
  } else if (diffInMinutes < 365 * 24 * 60) {
    const months = Math.floor(diffInMinutes / (30 * 24 * 60));
    return `${months} months ago`;
  } else {
    const years = Math.floor(diffInMinutes / (365 * 24 * 60));
    const months = Math.floor((diffInMinutes % (365 * 24 * 60)) / (30 * 24 * 60));
    return months ? `${years} years, ${months} months ago` : `${years} years ago`;
  }
}
