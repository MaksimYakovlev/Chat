import Block from '../../core/Block';
import './error.scss';

export class ErrorPage extends Block {

    render() {
        // language=hbs
        return `
            <div class="danger">
                Страница не найдена
                {{{Link text="Выйти" to="/"}}}
            </div>
        `;
    }
}
