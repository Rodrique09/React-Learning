import { useEffect, useRef } from 'react';


export function useAutoScroll(dependencies = []){
        const containerRef = useRef(null);
        const depsKey = JSON.stringify(dependencies);

        useEffect(() => {
            const containerElem = containerRef.current;
            if(containerElem){
                containerElem.scrollTop = containerElem.scrollHeight;
            }
        }, [depsKey]);

        return containerRef;
      }