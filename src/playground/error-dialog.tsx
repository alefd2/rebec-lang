import { useEffect, useState } from 'react';
import { Parser } from '../language/parser';

export const ErrorDialog = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeParser = async () => {
      try {
        await new Parser().performSelfAnalysis();
        setError(null);
      } catch (err) {
        setError(err as Error);
      }
    };

    initializeParser();
  }, []);

  if (!error) return null;

  return (
    <div className="flex justify-center items-center z-50 absolute inset-0 bg-red-500/10 backdrop-blur-sm text-white">
      <pre>{error.message}</pre>
    </div>
  );
};
