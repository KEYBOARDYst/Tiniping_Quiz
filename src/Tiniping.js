import { useEffect, useRef, useState } from "react";
import "./tiniping.css";
const { Kakao } = window;
export function Tiniping() {
  const [tinipings, setTiniping] = useState([]);

  useEffect(() => {
    fetch("/tiniping/tinipings.json")
      .then((response) => response.json())
      .then((data) => setTiniping(data))
      .catch((error) => console.error("Error fetching 1_cube data:", error));
  }, []);

  /* 1. 초기 HTML 구조 세팅 */
  const [time, setTime] = useState(3);
  const [selectTime, setSelectTime] = useState(3);
  const [category, setCategory] = useState("all");
  const [questionNum, setQuestionnum] = useState(10);

  /* 2. 시작 버튼 클릭 후 문제 생성 후 문제 보여주기 */
  const [isStart, setIsStart] = useState(false);
  const [questions, setQuestions] = useState([]); // 문제 목록
  const [num, setNum] = useState(0); // 문제 번호
  function getRandomElements(arr, count) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }
  useEffect(() => {
    if (!isStart) setQuestions([]);
    else {
      let questionList = [];

      if (category == "all") {
        questionList = tinipings["cube"].concat(
          tinipings["jewel"],
          tinipings["key"],
          tinipings["dessert"],
          tinipings["villain"]
        );
      } else questionList = tinipings[category];

      if (questionList.length > questionNum) {
        setQuestions(getRandomElements(questionList, questionNum));
      } else setQuestions(getRandomElements(questionList, questionList.length));
    }
  }, [isStart]);

  /* 3. 정답 입력 후 정/오답 체크 + 카운트다운 */
  const [isCountdown, setIsCountdown] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);
  useEffect(() => {
    if (selectTime == null) return;
    else {
      if (isCountdown && isCorrect === 0) {
        if (time > 0) {
          const timerId = setTimeout(() => setTime(time - 1), 1000);
          return () => clearTimeout(timerId);
        } else {
          setIsCountdown(false);
          setIsCorrect(-1);
          setTime(selectTime);
        }
      }
    }
  }, [selectTime, isCountdown, time, isCorrect]);

  const input = useRef(null);
  const [score, setScore] = useState(0);
  function sendAnswer() {
    if (!input.current) return;

    const answer = input.current.value;
    if (answer == questions[num]) {
      setIsCorrect(1);
      setScore(score + 1);
      if (selectTime != null) {
        setTime(selectTime);
        setIsCountdown(true);
      }
      nextQuestion();
    } else {
      calculateResult();
      setIsCorrect(-1);
      if (selectTime != null) {
        setIsCountdown(false);
        setTime(selectTime);
      }
    }
  }

  // 4. 게임 종료 후 결과 발표
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState({
    title: "0점",
    desc: "우리 남아서 티니핑 공부할까?",
    img: "https://drive.google.com/uc?export=view&id=1zryy4-8fRKxICskty9FaQZa010_VuKPg",
  });
  function calculateResult() {
    const resultScore = Math.round((100 / questions.length) * score);

    if (resultScore == 0) {
      setResult({
        title: "0점",
        desc: "우리 남아서 티니핑 공부할까?",
        img: "https://drive.google.com/uc?export=view&id=1zryy4-8fRKxICskty9FaQZa010_VuKPg",
      });
    } else if (resultScore < 21)
      setResult({
        title: "티.알.못.",
        desc: "당신은 티.알.못. 열심히 공부하던가 아니면 그냥 포기하는 건 어때요?",
        img: "https://drive.google.com/uc?export=view&id=1opSEBZVKBtqdzlYihFXAde0kaFqZr3KA",
      });
    else if (resultScore < 41)
      setResult({
        title: "티니핑 초짜",
        desc: "티니핑에 이제 막 발 담근 초짜의 향기가 나네요...... 아는 척은 금지!",
        img: "https://drive.google.com/uc?export=view&id=1n2W9AYBvNwzv__GVRQ3FG56WMKALVM_9",
      });
    else if (resultScore < 61)
      setResult({
        title: "어설픈 덕후",
        desc: "티니핑에 대해 조금 알긴 아는군요. 하지만 진짜 팬이라고 하기엔 어딘가 아쉬운....?",
        img: "https://drive.google.com/uc?export=view&id=1eaLYiImuQCHCBpWINcMpHyOGNHYYME3L",
      });
    else if (resultScore < 81)
      setResult({
        title: "티.잘.알.",
        desc: "오, 이제 좀 아네요! 티니핑 박사에 한발짝 다가가셨습니다.",
        img: "https://drive.google.com/uc?export=view&id=1uYSCbBQd7U2mxffo6Q89spAvKWr3qu3R",
      });
    else if (resultScore < 100)
      setResult({
        title: "티니핑 척척박사",
        desc: "티니핑에 대해 꽤 깊은 지식을 자랑하는군요. 이제 이 정도면 전문가 수준!",
        img: "https://drive.google.com/uc?export=view&id=1YDIHeAVS5xqsLQnkJJ2GPlom5qSs9ULX",
      });
  }
  function nextQuestion() {
    if (num == questions.length - 1) {
      calculateResult();
      setIsFinish(true);
      setResult({
        title: "티니핑 원작자?!",
        desc: "혹시 티니핑을 직접 만드신 건 아닌가요? 완벽한 티니핑 마스터 인정!",
        img: "https://drive.google.com/uc?export=view&id=1i5FWnZHeAzHM2kwTLldrWmGj95vxYosD",
      });
    } else {
      input.current.value = "";

      setTimeout(() => {
        setIsCorrect(0);
      }, 1000);

      setNum(num + 1);
    }
  }

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_KEY);
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `당신은 ${result.title}`,
        description: result.desc,
        imageUrl: result.img,
        link: {
          mobileWebUrl: process.env.REACT_APP_URL,
          webUrl: process.env.REACT_APP_URL,
        },
      },
      buttons: [
        {
          title: "나도 도전하기",
          link: {
            mobileWebUrl: process.env.REACT_APP_URL,
            webUrl: process.env.REACT_APP_URL,
          },
        },
      ],
    });
  };

  return (
    <div className="container">
      <div className="top-container">
        <h2>캐치! 티니핑 맞추기</h2>
        <p>
          제한시간은
          <select
            className="toggle-select"
            defaultValue={3}
            onChange={(e) => {
              setSelectTime(
                e.target.value === "null" ? null : parseInt(e.target.value)
              );
              setTime(
                e.target.value === "null" ? null : parseInt(e.target.value)
              );
            }}
          >
            <option value={1}>1초</option>
            <option value={2}>2초</option>
            <option value={3}>3초</option>
            <option value={4}>4초</option>
            <option value={5}>5초</option>
            <option value={10}>10초</option>
            <option value={"null"}>무제한 모드</option>
          </select>
          입니다.
        </p>
        <div className="dropdown">
          <select
            className="toggle-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="cube">1기 - 큐브 티니핑</option>
            <option value="jewel">2기 - 보석 티니핑</option>
            <option value="key">3기 - 열쇠 티니핑</option>
            <option value="dessert">4기 - 디저트 티니핑</option>
            <option value="villain">빌런 티니핑</option>
          </select>
          <select
            className="toggle-select"
            value={questionNum}
            onChange={(e) => setQuestionnum(e.target.value)}
          >
            <option value={10}>10개</option>
            <option value={20}>20개</option>
            <option value={30}>30개</option>
            <option value={50}>50개</option>
          </select>
        </div>
      </div>
      <div className="center-container">
        <div className="box">
          {!isStart ? (
            <div className="img-box">사진</div>
          ) : (
            <>
              <p className="number">
                {num + 1}/{questions.length}
              </p>
              <img src={`/tiniping/${questions[num]}.webp`} />
            </>
          )}
        </div>
        <div className="box">
          {isFinish ? (
            <>
              <p className="finish-message">
                100점 만점!
                <br />
                설마 당신은 티니핑 원작자?!
              </p>
              <div className="finish-button">
                <button
                  className="kakao-button"
                  onClick={() => {
                    shareKakao();
                  }}
                >
                  카카오톡 공유하기
                </button>
                <button
                  className="pink-button"
                  onClick={() => {
                    setIsFinish(false);
                    setIsStart(false);
                    setScore(0);
                    setNum(0);
                    setIsCorrect(0);
                  }}
                >
                  재도전
                </button>
              </div>
            </>
          ) : !isStart ? (
            <div className="button-container">
              <button
                className={`start-button`}
                onClick={() => {
                  setIsStart(true);
                  if (selectTime != null) setIsCountdown(true);
                }}
              >
                START
              </button>
            </div>
          ) : (
            <>
              <p className="score">
                현재 점수 : {Math.round((100 / questions.length) * score)}점
              </p>
              <div className="result">
                {isCorrect == -1 ? (
                  <>
                    <div>
                      <p className="result-text">땡!</p>
                      <p className="">
                        정답은 {questions[num]}
                        <p>내가 입력한 답 : {input.current?.value}</p>
                      </p>
                      <p className="answer">
                        당신은 <strong>{result.title}</strong>
                      </p>
                    </div>
                    <div>
                      <button
                        className="kakao-button"
                        onClick={() => {
                          shareKakao();
                        }}
                      >
                        카카오톡 공유하기
                      </button>{" "}
                      <button
                        className="pink-button"
                        onClick={() => {
                          setIsFinish(false);
                          setIsStart(false);
                          setScore(0);
                          setNum(0);
                          setIsCorrect(0);
                        }}
                      >
                        다시 시작하기
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <p> {isCorrect == 1 && "통과!"}</p>
                    {time != null && <p className="result-text">{time}</p>}
                  </div>
                )}
              </div>

              {isCorrect != -1 && (
                <div style={{ display: "flex" }}>
                  <input
                    ref={input}
                    type="text"
                    className="answer-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendAnswer();
                    }}
                  />
                  <button className="pink-button" onClick={sendAnswer}>
                    ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
