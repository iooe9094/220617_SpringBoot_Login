<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <!-- successful: false면 회원가입 버튼을 클릭 안한 상태 -->
        <!-- successful: false면 회원가입 중 에러발생 상태 -->
        <div v-if="!successful">
          <!-- 유저명 입력 양식 -->
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <!-- submitted 버튼을 누르고 && 유효성 에러가 발생했을 경우 아래 내용이 보임 -->
            <div
              v-if="errors.has('username') && submitted"
              class="alert-danger"
            >
              {{ errors.first("username") }}
            </div>
          </div>
        </div>

        <!-- email 입력양식 -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            v-validate="'required|max:50'"
            type="text"
            class="form-control"
            name="email"
          />
          <!-- submitted 버튼을 누르고 && 유효성 에러가 발생했을 경우 아래 내용이 보임 -->
          <div v-if="errors.has('email') && submitted" class="alert-danger">
            {{ errors.first("email") }}
          </div>
        </div>

        <!-- Password 입력양식 -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required|min:6|max:40'"
            type="password"
            class="form-control"
            name="password"
          />
          <!-- submitted 버튼을 누르고 && 유효성 에러가 발생했을 경우 아래 내용이 보임 -->
          <div v-if="errors.has('password') && submitted" class="alert-danger">
            {{ errors.first("password") }}
          </div>
        </div>

        <!-- submit 버튼 -->
        <div class="form-group">
          <button class="btn btn-primary btn-block">Sign up</button>
        </div>
      </form>

      <!-- 화면에 에러 메세지 출력 -->
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "Register",
  // 변수 초기화
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "", // 에러메세지 저장용
    };
  },
  computed: {
    loggedIn() {
      // 공유저장소의 user 객체의 속성인 loggedIn 값을 가져옴
      return this.$store.state.auth.status.loggedIn;
    },
  },
  // 화면이 뜨자마자 실행되는 이벤트
  mounted() {
    // 로그인 되어 있는 유저이면 /profile로 강제 페이지 이동
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    // 회원 가입 메소드
    handleRegister() {
      this.message = "";
      this.submitted = true; // 회원가입 버튼 클릭 시
      // 유효성 체크 로직 실행 (Vee-Validate 이용)
      // $validator.validate() 입력양식 유효성 체크가 통과하면
      // isValid = true
      this.$validator.validate().then((isValid) => {
        // isValid = true일 때만 아래 실행
        if (isValid) {
          if (isValid) {
            // springboot 서버 통신 : 공유저장소의 비동기 메소드 호출(register)
            this.$store
              .dispatch("auth/register", this.user)
              // 성공 / 실패 then
              // 성공하면 첫 번째 매개변수 실행
              // 실패하면 두 번째 매개변수 실행
              .then(
                (data) => {
                  // response == data (서버 쪽 응답 메세지(객체))
                  this.message = data.message;
                  this.successful = true;
                  // 강제 페이지 전환 (해도 안해도 상관 없음)
                  //   this.$router.push("/login");
                },
                // 실패
                (error) => {
                  this.message = error.message || error.toString();
                  this.successful = false;
                }
              );
          }
        }
      });
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
