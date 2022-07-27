const pagination = document.querySelector(".pagenation-wrap");
const output = document.querySelector(".card-wrap");
// 공공 데이터 가져오기
let queryParams = `?${encodeURIComponent(
  "serviceKey"
)}=${"6Cj0pYEsAaNPo5HZ6LyDA12xevEBvR9DiavPl0UH5DABo4Gzh0Wzh9493PQW30s5y46xfyw2F6TTH9RCFoNZsA=="}`; //서비스 키(Decoding)
queryParams += `&${encodeURIComponent("pageNo")}=${encodeURIComponent("1")}`;
queryParams += `&${encodeURIComponent("numOfRows")}=${encodeURIComponent(
  "50"
)}`;
queryParams += `&${encodeURIComponent("resultType")}=${encodeURIComponent(
  "json"
)}`;

const dataObj = {
  datasPerPage: 9,
  currentPage: 1,
  datas: null,
};

window.addEventListener("load", () => {
  init();
});

// 책 앞에 Fetch 예제를 이용하여 데이터 가져오기
async function init() {
  try {
    const foods = await fetch(
      `http://apis.data.go.kr/6260000/FoodService/getFoodKr${queryParams}`
    ).then((res) => res.json());
    dataObj.datas = foods.getFoodKr.item;
    loadPage(9);
  } catch (err) {
    console.error(err);
  }
}

// 페이지를 로딩하는 함수입니다.
function loadPage(page) {
  dataObj.currentPage = page;

  let startPost = (dataObj.currentPage - 1) * dataObj.datasPerPage;

  let totalPages = Math.ceil(dataObj.datas.length / dataObj.datasPerPage);

  let endPost =
    startPost + dataObj.datasPerPage > dataObj.datas.length
      ? dataObj.datas.length
      : startPost + dataObj.datasPerPage;

  output.innerHTML = "";

  // 받아온 데이터를 순환합니다.
  for (let i = startPost; i < endPost; i++) {
    console.log(dataObj.datas[i]);
    let item = dataObj.datas[i];

    let card = document.createElement("article");
    card.innerHTML = `
      <div class="card">
      <span class="gu-name" id="gugun_name">${item.GUGUN_NM}</span>
      <img src=${item.MAIN_IMG_NORMAL} alt="맛집 사진" class="main-img" id="main-img-thumb" >
      <div class="main-info">
      <strong class="main-title" id="main-title">${item.MAIN_TITLE}</strong>
      <strong class="main-tel" id="cntct-tel">${item.CNTCT_TEL}</strong>
      </div>
      <p class="content" id="itemcntnts">${item.ITEMCNTNTS}</p>
      <dl class="info-list">
        <dt class="info-addr">주 소</dt>
        <dd id="addr1">${item.ADDR1}</dd>
      </dl>
      <dl class="info-list">
        <dt>영업시간</dt>
        <dd id="usage-day-week-and-time">${item.USAGE_DAY_WEEK_AND_TIME}</dd>
      </dl>
      <dl class="info-list">
        <dt>대표메뉴</dt>
        <dd id="rpesntv-menu">${item.RPRSNTV_MENU}</dd>
      </dl>
      <img class="like-wrap" src="./src/images/icon/heart-full.svg" alt="좋아요">
    </div>
      `;
    output.append(card);
  }

  paginationMaker(totalPages);
}

function paginationMaker(totalPages) {
  pagination.innerHTML = "";
  const container = document.createDocumentFragment();

  for (let i = 0; i < totalPages; i++) {
    const item = document.createElement("li");
    item.textContent = i + 1;
    item.addEventListener("click", () => {
      loadPage(i + 1);
    });

    if (i + 1 === dataObj.currentPage) {
      item.classList.add("active");
    }
    container.append(item);
  }
  pagination.append(container);
}
