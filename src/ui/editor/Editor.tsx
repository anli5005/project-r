import { useNavigationContext, useNavigationTitle } from "../components/NavigationStack";

export function Editor() {
    const context = useNavigationContext();
    useNavigationTitle("Editor");
    return <>
        {context?.pop && <button onClick={() => {
            context.pop!();
        }}>{context.lastTitle ?? "Back"}</button>}
        <h1>Editor</h1>
    </>;
}