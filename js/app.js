document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu-inner ul li');
    const contentSections = document.querySelectorAll('.cards-container');

    const showContent = (targetId) => {
        contentSections.forEach(section => section.classList.remove('active'));

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    };

    toggleBtn.addEventListener('click', () => {
        const isClosed = menu.classList.toggle('menu-closed');
        localStorage.setItem('menuState', isClosed ? 'closed' : 'open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all menu items
            menuItems.forEach(item => item.classList.remove('active'));

            // Add active class to the clicked menu item
            item.classList.add('active');

            // Get the target content ID from the clicked link
            const link = item.querySelector('a');
            if (link) {
                const targetId = link.getAttribute('data-target');
                showContent(targetId);
                localStorage.setItem('activeContent', targetId);
            }
        });
    });

    const savedMenuState = localStorage.getItem('menuState');
    if (savedMenuState === 'closed') {
        menu.classList.add('menu-closed');
    }

    const savedContentId = localStorage.getItem('activeContent');
    if (savedContentId) {
        showContent(savedContentId);

        // Set the active class to the saved active menu item
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('data-target') === savedContentId) {
                item.classList.add('active');
            }
        });
    } else {
        showContent('content1');
        menuItems[0].classList.add('active'); // Set the first menu item as active by default
    }
});
