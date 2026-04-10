export default function Announcements({ data }) {
	return (
		<div className="m-mx-my h-a jc-center flex">
			<div className="w-100 bg-primary black-border h-a announcement-nugget overflow-hidden">
				<h3 className="basic-text-style text-center fs-large m-y-1">
					ACTIVE
					PROJECT
				</h3>
				<div className="underline m-y-1"></div>
				<div className="flex jc-se">
					{data.map(
						(
							element,
						) => (
							<div
								key={
									element._id
								}
								className="w-30 h-a"
							>
								<h2 className="highlight-text-style no-wrap text-center wrap-when-small">
									{
										element.post_title
									}
								</h2>
								<div className="underline"></div>
								<h3 className="txt-grad-r-rgb1-rgb2-rgb1 m-y-5 shimmer text-center">
									STATUS
								</h3>
								<p className="text-center">
									{
										element.preview_text
									}
								</p>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
}
