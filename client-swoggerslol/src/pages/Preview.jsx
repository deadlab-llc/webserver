import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Preview.css";
export default function Preview({ data, index }) {
	const prevTxtRef = useRef(null);
	useEffect(() => {
		if (
			!data ||
			data.length <
				1
		)
			return;
		prevTxtRef.current.innerHTML =
			data.preview_text;
	}, []);
	try {
		if (
			!data ||
			data.length <
				1
		)
			return (
				<div>
					Loading...
				</div>
			);
		const flipped =
			(index +
				1) %
				2 ==
			1;
		const post_title_hyphen =
			data.post_title.replace(
				/\s+/g,
				"-",
			);
		return (
			<section
				style={{
					marginBottom: "2%",
				}}
				className="w-70 preview "
				id={
					post_title_hyphen
				}
			>
				<div
					style={{
						float: `${flipped ? "left" : "right"}`,
					}}
					className={`preview-nugget bg-primary black-border`}
				>
					<div
						style={{
							flexDirection: `${flipped ? "row-reverse" : "row"}`,
						}}
						className="flex h-100 w-100 jc-space-between"
					>
						<Link
							to={
								"/posts/" +
								post_title_hyphen
							}
						>
							<img
								className="h-100 preview-image"
								src={
									"/images/mods/" +
									post_title_hyphen +
									".webp"
								}
							/>
						</Link>
						<div className="flex flex-column w-60 m-x-5 details-nugget">
							<Link
								to={
									"/posts/" +
									post_title_hyphen
								}
								className="txt-grad-secondary shimmer m-x-a fs-large m-y-1"
							>
								{
									data.post_title
								}
							</Link>
							<div
								ref={
									prevTxtRef
								}
								className="bold"
							>
								{/* {data.preview_text} */}
							</div>
							<div
								className="flex jc-space-between"
								style={{
									flexDirection: `${flipped ? "row" : "row-reverse"}`,
								}}
							>
								<Link
									to={
										"/posts/" +
										post_title_hyphen
									}
									className="no-decor button"
								>
									<div className="shimmer txt-grad-quaternary">
										Learn
										more
									</div>
								</Link>
								<a
									target="_blank"
									className="no-decor button"
									href={`https://www.github.com/AlecRuin/${post_title_hyphen}/releases/latest`}
								>
									<div className="shimmer txt-grad-tertiary">
										Download
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	} catch (error) {
		console.log(
			error,
		);
		return error;
	}
}
