import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import useRequest from "../../hooks/useRequest";

const Home = () => {
	const { fetchData: fetchEvents } = useRequest("newsevent", "POST");

	useEffect(() => {
		fetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const getDateTime = (date) => {
	//   const changeDate = new Date(date)
	//   const finalDate = changeDate.toLocaleDateString(undefined, {
	//     month: 'short',
	//     day: '2-digit',
	//     year: 'numeric',
	//   })
	//   const finalTime = changeDate.toLocaleString(undefined, {
	//     hour: '2-digit',
	//     minute: '2-digit',
	//     timeZoneName: 'short',
	//   })

	//   return `${finalDate}, at ${finalTime}`
	// }
	return (
		<div>
			{/* <Navigation /> */}
			<HeroSection />
			<TabsContainer />
			<CardSection />
			<center>
				<h1
					className='has-text-centered my-6 has-text-weight-bold is-size-1'
					style={{ display: "inline-block", padding: "5px 10px" }}>
					Career{" "}
					<b
						className='px-3'
						style={{
							background: "#71AE4D",
							color: "#fff",
							fontWeight: "bold",
						}}>
						Events
					</b>
				</h1>
			</center>
			<Events />
		</div>
	);
};

const HeroSection = () => (
	<div>
		<section className='hero is-medium pt-5'>
			<div
				className='row align-items-center justify-content-end'
				id='hero-cr pt-3'>
				<div className='d-none d-lg-block col-lg-6 p-3'>
					<img
						className='img-fluid'
						src={require("../assets/images/group_flight.png")}
						alt=''
					/>
				</div>

				<div className='container col-lg-6'>
					<h1
						className='has-text-white'
						style={{
							marginBottom: "35px",
							marginTop: "-30px",
							fontSize: "35px",
						}}>
						Career Guidance Tools For All
					</h1>
					<ul className='hero-ul'>
						<li>
							<BsPencilSquare size={60} />
							<div className='hero-ul-text mt-0'>
								<h4
									className='is-size-5 mb-0'
									id='hdr-1'
									style={{ paddingTop: "18px" }}>
									Create
								</h4>
								<span> a Career Profile</span>
							</div>
						</li>
						<li>
							<AiOutlineFileSearch size={60} />
							<div
								className='hero-ul-text mt-0'
								id='discover-text-header'>
								<h4
									className='is-size-5 mb-0 mt-2'
									id='hdr-2'>
									Discover
								</h4>
								<span>your Career Interests</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
);

export const TabsContainer = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	function searchJob(e) {
		e.preventDefault();

		navigate(`/career/search/${query}`);
	}

	return (
		<div className='holder'>
			<div id='tabscontainer'>
				<input
					type='radio'
					name='radiogroupfortabs'
					id='radiofortab4'
					checked
				/>
				<label
					htmlFor='query'
					id='tab-label4'>
					Search
				</label>
				<form
					action=''
					onSubmit={searchJob}
					id='tab-content4'>
					<div className='px-4 row pt-5 pb-3'>
						<div className='col-md-10'>
							<input
								className='form-control py-2 mb-2'
								type='text'
								name='query'
								id='query'
								onChange={(e) => {
									setQuery(e.target.value);
								}}
								placeholder='Search by job name or job department'
							/>
						</div>
						<div className='col-md-2'>
							<center>
								<button
									type='submit'
									className='px-4 py-2 btn'
									style={{ backgroundColor: "#71AE4D", color: "white" }}>
									Search Now
								</button>
							</center>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

const Card = ({ link, Icon, text }) => (
	<div
		className='column car-card mx-2 my-3'
		style={{ flexGrow: 1, flexBasis: "300px" }}>
		<center className='p-4'>
			<center>
				{/* <Icon className="my-3" size={50} style={{ color: '#71AE4D' }} /> */}
				<img
					src={Icon}
					width={150}
					style={{ objectFit: "cover" }}
					className='my-3'
					alt=''
				/>
			</center>
			<center>
				<Link
					to={link}
					className=' px-2 py-3 has-text-black'
					style={{ color: "#71AE4D" }}>
					{text}
				</Link>
			</center>
		</center>
	</div>
);

const CardSection = () => (
	<section className='holder'>
		<div className='holder py-5'>
			<div
				style={{
					maxWidth: "100% !important",
					width: "100% !important",
					marginLeft: "auto !important",
					marginRight: "auto !important",
					display: "flex",
					flexWrap: "wrap",
				}}>
				<Card
					link='/career/jobs'
					Icon={require("../assets/images/resume.png")}
					text='VIEW ALL JOBS'
				/>
				<Card
					link='/career/applications'
					Icon={require("../assets/images/hiring.png")}
					text='MY JOB APPLICATIONS'
				/>
				<Card
					link='/career/saved'
					Icon={require("../assets/images/savedsearches.png")}
					text='MY SAVED SEARCHES'
				/>
			</div>
		</div>
	</section>
);

export default Home;
