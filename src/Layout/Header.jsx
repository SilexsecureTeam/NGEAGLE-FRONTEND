import React, { useState } from "react";
import Navbar from "../Layout/components/NavBar";
import "../style/header.css";

export default function Header() {
	const [currentSelect, setCurrenttSelect] = useState("book");

	return (
		<>
			<Navbar
				selected={currentSelect}
				setSelected={setCurrenttSelect}
			/>
			{/* <div
        className=""
        style={{
          backgroundColor: COLORS.secondary,
          color: 'white',
          display: location.pathname === '/' ? 'block' : 'none',
        }}
      >
        <MainHeader selected={currentSelect} />
      </div> */}
		</>
	);
}
