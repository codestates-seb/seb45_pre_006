// 날짜 포맷팅 함수
//  Feb 16, 2015 at 21:29  << 이런형식
export default function getWriteDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: false,
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  const time = new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate}, at ${time}`;
}
