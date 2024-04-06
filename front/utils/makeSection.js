import dayjs from 'dayjs';

// 날짜별로 묶어서 보여주기위해 사용하는 로직 2023-11-1 , 2023-11-2
// 채팅 리스트를 받아와서 그룹화해서 보여줌

export default function makeSection(chatList) {
  const sections = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD'); // dayjs를 사용하여 년, 월, 일을 추출을 해주고
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);  // 기존에 있다면 여기에 추가해주고
    } else {
      sections[monthDate] = [chat]; // 처음에 만들면 여기에 추가함
    }
  });
  return sections;
}