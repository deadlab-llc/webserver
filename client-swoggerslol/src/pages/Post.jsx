import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetPostByPostName } from "../utils/api/queries.mjs";
import "./Post.css";

const ModSection = (props) => {
	const sectionRef = useRef(null);
	useEffect(() => {
		if (
			!sectionRef
		)
			return;
		sectionRef.current.innerHTML =
			props.data.entry_body;
	}, []);
	return (
		<section
			className="w-100 flex flex-column"
			ref={
				sectionRef
			}
			id={props.data.entry_title.replace(
				/\s+/g,
				"-",
			)}
		></section>
	);
};

export default function Post({ set_nav_data }) {
	const { post_name } = useParams();
	const { loading, ERROR_, data } = useQuery(GetPostByPostName, {
		variables: {
			PostName: post_name.replace(
				/-/g,
				" ",
			),
		},
	});
	useEffect(() => {
		if (
			!data ||
			!data.GetPostByPostName
		)
			return;
		set_nav_data(
			[
				...data.GetPostByPostName.entry.map(
					(
						ele,
					) =>
						ele.entry_title,
				),
				"Version",
				"Download",
			],
		);
	}, [data]);
	if (loading) return <div>loading...</div>;
	if (!data || !data.GetPostByPostName) return <div>Loading</div>;
	document.title = data.GetPostByPostName.post_title + " | Valentine's mods";
	return (
		<div className="mod-info flex flex-column ai-center bg-primary">
			<h2
				className="highlight-text-style text-center fs-largest txt-grad-secondary shimmer"
				style={{
					marginBottom: "0px",
				}}
			>
				{
					data
						.GetPostByPostName
						.post_title
				}
			</h2>
			<div className="underline"></div>
			{data.GetPostByPostName.entry.map(
				(
					ele,
					index,
				) => (
					<>
						<ModSection
							data={
								ele
							}
							key={
								index
							}
						/>
						{ele.is_underlined ? (
							<div
								style={{
									boxShadow: "0px 0px 12px 2px rgba(108,250,208, 0.74)",
								}}
								className="m-y-1 m-x-a quaternary-underline quaternary-glowbox"
							></div>
						) : (
							""
						)}
					</>
				),
			)}
			{/* Versioning */}
			<section
				className="w-100 flex flex-column m-y-3"
				id="Version"
			>
				<h3 className="fs-large text-center highlight-text-style m-y-0">
					Version
				</h3>
				<div className="simple-underline"></div>
				<table className="w-50 m-x-a m-y-1">
					<thead>
						<tr>
							<th>
								Version
								number
							</th>
							<th>
								Patch
								notes
							</th>
						</tr>
					</thead>
					<tbody>
						{data.GetPostByPostName.version_history.map(
							(
								element,
								index,
							) => (
								<tr
									key={
										index
									}
								>
									<td>
										{
											element.version_number
										}
									</td>
									<td
										dangerouslySetInnerHTML={{
											__html: element.patch_note,
										}}
									/>
								</tr>
							),
						)}
					</tbody>
				</table>
				<p className="text-center">
					{"My version standard is as follows:"}
					<br />
					{"<MAJOR>.<MINOR>.<LEAGUE VERSION>.<LEAGUE VERSION>"}
					<br />
					{"IE,
					version
					1.8.13.14
					=
					1
					major
					update,
					8
					minor
					updates,
					last
					tested
					on
					13.14."}
				</p>
			</section>
			<div
				style={{
					boxShadow: "0px 0px 12px 2px rgba(108,250,208, 0.74)",
				}}
				className="quaternary-underline quaternary-glowbox"
			></div>
			{/* Downloads */}
			<section
				id="Download"
				className="flex jc-sb w-90 m-y-5"
			>
				<a
					className="basic-button m-a no-decor"
					target="_blank"
					href="https://discordapp.com/users/357527176020754432"
				>
					<div className="txt-grad-tertiary shimmer fs-large">
						Message
						me
						on
						Discord
					</div>
				</a>
				<a
					className="basic-button m-auto no-decor"
					target="_blank"
					href={
						data
							.GetPostByPostName
							.download_url_override
							? data
									.GetPostByPostName
									.download_url_override
							: `https://github.com/AlecRuin/${data.GetPostByPostName.post_title.replace(/\s+/g, "-")}/releases/latest`
					}
				>
					<div className="txt-grad-secondary shimmer fs-larger">
						Download
					</div>
				</a>
				<a
					className="basic-button m-a no-decor"
					target="_blank"
					href="https://discord.gg/p9bR7hc57r"
				>
					<div className="txt-grad-tertiary shimmer fs-large text-center m-auto">
						Join
						my
						Discord
						server
					</div>
				</a>
			</section>
		</div>
	);
}
