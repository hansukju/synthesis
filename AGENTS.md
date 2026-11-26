<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SYNTHESIS 개발 규칙

- 작업을 시작하기 전에 [PROJECT.md](PROJECT.md)에서 기획과 개발 범위를 확인한다.
- 작업 결과와 기술적 결정은 웹 개발 초보자도 이해할 수 있도록 한국어로 설명한다.
- 화면 문구, 버튼, 오류 메시지 등 사용자에게 표시되는 웹사이트 언어는 영어로 작성한다.
- 기존 프로젝트 구조와 기술 환경을 우선 유지한다.
- 여러 화면에서 공통으로 쓰는 요소는 재사용 가능한 컴포넌트로 만든다.
- 화면을 그리는 UI, 서비스 규칙을 적용하는 비즈니스 로직, 데이터를 읽고 저장하는 처리를 분리한다.
- 예시 데이터는 실제 데이터와 구분하고 화면에서 예시임을 표시한다. 출처와 검증 상태를 확인하고, 검증되지 않은 정보는 사실처럼 제공하지 않는다.
- 필요한 라이브러리만 설치한다.
- API 키와 개인정보를 소스 코드에 저장하거나 Git에 커밋하지 않는다. 비밀 API 키는 서버에서만 사용하는 환경 변수로 관리한다.
- 보안과 접근성을 고려한다. 사용자 입력을 검증하고, 화면은 키보드로 조작할 수 있게 하며, 이미지에 적절한 대체 텍스트를 제공한다.
- PC와 모바일을 모두 지원한다.
- 중요한 디자인이나 시스템 구조를 바꾸기 전에 변경 이유와 영향을 설명하고 사용자의 승인을 받는다.
- 요청받은 범위 안에서 기능을 단계별로 개발하고 확인한다.
- 작업 완료 후 TypeScript(`npm exec -- tsc --noEmit`), ESLint(`npm run lint`), 빌드(`npm run build`) 오류를 확인한다. 실행하지 못한 검사가 있으면 이유를 기록한다.
- 작업 결과, 수정된 파일, 남은 문제를 보고한다.
