import { useCallback, useEffect, useState } from "react";


export const useFetch = (
  fetchFunction,
  options = {}
) => {
  const {
    immediate = true,
    initialData = [],
  } = options;

  const [data, setData] =
    useState(initialData);

  const [loading, setLoading] =
    useState(immediate);

  const [error, setError] =
    useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        const result =
          await fetchFunction(...args);

        setData(result);

        return result;
      } catch (err) {
        const message =
          err?.message ||
          "Something went wrong.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (!immediate) {
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);

        const result =
          await fetchFunction();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.message ||
              "Something went wrong."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
    setData,
  };
};

export default useFetch;
