const icon = document.getElementById("icon");
const btn = document.getElementById("btn");
const menu = document.getElementById("menu");
var count = 0, r, g, b, rgb, quoteText, quoteAuthor, quoteTag;
let realData = "";
function themechange() {
  count++;
  if (count % 2 == 0) {
    //Light Theme
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    document.documentElement.style.setProperty("--surface", "#ffffff");
    document.documentElement.style.setProperty("--secondary", "#000000");
  } else {
    //Dark Theme
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    document.documentElement.style.setProperty("--surface", "#121212");
    document.documentElement.style.setProperty("--secondary", "#ffffff");
  }
}


const getQuotes = async (tag="money") => {
  //var api = "https://goquotes-api.herokuapp.com/api/v1/all/quotes";
  var api = "https://goquotes-api.herokuapp.com/api/v1/all?type=tag&val="+tag;
  try {
    let data = await fetch(api);
    realData = await data.json();
    realData = realData.quotes;
    //   console.log(realData);
    getNewQuotes();
  } catch (error) {}
};

const getNewQuotes = () => {
  let random = Math.floor(Math.random() * realData.length);
  // let quote = realData[random];
  // console.log(realData[random].tag);
  quoteText = realData[random].text;
  quoteAuthor = realData[random].author;
  quoteTag = realData[random].tag;
//   console.log(quoteText, quoteAuthor, quoteTag);
  document.getElementById("quote").textContent = quoteText;
  document.getElementById("author").textContent = quoteAuthor;
};
btn.addEventListener("click", () => {
  let randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  r = randomBetween(0, 255);
  g = randomBetween(0, 255);
  b = randomBetween(0, 255);
  rgb = `rgb(${r},${g},${b})`;
  document.documentElement.style.setProperty("--primary", rgb);
  getNewQuotes();
  document.getElementById("list").querySelectorAll("p").forEach((p)=>{
        p.style.opacity = "0.8";
    })
});
getQuotes();
document.getElementById("ham").addEventListener("click", () => {
  menu.style.transform = "translateX(0)";
  document.getElementById("ham").style.display = "none";
});
document.getElementById("close").addEventListener("click", () => {
  menu.style.transform = "translateX(-250px)";
  document.getElementById("ham").style.display = "block";
});

const getTags = async () => {
  var api = "https://goquotes-api.herokuapp.com/api/v1/all/tags";
  try {
    let tagdata = await fetch(api);
    realtagData = await tagdata.json();
    realtagData = realtagData.tags;
    console.log(realtagData);
  } catch (error) {}
  for (let i = 0; i < realtagData.length; i++) {
    let tag = document.createElement("p");
    tag.textContent = realtagData[i].name;
    tag.addEventListener("click", function(){
      getQuotes(realtagData[i].name);
      this.parentElement.querySelectorAll("p").forEach((p)=>{
        p.style.opacity = "0.8";
      })
      this.style.opacity = "1";
    })
    document.getElementById("list").appendChild(tag);
    // tag.addEventListener("click", () => {});
  }
};
getTags();