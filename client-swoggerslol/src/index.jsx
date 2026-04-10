import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { Link } from "react-router-dom";
// import {Link} from "react-router"
import "./main.css";
import "./index.css";
import { Home, Post } from "./pages/index.mjs";
// import Navigation from './Feature/Navigation'
import { useEffect, useState } from "react";
// import Banner from "./Feature/Banner"
import { Banner, Navigation } from "./features/index";

const ScrollToTop = () => {
	const {
		pathname,
	} =
		useLocation();
	useEffect(() => {
		window.scrollTo(
			0,
			0,
		);
	}, [
		pathname,
	]);
	return null;
};

export default function Index() {
	try {
		const [
			nav_data,
			set_nav_data,
		] =
			useState(
				[],
			);
		return (
			<>
				<Navigation
					data={
						nav_data
					}
				/>
				<Router>
					<ScrollToTop />
					<Link
						to={
							"/"
						}
						className="no-decor hero-title"
					>
						<h1 className="m-a text-center basic-text-style fs-larger">
							Katlec
							Valentine's
							Mods
						</h1>
						<div className="underline"></div>
						<h4
							style={{
								marginBottom: "1vh",
							}}
							className="m-a text-center basic-text-style fs-large"
						>
							aka
							Swoggers
						</h4>
					</Link>
					<div className="flex h-a jc-space-between">
						<Banner />
						<div className="h-a flex flex-column">
							<Routes>
								<Route
									path="/"
									element={
										<Home
											set_nav_data={
												set_nav_data
											}
										/>
									}
								/>
								<Route
									path="posts/:post_name"
									element={
										<Post
											set_nav_data={
												set_nav_data
											}
										/>
									}
								/>
							</Routes>
						</div>
						<Banner />
					</div>
				</Router>
			</>
		);
	} catch (error) {
		console.log(
			error,
		);
		return (
			<p>
				Error:
				{
					error.message
				}
			</p>
		);
	}
}
