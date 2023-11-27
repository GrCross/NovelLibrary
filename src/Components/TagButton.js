import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Home.css";
import { pastelColors } from "./Constants";

const TagButton = (params) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		var randomNumber = randomNumberInRange();
		setColor(pastelColors[randomNumber]);
	}, []);

	const randomNumberInRange = () => {
		return Math.floor(Math.random() * (pastelColors.length - 0 + 1)) + 0;
	};
	return (
		<Link to={`/Search`} state={{ genre: params.genre }}>
			<button style={{ background: color }} className="genereButton">
				{params.genre}
			</button>
		</Link>
	);
};

export default TagButton;
