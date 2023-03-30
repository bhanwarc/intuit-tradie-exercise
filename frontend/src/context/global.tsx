import { PropsWithChildren, createContext, useContext, useState } from "react";
import { GlobalState } from "typings/common";
import { isClient, isSessionValid } from "helpers/auth";

type GlobalStateProps = {
  globalState?: GlobalState;
  setGlobalState: any;
};

const GlobalStateContext = createContext<GlobalStateProps>({
  setGlobalState: (state: GlobalState) => state,
});

export const GlobalStateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    isClient: isClient(),
    isLoggedin: !!isSessionValid(),
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useCurrentState = () => {
  return useContext(GlobalStateContext);
};
