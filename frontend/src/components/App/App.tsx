import Routes from "Routes";
import ThemeConfig from "theme/index";
import { GlobalStateProvider } from "context/global";

const App = () => {
  return (
    <GlobalStateProvider>
      <ThemeConfig>
        <Routes />
      </ThemeConfig>
    </GlobalStateProvider>
  );
};

export default App;
