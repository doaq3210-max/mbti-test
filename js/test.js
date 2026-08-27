const GROUP_INFO = {
  NT: {
    name: 'NT · 분석가형',
    emoji: '🧠',
    desc: '논리와 원리를 파고드는 당신에게는 개념을 체계화하고 스스로 답을 찾아가는 공부법이 잘 맞아요.',
    page: 'NT.html',
    color: '#4C3BCF'
  },
  NF: {
    name: 'NF · 외교관형',
    emoji: '🌱',
    desc: '의미와 스토리에 몰입하는 당신에게는 이야기와 감정을 담아 기억하는 공부법이 잘 맞아요.',
    page: 'NF.html',
    color: '#9B5CF0'
  },
  SJ: {
    name: 'SJ · 관리자형',
    emoji: '📋',
    desc: '계획과 반복에 강한 당신에게는 루틴을 세우고 꾸준히 실천하는 공부법이 잘 맞아요.',
    page: 'SJ.html',
    color: '#7C4DFF'
  },
  SP: {
    name: 'SP · 탐험가형',
    emoji: '🎯',
    desc: '몸으로 부딪히며 배우는 당신에게는 실전 문제와 짧은 집중 스퍼트 공부법이 잘 맞아요.',
    page: 'SP.html',
    color: '#C147E9'
  }
};

const TOTAL_QUESTIONS = 10;

function highlightOptions() {
  document.querySelectorAll('.option-item').forEach((item) => {
    const input = item.querySelector('input');
    input.addEventListener('change', () => {
      const name = input.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach((el) => {
        el.closest('.option-item').classList.toggle('checked', el.checked);
      });
    });
  });
}

function calculateResult() {
  const errorEl = document.getElementById('quiz-error');
  const scores = { NT: 0, NF: 0, SJ: 0, SP: 0 };

  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    if (!checked) {
      errorEl.textContent = `${i}번 문항에 답해주세요.`;
      document.getElementById(`question-${i}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    scores[checked.value] += 1;
  }

  errorEl.textContent = '';

  let topGroup = 'NT';
  let topScore = -1;
  Object.keys(scores).forEach((key) => {
    if (scores[key] > topScore) {
      topScore = scores[key];
      topGroup = key;
    }
  });

  showResult(topGroup, scores);
}

function showResult(groupKey, scores) {
  const info = GROUP_INFO[groupKey];
  const box = document.getElementById('result-box');

  document.getElementById('result-emoji').textContent = info.emoji;
  document.getElementById('result-title').textContent = `당신은 ${info.name}!`;
  document.getElementById('result-desc').textContent = info.desc;
  document.getElementById('result-link').href = info.page;
  document.getElementById('result-link').style.background = info.color;

  const scoreText = Object.keys(scores)
    .map((k) => `${k} ${scores[k]}점`)
    .join(' · ');
  document.getElementById('result-score').textContent = scoreText;

  box.dataset.group = groupKey;
  box.classList.add('show');
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function shareResult() {
  const box = document.getElementById('result-box');
  const groupKey = box.dataset.group;
  if (!groupKey) return;

  const info = GROUP_INFO[groupKey];
  const shareText = `나의 공부 유형은 ${info.name}! MBTI 공부법 연구소에서 나에게 맞는 공부법을 확인해보세요.`;
  const shareUrl = window.location.href.split('?')[0];

  if (navigator.share) {
    try {
      await navigator.share({ title: 'MBTI 공부법 연구소', text: shareText, url: shareUrl });
      return;
    } catch (err) {
      return;
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    alert('결과 문구와 링크가 클립보드에 복사되었습니다!');
  } catch (err) {
    alert(shareText);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  highlightOptions();
  document.getElementById('quiz-submit').addEventListener('click', calculateResult);
  document.getElementById('share-btn').addEventListener('click', shareResult);
});
