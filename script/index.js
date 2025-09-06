// promise -> pending, resolve(success), reject(error)
const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer");
const bookmarkCount = document.getElementById('bookmarkCount')
const newsDetailsModal = document.getElementById('news-details-modal')
const modalContainer = document.getElementById('modalContainer')

let bookmarks = [];

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      //   console.log(categories)
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
            <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
        `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });

    if (e.target.localName === "li") {
      //   console.log(e.target.id);
      showLoading()
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  //   console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
       showError()
    });
};

const showNewsByCategory = (articles) => {
    
    if(articles.length === 0) {
        showEmptyMessage()
        // alert('No news found for this category!')
       return 
    }
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
        <div class="border  border-gray-300 rounded-lg">
            <div>
             <img src="${article.image.srcset[5].url}"/>
            </div>
            <div id="${article.id}" class="p-2">
                <h1 class="font-extrabold">${article.title}</h1>
            <p class="text-sm">${article.time}</p>
                 <div class="flex justify-between items-center">
                 <button class="btn">Bookmark</button>
                   <button class="btn">View Details</button>
                   </div>
            </div>
        </div>
        `;
  });
};

newsContainer.addEventListener("click", (e) => {
  // console.log(e.target)
  // console.log(e.target.innerText)
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e);
  }

  if (e.target.innerText === "View Details") {
    handleViewDetails(e)
  }
});

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;

  bookmarks.push({
    title: title,
    id: id,
  });

  showBookmarks(bookmarks);
  
};

const showBookmarks = (bookmarks) => {
    console.log(bookmarks)
    bookmarkContainer.innerHTML = ""
    bookmarks.forEach(bookmark => {
        bookmarkContainer.innerHTML += `
        <div class="border my-2 p-1">
            <h1>${bookmark.title}</h1>
            <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
        </div>
        `
    })

    bookmarkCount.innerText = bookmarks.length
};

const handleDeleteBookmark = (bookmarkId) => {
   const filteredBookmarks =  bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
   bookmarks = filteredBookmarks
   showBookmarks(bookmarks)

} 

handleViewDetails = (e) => {
const id = e.target.parentNode.id;
  
  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
  .then(res=> res.json())
  .then(data => {
    console.log(data)
    showDetailsNews(data.article)

  })
  .catch(err => {
    console.log(err)
  })

}

const showDetailsNews = (article) => {
    newsDetailsModal.showModal()
    modalContainer.innerHTML = `
            <h1>${article.title}</h1>
            <img src="${article.images[0].url}"/>
            <p>${article.content.join("")}</p>
    `
}

const showLoading = () => {
    newsContainer.innerHTML = `
     <div class="bg-green-600 p-3 text-white ">Loading...</div>
    `
}

const showError = () => {
    newsContainer.innerHTML = `
     <div class="bg-red-600 p-3 text-white text-[20px]">Something went wrong</div>
    `
}

const showEmptyMessage = () => {
          newsContainer.innerHTML = `
     <div class="bg-red-600 p-3 text-white text-[20px]">No news found for this category</div>
    `
}
loadCategory();
loadNewsByCategory("main");

// const loadCategoryAsync = async () => {
//   try {
//     const res = await fetch("https://news-api-fs.vercel.app/api/categorie");
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadCategoryAsync();
