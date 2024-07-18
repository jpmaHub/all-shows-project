import ShowsCard from "./ShowsCard";
import { render, screen } from '@testing-library/react';

const fakeShowWithNoBookingURL = {
  title: "movie 1",
  ticketsUrlInfos: [],
};

const fakeShowWithBookingURL = {
  title: "movie 2",
  ticketsUrlInfos: [{
    "url_type": "test",
    "url": "https://official.seetickets.com/djhgrgtt",
  },
  {
    "url_type": "test2",
    "url": "https://onlineticket.seetickets.com/djhgfegfret",
  }],
}

const fakeShowWithFallbackURL = {
  title: "movie 3",
  ticketsUrlInfos: [{
    "url_type": "test",
    "url": "https://official.seetickets.com/test",
  }]
}

const fakeShowWithDefaultURL = {
  title: "movie 3",
  image: "",
  ticketsUrlInfos: [ {
    "url_type": "test",
    "url": "https://official.seetickets.com/test",
  },
  {
    "url_type": "online",
    "url": "https://online.tickets.com/test",
  }]
}

describe("ShowCard", () => {
  test("returns sold out text when ticket urls are empty", () => {
    render(
      <ShowsCard
        title={fakeShowWithNoBookingURL.title}
        image={fakeShowWithNoBookingURL.image}
        ticketsUrlInfos={fakeShowWithNoBookingURL.ticketsUrlInfos}
      />
    );
    const text = screen.getByText(/SOLD OUT/i);
    expect(text).toBeDefined();
  });

  test("returns book now text when ticket urls are not empty", () => {
    render(
      <ShowsCard
        title={fakeShowWithBookingURL.title}
        image={fakeShowWithBookingURL.image}
        ticketsUrlInfos={fakeShowWithBookingURL.ticketsUrlInfos}
      />
    );
    const text = screen.getByText(/BOOK NOW/i);
    expect(text).toBeDefined();
  });

  test("returns fallback url when ticket url infos does not include the default url", () => {
    render(
      <ShowsCard
        title={fakeShowWithFallbackURL.title}
        image={fakeShowWithFallbackURL.image}
        ticketsUrlInfos={fakeShowWithFallbackURL.ticketsUrlInfos}
      />
    );
    const link = screen.getByTestId('url-link')
    expect(link.href).toBe('https://official.seetickets.com/test');
  });

  test("returns default url when ticket url infos include the default url", () => {
    render(
      <ShowsCard
        title={fakeShowWithDefaultURL.title}
        image={fakeShowWithDefaultURL.image}
        ticketsUrlInfos={fakeShowWithDefaultURL.ticketsUrlInfos}
      />
    );
    const link = screen.getByTestId('url-link')
    expect(link.href).toBe('https://online.tickets.com/test');
  });
})