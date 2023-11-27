import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Search from "./Components/Search";
import Home from "./Components/Home";
import Novel from "./Components/Novel";
import Favorites from "./Components/Favorites";
import { createContext, useRef, useState } from "react";

export const Context = createContext();

function App() {
	const [favorite, setFavorites] = useState(
		JSON.parse(localStorage.getItem("favorites")) ?? []
	);

	return (
		<div className="App">
			<Router>
				<NavBar></NavBar>
				<Context.Provider value={[favorite, setFavorites]}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Search" element={<Search />} />
						<Route path="/Novel/:novelId" element={<Novel />}></Route>
						<Route path="/Favorites" element={<Favorites />} />
					</Routes>
				</Context.Provider>
			</Router>
		</div>
	);
}

export default App;
