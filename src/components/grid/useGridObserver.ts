import { RefCallback, RefObject } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

// https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js#L19
const SCROLL_TIME = 468 * 2 // add some buffer
const THRESHOLD = [0, 0.2, 0.4, 0.6, 0.8, 1]
type IndexChangedHandler = (index: number) => void;
type KeyAccessor<T> = (entry: IntersectionObserverEntry) => T
const keyAccessor: KeyAccessor<number> = e => +((e.target as HTMLElement)?.dataset?.id || 0)

const calcIndexWithMaxIntersectionRatio = (intersectionEntries: Map<number, IntersectionObserverEntry>): number => {
    let resultValue: IntersectionObserverEntry | undefined;
    let resultKey = 0;
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

export const useGridObserver = (
    initialIndex: number,
    scrollNavIntoView: (index: number) => void,
    containerRef?: RefObject<HTMLElement>,
): [
    number,
    RefCallback<HTMLElement>,
    IndexChangedHandler,
] => {
    const [activeIndex, setActiveIndex] = useState(initialIndex)
    const observeBodyRef = useRef<boolean>(false)
    const bodyIntersectionsRef = useRef<Map<number, IntersectionObserverEntry>>(new Map())
    const navScrollDebounceRef = useRef<number>()

    const handleBodyIntersection: IntersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(e => bodyIntersectionsRef.current.set(keyAccessor(e), e))
        const nextActiveIndex = calcIndexWithMaxIntersectionRatio(bodyIntersectionsRef.current)
        if (observeBodyRef.current) {
            setActiveIndex(nextActiveIndex)
            window.clearTimeout(navScrollDebounceRef.current)
            navScrollDebounceRef.current = window.setTimeout(() => scrollNavIntoView(nextActiveIndex), 100)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const observer = useMemo(() => {
        const observerOptions = { 
            threshold: THRESHOLD,
            root: containerRef?.current
        }
        return new IntersectionObserver(handleBodyIntersection, observerOptions)
    }, [containerRef, handleBodyIntersection])
    const bodySectionRefCallback: RefCallback<HTMLElement> = useCallback(r => (r && observer.observe(r)), [observer])

    const handleNavigation: IndexChangedHandler = index => {
        setActiveIndex(index)
        observeBodyRef.current = false
        const activeBodySectionEl = bodyIntersectionsRef.current.get(index)?.target
        activeBodySectionEl?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => observeBodyRef.current = true, SCROLL_TIME)
    }

    useEffect(() => {
        setActiveIndex(initialIndex)
        const activeBodySectionEl = bodyIntersectionsRef.current.get(initialIndex)?.target
        activeBodySectionEl?.scrollIntoView()
        scrollNavIntoView(initialIndex)
        setTimeout(() => observeBodyRef.current = true, SCROLL_TIME)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => console.log('### active index', activeIndex), [activeIndex])

    return [activeIndex, bodySectionRefCallback, handleNavigation]
}
