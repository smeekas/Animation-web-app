import { useEffect } from "react";
import "./App.css";
import Animate from "./components/Animate/Animate";

function App() {
  useEffect(() => {
    document.head.innerHTML += `
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6K8VLYHK37"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6K8VLYHK37');
</script>
    `;
  }, []);
  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <Animate />
    </div>
  );
}

export default App;
