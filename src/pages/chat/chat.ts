import {Block, BrowserRouter, Store} from "core";
import './chat.css';
import {withRouter, withStore} from "../../utils";


type ChatPageProps = {
    router: BrowserRouter;
    store: Store<AppState>;
    formError?: () => string | null;
};

export class ChatPage extends Block<ChatPageProps> {

    componentDidMount() {
        if (this.props.store.getState().user) {
            this.props.router.go('/chat');
        } else {
            this.props.router.go('/login');
        }
    }

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

            }
        }
    }

    render() {
        const {values} = this.state;
        // language=hbs
        return `
            <div class="screen screen_theme_full">
                <div class="screen__content">
                    <div class="chat__messages_entry">
                        
                        {{{Input
                                value="${values.message}"
                                ref="message"
                                id="message"
                                type="text"
                                placeholder="Сообщение"
                        }}}
                        {{{Button
                                text=">"
                                onClick=onMessage
                        }}}
                    </div>
            </div>
            </div>
        `
    }
}

export default withRouter(withStore(ChatPage));