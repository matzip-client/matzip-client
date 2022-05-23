module.exports = {
  singleQuote: true, // '' "" 사용
  printWidth: 100, //  100자 넘으면 자동 줄바꿈
  tabWidth: 2, // 예원님의 취향
  useTabs: false, // D 참이면 탭이있는 줄을 들여 쓰기 합니다.
  semi: true, // 세미콜론 사용
  quoteProps: 'as-needed', // 객체의 속성이 인용 될 때 변경합니다.
  jsxSingleQuote: false, // JSX에서는 큰 따옴표 대신 작은 따옴표를 사용하십시오
  trailingComma: 'es5', // 객체, 배열, 함수 후행에 쉼표를 찍는지 (es5에서 유요한 후행 쉼표 붙임)
  arrowParens: 'always', // arrow function 의 매개 변수 주위에 자동 괄호 생성
  endOfLine: 'lf', // EoF 다루는 방식
  bracketSpacing: true, // 객체 리터널 내부의 공백 제어
  jsxBracketSameLine: false, // jsx 요소 마지막 다음 줄에 닫기 '>'를 표시
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve', // 마크다운에서 공백과 줄바꿈을 랩핑 .. ?
  vueIndentScriptAndStyle: false,
};
