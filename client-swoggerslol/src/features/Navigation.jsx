import { useEffect, useRef } from "react";
export default function Navigation({ data }) {
	const navRef = useRef(null);
	useEffect(() => {
		if (
			!navRef
		)
			return;
		const updateNavPos =
			() => {
				navRef.current.style.top =
					window.scrollY +
					20 +
					"px";
			};
		window.addEventListener(
			"scroll",
			updateNavPos,
		);
		const removeEventListeners =
			() => {
				if (
					!navRef ||
					navRef.current ==
						null
				)
					return;
				navRef.current.removeEventListener(
					"ended",
					updateNavPos,
				);
			};
		return removeEventListeners;
	}, []);
	try {
		return (
			<nav
				ref={
					navRef
				}
				className="navigation-box"
			>
				<ul className="navigation-list">
					<h3
						style={{
							marginLeft: "10px",
							marginRight: "10px",
						}}
						className="fs-large navigation-title"
					>
						Table
						of
						contents
					</h3>
					<div className="simple-underline"></div>
					{data &&
					data.length >
						0
						? data.map(
								(
									element,
								) => {
									return (
										<li
											key={
												element
											}
										>
											<a
												className="no-decor fs-normal"
												href={
													"#" +
													element.replace(
														/\s+/g,
														"-",
													)
												}
											>
												{
													element
												}
											</a>
										</li>
									);
								},
							)
						: "Loading..."}
				</ul>
			</nav>
		);
	} catch (error) {
		console.log(
			error,
		);
		return error;
	}
}
