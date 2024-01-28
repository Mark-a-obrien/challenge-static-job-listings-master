


// Generate card 

// Get elements from dom 

// Create elemenets 
function createElements(data) {
  const jobCard = document.createElement("div");

  const logoAndItemSection = document.createElement("section");
  const companyLogo = document.createElement("img");
  
  const itemSection = document.createElement("section");

  const companyAndHighlights = document.createElement("div");
  const companyName = document.createElement("p");
  const highlightNew = document.createElement("p");
  const highlightFeatured = document.createElement("p");
  
  const jobTitle = document.createElement("h1");

  const jobDetials = document.createElement("div");

  const datePosted = document.createElement("p");
  const dot = [document.createElement("p"), document.createElement("p")]; // x 2
  const workSchedule = document.createElement("p");
  const location = document.createElement("p");


  const topicSection = document.createElement("section");

  const btnRole = document.createElement("button");
  const btnLevel = document.createElement("button");
  const btnLanguage = [document.createElement("button"), document.createElement("button"), document.createElement("button")]; // x 3

  assignClasses();
  assignContent(data);
  pushElementsToDOM();
  addEventListernsToButtons();

  // assign classes
  function assignClasses() {
    jobCard.classList.add("job-card");

    logoAndItemSection.classList.add("logo-and-item-section");
    companyLogo.classList.add("company-logo");

    itemSection.classList.add("item-section");

    companyAndHighlights.classList.add("company-name");
    companyName.classList.add("company-name");
    highlightNew.classList.add("highlight", "new");
    highlightFeatured.classList.add("highlight", "featured");

    jobTitle.classList.add("job-title");

    jobDetials.classList.add("job-detials");

    datePosted.classList.add("date-posted");
    dot[0].classList.add("dot");
    dot[1].classList.add("dot");
    workSchedule.classList.add("work-schedule");
    location.classList.add("location");

    topicSection.classList.add("topic-section");

    btnRole.classList.add("btn", "btn-role");
    btnLevel.classList.add("btn", "btn-level");
    btnLanguage[0].classList.add("btn", "btn-language");
    btnLanguage[1].classList.add("btn", "btn-language");
    btnLanguage[2].classList.add("btn", "btn-language");
  }

  // assign text content 
  function assignContent(
      content
      ) {

    companyName.textContent = content.company;
    companyLogo.src = content.logo;
    

    content.new ? highlightNew.classList.toggle("hide") : highlightNew.classList.toggle("hide");
    content.new ? highlightFeatured.classList.toggle("hide") : highlightFeatured.classList.toggle("hide");
    highlightNew.textContent = "NEW!";
    highlightFeatured.textContent = "FEATURED";

    jobTitle.textContent = content.position;

    datePosted.textContent = content.postedAt
    dot[0].textContent = "\u2022";
    workSchedule.textContent = content.contract;
    dot[1].textContent = "\u2022";
    location.textContent = content.location;

    btnRole.textContent = content.role;
    btnLevel.textContent = content.level;
    

    let lanAndTools = content.languages.concat(content.tools);
    console.log(lanAndTools);
    try {
      btnLanguage[0].textContent = lanAndTools[0];
      btnLanguage[1].textContent = lanAndTools[1];
      btnLanguage[2].textContent = lanAndTools[2];
    } catch (error) {
      console.error(error);
    }
  }


  // push elements to the DOM
  function pushElementsToDOM() {
    const mainElement = document.querySelector("main");


    topicSection.append(btnRole, btnLevel, btnLanguage[0], btnLanguage[1], btnLanguage[2]);

    jobDetials.append(datePosted, dot[0], workSchedule, dot[1], location);
    companyAndHighlights.append(companyName, highlightNew, highlightFeatured);
    itemSection.append(companyAndHighlights, jobTitle, jobDetials);

    logoAndItemSection.append(companyLogo,itemSection);

    jobCard.append(logoAndItemSection, topicSection);
    mainElement.appendChild(jobCard);
  }


  //add event listeners 
  function addEventListernsToButtons() {

    let allBtns = [btnRole, btnLevel];
    allBtns = allBtns.concat(btnLanguage);

    allBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        addElemenetToFilterMenu(btn.textContent);
        filterData(btn.textContent);
      });
    });

    // btnRole.addEventListener("click", () => {
    //   addElemenetToFilterMenu(btnRole.textContent);
    //   filterData(btnRole.textContent);
    // });
    
  }
}

let currentlyAppliedFilter = [];
// Add element to filter menu 
function addElemenetToFilterMenu(filterText) {

  if (!(currentlyAppliedFilter.includes(filterText))) { // adds filter to menu if it is not already selected
    const filterMenuElement = document.querySelector(".filter-menu");
    const filterElement = document.createElement("button");

    filterElement.classList.add("btn-filter", "btn");
    filterElement.textContent = filterText;

    filterElement.addEventListener("click", () => {
      displayWithoutFilter();
      filterElement.remove();
      let index = currentlyAppliedFilter.indexOf(filterText)
      if (index > -1) { // only splice array when item is found
        currentlyAppliedFilter.splice(index, 1); // 2nd parameter means remove one item only
      }
    });



    filterMenuElement.appendChild(filterElement);
    currentlyAppliedFilter.push(filterText);
  }
}


// testing START
  // document.querySelectorAll(".btn-role").forEach(role => {
  //   role.addEventListener("click", () => {
  //     filterData("Frontend");
  //     addElemenetToFilterMenu("Frontend");
  //   })
  // });
// testing END



// Initial dispaly 
function displayWithoutFilter() {
  document.querySelector("main").replaceChildren(); // remove content in main

  for (let i = 0; i < data.length; i++) {
      createElements(data[i]);
  }
}

// Search function 
function filterData(filter) {
  document.querySelector("main").replaceChildren(); // remove content in main

  for (let i = 0; i < data.length; i++) {

    if (data[i].role === filter || data[i].level === filter) {
      createElements(data[i]);
    } else {
      for (let j = 0; j < data[i].languages.length; j++) {
   
        if (data[i].languages[j] === filter) {
          createElements(data[i]);
        }
      }

      for (let j = 0; j < data[i].tools.length; j++) {
   
        if (data[i].tools[j] === filter) {
          createElements(data[i]);
        }
      }


    }
  }
}











const data = [
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "./images/photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "./images/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "./images/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "logo": "./images/myhome.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "logo": "./images/loop-studios.svg",
    "new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Ruby"],
    "tools": ["Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "logo": "./images/faceit.svg",
    "new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "languages": ["Ruby"],
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "logo": "./images/shortly.svg",
    "new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "logo": "./images/insure.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue", "Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "logo": "./images/eyecam-co.svg",
    "new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "logo": "./images/the-air-filter-company.svg",
    "new": false,
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
]
console.log(data.length)

// generateCard();
displayWithoutFilter()