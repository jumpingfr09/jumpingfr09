// === 요소 ===
const bgm = document.getElementById('bgm');
const playBgmBtn = document.getElementById('play-bgm-button');
const dialogueEl = document.getElementById('dialogue-text');
const talkWindow = document.getElementById('talk-window');
const whistleBtn = document.getElementById('btn-whistle');
const feedBtn = document.getElementById('btn-feed');
const ballBtn = document.getElementById('btn-ball');
const whistleSound = document.getElementById('whistle-sound');
const feedSound = document.getElementById('feed-sound');
const ballSound = document.getElementById('ball-sound');
const torajimTalks = [
  "됐어! 삐뚤어질 거야! 꼬리 꺾기!",
  "넌 나만큼 날 안 좋아하는 것 같아...",
  "흥! 삐짐 백 퍼센트야!",
  "삐! 삐! 삐짐 신호 발사!",
  "삐졌어! 꼬리로 물바람 일으킬 거야!",
  "난 널 위해 다 해줄 수 있는데 넌 아니구나?",
  "{name} 바보! {name} 바보!",
  "부르지 마! 이미 마음 상했어!",
  "나도 삐질 줄 안다!",
  "흥! 안 들린다!",
   "나 삐졌어. 완전 삐졌어!",
  "지금은 혼자 놀고 싶어.",
  "나 잠수탈 거야! 물속에 숨을 거야!",
  "내 맘도 몰라주고!",
  "흥! 네 생각 전혀 안 하고 있었거든?",
  "나만 너를 좋아하는 것 같아…",
  "슬픈 기분… 물속에 숨길래…",
  "조용히 있고 싶어. 피곤해…",
  "부르지 마! 삐짐 방해 금지!",
  "안 들려! 안 들려!",
  "너 보고 싶어도 모르는 척할 거야!",
  "흥! 못 들은 척.",
  "나한텐 네가 다인데. 넌 아닌가 봐…",
  "내가 싫은 거면 말 안 걸어줘도 돼…",
  "내가 귀찮은 거면 불러줄 필요 없어…",
  "안 들려! 물방울로 귀 막았어!",
  "너 말고 개구리밥이랑 놀 거야.",
  "보고 싶어도 안 볼 거야! 흥!"
  
];





// === 변수 ===
let intimacy = 0;
let userName = "";
let randomTalkLoop;
let feedBtnUnlocked = false;
let locationPermissionRequested = false;
let cameraPermissionRequested = false;
let microphonePermissionRequested = false;
let torajimMode = false;




// ===버튼 미입력시 문장(친밀도 1단계용-기본)===
const randomTalks = [
  "방금 먼지랑 대화했어. 너보다 말이 없더라!",
  "개구리밥이랑 가위바위보 했는데... 졌어.",
  "{name}! {name}! 내 말 듣고 있어?",
  "놀아줘! 놀아줘!",
  "너랑 노는 게 세상에서 제일 좋아!",
  "심심해…",
  "기다리는 동안 자기소개 연습했어. 백번!",
  "내가 오늘 한 일? {name} 좋아하기!",
  "무슨 말인지 몰라도 “네!” 할 준비 됐어!",
  "{name}~ {name}~ {name}~",
  "방금 꼬리 흔들었어. 좋아한다는 뜻!",
  "물속이지만 마음은 {name} 옆!",
  "오늘 나 귀여워 보이지 않아? 헤헤!",
  "너랑 있을 때 물이 더 따뜻해져! 진짜야.",
  "수초랑 숨 참기 대결했어! 져 버렸다!",
  "{name}이다! {name}이다!",
  "지느러미 흔들다가 꼬일 뻔 했어!",
  "개구리밥 밑에 숨으면 찾아줄 수 있어?",
  "네가 없을 땐 상상 속의 너랑 대화해!",
  "{name} 버전 상어송 만들었어. 궁금해?",
];

