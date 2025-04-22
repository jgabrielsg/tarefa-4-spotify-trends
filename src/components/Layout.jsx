import TopHeader from "./TopHeader";
import Footer from "./Footer";

export default function Layout({ children }) {
	return (
		<>
			<div className="body">
				<TopHeader />

				<main>{children}</main>

				<Footer />
			</div>
		</>
	)
}