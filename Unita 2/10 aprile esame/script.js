document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.querySelector('.btn-search')
    const searchBox = document.querySelector('.search-box')
    const inputSearch = document.querySelector('.input-search')

    if (btnSearch && searchBox) {
        btnSearch.addEventListener('click', () => {

            searchBox.classList.toggle('active');
            
            if (searchBox.classList.contains('active')) {
                inputSearch.focus()
            }
        });
    }
});