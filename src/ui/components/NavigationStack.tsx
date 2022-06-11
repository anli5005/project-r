import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface NavigationItem {
    title?: string;
    node: ReactNode;
}

export interface NavigationContext {
    pop?(): void;
    lastTitle?: string;
    title?: string;
    setTitle(title: string): void;
    push(node: JSX.Element): void;
}

const NavigationStackContext = createContext<NavigationContext | null>(null);

export function useNavigationContext(): NavigationContext | null {
    return useContext(NavigationStackContext);
}

export function useNavigationTitle(title: string) {
    const context = useNavigationContext();
    useEffect(() => {
        context?.setTitle(title);
    }, [title, context]);
}

export function NavigationStack({ children }: { children: ReactNode }) {
    const [stack, setStack] = useState<NavigationItem[]>([{ node: children }]);

    const context = useMemo(() => {
        const push = (element: ReactNode) => {
            setStack(stack.concat({ node: element }));
        };

        const title = stack[stack.length - 1].title;

        const setTitle = (newTitle: string) => {
            if (title === newTitle) return;
            setStack(stack.slice(0, -1).concat({ title: newTitle, node: stack[stack.length - 1].node }));
        };

        return stack.length > 1 ? {
            pop: () => setStack(stack.slice(0, -1)),
            lastTitle: stack[stack.length - 2].title,
            title,
            setTitle,
            push,
        } : {
            title,
            setTitle,
            push,
        };
    }, [stack]);

    return <NavigationStackContext.Provider value={context}>
        {stack[stack.length - 1].node}
    </NavigationStackContext.Provider>;
}