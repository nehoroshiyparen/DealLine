export const openTask = (event: React.MouseEvent<HTMLElement>) => {
    const task_title = event.target as HTMLElement;

    const task_top = task_title.closest('.task-top') as HTMLElement;
    const task_info = task_top?.querySelector('.task-info') as HTMLElement;

    if (task_info) {
        task_info.classList.toggle('task-open');
    }
};
    