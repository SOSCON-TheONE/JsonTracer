# ONE vscode extension prototype

ONE vscode extension에 적용하기 위한 prototype을 미리 구현합니다.

구현된 결과물은 [origin repository](https://github.com/Samsung/ONE-vscode)에 PR을 날리게 됩니다.

### 컨벤션

#### 1. Branch

- main
- chore
  - Build task update에 사용됩니다
  - CI/CD
- develop
  - feature가 merge되는 브랜치입니다.
  - 일반적으로 feature에서 develop으로 PR을 날립니다.
- feature
  - 새로운 기능을 추가할 때 사용합니다
  - `feature/button` 과 같은 형태로 사용합니다
- fix
  - 버그를 고치는 경우 사용됩니다

#### 2. Commit message

- feat(추가)
  ```
  feat: button을 추가한다

  - 홈으로 이동하는 버튼 추가
  ```
- fix(수정)
  ```
  fix: button을 수정한다
  
  - button의 radius 수정
  ```
- refactor(리팩토링)
  ```
  refactor: 폴더 구조를 수정한다

  - 폴더 구조 수정
  ```