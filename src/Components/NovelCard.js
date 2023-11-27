import React, { useContext, useEffect, useState } from "react";
import "./Styles/Search.css";
import "./Styles/NovelCard.css";
import { Link } from "react-router-dom";
import { Context } from "../App";

const NovelCard = (props) => {
	const [favorites, setFavorites] = useContext(Context);
	const [favorite, setFavorite] = useState(false);

	useEffect(() => {
		window.dispatchEvent(new Event("storage"));
		setFavorite(isFavorite());
	}, []);

	const isFavorite = () => {
		if (favorites.length === 0) {
			return false;
		}
		var temp = favorites.filter((novel) => novel.id === props.id);
		var isFavorite =
			favorites.filter((novel) => novel.id === props.id).length !== 0;

		return isFavorite;
	};

	const handleFavorites = (favorite) => {
		if (favorite) {
			setFavorites([...favorites, props]);
			setFavorite(favorite);
			localStorage.setItem("favorites", JSON.stringify([...favorites, props]));
		} else if (!favorite) {
			setFavorites(favorites.filter((novel) => novel.id !== props.id));
			localStorage.setItem(
				"favorites",
				JSON.stringify(favorites.filter((novel) => novel.id !== props.id))
			);
			setFavorite(favorite);
		}
	};

	return (
		<div className="novel_card" index={props.index}>
			<div className="image-container">
				<Link className="novelTitle" to={`/Novel/${props.id}`}>
					<img className="novelImage" src={props.img} alt="pwp" />
				</Link>
				<button
					className="heart-button"
					onClick={
						favorite
							? () => {
									handleFavorites(false);
							  }
							: () => {
									handleFavorites(true);
							  }
					}
				>
					<svg
						className={favorite ? "heart-shape-active" : "heart-shape-deactive"}
						viewBox="0 0 29 29"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							className="heart-path"
							d="
M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183
C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5
C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366
C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"
						/>
						Sorry, your browser does not support inline SVG.
					</svg>
				</button>
			</div>
			<Link className="novelTitle" to={`/Novel/${props.id}`}>
				<div>
					<h4>
						<b>{props.title}</b>
					</h4>
				</div>
			</Link>
		</div>
	);
};

export default NovelCard;