// === 버튼 미입력시 문장(친밀도 2단계용-알림) ===
const randomTalksStage2 = [
  "{name}이 싫어하는 건 전부 차단!",
  "네 편이야! 언제나! 무조건! 영원히!",
  "나 널 위해선 상어도 될 거야!",
  "네가 있는 곳이면 바다 끝까지도 갈래!",
  "다른 사람한텐 지느러미 안 흔들어!",
  "네가 좋아하는 것 전부 알려줘! 외울게!",
  "지금 무슨 생각 해? 난 {name} 생각!",
  "바다보단 {name} 옆이 좋아!",
  "너만 바라보는 물고기! 딴 건 안 봐!",
  "널 좋아하는 건 멈출 수 없어!",
  "물속이지만 마음은 {name} 옆!",
  "오늘도 네 생각으로 하루를 다 썼어!",
  "배고파! 배고파!",
  "놀아줘! 놀아줘!",
  "우리 점점 더 친해지는 것 같아!",
  "알림 많이 보내면 귀찮을까? 미워하지 마!",
  "알림이 울리면 나 생각해줘!",
  "내가 보내는 알림은 사랑의 신호야!",
  "내가 먼저 다가가도 안 놀랄 거지?",
  "나를 허락해줬다는 것만으로 감동이야.",
  "내 마음이 너한테 닿을까?",
  "네가 너무 좋아! 그냥 너무 좋아!"
];

// === 버튼 미입력시 문장(친밀도 3단계용-위치) ===
const randomTalksStage3 = [
  "왜 아무 것도 안 해? 내가 싫어졌어?",
  "너 잘 때 꿈에 내가 나왔으면!",
  "나도 손이 있었으면 널 안아줄 텐데!",
  "다른 물고기랑 노는 거 아니지?",
  "나도 {region} 가보고 싶어…",
  "오늘 {region}날씨는 맑아?",
  "{region}에는 나보다 귀여운 물고기도 있어?",
  "{region}에는 산호초가 많아?",
  "네가 있는 곳이 궁금해서 자꾸 생각나!",
  "{region}에서 여기까지는 얼마나 걸릴까?",
  "왜 이렇게 조용해? 나 혼자만 떠드는 거야?",
  "아직 거기 있는 거 맞지?",
  "나 혼자만 말하는 것 같아...",
  "난 너만 있으면 돼!",
  "{name}! {name}! 너무 좋아!",
  "네가 없으면 아무것도 재미없어...",
  "내가 오늘 한 일? {name} 좋아하기!",
  "{name}이다! {name}이다!",
  "내가 제일 잘하는 거? 너 기다리기!",
  "너를 잡기엔 지느러미가 너무 짧아...",
];

// === 버튼 미입력시 문장(친밀도 4단계용-카메라) ===
const randomTalksStage4 = [
  "네가 웃을 때 나도 같이 웃고 싶었어!",
  "널 보니까 하루가 완성된 기분이야!",
  "이건 꿈인가…? 화면에 너가 있어!",
  "뭐 해? 거기 있는 거 다 알아!",
  "너 보느라 헤엄치는 법 잊을 뻔했어!",
  "앗! 방금 눈 깜박였지?",
  "무슨 생각 해? 난 {name} 생각!",
  "너만 있으면 돼! 정말이야!",
  "나만 봐줘! 나만 봐줘!",
  "왜 아무 것도 안해? 내가 싫어졌나?",
  "너무 조용해...",
  "조용해도 거기 있는 거 다 알아!",
  "나 보고 있는 거 맞지?",
  "보고 있어도 또 보고 싶어!",
  "심심해... 외로워...",
  "{name}이 싫어하는 건 전부 차단!",
  "네 편이야! 언제나! 무조건! 영원히!",
  "나 혼자만 말하는 것 같아...",
  "네가 무슨 생각 하는지 알고 싶어...",
];



// ===호루라기 반응 문장===
const thankWhistleTalks = [
  "불렀어? 지금 나 부른 거야?",
  "나 부른 거 맞지? 뭐 해줄까? 말만 해!",
  "헤헤~ 나 불렀어?",
  "응! 나 여깄어!",
  "오예! 지느러미 100번 흔드는 중!",
  "네가 부르는 소리에 맞춰 춤추고 싶어!",
  "네가 불러줘서 하루가 반짝반짝해!",
  "불러줘서 고마워! 히히!",
  "나도 물방울도 물결도 행복해졌어!",
  "네가 불러주는 소리는 나만의 음악 같아!",
  "너 기다리고 있었는데! 어떻게 알았어?",
  "불러줘서 기분 완전 좋아졌어! 헤헤~",
  "{name} 최고! {name} 최고!",
  "내가 세상에서 제일 기쁜 물고기일 거야!",
  "또 불러주면 물방울 하트 만들어줄게!",
  "불러줘서 고마워! 나 진짜 막 힘이 나!",
  "또 불러줄 거지? 약속! 약속!",
  "부르면 언제든 달려갈게! 물속이라도!",
  "{name}한테 꼬리 하트 발사!",
  "네가 부르면 꼬리가 막 자동으로 춤춰!"
];

