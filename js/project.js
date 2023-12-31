/*================   DOM ELEMENTS   ===================*/
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const projectDetail = document.getElementById('projectDetail');
const projectImgsParent = document.getElementById('projectImgs');
const projectImages = projectImgsParent.getElementsByClassName('project-detail__image-wrapper');
const keys = {
    right: 'ArrowRight',
    left: 'ArrowLeft'
}
let projectImagesArr = [];
let showcaseImgIndex = 0;


(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const project = urlParams.get('project');

    let projectData;

    getProjectData(project)

    async function getProjectData(project) {
        try {
            const response = await fetch('projects.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const projectData = await response.json();
            setProjectData(projectData[project])

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    function setProjectData(data) {
        document.title = data?.title
        projectTitle.innerHTML = data?.title
        projectImagesArr = data.images
        createImages(data.images)
        createProjectDescription(data);
        createStack(data)
        createFeatures(data)
    }

    function createImages(images) {
        let str = ''
        images.forEach((img, index) => {
            str += `
            <div class="project-detail__image-wrapper" onclick="activeImg(${index});openPopup(${index})">
            <img src="${img}"  alt="" >
        </div>
            `
        })
        projectImgsParent.innerHTML = str
    }

    function createProjectDescription(data) {
        const description = document.createElement('p');
        description.innerHTML = data.description;
        description.classList.add('common-text');
        var spaceDiv1 = document.createElement('div');
        spaceDiv1.className = 'space-dv';

        var spaceDiv2 = document.createElement('div');
        spaceDiv2.className = 'space-dv';
        projectDetail.appendChild(spaceDiv1);
        projectDetail.appendChild(spaceDiv2);
        projectDetail.appendChild(description);
    }

    function createStack(data) {
        const stacksTable = document.createElement('table');
        stacksTable.classList.add('stacks-table')
        data.stacks.forEach(item => {
            const stackRow = document.createElement('tr');
            let rowData = `<th>${item.title} :</th><td>${item.detail}</td>`
            stackRow.innerHTML = rowData
            stacksTable.appendChild(stackRow);
        })
        projectDetail.appendChild(stacksTable);
    }

    function createFeatures(data) {
        const features = data.features;
        const featureList = document.createElement('ul');
        Array.from(features).forEach(item => {
            const featureListItem = document.createElement('li');
            const listItemTitle = document.createElement('h3')
            listItemTitle.classList.add('common-text')
            const listItemDetail = document.createElement('p');
            listItemDetail.classList.add('common-text')
            listItemTitle.innerHTML = item.title
            listItemDetail.innerHTML = item.detail;
            featureListItem.appendChild(listItemTitle)
            featureListItem.appendChild(listItemDetail)
            featureList.appendChild(featureListItem)
        })

        const featureListParent = document.createElement('div')
        featureListParent.classList.add('feature-list');
        const heading = document.createElement('h2')
        heading.innerHTML = 'A Deep Dive';
        heading.classList.add('heading-2')
        featureListParent.appendChild(heading)
        featureListParent.appendChild(featureList)
        projectDetail.appendChild(featureListParent)
    }
})()

// It's outside because of scope. If we keep it in IIFE there was a problem with the scope of function
function activeImg(index) {
    let activeImgDv = Array.from(projectImages).find(item => item.classList.contains('active'))
    // activeImgDv.classList.remove('active');
    // projectImages[index].classList.add('active');
    showcaseImgIndex = index;
    setImageSrcByIndex(showcaseImgIndex);
}

function openPopup(index) {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'
    showcaseImgIndex = index;
    document.addEventListener('keydown', handleKeyDown);
}

function closePopup() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'unset'
    document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
    // console.log(event);
    if (event.key == keys.left && showcaseImgIndex > 0)
        setImageSrcByIndex(--showcaseImgIndex)
    else if (event.key == keys.right && showcaseImgIndex < projectImages.length - 1)
        setImageSrcByIndex(++showcaseImgIndex)
}

// IMAGE ASSIGNER
function setImageSrcByIndex(index) {
    document.getElementById('showcaseImg').src = projectImagesArr[index];
}

function changeImageWithEvent(eventName){
    var event = new Event(eventName);
    event.key = eventName
    handleKeyDown(event);
}