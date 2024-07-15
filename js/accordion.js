document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.accordion-header');

    items.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;

            if (content.classList.contains('open')) {
                content.classList.remove('open');
            } else {
                content.classList.add('open');
            }
        });
    });
});
