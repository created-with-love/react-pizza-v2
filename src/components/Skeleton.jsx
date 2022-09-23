import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    className="pizza-block"
    speed={1}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="521" y="229" rx="3" ry="3" width="88" height="6" />
    <rect x="561" y="225" rx="3" ry="3" width="52" height="6" />
    <rect x="339" y="229" rx="3" ry="3" width="410" height="6" />
    <rect x="409" y="234" rx="3" ry="3" width="380" height="6" />
    <rect x="446" y="233" rx="3" ry="3" width="178" height="6" />
    <circle cx="569" cy="227" r="20" />
    <circle cx="594" cy="537" r="56" />
    <circle cx="579" cy="534" r="17" />
    <circle cx="575" cy="534" r="13" />
    <circle cx="586" cy="531" r="11" />
    <rect x="515" y="494" rx="0" ry="0" width="119" height="115" />
    <rect x="547" y="461" rx="0" ry="0" width="70" height="106" />
    <circle cx="138" cy="128" r="123" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="86" />
    <rect x="0" y="425" rx="10" ry="10" width="100" height="30" />
    <rect x="145" y="417" rx="20" ry="20" width="135" height="43" />
  </ContentLoader>
);

export default Skeleton;
