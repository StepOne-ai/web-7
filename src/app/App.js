import { Component } from "react";
import { TodoPage } from "../pages/TodoPage/TodoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { AppContext } from "./context";

// Создание роутера приложения, который в зависимости от url отрисовывает
// определенную компоненту
// Ссылка на документацию: https://reactrouter.com/en/main/start/tutorial (демонстрация нового API)
// Ссылка на видеокурс по маршрутизации: https://www.youtube.com/playlist?list=PLiZoB8JBsdznY1XwBcBhHL9L7S_shPGVE (старый API, но смысл такой же)
const router = createBrowserRouter([
  {
    // Корневая компонента по url: "/". Она отрисовывает лэйаут приложения,
    // куда подставляется контент странички
    path: "/",
    element: <Layout />,
    // Вложенные роуты, которые будут подставляться в лэйаут
    children: [
      {
        // Это свойство позволяет задать элемент по умолчанию для родительского роута
        // То есть, если в адресной строке url будет "/", то отрисуется этот element
        index: true,
      },
      {
        path: "/login",
        element: <h1>Логин</h1>,
      },
      {
        path: "/todos",
        element: <TodoPage />,
        index: true,
      },
      {
        path: "/register",
        element: <h1>Регистрация</h1>,
      },
    ],
  },
  {
    // Другой корневой url-путь, который тоже может содержать лейаут, а может и нет
    path: "/root",
    element: <h2>Другой лейаут</h2>,
  },
]);

// Компонента приложения, которая содержит состояние приложения. Именно она вмортируется в div#root, который
// описан в index.html
export class App extends Component {
  // constructor(props) {
  //   super(props);

  //   // Задаем объект пользователя
  //   this.state = {
  //     user: undefined,
  //   };
  // }

  // Метод отрисовки компоненты
  render() {
    return <RouterProvider router={router} />;
  }
}
