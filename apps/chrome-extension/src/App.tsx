import LofiTab from "@repo/ui/components/lofi-tab";

function App() {
  return (
    <LofiTab
      weatherProps={{
        fetchUrl: `${import.meta.env.VITE_API_ROUTE}/weather`,
      }}
    />
  );
}

export default App;
