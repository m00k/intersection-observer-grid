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
            console.log('###########', 'unobserve', node)
            if (node) observer.disconnect()
        }
    }, [ref, callback, options])
}