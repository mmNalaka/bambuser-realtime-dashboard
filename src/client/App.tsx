
import { useState } from "react";

import reactLogo from "./assets/react.svg";
import { AppLayout } from "./components/AppLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AppLayout>
        test
      </AppLayout>
    </div>
  );
}

export default App;
