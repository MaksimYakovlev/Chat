import { withStore, withRouter } from 'utils';
import { Store, Block, BrowserRouter } from 'core';

type OnboardingPageProps = {
  router: BrowserRouter;
  store: Store<AppState>;
  onToggleAppLoading?: () => void;
  navigateToLogin?: () => void;
  navigateToRegistration?: () => void;
};

export class OnboardingPage extends Block<OnboardingPageProps> {
  constructor(props: OnboardingPageProps) {
    super(props);

    this.setProps({
      // onToggleAppLoading: () => this.onToggleAppLoading(),
      navigateToLogin: () => this.props.router.go('/login'),
      navigateToRegistration: () => this.props.router.go('/registration'),
    });
  }

  // onToggleAppLoading() {
  //   this.props.store.dispatch({ isLoading: true });
  //
  //   setTimeout(() => {
  //     this.props.store.dispatch({ isLoading: false });
  //   }, 2000);
  // }

  componentDidMount() {
    if (this.props.store.getState().user) {
      this.props.router.go('/profile');
    }
  }

  render() {
    return `
    {{#Layout name="Onboarding" fullScreen=true}}
      {{{Button text="Войти" onClick=navigateToLogin}}}
       {{{Button text="Регистрация" onClick=navigateToRegistration}}}
<!--      <div>-->
<!--        {{#each links}}-->
<!--          {{#with this}}-->
<!--            {{{Link text="{{text}}" to="{{to}}"}}}-->
<!--          {{/with}}-->
<!--        {{/each}}-->
<!--      </div>-->
<!--      {{{Button text="Toggle app loading" onClick=onToggleAppLoading}}}-->
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(OnboardingPage));
