import React from "react";
import ContentLoader from "react-content-loader";

const SimpleLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="136" height="13" />
    <rect x="330" y="22" rx="4" ry="4" width="50" height="4" />
    <rect x="4" y="67" rx="5" ry="5" width="280" height="84" />
    <rect x="76" y="28" rx="4" ry="4" width="172" height="13" />
    <rect x="76" y="44" rx="4" ry="4" width="200" height="13" />
    <rect x="330" y="29" rx="4" ry="4" width="50" height="4" />
    <rect x="331" y="35" rx="4" ry="4" width="50" height="4" />
    <rect x="289" y="66" rx="5" ry="5" width="104" height="84" />
    <rect x="289" y="158" rx="5" ry="5" width="104" height="132" />
    <rect x="4" y="160" rx="5" ry="5" width="280" height="132" />
  </ContentLoader>
);

// ProfileLoader.metadata = {
//   name: 'Muneeb R. Baig',
//   github: 'muneebrbaig',
//   description: 'Profile',
//   filename: 'profile.loader.js',
// }

export default SimpleLoader;
