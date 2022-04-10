import Block from '../../core/Block';
import './profile.scss'

export class ProfilePage extends Block {


    render() {

        // language=hbs
        return `
            <div class="container">
                <div class="profile">

                    <div class="profile__avatar">
                        <div>Аватар</div>

                        <p>Иван</p>
                    </div>
                    <div class="profile__data">
                        <div><span>Почта</span>pochta@yandex.ru</div>
                        <hr/>
                        <div><span>Логин</span>ivanivanov</div>
                        <hr/>
                        <div><span>Имя</span>Иван</div>
                        <hr/>
                    </div>
                    <div class="profile__change">
                        {{{Link text="Изменить данные" to="/login"}}}
                        <hr/>
                        {{{Link text="Изменить пароль" to="/login"}}}
                        <hr/>
                        {{{Link text="Выйти" to="/"}}}
                    </div>
                </div>
            </div>
        `;
    }
}
