import Block from '../../core/Block';
import '../../app.scss'
import {isValidPassword} from '../../helpers'

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
                    nextState.errors.login = 'Поле обязательно для заполнения';
                } else if (loginData.login.length < 4) {
                    nextState.errors.login = 'Минимальная длина 4 символа';
                } else if (!/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i.test(loginData.login)) {
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
