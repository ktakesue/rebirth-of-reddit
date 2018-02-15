console.log("SANITY FUCKS");
// variable main body divs //
const main = document.getElementById("mainContent");
const menu = document.getElementById("sideMenu");

// xhr requests for the menu reddits //
getSideMenu(menu);
const redditRequest = function (url) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    getContent(data, main);
  });
  oReq.open("GET", url);
  oReq.send();
  return oReq;
};

// helper function to create elem //
function makeElem(elem, label, inside) {
  const container = document.createElement(elem);
  container.id = label;
  container.innerHTML = inside;

  return container;
}

// sideMenu content //
function getSideMenu(menu) {
  const nav = makeElem("nav", "nav", " ");
  menu.appendChild(nav);

  const ul = makeElem("ul", "ul", " ");
  nav.appendChild(ul);

  const boards = makeElem("li", "boards", "Overwatch League");
  ul.appendChild(boards);

  document.getElementById("boards").addEventListener("click", function () {
    console.log("am i click?");
    redditRequest("https://www.reddit.com/r/Competitiveoverwatch.json");
  });

  const memez = makeElem("li", "memes", "Meme Dreamz");
  ul.appendChild(memez);

  document.getElementById("memes").addEventListener("click", function () {
    console.log("am i click?");
    redditRequest("https://www.reddit.com/r/Overwatch_Memes.json");
  });

  const consolez = makeElem("li", "consolez", "Console Gaming");
  ul.appendChild(consolez);

  document.getElementById("consolez").addEventListener("click", function () {
    console.log("am i click?");
    redditRequest("https://www.reddit.com/r/OWConsole/.json");
  });
}
// main content display area //
function getContent(data, info) {
  const content = makeElem("div", "content", " ");

  const dataType = data.data.children;

  dataType.forEach(function (data) {
    const square = makeElem("div", "square", " ");
    content.appendChild(square);

    const picture = makeElem("img", "picture", " ");

    if (
      data.data &&
      data.data.preview &&
      data.data.preview.images[0] &&
      data.data.preview.images[0].source &&
      data.data.preview.images[0].source.url
    ) {
      const pictureUrl = data.data.preview.images[0].source.url;
      picture.setAttribute("src", pictureUrl);
    } else {
      picture.setAttribute("src", "/public/assets/well-played.png");
    }
    square.appendChild(picture);

    const titleInfo = data.data.title;
    const title = makeElem("div", "title", titleInfo);
    square.appendChild(title);
  });
  info.innerHTML = "";
  info.appendChild(content);
}
// display default feed content //
redditRequest("https://www.reddit.com/r/Overwatch.json");