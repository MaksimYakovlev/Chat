import Block from './Block';

export default function renderPage(BlockPage: typeof Block) {
    const block = new BlockPage();

    const root = document.querySelector('#app');
    if (!root) {
        return;
    }
    root!.innerHTML = '';
    root!.appendChild(block.getContent());
}
