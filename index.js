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

// 책 앞에 Fetch 예제를 이용하여 데이터 가져오기
let foodList = [];
async function getData() {
  try {
    const foods = await fetch(
      `http://apis.data.go.kr/6260000/FoodService/getFoodKr${queryParams}`
    ).then((res) => res.json());
    foodList = foods.getFoodKr.item;
    setFoodCard();
  } catch (err) {
    console.error(err);
  }
}
getData();
const indexNum = +location.pathname.slice(6, 7);

function setFoodCard() {
  for (let i = 9 * (indexNum - 1); i < 9 * indexNum; i++) {
    let item = foodList[i];
    document.querySelector(".card-wrap").insertAdjacentHTML(
      "beforeend",
      `
    <div class="card">
            <span class="gu-name" id="gugun_name">${item.GUGUN_NM}</span>
            <img src=${item.MAIN_IMG_NORMAL} alt="맛집 사진" class="main-img" id="main-img-thumb" >
            <div class="main-info">
            <strong class="main-title" id="main-title">${item.MAIN_TITLE}</strong>
            <strong class="main-tel" id="cntct-tel">${item.CNTCT_TEL}</strong>
            </div>
            <p class="content" id="itemcntnts">${item.ITEMCNTNTS}</p>
            <dl class="info-list">
              <div class="info-wrap">
                <dt class="info-addr">주 소</dt>
                <dd id="addr1">${item.ADDR1}</dd>
              </div>
              <div class="info-wrap">
                <dt>영업시간</dt>
                <dd id="usage-day-week-and-time">${item.USAGE_DAY_WEEK_AND_TIME}</dd>
              </div>
              <div class="info-wrap">
                <dt>대표메뉴</dt>
                <dd id="rpesntv-menu">${item.RPRSNTV_MENU}</dd>
              </div>
            </dl>
            <img class="like-wrap" src="./src/images/icon/heart-full.svg" alt="좋아요">
          </div>
    `
    );
  }
}
