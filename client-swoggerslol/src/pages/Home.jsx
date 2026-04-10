import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GetAllPosts } from "../utils/api/queries.mjs";
import { Preview } from "./index.mjs";
import { Carousel, Announcements } from "../features/index.mjs";
import "./Home.css";

const chunkArray = (array, size) => {
	return array.reduce(
		(
			acc,
			_,
			i,
		) => {
			if (
				i %
					size ===
				0
			)
				acc.push(
					array.slice(
						i,
						i +
							size,
					),
				);
			return acc;
		},
		[],
	);
};

export default function Home({ set_nav_data }) {
	//useEffect for when component mounts
	//useState for storing fetched data
	const {
		loading,
		error,
		data,
	} =
		useQuery(
			GetAllPosts,
		);
	const [
		posts,
		setPosts,
	] =
		useState(
			[],
		);
	useEffect(() => {
		if (
			data
		) {
			setPosts(
				data.GetAllPosts,
			);
			set_nav_data(
				data.GetAllPosts.filter(
					(
						ele,
					) =>
						!ele.is_active_project,
				).map(
					(
						post,
					) =>
						post.post_title,
				),
			);
		}
	}, [
		data,
		set_nav_data,
	]);
	if (
		loading
	)
		return (
			<Preview
				data={
					posts
				}
			/>
		);
	if (
		error
	)
		throw error;
	document.title =
		"Valentine's mods";
	return (
		<>
			<Carousel />
			<Announcements
				data={posts.filter(
					(
						ele,
					) =>
						ele.is_active_project,
				)}
			/>
			<div>
				<h3 className="highlight-text-style text-center fs-larger m-my">
					PROJECTS
					<div className="underline"></div>
				</h3>
			</div>
			<div className="flex w-100 ai-center flex-wrap">
				{/* {
                    posts.filter(ele=>!ele.is_active_project).map((post,index)=>{
                        return(
                                <Preview key={post._id} data={post} index={index}/>
                        )
                    })
                } */}
				{chunkArray(
					posts.filter(
						(
							ele,
						) =>
							!ele.is_active_project,
					),
					2,
				).map(
					(
						pair,
						index,
					) => (
						<div
							className="w-100 flex"
							key={
								index
							}
						>
							{pair.map(
								(
									item,
									idx,
								) => (
									<Preview
										key={
											item._id
										}
										data={
											item
										}
										index={
											index +
											idx
										}
									/>
								),
							)}
						</div>
					),
				)}
			</div>
		</>
	);
}
