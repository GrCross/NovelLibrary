import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import "./Styles/Search.css";
import NovelCard from "./NovelCard";
import { SearchGenres, InitialSearch, SearchNovels } from "./SearchQuerys";
import Pagination from "./Pagination";
import * as Constants from "./Constants";
import { useLocation } from "react-router-dom";

const Search = () => {
	const startingGenre = useLocation();
	const [novels, setNovels] = useState([]);
	const [pageRange, setPageRange] = useState([1, 10]);

	const generes = useRef([]);
	const years = useRef([]);
	const totalPages = useRef([]);
	const searchFilter = useRef("");
	const genereFilter = useRef("All");
	const statusFilter = useRef("All");
	const yearFilter = useRef("All");
	const sortFilter = useRef("No Filter");
	const pageFilter = useRef(1);

	useEffect(() => {
		fetchNovels();
	}, []);

	const fetchNovels = async () => {
		const genre = startingGenre.state ?? null;
		generes.current = ["All"].concat(await SearchGenres());
		years.current = Array(2023 - 1980 + 1)
			.fill()
			.map((_, i) => 1980 + i);

		years.current = ["All"].concat(years.current);

		const initialSearch =
			genre !== null ? await InitialSearch(genre) : await InitialSearch();
		console.log(initialSearch);
		totalPages.current = initialSearch.pageInfo.lastPage;
		console.log(totalPages.current);
		setNovels(initialSearch.media);
	};

	const handleFilterOptions = (selectedOption) => {
		var value = selectedOption.target.value;
		switch (selectedOption.target.id) {
			case "generes":
				genereFilter.current = value;
				break;
			case "years":
				yearFilter.current = value;
				break;
			case "statuses":
				statusFilter.current = value;
				break;
			case "search":
				searchFilter.current = value;
				break;
			case "sort":
				sortFilter.current = value;

			default:
				break;
		}
		console.log(`Option selected:`, selectedOption.target.value);
	};

	const handleFilter = async () => {
		var variables = {};
		if (genereFilter.current !== "All") {
			variables.genere = genereFilter.current;
		}
		if (statusFilter.current !== "All") {
			variables.status = statusFilter.current;
		}
		if (yearFilter.current !== "All") {
			variables.yearGreater = yearFilter.current * 10000;
			variables.yearLesser = yearFilter.current * 10000 + 10000;
		}
		if (searchFilter.current !== "") {
			variables.search = searchFilter.current;
		}
		if (sortFilter.current !== "No Filter") {
			variables.sortBy = sortFilter.current;
		} else {
			variables.sortBy = "POPULARITY_DESC";
		}
		if (pageFilter.page !== 1) {
			variables.page = pageFilter.current;
		}

		const data = await SearchNovels(variables);

		setNovels(data.media);
	};

	const handlePagination = (currentPage) => {
		pageFilter.current = currentPage;
		handleFilter();
	};

	return (
		<div>
			<h1>Search</h1>
			<div className="searchContainer">
				<div className="searchText">
					<h3>Search</h3>
					<input type="text" id="search" onChange={handleFilterOptions}></input>
				</div>
				<div className="filterBar">
					<h3>Genre</h3>
					<select name="Genre" id="generes" onChange={handleFilterOptions}>
						{generes.current.map((genere, index) => (
							<option key={index} value={genere}>
								{genere}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3>Status</h3>
					<select name="Statuses" id="statuses" onChange={handleFilterOptions}>
						{Constants.statuses.map((status, index) => (
							<option key={index} value={status}>
								{status}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3>Year</h3>
					<select name="Years" id="years" onChange={handleFilterOptions}>
						{years.current.map((year, index) => (
							<option key={index} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3>Sort by</h3>
					<select name="Sort" id="sort" onChange={handleFilterOptions}>
						{Constants.sortList.map((sortBy, index) => (
							<option key={index} value={sortBy}>
								{sortBy}
							</option>
						))}
					</select>
				</div>
				<div>
					<button name="FilterButton" onClick={handleFilter}>
						filter
					</button>
				</div>
			</div>
			<div className="novels_container">
				{novels.map((novel) => (
					<NovelCard
						key={novel.id}
						id={novel.id}
						img={novel.coverImage.extraLarge}
						title={novel.title.romaji}
					></NovelCard>
				))}
			</div>
			<Pagination
				handlePagination={handlePagination}
				totalPages={totalPages.current}
				currentPage={pageFilter.current}
			></Pagination>
		</div>
	);
};

export default Search;
