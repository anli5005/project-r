import { useNavigationContext, useNavigationTitle } from "../components/NavigationStack";
import { Editor } from "../editor/Editor";

export default function MainMenu() {
    const context = useNavigationContext();
    useNavigationTitle("Main Menu");
    
    return <>
        <h1>project r</h1>
        <button onClick={() => {
            context!.push(<Editor />);
        }}>New Level</button>
    </>;
}