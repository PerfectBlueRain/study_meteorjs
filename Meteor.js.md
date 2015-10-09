### Modern Web Application with Meteor
/ 이재호

Atom
 emmet
참고 :
- http://webframeworks.kr/getstarted/meteorjs/
- https://github.com/torreswoo/meteor2015codelab
- http://www.slideshare.net/WebFrameworks/meteor2015-codelab
- Explore Meteor Packages : https://atmospherejs.com/

---
### 설치
```
$ curl https://install.meteor.com/ | sh
$ meteor create {project name}  // 프로젝트 생성 (스켓폴딩)
$ meteor run 혹은 meteor  // localhost:3000
$ meteor shell
$ meteor mongo

// added
$ meteor add twbs:bootstrap // 부트스트랩적용
```

---

## Template
- 미티어의 프론트 엔드 프레임워크인 Blaze 는 Spacebar 라는 템필리팅 엔진을 사용, 개발자들이 ui 를 작성 할수 있도록 개발 방법을 제공한다.
## Collection
- 미티어의 내장 데이터베이스인 몽고디비를 다루기 위한 필수 오브젝트가 미티어 컬렉션

## pub & sub
- 보고싶은것만 보고싶다.
- autopublish : 우리가 지금까지 작성한 클라이언트측의 질의문은 사실 미니몽고에 하는 질의문이었다. 이것은 다음 그림처럼 서버와 클라이언트간 발행/구독을 통하여 서버측의 데이터 일부분을 클라이언트로 내려 주고 변경분을 sync 하기 때문이다
- autopublish 패키지를 삭제 하고 발행/구독을 구현 : 이 패키지는 위험하기 짝이 없다. 서버에 있는 모든 컬렉션의 모든 다큐먼트(데이터)를 브라우저로 내려보내주기 때문이다. 그래서 MDG(meteor developer group) 에서도 프로토 타이핑용이라고 말하고 있다.

## router


---
# project
- 관심사기반의 마이크로블로깅 서비스
( 화면생성 / 포스트 입력 / )

#### 1. header
- index.html
   - <body>에  {{> head}} / {{> main}}
   - Bootstrap 네비게이션 바 (Navbar) : http://bootstrapk.com/components/#navbar-brand-image
   - Bootstrap컨테이너 (container) :  http://bootstrapk.com/css/#overview-container

#### 2. main
- main.html
   - class="container"
   - Bootstarp 아이콘(Glyphicons)<i> : http://bootstrapk.com/components/#glyphicons
   - Bootstrap 입력그룹 (input-group) : http://bootstrapk.com/components/#input-groups
   - Bootstrap 버튼애드온 (input-group-btn) : http://bootstrapk.com/components/#input-groups-buttons
   - Bootstrap 버튼옵션 (btn btn-...) : http://bootstrapk.com/css/#buttons-options
- head.html

navigation bar
form (button add-on)

#### 3. posts
- posts.html : 포스트들을 구현
   - Bootstarp 기본 미디어(Default media) : http://bootstrapk.com/components/#media-default
      - class="media"가 하나의 포스트 단위
      - <img> class="media-object"로 하고 src는 http://lorempixel.com/

- main.html에서 {{> posts}}를 추가
posts Template
Default media : class="media"

#### 4. posts helper
- /client
- posts.js
- posts.html
   - {{#each posts}}
   - {{author.profile_image}} / {{author.name}} / {{message}}

#### 5. collection
- mongoDB연결
```
$ meteor mongo
```
- /lib
- collection.js : collection을 가져옴
   - Posts = new Mongo.Collection('posts');
- posts.js
   - Posts.find();
   - Posts.insert(...json...);

#### 6. methods
- /server
- /server/method.js
   - Method : Meteor.methods()
- /client/main.js
   - Client Call
   - Event Handling : Template.main.events()

#### 7. timesort
- time : new Data()
- sort : MongoDB ( console.table(Posts.find().fetch()) )

#### 8. session
- Session.get('..ID..')
- Session.set('..ID..', 'cat..')
- /client/main.js
   - 세션만들고 helpers -> Session.get('pageId');
- /client/main.html
   - 세션사용 {{page}}'s Page

#### 9. pub&sub
$ meteor remove autopublish
- /server/publish.js
   - publish : Meteor.publish()
- /client/method.js : pageId: obj.pageId,
- /client/main.js : Template.main.helpers
- /client/posts.js
   - subscribe

#### 10. router
- keyword별posts / URL로구분 (/page/keyword)
- Routing용 packages
$ meteor add kadira:flow-router

- /client/router.js
   - FlowRouter.route('/page/:pageId', {..
   -> http://localhost:30001/page/Cat

#### 11. account 로그인
$ meteor add accounts-password
- http://docs.meteor.com/#/full/accounts_api
$ meteor add ian:accounts-ui-bootstrap-3
   - /client/head.html : {{> loginButtons}}
   - /client/config.js
- 확인
   - Meteor.user()

$ meteor add check
   - /server/method.js
      - check(this.userId, String);  // check user id
      - _id, name, profile_image
- https://en.gravatar.com/site/implement/images/
$ meteor add jparker:gravatar
