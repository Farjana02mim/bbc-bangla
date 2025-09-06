// DOM elements
const categoryContainer = document.getElementById("categoryContainer");
const dropdownItem = document.getElementById("dropdown-item");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer");
const bookmarkCount = document.getElementById("bookmarkCount");
const newsDetailsModal = document.getElementById("news-details-modal");
const modalContainer = document.getElementById("modalContainer");

let bookmarks = [];

// Load categories
const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
      dropdownItems(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Show categories in mobile dropdown
const dropdownItems = (categories) => {
  dropdownItem.innerHTML = "";

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="cursor-pointer">${cat.title}</a>`;
    li.dataset.id = cat.id;

    li.addEventListener("click", () => {
      showLoading();
      loadNewsByCategory(cat.id);
    });

    dropdownItem.appendChild(li);
  });
};

// Show categories in desktop nav
const showCategory = (categories) => {
  categoryContainer.innerHTML = "";

  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" 
          class="hover:border-b-4 hover:border-red-600 cursor-pointer">
          ${cat.title}
      </li>
    `;
  });

  // Event delegation for desktop nav
  categoryContainer.addEventListener("click", (e) => {
    const allLi = categoryContainer.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4", "border-red-600");
      li.classList.add("hover:border-b-4", "hover:border-red-600");
    });

    if (e.target.localName === "li") {
      showLoading();
      e.target.classList.add("border-b-4", "border-red-600");
      e.target.classList.remove("hover:border-b-4", "hover:border-red-600");
      loadNewsByCategory(e.target.id);
    }
  });

  setFirstCategoryActive();
};

// Make first category active by default
const setFirstCategoryActive = () => {
  const firstLi = categoryContainer.querySelector("li");
  if (firstLi) {
    firstLi.classList.add("border-b-4", "border-red-600");
    firstLi.classList.remove("hover:border-b-4", "hover:border-red-600");

    loadNewsByCategory(firstLi.id);
  }
};

// Load news by category
const loadNewsByCategory = (categoryId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      showError();
    });
};

// Show news list
const showNewsByCategory = (articles) => {
  if (articles.length === 0) {
    showEmptyMessage();
    return;
  }

  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class="border border-gray-300 rounded-lg">
            <div>
             <img src="${article.image?.srcset?.[5]?.url || article.image?.url || ""}" alt="news"/>
            </div>
            <div id="${article.id}" class="p-2">
                <h1 class="font-extrabold">${article.title}</h1>
                <p class="text-sm">${article.time}</p>
                <div class="flex justify-between items-center mt-2">
                   <button class="btn btn-sm">Bookmark</button>
                   <button class="btn btn-sm">View Details</button>
                </div>
            </div>
        </div>
    `;
  });
};

// Handle clicks inside news container
newsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e);
  }

  if (e.target.innerText === "View Details") {
    handleViewDetails(e);
  }
});

// Bookmark handling
const handleBookmarks = (e) => {
  const parent = e.target.closest("div[id]");
  const title = parent.querySelector("h1").innerText;
  const id = parent.id;

  if (!bookmarks.some((b) => b.id === id)) {
    bookmarks.push({ title, id });
  }

  showBookmarks(bookmarks);
};

const showBookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    bookmarkContainer.innerHTML += `
        <div class="border my-2 p-1">
            <h1>${bookmark.title}</h1>
            <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
        </div>
    `;
  });

  bookmarkCount.innerText = bookmarks.length;
};

const handleDeleteBookmark = (bookmarkId) => {
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookmarkId);
  showBookmarks(bookmarks);
};

// News details handling
const handleViewDetails = (e) => {
  const id = e.target.closest("div[id]").id;

  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetailsNews(data.article);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showDetailsNews = (article) => {
  newsDetailsModal.showModal();
  modalContainer.innerHTML = `
    <h1 class="font-bold text-xl mb-2">${article.title}</h1>
    <img src="${article.images[0].url}" class="mb-3"/>
    <p>${article.content.join(" ")}</p>
  `;
};

// Helpers
const showLoading = () => {
  newsContainer.innerHTML = `
     <div class="bg-green-600 p-3 text-white">Loading...</div>
  `;
};

const showError = () => {
  newsContainer.innerHTML = `
     <div class="bg-red-600 p-3 text-white text-[20px]">Something went wrong</div>
  `;
};

const showEmptyMessage = () => {
  newsContainer.innerHTML = `
     <div class="bg-red-600 p-3 text-white text-[20px]">No news found for this category</div>
  `;
};

// Init
loadCategory();
