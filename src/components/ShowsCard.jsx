import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin: 10px;
`;

const StyledText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #484848;
  text-align: center;
`;

const StyledImageContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  padding-top: 55%;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledBox = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(249, 151, 13, 1) 0%,
    rgba(217, 10, 10, 1) 83%
  );
  padding: 15px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`;

const ShowsCard = ({ title, image, ticketsUrlInfos, synopsis }) => {
  const CardContent = () => (
    <div>
      <StyledImageContainer>
        <StyledImage src={image} alt={title} />
      </StyledImageContainer>
      <StyledHeading>{title}</StyledHeading>
    </div>
  );

  return (
    <>
      {ticketsUrlInfos && ticketsUrlInfos.length === 0 ? (
        <StyledCard style={{ filter: "grayscale(100%)", opacity: "0.5" }}>
          <CardContent />
          <StyledText style={{ color: "black", alignSelf: "end" }}>
            SOLD OUT
          </StyledText>
        </StyledCard>
      ) : (
        <StyledCard>
          <CardContent />
          <StyledText>{synopsis || "About The Show"}</StyledText>
          <StyledBox>
            <StyledLink
              data-testid="url-link"
              href={ticketsUrlInfos && getURL(ticketsUrlInfos)}
            >
              Book Now{" "}
            </StyledLink>
          </StyledBox>
        </StyledCard>
      )}
    </>
  );
};

const getURL = (ticketsUrlInfos) => {
  const urlRegex = /online.tickets.com/;
  const fallbackUrlRegex = /official.seetickets.com/;

  const matchTicketURL = (regex) =>
    ticketsUrlInfos.find((ticket) => regex.test(ticket.url));

  const ticket = matchTicketURL(urlRegex) || matchTicketURL(fallbackUrlRegex);

  return ticket ? ticket.url : "";
};
export default ShowsCard;
