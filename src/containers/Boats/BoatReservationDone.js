import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import BackgroundImage from '../../resources/boatshow/boat_show_done_bg.jpg';
import MMLogo from '../../resources/boatshow/mm_color_logo.png';

const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin: auto;
  box-shadow: 0 3px 20px 0 rgba(199, 199, 199, 0.5);
  width: 100%;
  max-width: 600px;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #FFF;
`;

const Img = styled.img`
  margin: 30px auto 0;
`;

const TitleLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 42px;
  color: #3D485C;
  letter-spacing: -1.75px;
  text-align: center;
`;

const DescLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 21px;
  color: #3D485C;
  text-align: center;
  line-height: 28px;
`;

const SectionWrapper = styled.div`
  border-top: 2px solid #ECECEC;
  width: 100%;
`;

const SectionContainer = styled.div`
  padding: 40px 60px;
`;

const Footer = styled.div`
  background: #FAFAFA;
  width: 100%;
`;

const FooterActionWrapper = styled.div`
  text-align: center;
  padding: 10px 0;
`;
const ActionButton = styled.button`
  background: #DA3128;
  border-radius: 38.5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 24px;
  color: #FFFFFF;
  text-align: center;
  width: 307px;
  height: 77px;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
`;

class BoatReservationDone extends React.PureComponent {
  handleSubmit = () => {
    // document.location.href='https://www.marinemax.com/events/boat-shows/online-access/online-boat-show';
    document.location.href='https://www.marinemax.com/connect/lifestyles/sales-events/endless-staycation-sales-event/online-experience';
  };

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <ContainerWrapper>
            <Img src={MMLogo} />
            <SectionWrapper>
              <SectionContainer>
                <TitleLabel>{'Congratulations!'}</TitleLabel>
                <DescLabel>{'Your boat has been reserved. One of our MarineMax sales professionals will contact you shortly to answer your questions and assist you in purchasing your new boat.'}</DescLabel>
              </SectionContainer>
            </SectionWrapper>
            <Footer>
              <SectionWrapper>
                <SectionContainer>
                  <FooterActionWrapper>
                    <ActionButton
                      onClick={this.handleSubmit}
                    >{'RETURN TO MARINEMAX.COM'}</ActionButton>
                  </FooterActionWrapper>
                </SectionContainer>
              </SectionWrapper>
            </Footer>
          </ContainerWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(BoatReservationDone);