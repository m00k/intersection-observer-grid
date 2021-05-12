import { RefObject } from "preact"

export const scrollNavItemIntoView = (parentEl: HTMLElement | null, childIndex: number ): void => {
    const el = parentEl?.children?.[childIndex] as HTMLElement | null
    const left = el?.offsetLeft
    parentEl?.scrollTo({ left, behavior: 'smooth' })
}

export const scrollNavItemIntoViewFn = (parentRef: RefObject<HTMLElement>) => (index: number): void => scrollNavItemIntoView(parentRef.current, index)