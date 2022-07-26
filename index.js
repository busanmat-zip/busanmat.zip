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
async function getData() {
  try {
    const foods = await fetch(
      `http://apis.data.go.kr/6260000/FoodService/getFoodKr${queryParams}`
    ).then((res) => res.json());
    const foodList = foods.getFoodKr.item;
    foodList.map((item, index) => {
      console.log(
        `${index + 1}번째 맛집은 ${item.MAIN_TITLE}입니다.
      주소: ${item.ADDR1}
      전화번호: ${item.CNTCT_TEL}
      설명: ${item.ITEMCNTNTS}
      대표 이미지: ${item.MAIN_IMG_NORMAL}`
      );
    });
  } catch (err) {
    console.error(err);
  }
}
getData();
