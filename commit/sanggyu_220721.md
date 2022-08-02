# JWT

헤더 + 내용 +서명으로 이루어져있다

### JWT의 특징

- Header, Payload, Signature 구초
- Decode하면 내용을 읽어낼 수 있다
- Header에는 알고리즘과 타입, Payload에는 데이터를 담고 Signature를 이용해서 검증한다

### JWT를 왜 사용하는가

- Self-contained한 속성을 가지고 있다
  (== JWT가 스스로 인증에 필요한 데이터를 가지고 있다)
- Stateless하다
  (== 세션과는 다르게 백엔드 서버가 바뀌어도 인증 가능하다)
- 모바일 환경에서 다시 로그인 할 필요가 없다

### Stateless의 장점

- Scale out을 하더라도 대응이 가능하다
- 비밀번호를 다시 업력할 필요가 없음
- Validation check만으로 검증이 가능함
  (그럼에도 불구하고 white list방식의 추가 검증을 하는 경우도 있음)

### Access token과 Refresh token

- JWT는 Access token과 Refresh token 2개의 토큰을 사용한다
- Access token은 짧게, Refresh token은 보다 긴 생명주기를 갖는다
- 서버로 요청을 할 떄에는 Access token을 사용하고, Access token이 만료돠면 Refresh token을 이용해서 새로운 Access token을 받아온다
- 이러한 구조를 갖는 이유는 JWT가 stateless 하기 때문에……

### Access token과 Refresh token 2

### Access token과 Refresh token 3

- Access token이 탈취당하는 경우에 공격자는 사용자와 동일한 권항을 갖게 되기 때문에 JWT를 사용하는 경우 반드시 SSL을 이용한 암호화 통신을 사용해야 한다
- 보안이 중요한 서비스의 경우 JWT가 stateless 함에도 불구하고 Redis 등에 발급한 Access token을 보관하기도 한다
  (로그아웃 하는 경우 Redis에서 삭제 처리한다)