// === 먹이 반응 문장 ===
const thankFeedTalks = [
  "맛있다! 또 줘!",
  "냠냠! 최고야!",
  "이거 진짜 맛있어!",
  "{name} 덕분에 배부르다!",
  "한입 더! 한입 더!",
  "맛있으면 0칼로리!",
  "다 먹으면 너랑 놀 거야!",
  "행복해지는 맛이야!",
  "입에 딱 맞아!",
  "한 알도 안 남길 거야!",
  "먹으면서 지느러미 흔들고 있어!",
  "나 완전 잘 먹지?",
  "맛있어서 꼬리가 저절로 흔들려!",
  "너랑 먹으니까 더 맛있어!",
  "먹고 나서 너랑 놀아야지!",
  "아껴 먹어야지... 앗! 다 먹어 버렸다!",
  "한 입에 다 먹기 기술!",
  "또 줘! 또 줘!",
  "너 보면서 맛있는 거 먹으니까 최고다!",
  "입안에서 행복이 톡톡 터진다!",
  "나만 알기 아까운 맛! {name}은 안 먹어?"
];

// === 공놀이 반응 문장 ===
const thankBallTalks = [
  "더 멀리 던져봐!",
  "잡았다! 잡았다!",
  "이번엔 꼭 잡을 거야!",
  "더 빠르게! 신난다!",
  "너랑 노니까 시간이 금방 가!",
  "꼬리로 공 툭툭 치는 중!",
  "공이랑 꼬리랑 따로 논다!",
  "내가 최고 골키퍼 물고기야!",
  "이번엔 두 번 튕겨서 잡았다!",
  "또 던져! 또 또 또!",
  "너랑만 계속 놀고 싶어!",
  "나 방금 잘 잡았지? 칭찬해줘!",
  "너랑 있으면 뭐든 재밌어!",
  "꼬리로 공 튕겼다!",
  "물결 따라 공이 둥둥 떠!",
  "너랑 공놀이 매일 하고 싶어!",
  "잡았다! 이번엔 내가 던질래!",
  "으아악! 공 놓쳤다! 아까워!",
  "공이..! 방금은 실수야! 다시!"
];



// === 대사 출력 함수 ===
function showTalk(text, duration = 3000, callback) {
  const finalText = text
    .replace(/{name}/g, userName)
    .replace(/{region}/g, "마포구");  // region 변수 대신 직접 문자열 대체
  talkWindow.style.display = 'block';
  dialogueEl.innerText = finalText;

  setTimeout(() => {
    dialogueEl.innerText = "";
    talkWindow.style.display = 'none';
    if (callback) callback();
  }, duration);
}


