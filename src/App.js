import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Logo from './logo-black.svg';
import TodoList from './TodoList/TodoList';
import What from './WhatPage/What';
import ComponentNotFound from './404page/ComponentNotFound';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto flex flex-col min-h-screen">
          <nav className="p-4 flex justify-between items-center">
            <Link to="/">
              <img
                className="h-6 sm:h-8 select-none"
                src={Logo}
                alt="linkList"
              />
            </Link>
            <Link to="/what">
              <span className="p-2 rounded-md font-medium text-gray-900 hover:bg-blue-400 hover:text-white select-none">
                What?
              </span>
            </Link>
          </nav>

          <main className="px-4 py-8 flex flex-col flex-1">
            <Switch>
              <Route exact path="/what">
                <What />
              </Route>
              <Route exact path="/">
                <TodoList />
              </Route>
              <Route>
                <ComponentNotFound />
              </Route>
            </Switch>
          </main>
          <footer className="p-4 text-center text-xs opacity-50 select-none">
            Made with
            <span className="text-red-500">&#9829;</span>
            in Kediri
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
