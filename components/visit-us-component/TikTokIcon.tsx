export const TikTokIcon = () => (
  <svg
  fill="none"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  id="tiktok"
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6"
>
  <path
    d="M21,7H20a4,4,0,0,1-4-4H12V14.5a2.5,2.5,0,1,1-4-2V8.18a6.5,6.5,0,1,0,8,6.32V9.92A8,8,0,0,0,20,11h1Z"
    style={{
      fill: "none",
      stroke: "black",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
    }}
  />
</svg>
);


export const TikTokIconFooter = () => (
  <svg
    fill="white"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    id="tiktok"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M21,7H20a4,4,0,0,1-4-4H12V14.5a2.5,2.5,0,1,1-4-2V8.18a6.5,6.5,0,1,0,8,6.32V9.92A8,8,0,0,0,20,11h1Z"
      style={{
        fill: "white",         // interior blanco
        stroke: "gray",        // bordes grises
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
// Uso
{
  /* <a
  href={tiktok}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2"
>
  <TikTokIcon />
  <span>@{tiktokUser}</span>
</a> */
}