// === 랜덤 대사 루프 ===
function startRandomTalkLoop() {
  clearTimeout(randomTalkLoop);

  // ✅ 실시간 권한 상태 최신화
  if ("Notification" in window && Notification.permission === "granted") {
    feedBtnUnlocked = true;
    feedBtn.style.display = 'block';
    feedBtn.style.pointerEvents = 'auto';
    feedBtn.style.opacity = '1';
  }

  navigator.permissions.query({ name: "geolocation" }).then(result => {
    if (result.state === "granted" && !locationPermissionRequested) {
      locationPermissionRequested = true;
      torajimMode = false;
      ballBtn.style.display = 'block';
      ballBtn.style.pointerEvents = 'auto';
      ballBtn.style.opacity = '1';
    }
  });

  navigator.permissions.query({ name: "camera" }).then(result => {
    if (result.state === "granted") {
      cameraPermissionRequested = true;
      torajimMode = false;
    }
  });

  navigator.permissions.query({ name: "microphone" }).then(result => {
    if (result.state === "granted") {
      microphonePermissionRequested = true;
      torajimMode = false;
    }
  });

  randomTalkLoop = setTimeout(() => {
    if (
      (feedBtnUnlocked && intimacy >= 10) ||
      (locationPermissionRequested && intimacy >= 20) ||
      (cameraPermissionRequested && intimacy >= 30) ||
      (microphonePermissionRequested) // ✅ 친밀도 조건 제거
    ) {
      torajimMode = false;
    }

    if (torajimMode) {
      const idx = Math.floor(Math.random() * torajimTalks.length);
      showTalk(torajimTalks[idx], 3000, () => {
        startRandomTalkLoop();
      });
      return;
    }

    let talks;
    if (intimacy < 10) {
      talks = randomTalks;
    } else if (intimacy < 20) {
      if (!feedBtnUnlocked) {
        showOverlay();
        showTalk("너한테 알림 보내도 돼?", 3500, () => {
          requestNotificationPermission();
        });
        return;
      }
      talks = randomTalksStage2;
    } else if (intimacy < 30) {
      if (!locationPermissionRequested) {
        showOverlay();
        showTalk("네가 있는 곳을 알려줄 수 있어?", 3500, () => {
          requestLocationPermission();
        });
        return;
      }
      talks = randomTalksStage3;
    } else if (intimacy < 40) {
      if (!cameraPermissionRequested) {
        showOverlay();
        showTalk("나 네 얼굴이 궁금해...", 3500, () => {
          requestCameraPermission();
        });
        return;
      }
      talks = randomTalksStage4;
    } else {
      if (!microphonePermissionRequested) {
        showOverlay();
        showTalk("네 목소리가 듣고 싶어.", 3500, () => {
          requestMicrophonePermission();
        });
        return;
      }
      // ✅ 마이크 허용 이후 랜덤 대사 없음
      return;
    }

    const idx = Math.floor(Math.random() * talks.length);
    showTalk(talks[idx], 3000, () => {
      startRandomTalkLoop();
    });

  }, 4000);
}











//화면 잠금
function showOverlay() {
  document.getElementById('overlay-blocker').style.display = 'block';
}

function hideOverlay() {
  document.getElementById('overlay-blocker').style.display = 'none';
}


// === 호루라기 버튼 ===
whistleBtn.addEventListener('click', () => {
  clearTimeout(randomTalkLoop);

  if (whistleSound) {
    whistleSound.currentTime = 0;
    whistleSound.play();
  }

  // ✅ 삐짐 모드면 무조건 torajim 대사 출력
  if (torajimMode) {
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
    return;
  }

  intimacy++;
  console.log(`현재 친밀도: ${intimacy}`);

  if (intimacy >= 10 && !feedBtnUnlocked) {
    showOverlay();
    showTalk("너한테 알림 보내도 돼?", 3500, () => {
      requestNotificationPermission();
    });
    return;
  }

  const idx = Math.floor(Math.random() * thankWhistleTalks.length);
  showTalk(thankWhistleTalks[idx], 3000, () => {
    startRandomTalkLoop();
  });
});



// === 먹이 버튼 ===
feedBtn.addEventListener('click', () => {
  clearTimeout(randomTalkLoop);

  if (feedSound) {
    feedSound.currentTime = 0;
    feedSound.play();
  }

  if (torajimMode) {
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
    return;
  }

  intimacy++;
  console.log(`현재 친밀도: ${intimacy}`);

  if (intimacy >= 20 && !locationPermissionRequested) {
    showOverlay();
    showTalk("네가 있는 곳을 알려줄 수 있어?", 3500, () => {
      requestLocationPermission();
    });
    return;
  }

  const idx = Math.floor(Math.random() * thankFeedTalks.length);
  showTalk(thankFeedTalks[idx], 3000, () => {
    startRandomTalkLoop();
  });
});



// === 공놀이 버튼 ===
ballBtn.addEventListener('click', () => {
  clearTimeout(randomTalkLoop);

  if (ballSound) {
    ballSound.currentTime = 0;
    ballSound.play();
  }

  if (torajimMode) {
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
    return;
  }

  intimacy++;
  console.log(`현재 친밀도: ${intimacy}`);

  if (intimacy >= 30 && !cameraPermissionRequested) {
    showOverlay();
    showTalk("나 네 얼굴이 궁금해...", 3500, () => {
      requestCameraPermission();
    });
    return;
  }

  if (intimacy >= 40 && !microphonePermissionRequested) {
    showOverlay();
    showTalk("네 목소리가 궁금해.", 3500, () => {
      requestMicrophonePermission();
    });
    return;
  }

  const idx = Math.floor(Math.random() * thankBallTalks.length);
  showTalk(thankBallTalks[idx], 3000, () => {
    startRandomTalkLoop();
  });
});











