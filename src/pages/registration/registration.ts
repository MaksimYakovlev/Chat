import {Block, BrowserRouter, Store} from "core";
import {withRouter, withStore} from "utils";
import {isValidEmail, isValidPassword, isValidPhone, LOGIN_MAX_LEN, LOGIN_MIN_LEN} from "utils/validation";
import {login} from "../../services/auth";

type RegistrationPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
};

export class RegistrationPage extends Block<RegistrationPageProps> {
    constructor(props: RegistrationPageProps) {
        super(props);

        this.setProps({
            formError: () => this.props.store.getState().registrationFormError,
        });
    }

    componentDidMount() {
        if (this.props.store.getState().user) {
            this.props.router.go('/profile');
        }
    }


    protected getStateFromProps() {
        this.state = {
            values: {
                first_name: '',
                second_name: '',
                login: '',
                email: '',
                password: '',
                phone: '',
            },
            errors: {
                first_name: '',
                second_name: '',
                login: '',
                email: '',
                password: '',
                phone: '',
            },
            onLogin: () => {
                let hasError = false;
                const registrationData = {
                    first_name: (this.refs.first_name.firstElementChild as HTMLInputElement).value,
                    second_name: (this.refs.second_name.firstElementChild as HTMLInputElement).value,
                    login: (this.refs.login.firstElementChild as HTMLInputElement).value,
                    email: (this.refs.email.firstElementChild as HTMLInputElement).value,
                    password: (this.refs.password.firstElementChild as HTMLInputElement).value,
                    phone: (this.refs.phone.firstElementChild as HTMLInputElement).value,
                };

                const nextState = {
                    errors: {
                        first_name: '',
                        second_name: '',
                        login: '',
                        email: '',
                        password: '',
                        phone: '',
                    },
                    values: {...registrationData},
                };

                if (!registrationData.first_name) {
                    nextState.errors.first_name = 'Это поле обязательно для заполнения';
                }

                if (!registrationData.second_name) {
                    nextState.errors.second_name = 'Это поле обязательно для заполнения';
                }

                if (!registrationData.login) {
                    nextState.errors.login = 'Это поле обязательно для заполнения';
                } else if (registrationData.login.length < LOGIN_MIN_LEN || registrationData.login.length >= LOGIN_MAX_LEN) {
                    nextState.errors.login = 'Длина поля от 3 до 20 символов';
                }

                if (!registrationData.email) {
                    nextState.errors.email = 'Это поле обязательно для заполнения';
                } else if (isValidEmail(registrationData.email)) {
                    nextState.errors.email = 'Введите корректный email';
                }

                if (!registrationData.password) {
                    nextState.errors.password = 'Это поле обязательно для заполнения';
                } else if (isValidPassword(registrationData.password)) {
                    nextState.errors.password = 'Введите корректный пароль';
                }


                if (!registrationData.phone) {
                    nextState.errors.phone = 'Это поле обязательно для заполнения';
                } else if (isValidPhone(registrationData.phone)) {
                    nextState.errors.phone = 'Введите корректный номер телефона';
                }


                this.setState(nextState);
                if (!hasError) {
                    this.props.store.dispatch(login, registrationData);
                }
                console.log('action/registration', registrationData);
            }
        }
    }

    render() {
        const {errors, values} = this.state;

        // language=hbs
        return `
            <div class="screen screen_theme_full">
                <div class="screen__content">
                    <form class="login-form form">

                        {{{Input
                                value="${values.first_name}"
                                error="${errors.first_name}"
                                ref="first_name"
                                id="first_name"
                                type="text"
                                placeholder="Фамилия"
                        }}}

                        {{{Input
                                value="${values.second_name}"
                                error="${errors.second_name}"
                                ref="second_name"
                                id="second_name"
                                type="text"
                                placeholder="Имя"
                        }}}

                        {{{Input
                                value="${values.login}"
                                error="${errors.login}"
                                ref="login"
                                id="login"
                                type="text"
                                placeholder="Логин"
                        }}}

                        {{{Input
                                value="${values.email}"
                                error="${errors.email}"
                                ref="email"
                                id="email"
                                type="text"
                                placeholder="Email"
                        }}}

                        {{{Input
                                value="${values.password}"
                                error="${errors.password}"
                                ref="password"
                                id="password"
                                type="password"
                                placeholder="Пароль"
                        }}}

                        {{{Input
                                value="${values.phone}"
                                error="${errors.phone}"
                                ref="phone"
                                id="phone"
                                type="number"
                                placeholder="Телефон"
                        }}}

                        {{{Button
                                text="Регистрация"
                                onClick=onLogin
                        }}}
                    </form>
                </div>
            </div>
        `;
    }
}
export default withRouter(withStore(RegistrationPage));