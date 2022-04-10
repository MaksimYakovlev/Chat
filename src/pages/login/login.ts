import Block from '../../core/Block';
import '../../app.scss'
import {isValidLogin, isValidPassword, LOGIN_MAX_LEN, LOGIN_MIN_LEN} from '../../helpers/validation'

export class LoginPage extends Block {
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
                const loginData = {
                    login: (this.refs.login.firstElementChild as HTMLInputElement).value,
                    password: (this.refs.password.firstElementChild as HTMLInputElement).value
                };

                const nextState = {
                    errors: {
                        login: '',
                        password: '',
                    },
                    values: {...loginData},
                };

                if (!loginData.login) {
                    nextState.errors.login = 'Это поле обязательно для заполнения';
                } else if (loginData.login.length < LOGIN_MIN_LEN || loginData.login.length >= LOGIN_MAX_LEN) {
                    nextState.errors.login = 'Длина поля от 3 до 20 символов';
                } else if (isValidLogin(loginData.login)) {
                    nextState.errors.login = 'Первая буква должна быть заглавной, без пробелов и без цифр';
                }


                if (!loginData.password) {
                    nextState.errors.password = 'Поле обязательно для заполнения';
                } else if (isValidPassword(loginData.password)) {
                    nextState.errors.password = 'Введите корректный пароль';
                }


                this.setState(nextState);

                console.log('action/login', loginData);
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
                                value="${values.login}"
                                error="${errors.login}"
                                ref="login"
                                id="login"
                                type="text"
                                placeholder="Логин"
                        }}}

                        {{{Input
                                value="${values.password}"
                                error="${errors.password}"
                                ref="password"
                                id="password"
                                type="password"
                                placeholder="Пароль"
                        }}}

                        {{{Button
                                text="Войти"
                                onClick=onLogin
                        }}}

                        {{{Link text="Регистрация" to="/registration"}}}
                        {{{Link text="Chat" to="/chat"}}}
                    </form>
                </div>
            </div>
        `;
    }
}
