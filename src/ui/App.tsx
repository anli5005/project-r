import './App.css';
import { NavigationStack } from './components/NavigationStack';
import MainMenu from './menu/MainMenu';

function App() {
    return (
        <NavigationStack>
            <MainMenu />
        </NavigationStack>
    );
}

export default App;
