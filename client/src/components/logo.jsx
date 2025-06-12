export default function Logo({ color = "black" }) {
  return (
    <div className="relative w-10 h-10">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" fill={color === "white" ? "#fff" : "#000"} />
        <text
          x="50"
          y="62"
          fontSize="40"
          fontWeight="bold"
          textAnchor="middle"
          fill={color === "white" ? "#000" : "#fff"}
        >
          BJT
        </text>
      </svg>
    </div>
  )
}
