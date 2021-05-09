import { RefCallback, RefObject } from 'preact';
import { useCallback, useMemo, useRef, useState } from 'preact/hooks';

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

const calcIndexWithMaxIntersectionRatio = (intersectionEntries: IntersectionObserverEntry[]): number => {
    return intersectionEntries
        .reduce((acc, curr, i, arr) => {
            const accRatio = arr[acc]?.intersectionRatio || 0;
            const currRatio = curr.intersectionRatio;
            if (accRatio === currRatio) return acc < i ? acc : i
            return accRatio >= currRatio ? acc : i
        }, 0)
}

type KeyAccessor<T> = (entry: IntersectionObserverEntry) => T
const keyAccessor: KeyAccessor<string | undefined> = e => (e.target as HTMLElement)?.dataset?.id

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
    const bodyIntersectionsRef = useRef<IntersectionObserverEntry[]>()

    const handleBodyIntersection: IntersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        bodyIntersectionsRef.current = bodyIntersectionsRef.current
            ? bodyIntersectionsRef.current.map(ce => entries.find(e => keyAccessor(e) === keyAccessor(ce)) || ce)
            : [...entries]
        const nextActiveIndex = calcIndexWithMaxIntersectionRatio(bodyIntersectionsRef.current)
        if (observeBodyRef.current) {
            setActiveIndex(nextActiveIndex)
            headerRef?.current?.scrollActiveNavItem()
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
        const activeBodySectionEl = bodyIntersectionsRef.current[index].target
        activeBodySectionEl.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => observeBodyRef.current = true, 1000) // TODO: single source of truth, align with scroll duration
    }

    return [activeIndex, bodySectionRefCallback, handleNavigation]
}
