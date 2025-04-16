function deleteJob(id) {
    const result = confirm('Are you sure you want to delete the job?');
    if(result) {
        fetch('/delete-job/'+id, {
            method: "DELETE"
        }).then(res => {
            if(res.ok) {
                alert('Deleted successfully!')
                location.assign('/jobs');
            }
        })
    }
}

window.addEventListener('load', function() {
    
    // Show search form
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('.search-trigger');
    const searchInput = document.querySelector('.search-form input');

    searchBtn.addEventListener('click', (event)=> {
        // Prevents the click event from reaching the document
        event.stopPropagation();
        searchForm.classList.remove('d-none');
        searchBtn.classList.add('d-none');

        searchInput.focus();
    });

     // Hide search form
     document.addEventListener('click', function(event) {
        // Check if the clicked element is outside the search form and search button
        if (!searchForm.contains(event.target) && !searchBtn.contains(event.target)) {
            searchForm.classList.add('d-none');
            searchBtn.classList.remove('d-none');
        }
    });
});