import React, { memo } from "react";

const Message = ({ sender, message, list, questions }) => {
	return (
		<div className='messageContainer'>
			<div
				className='bubbleWrapper'
				style={{ marginLeft: sender === "user" ? "auto" : "5px" }}>
				<div
					className='bubbleContent'
					style={{
						backgroundColor:
							sender === "user"
								? "#71AE4D"
								: sender === "bot" && (list || questions)
								? "transparent"
								: "#f0f0f0",
						color: sender === "user" ? "#f0f0f0" : "#000",
					}}>
					{message}
				</div>
			</div>
		</div>
	);
};

export default memo(Message);
