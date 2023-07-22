import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="145" cy="129" r="130" />
    <rect x="0" y="270" rx="15" ry="15" width="280" height="27" />
    <rect x="0" y="310" rx="15" ry="15" width="280" height="85" />
    <rect x="0" y="405" rx="15" ry="15" width="135" height="35" />
    <rect x="140" y="405" rx="15" ry="15" width="135" height="35" />
  </ContentLoader>
);

export default Skeleton;
