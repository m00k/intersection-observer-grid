import { RefCallback, RefObject } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

// https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js#L19
const SCROLL_TIME = 600; 

export type NavFC = HTMLElement & { scrollActiveNavItem: () => void }
type IndexChangedHandler = (index: number) => void;

const threshold = [0, 0.2, 0.4, 0.6, 0.8, 1];
const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    containerRef?: RefObject<Element>,
    pOptions?: Omit<IntersectionObserverInit, 'root'>,
): IntersectionObserver => {
    return useMemo(() => {
        const options = { ...pOptions, root: containerRef?.current }
        return new IntersectionObserver(callback, options)
    // NOTE: adding pOptions will re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, containerRef])
}

const calcIndexWithMaxIntersectionRatio = (intersectionEntries: Map<number, IntersectionObserverEntry>): number => {
    let resultValue: IntersectionObserverEntry | undefined;
    let resultKey = 0; // TODO: proper initialization
    intersectionEntries.forEach((entry, key) => {
        if (!resultValue) {
            resultValue = resultValue || entry
            resultKey = resultKey || key
        }
        if (entry.intersectionRatio === resultValue.intersectionRatio) {
            // highlight first item with ratio 1 in case there's multiple
            if (key < resultKey) {
                resultValue = entry
                resultKey = key
            }
        } else if (entry.intersectionRatio > resultValue.intersectionRatio) {
            resultValue = entry
            resultKey = key
        }
    })
    return resultKey as number;
}

type KeyAccessor<T> = (entry: IntersectionObserverEntry) => T
const keyAccessor: KeyAccessor<number> = e => parseInt((e.target as HTMLElement)?.dataset?.id || '0', 10)

export const useGridObserver = (
    containerRef: RefObject<HTMLElement>,
    headerRef: RefObject<NavFC>,
): [
    number,
    RefCallback<HTMLElement>,
    IndexChangedHandler,
] => {
    const [activeIndex, setActiveIndex] = useState(0)
    const observeBodyRef = useRef<boolean>(true)
    const bodyIntersectionsRef = useRef<Map<number, IntersectionObserverEntry>>(new Map())
    const navScrollDebounceRef = useRef<number>()

    const handleBodyIntersection: IntersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(e => bodyIntersectionsRef.current.set(keyAccessor(e), e))
        const nextActiveIndex = calcIndexWithMaxIntersectionRatio(bodyIntersectionsRef.current)
        if (observeBodyRef.current) {
            setActiveIndex(nextActiveIndex)
            window.clearTimeout(navScrollDebounceRef.current)
            navScrollDebounceRef.current = window.setTimeout(() => headerRef?.current?.scrollActiveNavItem(), 100)
        }
    }, []) // TODO

    const observer = useIntersectionObserver(
        handleBodyIntersection,
        containerRef,
        { threshold },
    );
    const bodySectionRefCallback: RefCallback<HTMLElement> = useCallback(r => (r && observer.observe(r)), [observer])

    const handleNavigation: IndexChangedHandler = index => {
        setActiveIndex(index)
        observeBodyRef.current = false
        const activeBodySectionEl = bodyIntersectionsRef.current.get(index)?.target
        activeBodySectionEl?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => observeBodyRef.current = true, SCROLL_TIME)
    }

    useEffect(() => console.log('########## active index', activeIndex), [activeIndex])

    return [activeIndex, bodySectionRefCallback, handleNavigation]
}
