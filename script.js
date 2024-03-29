// vars
const filterMenuSectionElement = document.querySelector(".filter-menu");
let currentlyAppliedFilter = [];
let data;

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
  const btnLanguage = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
  ]; // x 3

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

    companyAndHighlights.classList.add("company-and-highlights");
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
  function assignContent(content) {
    companyName.textContent = content.company;
    companyLogo.src = content.logo;

    if (content.featured) {
      highlightFeatured.classList.remove("hide");
      jobCard.classList.add("job-card-featured");
    } else {
      highlightFeatured.classList.add("hide");
    }

    content.new
      ? highlightNew.classList.remove("hide")
      : highlightNew.classList.add("hide");
    highlightNew.textContent = "NEW!";
    highlightFeatured.textContent = "FEATURED";

    jobTitle.textContent = content.position;

    datePosted.textContent = content.postedAt;
    dot[0].textContent = "\u2022";
    workSchedule.textContent = content.contract;
    dot[1].textContent = "\u2022";
    location.textContent = content.location;

    btnRole.textContent = content.role;
    btnLevel.textContent = content.level;

    let lanAndTools = content.languages.concat(content.tools);
    try {
      btnLanguage[0].textContent = lanAndTools[0];
      btnLanguage[1].textContent = lanAndTools[1];
      btnLanguage[2].textContent = lanAndTools[2];
    } catch (error) {
      console.error(error);
    }
  }

  function checkIfLanguageHasText(lang) {
    if (lang.textContent != "") {
      topicSection.appendChild(lang);
    }
  }

  // push elements to the DOM
  function pushElementsToDOM() {
    const mainElement = document.querySelector("main");

    topicSection.append(btnRole, btnLevel);

    for (let i = 0; i < btnLanguage.length; i++) {
      checkIfLanguageHasText(btnLanguage[i]);
    }

    jobDetials.append(datePosted, dot[0], workSchedule, dot[1], location);
    companyAndHighlights.append(companyName, highlightNew, highlightFeatured);
    itemSection.append(companyAndHighlights, jobTitle, jobDetials);

    logoAndItemSection.append(companyLogo, itemSection);

    jobCard.append(logoAndItemSection, topicSection);
    mainElement.appendChild(jobCard);
  }

  function checkIfFilterIsAlreadyOn(filters, newFilter) {
    if (filters.length <= 0) {
      return false;
    }

    for (let i = 0; i < filters.length; i++) {
      let obj = filters[i];

      if (JSON.stringify(obj) === JSON.stringify(newFilter)) {
        return true;
      }
    }
    return false;
  }

  //add event listeners
  function addEventListernsToButtons() {
    let allBtns = [btnRole, btnLevel];
    allBtns = allBtns.concat(btnLanguage);

    allBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let newFilter = {
          text: btn.textContent,
          filterType: btn.dataset.filterType,
        };

        let foundFilter = checkIfFilterIsAlreadyOn(
          currentlyAppliedFilter,
          newFilter
        );

        if (!foundFilter) {
          addElemenetToFilterMenu(newFilter);
          currentlyAppliedFilter.push(newFilter);

          toggleDispalyOfFilterMenu();

          filterData(currentlyAppliedFilter);
        }
      });
    });
  }
}

function toggleDispalyOfFilterMenu() {
  const filterMenuElement = document.querySelector(".filter-menu");
  filterMenuElement.classList.remove("hide");

  if (currentlyAppliedFilter.length <= 0) {
    filterMenuElement.classList.add("hide");
  } else {
    filterMenuElement.classList.remove("hide");
  }
}

// Add element to filter menu
function addElemenetToFilterMenu(filter) {

  if (!currentlyAppliedFilter.includes(filter, 0)) {
    // adds filter to menu if it is not already selected
    const filtersSectionElement = document.querySelector(".filters-section");

    const filterElement = document.createElement("button");

    const div = document.createElement("div");
    const text = document.createElement("p");

    div.classList.add("filter");
    filterElement.classList.add("btn-filter", "btn");

    // text.classList.add("filter-text");
    text.textContent = filter.text;
    filterElement.textContent = "X";

    // filter event listener
    filterElement.addEventListener("click", () => {
      div.remove();
      let index = currentlyAppliedFilter.indexOf(filter);
      if (index > -1) {
        // only splice array when item is found
        currentlyAppliedFilter.splice(index, 1); // 2nd parameter means remove one item only
      }

      toggleDispalyOfFilterMenu();

      filterData(currentlyAppliedFilter);
    });

    div.append(text, filterElement);
    filtersSectionElement.appendChild(div);
  }
}

// Initial dispaly
function displayWithoutFilter(d) {
  data = d;
  document.querySelector("main").replaceChildren(filterMenuSectionElement); // removes content in main

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

    let role = "";
    let level = "";
    let languages = [];
    let tools = [];

    // set values to filters depending on data set filter type
    for (let i = 0; i < allFilters.length; i++) {
      if (allFilters[i].filterType === "role") role = allFilters[i].text;

      if (allFilters[i].filterType === "level") level = allFilters[i].text;

      if (allFilters[i].filterType === "language")
        languages.push(allFilters[i].text);
    }

    function calcFilterPoints() {
      if (role.length > 0) filterPointsToPass++;
      if (level.length > 0) filterPointsToPass++;

      if (languages.length > 0) filterPointsToPass += languages.length;
      if (tools.length > 0) filterPointsToPass += tools.length;
    }

    calcFilterPoints();

    if (data[i].role === role) {
      filterPoints++;
    }
    if (data[i].level === level) {
      filterPoints++;
    }

    // filters languages array & tool array in each data object
    function filterLanguagesAndTools(obj) {
      if (obj.length > 0) {
        obj.forEach((lan) => {
          for (let j = 0; j < languages.length; j++) {
            const element = languages[j];
            if (lan === element) {
              filterPoints++;
            }
          }
        });
      }
    }

    filterLanguagesAndTools(data[i].languages);
    filterLanguagesAndTools(data[i].tools);

    // filters tools array in each data object
    if (data[i].tools.length > 0) {
      data[i].tools.forEach((tool) => {
        for (let j = 0; j < tools.length; j++) {
          const element = tools[j];

          if (tool === element) {
            filterPoints++;
          }
        }
      });
    }

    if (filterPoints === filterPointsToPass) {
      dataToDisplay.push(data[i]);
    }
  }

  dataToDisplay.forEach((data) => createElements(data)); // displays filtered data to main
}

// Clears all filters
document.querySelector(".btn-clear").addEventListener("click", () => {
  const filtersSectionElement = document.querySelector(".filters-section");

  displayWithoutFilter(data);
  currentlyAppliedFilter = [];
  filtersSectionElement.replaceChildren();
  toggleDispalyOfFilterMenu();
});

// Gets json data form data.json file
async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  displayWithoutFilter(data);
}

getData();
