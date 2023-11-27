import React, { useEffect, useRef, useState } from "react";
import { InitialSearch, SearchGenres, SearchNovel } from "./SearchQuerys";
import "./Styles/Home.css";
import { Link } from "react-router-dom";
import NovelCard from "./NovelCard";
import TagButton from "./TagButton";

const Home = () => {
	const tagRef = useRef(null);
	const [generes, setGeneres] = useState([]);
	const [recomendedNovels, setRecommendedNovels] = useState([]);
	const [arrowDisable, setArrowDisable] = useState(true);

	useEffect(() => {
		fetchGeneres();
		fetchNovels();
	}, []);

	const fetchGeneres = async () => {
		setGeneres(await SearchGenres());
	};

	const fetchNovels = async () => {
		var params = {
			pages: 1,
			perPage: 6,
		};
		var novels = await InitialSearch(params);
		setRecommendedNovels(novels.media);
	};

	const handleHorizontalScroll = (element, speed, distance, step) => {
		let scrollAmount = 0;
		const slideTimer = setInterval(() => {
			element.scrollLeft += step;
			scrollAmount += Math.abs(step);
			if (scrollAmount >= distance) {
				clearInterval(slideTimer);
			}
			if (element.scrollLeft === 0) {
				setArrowDisable(true);
			} else {
				setArrowDisable(false);
			}
		}, speed);
	};

	return (
		<div className="homeContainer">
			<div className="tagsContainer" ref={tagRef}>
				<button
					className="scrollButton-left"
					disabled={arrowDisable}
					onClick={() => {
						handleHorizontalScroll(tagRef.current, 10, 500, -10);
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
						<path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
					</svg>
				</button>
				{generes.map((genre) => (
					<TagButton genre={genre}></TagButton>
				))}
				<button
					className="scrollButton-right"
					onClick={() => {
						handleHorizontalScroll(tagRef.current, 10, 500, 10);
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
						<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
					</svg>
				</button>
			</div>
			<h1>Recommended Novels</h1>
			<div className="recomendedWorks">
				{recomendedNovels.map((novel) => (
					<NovelCard
						key={novel.id}
						id={novel.id}
						img={novel.coverImage.extraLarge}
						title={novel.title.romaji}
					></NovelCard>
				))}
			</div>
		</div>
	);
};

export default Home;
