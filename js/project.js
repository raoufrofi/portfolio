(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const project = urlParams.get('project');

    /*================   DOM ELEMENTS   ===================*/
    const projectTitle = document.getElementById('projectTitle');
    const projectDescription = document.getElementById('projectDescription');
    const projectImgs = document.getElementById('projectImgs');

    let projectData;

    getProjectData(project)

    async function getProjectData(project) {
        try {
            const response = await fetch('json/projects.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const projectData = await response.json();
            console.log(projectData['efaad']);
            setProjectData(projectData[project])

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    function setProjectData(data) {
        projectTitle.innerHTML = data?.title
        createImages(data.images)
    }

    function createImages(images) {
        let str = ''
        images.forEach(img => {
            str += `
            <div class="project-detail__image-wrapper">
            <img src="${img}" alt="">
        </div>
            `
        })

        projectImgs.innerHTML = str

    }
})()