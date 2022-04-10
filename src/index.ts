import {renderDOM, registerComponent} from './core';
import OnboardingPage from "./pages/onboarding";
import LoginPage from "./pages/login";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile"
import RegistrationPage from "./pages/registration"
import ErrorPage from "./pages/error"

import './app.scss';

import Button from "./components/button";
import Link from "./components/link";
import Input from "./components/input";


registerComponent(Button);
registerComponent(Link);
registerComponent(Input);

document.addEventListener("DOMContentLoaded", () => {

    switch (document.location.pathname) {
        case '/':
            renderDOM(OnboardingPage);
            break;
        case '/login':
            return renderDOM(LoginPage);
            break;
        case '/registration':
            renderDOM(RegistrationPage);
            break;
        case '/chat':
            renderDOM(ChatPage);
            break;
        case '/profile':
            renderDOM(ProfilePage);
            break;
        default:
            renderDOM(ErrorPage);
    }
});