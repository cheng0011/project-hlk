import React from "react";

import bad from "../../assets/icons/bad.png";
import good from "../../assets/icons/good.png";

import "./safeDay.less";

const ImgShow = ({ safeList, number }) => {
  let imgUrl = good;
  let text = "安全事故：0";
  safeList.forEach((item) => {
    if (item.date === number && item.eventNum > 0) {
      imgUrl = bad;
      text = `安全事故：${item.eventNum}`;
    };
  });
  return (
    <img src={imgUrl} alt="" title={text} />
  );
};

const SafeDay = ({ safeDataList, selectDateTime }) => {
  const newSafeList = safeDataList.map((item) => {
    const date = Number(item.businessDate.split(" ")[0].split("-").pop());
    return { date, eventNum: item.eventNum };
  });
  const selectDay = selectDateTime ? selectDateTime.split(" ")[0].split("-").pop() : new Date().getDate();
  let timeArray = [];

  // 获取当月的天数
  let days = null;
  if (selectDateTime) {
    timeArray = selectDateTime.split(" ")[0].split("-");
    days = new Date(timeArray.shift(), timeArray.shift(), 0).getDate();
  } else {
    days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  }
  const list = [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10, 11, 12, 13], [14, 15, 16, 17, 18, 19, 20], [21, 22, 23, 24, 25, 26, 27], [28, 29, 30], [31, 32, 33]];
  return (
    <div className="safe-table">
      {
        list.map((item, index) => {
          return (
            <div className={`day-group day-group-${index}`}>
              {item.map((i) => {
                return (
                  <div className={`block block-${i}`}>
                    {i <= selectDay ? <ImgShow safeList={newSafeList} number={i} /> : <span>{i > days ? "" : i}</span>}
                  </div>
                );
              })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default SafeDay;
