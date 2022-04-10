import Block from '../../core/Block';
import '../../app.scss'

import './onboarding.css'

export class OnboardingPage extends Block {
    render() {
        // language=hbs
        return `
            <div class="screen screen_theme_full screen-onboarding">
                <div class="screen__content">
                    <div>
                        {{{Link text="Войти" to="/login"}}}
                        {{{Link text="Регистрация" to="/registration"}}}
                    </div>
                </div>
            </div>
        `;
    }
}

