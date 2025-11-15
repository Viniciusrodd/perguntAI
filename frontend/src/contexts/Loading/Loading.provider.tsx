
// import hooks
import { useState, type ReactNode } from "react";

// import loading context
import { LoadingContext } from './Loading.context';


// types
type LoadingPropsProvider = {
   children: ReactNode
};


// provider
export const LoadingProvider = ({ children }: LoadingPropsProvider) =>{
   // states
   const [ loading, setLoading ] = useState<boolean>(false);

   return (
      <LoadingContext.Provider value={{ loading, setLoading }}>
         { children }
      </LoadingContext.Provider>
   )
};