import View from '../../services/view/view';
import { tmpl } from './client-error.tmpl';
import { router } from '../../services/router/router';
import { Button } from '../../components/button';

export class ClientError extends View<{}, { button: Button }> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.initButton();
  }

  render() {
    return this.compile(tmpl);
  }

  initButton(): void {
    this.children.button = new Button({
      name: 'Back to chats',
      color: 'secondary',
      size: 'l',
      class: 'client-error__button',
    });

    this.children.button.setProps({
      events: {
        click: () => router.go('/messenger'),
      },
    });
  }
}
