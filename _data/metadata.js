export default {
  title: "The Whitestone Foundation",
  description: "Whitestone Publications and programs in critical theory, public scholarship, and higher education.",
  url: "http://localhost:8080",
  contact: "whitestone.pubs@gmail.com",
  footer: {
    startYear: 1999,
    text: "The Whitestone Foundation, a 501c3 corporation located in Boulder, Colorado."
  },
  nav: [
    { label: "Home", url: "/" },
    { label: "Mission", url: "/mission/" },
    { label: "News", url: "/news/" },
    { label: "Events ︾", url: "/events/", children: [
      { label: "Higher Ed", url: "/higher-ed/" },
      { label: "Videos", url: "/videos/" },
      { label: "Panelists", url: "/panelists/" }
    ]},
    { label: "Search ︾", url: "/search/", children: [
      { label: "Site Search", url: "/search/" },
      { label: "Metadata Search", url: "/metadata/search/" }
    ]},
    { label: "People", url: "/people/" },
    { label: "Contact", url: "/contact/" }
  ]
};
