import { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';


export const useIntersectionObserver = (
    ref: RefObject<Element>,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
): void => {
    useEffect(() => {
        const node = ref.current;
        const observer = new IntersectionObserver(callback, options)
        if (node) observer.observe(node)

        return (): void => {
            if (node) observer.disconnect()
        }
        // TODO (cb): options.root is changing on re-render, so is callback
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]) 
}