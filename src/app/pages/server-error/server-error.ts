import { tmpl } from './server-error.tmpl';
import View from '../../services/view/view';
import { router } from '../../services/router/router';
import { Button } from '../../components/button';

export class ServerError extends View<{}, { button: Button } > {
  constructor(props: { }) {
    super('div', props);
  }

  componentDidMount() {
    this.children.button = new Button({
      name: 'Back to chats',
      color: 'secondary',
      size: 'l',
      class: 'server-error__button',
    });

    this.children.button.setProps({
      events: {
        click: () => router.go('/messenger'),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl);
  }
}
