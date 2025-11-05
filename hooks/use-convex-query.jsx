import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery as useQuerry } from "convex/react";
import { toast } from "sonner";


export const useConvexQuery = (query,...args) => {
    
    const result = useQuerry(query , ...args);

    const [data,setData] = useState(undefined);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        if(result === undefined){
            setIsLoading(true);
        }else{
            try{
                setData(result);
                setError(null);
            } catch(err){                                                            
                setError(err);
                toast.error(err.message);
            } finally{
                setIsLoading(false);
            }
        }
    }, [result]);

    return {
        data,
        isLoading,
        error,
    };

};


export const useConvexMutation = (mutation) => {
  const mutationFn = useMutation(mutation);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mutationFn(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      toast.error(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};           