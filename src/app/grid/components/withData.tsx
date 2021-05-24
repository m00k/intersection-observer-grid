import { FunctionComponent, h } from 'preact';
import { categories, categoriesWithItems } from '../../../api';

interface WithDataProps {
    categories: typeof categories;
    categoriesWithItems: typeof categoriesWithItems;
}

function withData<T extends WithDataProps = WithDataProps>(
    WrappedComponent: FunctionComponent<T>
): FunctionComponent<Omit<T, keyof WithDataProps>> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    const ComponentWithData: FunctionComponent<Omit<T, keyof WithDataProps>> = (props: Omit<T, keyof WithDataProps>) => {
        const dataProps = { categories, categoriesWithItems }
        return <WrappedComponent {...dataProps} {...(props as T)} />;
    };
    ComponentWithData.displayName = `withData(${displayName})`;
    return ComponentWithData;
}

export default withData

// TODO
// inject static values to a component so that they're always provided
// export function inject<TProps, TInjectedKeys extends keyof TProps>(
//     Component: ComponentConstructor<TProps>,
//     injector: Pick<TProps, TInjectedKeys>
// ) {
//     return function Injected(props: Omit<TProps, TInjectedKeys>) {
//         return <Component {...(props as TProps)} {...injector} />;
//     };
// }