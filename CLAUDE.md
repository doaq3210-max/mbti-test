# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MBTI 공부법 연구소 — MBTI 유형별 공부법을 소개하는 콘텐츠 사이트. 여러 개의 정적 HTML 페이지로 구성된다.

## Design

- 디자인 레퍼런스: bp.com (필 형태 버튼, 미니멀한 카드, 스티키 상단 내비게이션)
- 배경: 라이트 모드는 크림색, 다크 모드는 짙은 그린 블랙
- 포인트 컬러: 초록색 (bp 브랜드 그린 계열, `css/theme.css`의 `--primary`)
- 라이트/다크 모드 지원 필수 — `css/theme.css`에 색상 토큰을 정의하고, 각 페이지 `<head>`의 인라인 스크립트로 `localStorage`/시스템 설정을 읽어 `<html data-theme>`를 초기화한다 (깜빡임 방지). 헤더에는 다크·라이트 모드를 전환하는 토글 버튼(`#theme-toggle`, `js/theme.js`)을 둔다.
- 폰트: Pretendard
- 모바일 반응형 레이아웃 필수
- NT/NF/SJ/SP 그룹별 강조색(`--nt`/`--nf`/`--sj`/`--sp`)은 라이트·다크 모드 모두에서 읽히도록 중간 톤 채도로 유지한다.

## Constraints

- 서버, API, 인증 키를 절대 사용하지 않는다 — 정적 파일(HTML/CSS/JS)만으로 구성한다.
- 파일이 300줄을 넘으면 곧바로 분리하지 말고, 먼저 분리 방안을 제안한다.
