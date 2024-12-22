import React, { useState } from 'react';
import useAuthStore from '../store/auth';
import { registerMyTaste } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPreferences = () => {
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userInfo.userName);

  const ageOptions = [
    { value: 10, label: '10대' },
    { value: 20, label: '20대' },
    { value: 30, label: '30대' },
    { value: 40, label: '40대' },
    { value: 50, label: '50대' },
    { value: 60, label: '60대' },
    { value: 70, label: '70대 이상' },
  ];
  const activitiesOptions = ['공부', '친구와 모임', '미팅', '휴식', '데이트'];
  const menuOptions = ['아메리카노', '라떼', '스무디', '차', '디저트'];

  const [age, setAge] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);

  const handleAgeSelect = (selectedAge) => {
    setAge(selectedAge);
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((v) => v !== item));
    } else {
      setList([...list, item]);
    }
  };

  const isFormValid = age !== '' && selectedActivities.length > 0 && selectedMenus.length > 0;

  const handleSubmit = async () => {
    // 조건 충족 시 등록 요청 후 처리하자
    if (age && selectedActivities && selectedMenus) {
      try {
        console.log('사용자 취향 등록:', age, selectedActivities, selectedMenus);
        await registerMyTaste(age, selectedActivities, selectedMenus);
        navigate('/');
      } catch (error) {
        console.log('카페 취향 등록 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h5
        className="mb-3"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontWeight: 'bold',
        }}
      >
        {userName} 님에 대해 조금 더 알려주세요!
      </h5>
      <br />

      {/* 나이 선택*/}
      <div className="mb-5" style={{ margin: '10px' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '18px' }}
        >
          연령대
        </div>
        <div className="d-flex flex-wrap gap-2">
          {ageOptions.map((option) => {
            const selected = age === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className="btn"
                style={{
                  border: `1px solid ${selected ? '#FF8800' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  fontSize: '15px',
                  color: selected ? '#FF8800' : 'gray',
                  backgroundColor: 'white',
                }}
                onClick={() => handleAgeSelect(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 메뉴 선택 */}
      <div className="mb-5" style={{ margin: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>좋아하는 메뉴를 선택해주세요</span>
          <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
            (복수 선택 가능)
          </span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {menuOptions.map((option) => {
            const selected = selectedMenus.includes(option);
            return (
              <button
                key={option}
                type="button"
                className="btn"
                style={{
                  border: `1px solid ${selected ? '#FF8800' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  fontSize: '15px',
                  color: selected ? '#FF8800' : 'gray',
                  backgroundColor: 'white',
                }}
                onClick={() => toggleSelection(option, selectedMenus, setSelectedMenus)}
              >
                #{option}
              </button>
            );
          })}
        </div>
      </div>

      {/* activities 선택*/}
      <div className="mb-5" style={{ margin: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>주로 가는 목적을 알려주세요</span>
          <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
            (복수 선택 가능)
          </span>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {activitiesOptions.map((option) => {
            const selected = selectedActivities.includes(option);
            return (
              <button
                key={option}
                type="button"
                className="btn"
                style={{
                  border: `1px solid ${selected ? '#FF8800' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  fontSize: '15px',
                  color: selected ? '#FF8800' : 'gray',
                  backgroundColor: 'white',
                }}
                onClick={() => toggleSelection(option, selectedActivities, setSelectedActivities)}
              >
                #{option}
              </button>
            );
          })}
        </div>
      </div>

      {/* 버튼들 */}
      <div className="text-center">
        <button
          className="btn"
          style={{
            border: 'none',
            borderRadius: '5px',
            backgroundColor: isFormValid ? '#FF9C0E' : '#D0D0D0',
            color: 'white',
            padding: '10px 125px',
          }}
          type="button"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          핑펑 시작하기
        </button>

        <div style={{ marginTop: '1rem' }}>
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'gray',
            }}
            onClick={() => navigate('/')}
          >
            넘어가기
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
