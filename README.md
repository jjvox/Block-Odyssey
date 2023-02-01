# Block-Odyssey
Block-Odyssey coding test

- vite, axios, redux-toolkit 사용 했습니다.
- css는 기타 추가 설치 없이 기본 CSS를 이용 했습니다. 

- 새로고침시 데이터 유지를 위해 평소에 localStorage를 사용 했었습니다. 
그런데 이번 요구 사항에 localStorage 및 redux-persist 사용이 금지 되어 다른 방법을 찾아 봤습니다.
  - 세션 스토리지 / 쿠키
  - react-router 
  - history library 
이렇게 세가지 방식들이 대안으로 나왔지만 세션 스토리지 / 쿠키 는 localStorage와 사용법이 비슷함으로 이를 사용 한다면 의미가 없을것 같았고, 
react-router, history library의 경우 redux-persist처럼 추가 설치가 필요 하기 때문에 사용하지 않았습니다. 

 그래서 위 방식들의 대안으로 history.pushstate와 history.state를 이용 했습니다. 
 덕분에 데이터 유지에 대해 많이 찾아보고 공부가 되었습니다. 


p.s 크롬을 기준으로 제작 하였습니다.
