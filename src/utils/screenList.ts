import OnboardingPage from 'pages/onboarding';
import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import { BlockClass } from 'core';
import RegistrationPage from "pages/registration";

export enum Screens {
  Onboarding = 'onboadring',
  Login = 'login',
  Profile = 'profile',
  Registration ='registration'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Onboarding]: OnboardingPage,
  [Screens.Login]: LoginPage,
  [Screens.Registration]: RegistrationPage,
  [Screens.Profile]: ProfilePage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
