

// vars
const filterMenuSectionElement = document.querySelector(".filter-menu");
let currentlyAppliedFilter = [];

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
    btnRole.dataset.filterType = "role";

    btnLevel.classList.add("btn", "btn-level");
    btnLevel.dataset.filterType = "level";


    btnLanguage[0].classList.add("btn", "btn-language");
    btnLanguage[1].classList.add("btn", "btn-language");
    btnLanguage[2].classList.add("btn", "btn-language");

    btnLanguage[0].dataset.filterType = "language";
    btnLanguage[1].dataset.filterType = "language";
    btnLanguage[2].dataset.filterType = "language";
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
        
        if (!currentlyAppliedFilter.includes(btn.textContent)) {

          let newFilter = { 
            text : btn.textContent, 
            filterType : btn.dataset.filterType
          };

          addElemenetToFilterMenu(newFilter);
          currentlyAppliedFilter.push(newFilter);

          
          filterData(currentlyAppliedFilter);

          
          
          console.log(currentlyAppliedFilter);
          console.log(btn.dataset.filterType);
        } 
      });
    });

    // btnRole.addEventListener("click", () => {
    //   addElemenetToFilterMenu(btnRole.textContent);
    //   filterData(btnRole.textContent);
    // });
    
  }
}


// Add element to filter menu 
function addElemenetToFilterMenu(filter) {

  console.log(currentlyAppliedFilter.includes(filter, 0));

  if (!(currentlyAppliedFilter.includes(filter, 0))) { // adds filter to menu if it is not already selected
    const filterMenuElement = document.querySelector(".filter-menu");
    const filterElement = document.createElement("button");

    filterElement.classList.add("btn-filter", "btn");
    filterElement.textContent = filter.text;  

    // filter event listener
    filterElement.addEventListener("click", () => {

      filterElement.remove();
      let index = currentlyAppliedFilter.indexOf(filter)
      if (index > -1) { // only splice array when item is found
        currentlyAppliedFilter.splice(index, 1); // 2nd parameter means remove one item only
      }

      filterData(currentlyAppliedFilter);
    });

    filterMenuElement.appendChild(filterElement);
    // currentlyAppliedFilter.push(filter);
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
  document.querySelector("main").replaceChildren(filterMenuSectionElement); // remove content in main

  for (let i = 0; i < data.length; i++) {
      createElements(data[i]);
  }
}

// Search function 
function filterData(allFilters) {
  document.querySelector("main").replaceChildren(filterMenuSectionElement); // remove content in main


  // **Can filder by role, level, languages or tools**

  let dataToDisplay = [];
  

  for (let i = 0; i < data.length; i++) {

    let filterPoints = 0;
    let filterPointsToPass = 0;


    // let role = "Backend";
    // let level = "Junior";
    // let languages = "Ruby";
    // let tools = "RoR";

    // let role = "Fullstack";
    // let level = "Midweight";
    // let languages = ["JavaScript", "Ruby"];
    // let tools = ["Sass"];

    
    let role = "";
    let level = "";
    let languages = [];
    let tools = [];

    // set values to filters depending on data set filter type 
    for (let i = 0; i < allFilters.length; i++) {

      if (allFilters[i].filterType === "role") role = allFilters[i].text;

      if (allFilters[i].filterType === "level") level = allFilters[i].text;

      if (allFilters[i].filterType === "language") languages.push(allFilters[i].text);
    }

    

    function calcFilterPoints() {
      if (role.length > 0) filterPointsToPass++;
      if (level.length > 0) filterPointsToPass++;

      if (languages.length > 0) filterPointsToPass += languages.length;
      if (tools.length >   0) filterPointsToPass += tools.length;
    }

    calcFilterPoints();

    
    if (data[i].role === role) {
      filterPoints++;
    } 
    if (data[i].level === level) {
      filterPoints++;
    }

    // filters languages array in each data object 
    if (data[i].languages.length > 0) {
      data[i].languages.forEach(lan => {

        for (let j = 0; j < languages.length; j++) {
          const element = languages[j];
          if (lan === element) {
            filterPoints++;
          } 
        }
      })
    }
    
    // filters tools array in each data object 
    if (data[i].tools.length > 0) {
      data[i].tools.forEach(tool => {

        for (let j = 0; j < tools.length; j++) {
          const element = tools[j];

          // console.log(`${tool} : ${element} = ${tool === element}`);
          if (tool === element) {
            filterPoints++;
          } 
        }
        
      });
  }

    
    // console.log(`filterPoints = ${filterPoints}`);
    // console.log(`filterPointsToPass = ${filterPointsToPass}`);
    if (filterPoints === filterPointsToPass) {
      // console.log(data[i].role);
      // console.log(data[i].level);
      // console.log(data[i].languages);
      // console.log(data[i].tools);
      // console.log("--------------------");


      dataToDisplay.push(data[i]);
    }

    
  }

  dataToDisplay.forEach(data => createElements(data)); // display filters data to main 
}


document.querySelector(".btn-clear").addEventListener("click", () => {
  displayWithoutFilter();
  currentlyAppliedFilter = [];  
  document.querySelector(".filter-menu").replaceChildren(document.querySelector(".btn-clear"));
});








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