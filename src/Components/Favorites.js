import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import NovelCard from "./NovelCard";

const Favorites = () => {
	const [favorites, setFavorites] = useContext(Context);

	useEffect(() => {
		test();
	}, []);
	const test = () => {
		console.log(favorites);
		console.log("hola");
	};

	return (
		<div className="favoritesContainer">
			<h1>Favorites</h1>
			<div className="novels_container">
				{favorites.map((novel) => (
					<NovelCard
						key={novel.id}
						id={novel.id}
						img={novel.img}
						title={novel.title}
					></NovelCard>
				))}
			</div>
		</div>
	);
};

export default Favorites;