// === 알림 권한 요청 ===
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      console.log(`알림 권한: ${permission}`);
      dialogueEl.innerText = "";
      talkWindow.style.display = 'none';
      hideOverlay();

      if (permission === "granted") {
        // ✅ 허용되면 삐짐 모드 꺼줌
        torajimMode = false;

        new Notification("ATA 알림", {
          body: "이제 나도 널 부를 수 있어!"
        });

        // ✅ 먹이 버튼 활성화 & 플래그 ON
        feedBtnUnlocked = true;
        feedBtn.style.display = 'block';
        feedBtn.style.pointerEvents = 'auto';
        feedBtn.style.opacity = '1';

           for (let i = 1; i <= 5; i++) {
           document.getElementById(`a${i}`).style.display = 'block';
        }

        showTalk("이제 나도 널 부를 수 있어!", 3000, () => {
          startRandomTalkLoop();
        });
      } else {
        // ✅ 거부되면 삐짐 모드 켬 + 바로 출력
        torajimMode = true;
        const idx = Math.floor(Math.random() * torajimTalks.length);
        showTalk(torajimTalks[idx], 3000, () => {
          startRandomTalkLoop();
        });
      }
    });
  }
}

// === 위치 권한 요청 ===
function requestLocationPermission() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      () => {
        locationPermissionRequested = true;

        // ✅ 허용되면 삐짐 모드 꺼줌
        torajimMode = false;

        ballBtn.style.display = 'block';
        ballBtn.style.pointerEvents = 'auto';
        ballBtn.style.opacity = '1';

        for (let i = 6; i <= 10; i++) {
          document.getElementById(`a${i}`).style.display = 'block';
        }        

        hideOverlay();
        showTalk(`마포구에 있구나! 거긴 어때?`, 3000, () => {
          startRandomTalkLoop();
        });
      },
      () => {
        locationPermissionRequested = false;

        // ✅ 거부되면 삐짐 모드 켬 + 오버레이 해제 추가!
        torajimMode = true;
        hideOverlay(); // ✅ 이 줄 추가!
        const idx = Math.floor(Math.random() * torajimTalks.length);
        showTalk(torajimTalks[idx], 3000, () => {
          startRandomTalkLoop();
        });
      }
    );
  } else {
    locationPermissionRequested = false;
    torajimMode = true;
    hideOverlay(); // ✅ 이 줄 추가!
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
  }
}


// === 카메라 권한 요청 ===
function requestCameraPermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        cameraPermissionRequested = true;

        // ✅ 허용되면 삐짐 모드 꺼줌
        torajimMode = false;

        stream.getTracks().forEach(track => track.stop());

        // a11 ~ a14 표시
        for (let i = 11; i <= 14; i++) {
        document.getElementById(`a${i}`).style.display = 'block';
       }


        

        hideOverlay();
        showTalk("네 얼굴이 뿅 나타났어! 마법 같다!", 4000, () => {
          startRandomTalkLoop();
        });
      })
      .catch(err => {
        console.error(err);

        // ✅ 거부되면 삐짐 모드 켬 + 오버레이 해제 추가!
        torajimMode = true;
        hideOverlay(); // ✅ 추가
        const idx = Math.floor(Math.random() * torajimTalks.length);
        showTalk(torajimTalks[idx], 3000, () => {
          startRandomTalkLoop();
        });
      });
  } else {
    torajimMode = true;
    hideOverlay(); // ✅ 추가
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
  }
}

// === 마이크 권한 요청 ===
function requestMicrophonePermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        microphonePermissionRequested = true;
        torajimMode = false;
        hideOverlay();

        // ✅ 사용자에게 마지막 안내 대사 후 버튼
        showTalk(
          `${userName}! 네 목소리로, 내 이름을 불러줘.`,
          4000,
          () => {
            showRecordButton(stream);
          }
        );
      })
      .catch(err => {
        console.error(err);
        torajimMode = true;
        hideOverlay();
        const idx = Math.floor(Math.random() * torajimTalks.length);
        showTalk(torajimTalks[idx], 3000, () => {
          startRandomTalkLoop();
        });
      });
  } else {
    torajimMode = true;
    hideOverlay();
    const idx = Math.floor(Math.random() * torajimTalks.length);
    showTalk(torajimTalks[idx], 3000, () => {
      startRandomTalkLoop();
    });
  }
}

