export const openDiscussion = (event: React.MouseEvent<HTMLElement>) => {
    const disc_title = event.target as HTMLElement;
    const disc_component = disc_title.closest('.discussion-component') as HTMLElement;
    
    const disc_content = disc_component.querySelector('.disc-content')
    if (disc_content) {
        disc_content?.classList.toggle('disc-content-open')
    }
}