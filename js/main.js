// elementlarni chaqirib olish

let newsList = $(".news-list");
let newsTemplate = $("#news-template").content;
let newsModal = $("#modal-template").content;
let form = $(".filtering-form");
let searchInput = $(".title-input");
let sortSelect = $(".catigories-select");

// APIni fetch qilish
let FETCH_API = "https://newsapi.org/v2/everything?q=tesla&from=2022-05-02&sortBy=publishedAt&apiKey=011edb543738420787769f6da3577b64"

let callFetch = function (news) {
    fetch(news)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.articles);
            renderNews(data.articles)
            return data.articles;
        })
}
callFetch(FETCH_API);




// templatega element qo'shish
let createNewsElement = (lates, index) => {

    newsList.innerHTML = ""
    let newsElement = newsTemplate.cloneNode(true);



    $(".news-title", newsElement).textContent = lates.title
    $(".news-author", newsElement).textContent = lates.author;

    $(".news-img", newsElement).src = lates.urlToImage;
    $(".news-img", newsElement).alt = lates.title;
    $(".news-date", newsElement).textContent = lates.publishedAt.split("T");
    $(".btn-more-info", newsElement).value = index;
   


    return newsElement;
    
}



// elementlarni render qilish

let renderNews = (news) => {
    let resultFragment = document.createDocumentFragment();
    
    news.forEach((lates) => {
    resultFragment.appendChild(createNewsElement(lates));
})

newsList.appendChild(resultFragment);
}





form.addEventListener("submit", function(evt){
    evt.preventDefault();
  
    
    let searchInputValue = searchInput.value.trim();
    let sortSelectValue = sortSelect.value;
  
    let sortingBy = function(option){
      if(sortSelectValue = "Relevancy"){
        let option = `https://newsapi.org/v2/everything?q=${searchInputValue}&from=2022-05-02&sortBy=Relevancy&apiKey=011edb543738420787769f6da3577b64`;
        return option;
      }else if (sortSelectValue = "Popularity") {
        option = `https://newsapi.org/v2/everything?q=${searchInputValue}&from=2022-05-02&sortBy=Popularity&apiKey=011edb543738420787769f6da3577b64`;
        return option;
      } else if (sortSelectValue = "PublishedAt") {
          option = `https://newsapi.org/v2/everything?q=${searchInputValue}&from=2022-05-02&sortBy=PublishedAt&apiKey=011edb543738420787769f6da3577b64`;
          return option;
      }
    }
    callFetch(sortingBy(FETCH_API));
  })


