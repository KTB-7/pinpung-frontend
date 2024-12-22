import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerMyTaste } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const UserPreferences = () => {
  const navigate = useNavigate();

  const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대', '70대 이상'];
  const activitiesOptions = ['공부', '친구와 모임', '미팅', '휴식', '데이트'];
  const menuOptions = ['아메리카노', '라떼', '스무디', '차', '디저트'];

  const [age, setAge] = useState('');
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

  const isFormValid = age !== '' && selectedMenus.length > 0 && selectedActivities.length > 0;

  const handleSubmit = async () => {
    // 조건 충족 시 등록 요청 후 처리하자
    if (age && selectedActivities && selectedMenus) {
      try {
        console.log('사용자 취향 등록:', age, selectedActivities, selectedMenus);
        await registerMyTaste(age, selectedActivities, selectedMenus);
      } catch (error) {
        console.log('카페 취향 등록 중 오류 발생:', error);
      }
    }
  };
  //  width: 100%;
  // height: 90vh;
  // margin-bottom: 10%;
  return (
    <div className="container mt-4" style={{ bottom: '10%' }}>
      <h4 className="mb-3">"00님"의 카페 취향을 알려주세요!</h4>

      {/* 나이 선택*/}
      <div className="mb-4">
        <h5 className="mb-2">연령대</h5>
        <div className="d-flex flex-wrap gap-2">
          {ageOptions.map((option) => {
            const selected = age === option;
            return (
              <button
                key={option}
                type="button"
                className="btn"
                style={{
                  border: `2px solid ${selected ? '#FF9C0E' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  color: selected ? '#FF9C0E' : 'black',
                  backgroundColor: 'white',
                }}
                onClick={() => handleAgeSelect(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* 메뉴 선택 */}
      <div className="mb-4">
        <h5 className="mb-2">좋아하는 메뉴를 선택해주세요! (복수 선택 가능)</h5>
        <div className="d-flex flex-wrap gap-2">
          {menuOptions.map((option) => {
            const selected = selectedMenus.includes(option);
            return (
              <button
                key={option}
                type="button"
                className="btn"
                style={{
                  border: `2px solid ${selected ? '#FF9C0E' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  color: selected ? '#FF9C0E' : 'black',
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
      <div className="mb-4">
        <h5 className="mb-2">가는 주요 목적을 알려주세요! (복수 선택 가능)</h5>
        <div className="d-flex flex-wrap gap-2">
          {activitiesOptions.map((option) => {
            const selected = selectedActivities.includes(option);
            return (
              <button
                key={option}
                type="button"
                className="btn"
                style={{
                  border: `2px solid ${selected ? '#FF9C0E' : '#D0D0D0'}`,
                  borderRadius: '20px',
                  color: selected ? '#FF9C0E' : 'black',
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
      <div className="d-flex justify-content-between">
        <button
          className="btn"
          style={{
            border: 'none',
            borderRadius: '5px',
            backgroundColor: isFormValid ? '#FF9C0E' : '#D0D0D0',
            color: 'white',
            padding: '10px 20px',
          }}
          type="button"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          핑펑 시작하기
        </button>

        <button
          className="btn"
          style={{
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0',
            color: 'black',
            padding: '10px 20px',
          }}
          type="button"
          onClick={() => navigate('/')}
        >
          넘어가기
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
