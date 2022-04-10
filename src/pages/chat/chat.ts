import Block from '../../core/Block';
import './chat.scss'


export class ChatPage extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                message: '',
            },
            onMessage: () => {
                const messageData = {
                    message: (this.refs.message.firstElementChild as HTMLInputElement).value,
                };

                const nextState = {
                    values: {...messageData},
                };


                this.setState(nextState);

                console.log('action/message', messageData);
            }
        }
    }

    render() {
        const {values} = this.state;
        // language=hbs
        return `
            <div class="chat">
                <div class="chat__user">
                    <div class="chat__user_search">
                        <div>
                            {{{Link text="Профиль" to="/profile"}}}
                        </div>
                        {{{Input
                                ref="login"
                                id="login"
                                type="text"
                                placeholder="Поиск"
                        }}}
                    </div>
                    <div class="chat__user_list">
                        <div>
                            <hr/>
                            <div class="avatar__wrap">
                                <img src="../../../static/images/Color.png" alt="user avatar"
                                     class="avatar users__avatar"
                                     id="userAvatar">
                            </div>
                            <div>
                                <p>Design Destroyer</p>
                                <p>Так увлёкся работой по курсу, что совсем забыл его анонсир...</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="chat__messages">
                    <div class="chat__messages_user">
                        <div class="chat__messages_user-info">
                            <div class="chat__messages_user-info_avatar">

                            </div>
                            <div class="chat__messages_user-info_name">
                                Вадим
                            </div>
                        </div>
                        <div class="chat__messages_user-actions">
                            {{{Button
                                    text="..."
                                    onClick=onActions
                            }}}
                        </div>

                    </div>
                    <hr/>


                    <div class="chat__messages_content">
                        <p>Так увлёкся работой по курсу, что совсем забыл его анонсир...</p>
                    </div>
                    <hr/>
                    <div class="chat__messages_entry">

                        {{{Button
                                text="..."
                                onClick=onMessage
                        }}}
                        {{{Input
                                value="${values.message}"
                                ref="message"
                                id="message"
                                type="text"
                                placeholder="Сообщение"
                        }}}
                        {{{Button
                                text="->"
                                onClick=onMessage
                        }}}
                    </div>

                </div>
            </div>

            </div>
            </div>
        `
    }
}
