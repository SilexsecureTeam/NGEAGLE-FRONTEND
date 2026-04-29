/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
	const [loggedIn] = useState(
		JSON.parse(window.localStorage.getItem("job_user")),
	);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {}, []);
	return (
		<>
			<nav id='nav'>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "75%",
						alignItems: "center",
					}}>
					<Link to='/career'>
						<img
							src={require("../../images/ng_logo.png")}
							alt=''
							style={{ width: "100px" }}
						/>
					</Link>

					<div
						className='d-lg-none'
						onClick={() => {
							setShowMenu(!showMenu);
						}}>
						<BsMenuButtonWide size={30} />{" "}
					</div>
					<div className='d-none d-lg-block'>
						<span className='mx-2'>
							<Link to='/career'>Home</Link>
						</span>
						<span className='mx-2'>
							<Link to='/career/applications'>My Applications</Link>
						</span>
						{loggedIn !== null && (
							<>
								<span className='mx-2'>
									<Link to='/career/profile'>
										Welcome {loggedIn.first_name}
									</Link>
								</span>
								<span className='mx-2'>
									<Link to='/career/saved'>Saved Jobs</Link>
								</span>
							</>
						)}
					</div>

					<div className='d-none d-lg-block'>
						{
							loggedIn === null ? (
								<Link to='/career/login'>
									<button
										style={{ backgroundColor: "white", color: "#71AE4D" }}
										className='btn'>
										Login
									</button>
								</Link>
							) : (
								// <Link to="/career/login">
								<button
									onClick={() => {
										window.localStorage.removeItem("job_user");
										window.location.href = "/career";
									}}
									style={{ backgroundColor: "white", color: "#71AE4D" }}
									className='btn'>
									Log Out
								</button>
							)
							// </Link>
						}
					</div>
				</div>
			</nav>
			{showMenu && (
				<div
					className='p-5 text-white'
					style={{
						position: "fixed",
						backgroundColor: "#71AE4D",
						width: "100%",
						height: "100vh",
						zIndex: 20,
						top: "0px",
					}}>
					<div className='text-end'>
						<h1
							onClick={() => {
								setShowMenu(false);
							}}
							className='display-1'>
							<MdClose />
						</h1>
					</div>

					<div className='mb-5 g-5'>
						<div className='mx-2 mb-5'>
							<Link
								onClick={() => {
									setShowMenu(false);
								}}
								to='/career'>
								Home
							</Link>
						</div>
						<div className='mx-2  mb-5'>
							<Link
								onClick={() => {
									setShowMenu(false);
								}}
								to='/career/applications'>
								My Applications
							</Link>
						</div>
						{loggedIn !== null && (
							<>
								<div className='mx-2  mb-5'>
									<Link
										onClick={() => {
											setShowMenu(false);
										}}
										to='/career/profile'>
										Welcome {loggedIn.first_name}
									</Link>
								</div>
								<div className='mx-2  mb-5'>
									<Link
										onClick={() => {
											setShowMenu(false);
										}}
										to='/career/saved'>
										Saved Jobs
									</Link>
								</div>
							</>
						)}
					</div>

					<div className=''>
						{
							loggedIn === null ? (
								<Link
									onClick={() => {
										setShowMenu(false);
									}}
									to='/career/login'>
									<button
										style={{ backgroundColor: "white", color: "#17298F" }}
										className='btn'>
										Login
									</button>
								</Link>
							) : (
								// <Link to="/career/login">
								<button
									onClick={() => {
										setShowMenu(false);
										window.localStorage.removeItem("job_user");
										window.location.href = "/career";
									}}
									style={{ backgroundColor: "white", color: "#17298F" }}
									className='btn'>
									Log Out
								</button>
							)
							// </Link>
						}
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
