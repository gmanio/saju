import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ZodiacLoader from '../component/Loader';
import Head from 'next/head';

const Zodiac = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dayType, setDayType] = useState('1');
  const [ttiType, setTtiType] = useState('00');
  const [response, setResponse] = useState<any>(null);
  const fetchData = () => {
    setIsLoading(true);
    fetch(`/api/fortune?day=${dayType}&tti=${ttiType}`)
      .then(async (res) => {
        const result = await res.json();
        setResponse(result);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [ttiType, dayType]);

  return (
    <PageWrapper>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <ZodiacWrapper>
        <NavigationWrapper>
          {dayType === '0' && (
            <>
              <NavigationButtonPadding>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </NavigationButtonPadding>
              <NavigationTitle onClick={() => setDayType('1')}>어제의 운세</NavigationTitle>
              <NavigationButton className={'bg-blue-600'} onClick={() => setDayType('1')}>
                오늘
              </NavigationButton>
            </>
          )}
          {dayType === '1' && (
            <>
              <NavigationButton className={'bg-blue-600'} onClick={() => setDayType('0')}>
                어제
              </NavigationButton>
              <NavigationTitle onClick={() => setDayType('1')}>오늘의 운세</NavigationTitle>
              <NavigationButton className={'bg-blue-600'} onClick={() => setDayType('2')}>
                내일
              </NavigationButton>
            </>
          )}
          {dayType === '2' && (
            <>
              <NavigationButton className={'bg-blue-600'} onClick={() => setDayType('1')}>
                오늘
              </NavigationButton>
              <NavigationTitle onClick={() => setDayType('1')}>내일의 운세</NavigationTitle>
              <NavigationButtonPadding>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </NavigationButtonPadding>
            </>
          )}
        </NavigationWrapper>
        <Header>
          <ZodiacAnimalWrapper>
            <ZodiacAnimalButton
              onClick={() => setTtiType('00')}
              style={{ backgroundImage: `url(/img/mouse.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('01')}
              style={{ backgroundImage: `url(/img/ox.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('02')}
              style={{ backgroundImage: `url(/img/tiger.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('03')}
              style={{ backgroundImage: `url(/img/rabbit.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('04')}
              style={{ backgroundImage: `url(/img/dragon.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('05')}
              style={{ backgroundImage: `url(/img/snake.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('06')}
              style={{ backgroundImage: `url(/img/horse.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('07')}
              style={{ backgroundImage: `url(/img/lamb.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('08')}
              style={{ backgroundImage: `url(/img/monkey.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('09')}
              style={{ backgroundImage: `url(/img/chicken.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('10')}
              style={{ backgroundImage: `url(/img/dog.png)` }}
            ></ZodiacAnimalButton>
            <ZodiacAnimalButton
              onClick={() => setTtiType('11')}
              style={{ backgroundImage: `url(/img/pig.png)` }}
            ></ZodiacAnimalButton>
          </ZodiacAnimalWrapper>
        </Header>
        {isLoading && <ZodiacLoader />}
        {!isLoading && response && response?.success && (
          <ContentWrapper className={'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'}>
            <MainZodiacWrapper>
              <MainZodiacIcon>{response.data.mainFortuneType}</MainZodiacIcon>
              <MainZodiacFortune>{response.data.mainFortuneContent}</MainZodiacFortune>
            </MainZodiacWrapper>

            <SubFortunesWrapper>
              {response.data.contents.map((fortune: any, index: number) => {
                return (
                  <SubFortune key={index}>
                    <SubFortuneTitle>{fortune.title} 년생</SubFortuneTitle>
                    <SubFortuneDescription>{fortune.content}</SubFortuneDescription>
                  </SubFortune>
                );
              })}
            </SubFortunesWrapper>
          </ContentWrapper>
        )}
      </ZodiacWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  font-size: 20px;
`;

const ZodiacWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  background: #f8f9fa;
  justify-content: center;
`;

const NavigationWrapper = styled.div`
  display: flex;
  padding: 10px 10px;
  align-items: center;
  border-bottom: 0.5px solid #ddd;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const NavigationTitle = styled.div`
  margin: 0 auto;
  font-weight: bold;
`;

const NavigationButton = styled.button.attrs({
  className: 'bg-blue-600'
})`
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 4px;
  justify-self: right;
  border: 1px solid #ddd;
  font-size: 14px;
`;

const NavigationButtonPadding = styled.button.attrs({
  className: 'bg-blue-600'
})`
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 4px;
  justify-self: right;
  font-size: 14px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  flex-wrap: nowrap;
  background-color: #eeeeee;
  background-image: url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23000000' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

const ZodiacAnimalWrapper = styled.ul`
  display: flex;
  min-width: 100%;
  flex-wrap: nowrap;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;
`;

const ZodiacAnimalButton = styled.li`
  margin: 0 8px;
  display: flex;
  width: 100px;
  min-width: 100px;
  height: 100px;
  border-radius: 100px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  background-size: contain;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50px;
`;

const MainZodiacWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

const MainZodiacIcon = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const MainZodiacFortune = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  padding-left: 16px;
`;

const SubFortunesWrapper = styled.div`
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${process.browser && window.innerHeight}px;
  background-color: #e7e7e7;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const SubFortune = styled.div`
  margin: 20px 16px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 6px 7px 20px 0px rgba(0, 0, 0, 0.2);
`;

const SubFortuneTitle = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  padding-bottom: 7px;
`;

const SubFortuneDescription = styled.div`
  margin-top: 10px;
  display: flex;
  font-size: 16px;
  line-height: 18px;
`;

export default Zodiac;
