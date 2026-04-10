import useInterval from "../utils/useInterval";
import React, { useEffect, useState, useRef, forwardRef } from "react";
const classNames = ["previous", "active", "next"];

const CarouselLoadItem = forwardRef((props, ref) => {
	return (
		<a
			ref={
				ref
			}
			className="carousel-item w-25 h-a no-decor"
			target="_blank"
		>
			<div className="video-holder">
				<div className="loader"></div>
				<video
					className="image-stretch w-100 carousel-video"
					autoPlay
					muted
				>
					<source
						className="source"
						type="video/mp4"
					/>
				</video>
			</div>
			<p className="afs-smallest z-1 basic-text-style video-caption text-center m-a">
				Loading...
			</p>
		</a>
	);
});

const CarouselItem = forwardRef((props, ref) => {
	const changeVideo = (e) => {
		const ele =
			e
				.target
				.parentElement;
		var chosenVid =
			Math.floor(
				Math.random() *
					props
						.videos
						.length,
			);
		ele.href =
			props.videos[
				chosenVid
			].youtube_link;
		ele.querySelector(
			".source",
		).src =
			"/videos/" +
			props.videos[
				chosenVid
			].video_title.replace(
				/\s+/g,
				"-",
			) +
			".webm";
		ele.querySelector(
			".video-caption",
		).innerText =
			props.videos[
				chosenVid
			].video_title;
		ele.querySelector(
			".carousel-video",
		).load();
	};

	if (!props.videos) return <div>Loading...</div>;
	const selectedVid = Math.floor(Math.random() * props.videos.length);
	return (
		<a
			ref={
				ref
			}
			className={`carousel-item w-25 h-a no-decor ${classNames[props.id]}`}
			target="_blank"
			href={
				props
					.videos[
					selectedVid
				]
					.youtube_link
			}
		>
			<video
				onEnded={
					changeVideo
				}
				className="image-stretch w-100 carousel-video"
				autoPlay
				muted
			>
				<source
					src={
						"/videos/" +
						props.videos[
							selectedVid
						].video_title.replace(
							/\s+/g,
							"-",
						) +
						".webm"
					}
					className="source"
					type="video/mp4"
				/>
			</video>
			<p className="afs-smallest z-1 basic-text-style video-caption text-center m-a">
				{
					props
						.videos[
						selectedVid
					]
						.video_title
				}
			</p>
		</a>
	);
});

export default function Carousel() {
	const itemsRef = useRef([]);
	const videosRef = useRef([]);
	const [isPlaying, setPlaying] = useState(false);
	const [videos, setVideos] = useState(null);
	const [refsReady, setRefsReady] = useState(false);
	let currentIndex = 0;
	function showNextItem() {
		if (
			itemsRef
				.current
				.length <
				1 ||
			itemsRef
				.current[0] ==
				null
		)
			return;
		const items =
			itemsRef.current;
		items[
			currentIndex
		].classList.add(
			"next",
		);
		items[
			currentIndex
		].classList.remove(
			"previous",
			"active",
		);
		currentIndex =
			(currentIndex +
				1) %
			items.length;
		items[
			currentIndex
		].classList.add(
			"active",
		);
		items[
			currentIndex
		].classList.remove(
			"next",
			"previous",
		);
		items[
			(currentIndex +
				1) %
				items.length
		].classList.add(
			"previous",
		);
		items[
			(currentIndex +
				1) %
				items.length
		].classList.remove(
			"active",
			"next",
		);
	}
	useEffect(() => {
		fetch(
			"/data/showcases.json",
		)
			.then(
				(
					res,
				) => {
					res.json()
						.then(
							(
								body,
							) => {
								setVideos(
									body,
								);
							},
						)
						.catch(
							(
								err,
							) =>
								console.log(
									err,
								),
						);
				},
			)
			.catch(
				(
					err,
				) =>
					console.log(
						err,
					),
			);
	}, []);
	useEffect(() => {
		const items =
			itemsRef.current;
		if (
			items.length <
			1
		)
			return;
		showNextItem();
		setPlaying(
			true,
		);
	}, [refsReady]);
	useInterval(
		() => {
			showNextItem();
		},
		isPlaying
			? 6000
			: null,
	);
	if (!videos)
		return (
			<div className="basic-text-style w-100 carousel">
				{[
					...Array(
						3,
					),
				].map(
					(
						_,
						index,
					) => (
						<CarouselLoadItem
							key={
								index
							}
							ref={(
								el,
							) => {
								itemsRef.current[
									index
								] =
									el;
								if (
									index ===
									2
								)
									setRefsReady(
										true,
									);
							}}
						/>
					),
				)}
			</div>
		);
	return (
		<div className="basic-text-style w-100 carousel">
			{[
				...Array(
					3,
				),
			].map(
				(
					_,
					index,
				) => (
					<CarouselItem
						key={
							index
						}
						videos={
							videos
						}
						id={
							index
						}
						ref={(
							el,
						) => {
							itemsRef.current[
								index
							] =
								el;
							if (
								el
							)
								videosRef.current[
									index
								] =
									el.querySelector(
										".carousel-video",
									);
							if (
								index ===
								2
							)
								setRefsReady(
									true,
								);
						}}
					/>
				),
			)}
		</div>
	);
}
// export default React.forwardRef(Carousel)
