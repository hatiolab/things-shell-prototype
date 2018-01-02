# Prerequisites
- Nodejs
- Yarn
- Google Chrome 63+
# Install
```
$ git clone https://github.com/hatiolab/things-shell-board.git
$ cd things-shell-board.git
$ yarn
```
# Run to Test
```
$ yarn serve
```
- Open Web Browser(Chrome or Safari) http://0.0.0.0:3000/

# 편집기 환경
## 편집 도구
### Visual Stuido Code https://code.visualstudio.com/
## 편집도구 주요 설정
## /.editconfig 파일에 설정
```
indent_style = space
indent_size = 2
```
# 소스 저장소 설정
## .gitignore 파일 설정
# Linting
- 버그가 날 수 있을 만한 코드를 찾아서 체크를 해 주는 일.
- eslint 사용
- Rules https://eslint.org/docs/rules/
- 사용방법
```
$ yarn lint
```
