import { renderDOM, registerComponent, Store, BrowserRouter } from 'core';
import { initApp } from './services/initApp';
import { diffObjectsDeep, getScreenComponent} from './utils';
import { defaultState } from './store';
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import OnboardingPage from "./pages/onboarding";
import RegistrationPage from "./pages/registration";
import {ChatPage} from "./pages/chat/chat";

import './app.css';

import * as components from './components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: BrowserRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new BrowserRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
      console.log(JSON.stringify(diffObjectsDeep.map(prevState, nextState)));
    }
router.go(window.location.pathname);
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
    }
  });

  /**
   * Инициализируем роутинг
   */
  router
      .use('/login', LoginPage, {})
      .use('/registration', RegistrationPage, {})
      .use('/profile', ProfilePage, {})
      .use('/onboarding', OnboardingPage, {})
      .use('/chat', ChatPage, {})
      .start();

  /**
   * Загружаем данные для приложения
   */
  setTimeout(() => {
    store.dispatch(initApp);
  }, 100);
});
