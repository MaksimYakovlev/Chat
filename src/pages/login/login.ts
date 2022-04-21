import { withStore, withRouter } from 'utils';
import { login } from 'services/auth';
import {Store, Block, BrowserRouter} from 'core';
import {isValidLogin, LOGIN_MAX_LEN, LOGIN_MIN_LEN} from "../../utils/validation";


type LoginPageProps = {
  router: BrowserRouter;
  store: Store<AppState>;
  formError?: () => string | null;
};

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().loginFormError,
    });
  }

  componentDidMount() {
    if (this.props.store.getState().user) {
      this.props.router.go('/chat');
    }
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      onLogin: () => {
        // TODO: вынести в отдельный метод

        let hasError = false;
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement)
            .value,
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };


        if (!loginData.login) {
          hasError = true;
          nextState.errors.login = 'Это поле обязательно для заполнения';
        } else if (loginData.login.length < LOGIN_MIN_LEN || loginData.login.length >= LOGIN_MAX_LEN) {
          hasError = true;
          nextState.errors.login = 'Длина поля от 3 до 20 символов';
        } else if (isValidLogin(loginData.login)) {
          hasError = true;
          nextState.errors.login = 'Первая буква должна быть заглавной, без пробелов и без цифр';
        }

        if (!loginData.password) {
          hasError = true;
          nextState.errors.password = 'Поле обязательно для заполнения';
        }


        this.setState(nextState);

        if (!hasError) {
          this.props.store.dispatch(login, loginData);
        }
      },
    };
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
    {{#Layout name="Login" fullScreen=true}}
      <form class="login-form form">

        {{{Input
          value="${values.login}"
          error="${errors.login}"
          ref="login"
          id="login"
          type="text"
          placeholder="Login"
        }}}

        {{{Input
          value="${values.password}"
          error="${errors.password}"
          ref="password"
          id="password" 
          type="password"
          placeholder="Password"
        }}}

        {{{Button
          text="Login"
          onClick=onLogin
        }}}
        {{{Error value=formError}}}
      </form>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(LoginPage));
