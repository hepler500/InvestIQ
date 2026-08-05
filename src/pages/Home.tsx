import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { Header } from '../components/Header/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f9fc;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  color: #1f2937;
  margin-bottom: 16px;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: #4b5563;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Користувач');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUserName(currentUser.displayName || currentUser.email || 'Користувач');
        setLoading(false);
      } else {
        navigate('/auth', { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return (
      <PageContainer>
        <MainContent>Завантаження...</MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header userName={userName} onLogout={() => navigate('/auth', { replace: true })} />
      <MainContent>
        <WelcomeTitle>Вітаємо в кабінеті, {userName}!</WelcomeTitle>
        <WelcomeText>
          Тут відображатиметься ваш особистий фінансовий кабінет. Після входу або реєстрації ви тепер потрапляєте на цю сторінку.
        </WelcomeText>
      </MainContent>
    </PageContainer>
  );
};

export default Home;
