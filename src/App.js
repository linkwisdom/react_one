import "./styles.css";

import List from "./article/List";

export default function App() {
  const items = [{ title: "title", article: "article" }];
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <List items={items} />
    </div>
  );
}
