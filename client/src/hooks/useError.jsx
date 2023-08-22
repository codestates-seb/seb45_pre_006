import { useState } from "react";

export default function useError(data) {
  const [error, setError] = useState(data);
  const errorHandler = (error) => setError(error);
  const clearError = () => setError(data);
  return [error, errorHandler, clearError];
}
