import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchNovel } from "./SearchQuerys";
import "./Styles/Novel.css";
import NovelCard from "./NovelCard";
import TagButton from "./TagButton";

const Novel = () => {
	const params = useParams();
	const fetchNovel = async () => {
		const data = await SearchNovel(params.novelId);
		setNovel(data);
		console.log(data);
		return data;
	};

	const [novel, setNovel] = useState({
		id: 0,
		title: {
			romaji: "",
		},
		genres: [],
		description: "",
		coverImage: {
			extraLarge: "",
			large: "",
			medium: "",
			color: "",
		},
	});

	useEffect(() => {
		fetchNovel();
	}, []);

	return (
		<>
			<h1>{novel.title.romaji}</h1>
			<div className="novelContainer">
				<NovelCard
					key={novel.id}
					id={novel.id}
					img={novel.coverImage.extraLarge}
					title={novel.title.romaji}
				></NovelCard>
			</div>
			{novel.genres.map((genre) => (
				<TagButton genre={genre}></TagButton>
			))}
			<div
				className="descriptionText"
				dangerouslySetInnerHTML={{ __html: novel.description }}
			/>
		</>
	);
};

export default Novel;
