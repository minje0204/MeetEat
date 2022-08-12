package com.a105.api.response;

public final class ResponseMessage {

    public static final String INTERNAL_SERVER_ERROR = "서버 내부 에러";

    public static final String OAUTH2_LOGIN = "로그인 성공";

    // User 관련 응답
    public static final String GET_ALL_USERS = "모든 사용자 정보 조회 성공";
    public static final String GET_USER = "특정 사용자 정보 조회 성공";
    public static final String GET_CURRENT_USER = "현재 로그인한 사용자 정보 조회 성공";
    public static final String SEARCH_USER = "사용자 검색 결과 조회 성공";
    public static final String CHECK_DUPLICATE_NICKNAME = "별명 중복 확인 성공";
    public static final String UPDATE_USER_BIO = "자기소개 수정 성공";
    public static final String UPDATE_USER_NICKNAME = "별명 수정 성공";
    public static final String UPLOAD_PROFILE_IMAGE = "프로필 사진 업로드 성공";
    public static final String DELETE_PROFILE_IMAGE = "프로필 사진 삭제 성공";

    // Friendship 관련 응답
    public static final String GET_FRIEND_LIST = "친구 정보 목록 조회 성공";
    public static final String GET_WAITING_LIST = "수락 대기 중 목록 조회 성공";
    public static final String SEND_FRIEND_REQUEST = "친구 추가 요청 전송 성공";
    public static final String DELETE_FRIEND = "친구 삭제 성공";
    public static final String DECLINE_RECEIVED_REQUEST = "받은 친구 요청 거절 성공";
    public static final String ACCEPT_RECEIVED_REQUEST = "받은 친구 요청 수락 성공";
    public static final String CANCEL_SENT_REQUEST = "보낸 친구 요청 취소 성공";
    public static final String GET_RESTAURANT = "식당 조회 성공";

    // Conference 관련 응답
    public static final String JOIN_CONFERENCE = "회의 입장 성공";
    public static final String CREATE_CONFERENCE = "회의 생성 성공";
    public static final String LEAVE_CONFERENCE = "회의 나가기 성공";


}