// === 마지막 녹음 공포 + 엔딩 ===
// === 마지막 녹음 공포 + 엔딩 ===
function showRecordButton(stream) {
  const recordBtn = document.getElementById('btn-record');
  recordBtn.style.display = 'block';

  let mediaRecorder;
  let audioChunks = [];

  recordBtn.onclick = () => {
    // ✅ 클릭 시 대사창 닫기
    dialogueEl.innerText = "";
    talkWindow.style.display = 'none';

    // 🔥 기존 BGM 정지
    if (bgm && !bgm.paused) {
      bgm.pause();
      bgm.currentTime = 0;
    }

    // 🔥 암전 화면 생성
    let blackout = document.getElementById('blackout-screen');
    if (!blackout) {
      blackout = document.createElement('div');
      blackout.id = 'blackout-screen';
      blackout.style.position = 'fixed';
      blackout.style.top = '0';
      blackout.style.left = '0';
      blackout.style.width = '100%';
      blackout.style.height = '100%';
      blackout.style.background = 'black';
      blackout.style.zIndex = '10000';
      document.body.appendChild(blackout);
    }

    // 🔑 녹음 시작 (5초)
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    audioChunks = [];

    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);

    mediaRecorder.addEventListener("dataavailable", e => {
      audioChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);

      // 🔥 기괴한 음성 10회 반복 (끊김 제거)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      fetch(audioUrl)
        .then(res => res.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(decoded => {
          for (let i = 0; i < 10; i++) {
            const source = audioContext.createBufferSource();
            source.buffer = decoded;
            source.playbackRate.value = 2.0;
            source.connect(audioContext.destination);
            source.start(audioContext.currentTime + i * 1.5);
          }

          // 🎬 타자 효과: OH MY ATA → 백스페이스 → OH MY DATA
          const logoText = document.createElement('div');
          logoText.id = 'logo-text';
          logoText.style.position = 'fixed';
          logoText.style.top = '50%';
          logoText.style.left = '50%';
          logoText.style.transform = 'translate(-50%, -50%)';
          logoText.style.color = 'white';
          logoText.style.fontSize = '4em';
          logoText.style.fontFamily = "'Courier New', monospace"; // 느린 타자 폰트
          logoText.style.zIndex = '10002';
          document.body.appendChild(logoText);

          let text = "OH MY ATA";
          let index = 0;

          function typeWriter() {
            if (index < text.length) {
              logoText.textContent += text.charAt(index);
              index++;
              setTimeout(typeWriter, 250); // 느리게
            } else {
              setTimeout(backspaceATA, 1000);
            }
          }

          function backspaceATA() {
            if (logoText.textContent.endsWith("ATA")) {
              logoText.textContent = logoText.textContent.slice(0, -1);
              setTimeout(backspaceATA, 200);
            } else if (logoText.textContent.endsWith("AT")) {
              logoText.textContent = logoText.textContent.slice(0, -1);
              setTimeout(backspaceATA, 200);
            } else if (logoText.textContent.endsWith("A")) {
              logoText.textContent = logoText.textContent.slice(0, -1);
              setTimeout(backspaceATA, 200);
            } else {
              logoText.textContent += "DATA";
              setTimeout(() => {
                blackout.style.background = 'white';
                logoText.style.color = 'black';
              }, 1000);
            }
          }

          typeWriter();
        });

      // 마이크 끄기
      stream.getTracks().forEach(track => track.stop());

      // 버튼 숨기기
      recordBtn.style.display = 'none';

      // 대사창 닫기 (안전)
      dialogueEl.innerText = "";
      talkWindow.style.display = 'none';
    });
  };
}







// === BGM 버튼 ===
playBgmBtn.addEventListener('click', () => {
  bgm.play();
  playBgmBtn.style.display = 'none';
});

// === 이름 prompt & 초기 인사 ===
window.addEventListener('load', () => {
  // === 모든 a1~a14 초기 숨김 ===
  for (let i = 1; i <= 14; i++) {
    document.getElementById(`a${i}`).style.display = 'none';
  }

  do {
    userName = prompt("이름을 입력하세요:");
  } while (!userName);

  console.log("저장된 이름:", userName);

  showTalk(`안녕? 나는 ATA야, ${userName}!`, 3000, () => {
    startRandomTalkLoop();
  });
});
