import React, { useState, useEffect } from "react";
import { fetchShowsFromApi } from "../lib/api";
import ShowsCard from "./ShowsCard";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: grid;
  border-radius: 20px;
  grid-template-columns: 0.9fr;
  grid-gap: 20px;
  grid-auto-rows: 1fr;
  justify-content: center;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 0.45fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 0.32fr);
  }
`;

const ShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const fetchedShows = await fetchShowsFromApi();
        setShows(fetchedShows);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyledContainer>
      {shows.map((show) => (
        <ShowsCard
          key={show.id}
          title={show.title}
          image={show.image}
          ticketsUrlInfos={show.see_tickets_url_infos}
          synopsis={show.synopsis}
        />
      ))}
    </StyledContainer>
  );
};

export default ShowsPage;
