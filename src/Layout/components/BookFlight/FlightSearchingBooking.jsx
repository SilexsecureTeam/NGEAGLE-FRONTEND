import React, { useEffect, useState } from "react";
import "./Bookflight.css";
import $ from "jquery";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
// import newIcon from "../../../images/icons/Group.svg"
import fromIcon from "../../../images/icons/from.svg";
import toIcon from "../../../images/icons/to.svg";
import groupIcon from "../../../images/icons/Group.svg";
import cabinIcon from "../../../images/icons/cabin.svg";
import addIcon from "../../../images/icons/add.svg";

const FlightSearchingBooking = () => {
	useEffect(() => {
		// eslint-disable-next-line no-undef
		const api = new CraneSearchAPI("https://xle-stage.crane.aero/ibe");
		const defaultDeparturePort = "ABV";
		const defaultArrivalPort = "LOS";

		console.log(api.portCodes());
		console.log(api.portNames());
		console.log(api.portGroupsFor());
		console.log(api.languages());
		console.log(api.currencies());
		console.log(api.cabinClasses());
		console.log(api.portGroups());
		console.log(api.maxSegmentCount());
		console.log(api.maxPassengerCount());

		// create port matrix to fill arrival ports by each departure port
		let portMatrix = {};

		// On page load, trigger the change event for the first departure port

		$("[id^='depPort']").first().trigger("change");
		setTimeout(function () {
			$("[id^='depPort']").first().trigger("change");
		}, 5000);

		$(document).ready(() => {
			api.portGroups().then(function (value) {
				// fill departure ports
				$("[id^='depPort']").each(function (index, $select) {
					$.each(value, function (key, cat) {
						let group = $("<optgroup>", { label: key });
						$.each(cat, function (i, item) {
							$("<option/>", {
								value: item.code,
								text: item.cityName + " (" + item.code + ")",
							}).appendTo(group);
							if (index == 0) {
								// fill arrival ports by each departure port
								api.portGroupsFor(item.code).then(function (value) {
									portMatrix[item.code] = value;
								});
							}
						});
						group.appendTo($select);
					});
				});
			});

			$("[id^='depPort']").change(function () {
				let arrPortElem = $("#arrPort" + this.id.replace("depPort", ""));
				clearArrPort(arrPortElem);
				fillArrPort(this, arrPortElem);
			});

			$("[id^='arrPort']").change(function () {
				// check available additional passenger by route
				api
					.getAdditionalPassengerTypes(getDepPorts(), getArrPorts())
					.then(function (passengers) {
						$("#additionalPassengers").html("").removeClass();
						for (let i = 0; i < passengers.length; i++) {
							let p = passengers[i];
							let pName = p.passengerTypeName;
							let pType = p.passengerType;
							let pSubType =
								p.passengerSubType == null ? "" : p.passengerSubType;
							let id = "additional_" + pType + "_" + pSubType;
							let outerDiv = $("<div/>").addClass(
								// eslint-disable-next-line no-undef
								(className =
									"col-xl-3 col-lg-3 col-md-4 col-sm-2 col-6 col-md-6"),
							);
							let label = $("<label/>")
								.attr("for", id)
								.text(pName)
								.addClass("mb-0");
							let innerDiv = $("<div/>").addClass("input-group");
							let select = $("<select/>")
								.attr("id", id)
								.attr("pType", pType)
								.attr("pSubType", pSubType)
								.addClass("form-control");
							for (let j = 0; j <= maxPassengerCount; j++) {
								select.append($("<option/>").val(j).html(j));
							}

							$("#additionalPassengers")
								.append(outerDiv.append(label, innerDiv.append(select)))
								.addClass("form-row mb-3");
						}
					});
				// check available nations by route
				api
					.getAvailableNations(getDepPorts(), getArrPorts())
					.then(function (nations) {
						$("#nations").html("").removeClass();
						for (let i = 0; i < nations.length; i++) {
							let nationCode = nations[i];
							let outerDiv = $("<div/>").addClass(
								"form-check-black form-check-inline col",
							);
							let label = $("<label/>")
								.attr("for", nationCode)
								.text("National " + nationCode)
								.addClass("form-check-label");
							let input = $('<input type="radio"/>')
								.attr("id", nationCode)
								.attr("name", "nation")
								.attr("value", nationCode)
								.addClass("form-check-input");

							$("#nations").append(outerDiv.append(input, label));
						}
						if (nations.length > 0) {
							let outerDiv = $("<div/>").addClass(
								"form-check-black form-check-inline col",
							);
							let label = $("<label/>")
								.attr("for", "foreigner")
								.text("Foreigner")
								.addClass("form-check-label");
							let input = $('<input type="radio"/>')
								.attr("id", "foreigner")
								.attr("name", "nation")
								.attr("value", "")
								.addClass("form-check-input");

							$("#nations")
								.append(outerDiv.append(input, label))
								.addClass("form-row mb-3 mt-2 pl-0 col-4");
						}
					});
			});

			$("#oneWay").click(function () {
				$("#returnGroup").hide();
				$("#multiCityGroup").hide();
			});
			$("#roundTrip").click(function () {
				$("#returnGroup").show();
				$("#multiCityGroup").hide();
			});
			$("#multi_directional").click(function () {
				$("#returnGroup").hide();
				$("#multiCityGroup").show();
			});

			api.currencies().then(function (value) {
				let $select = $("#currency");
				$select.append(
					$("<option />", {
						value: value.defaultCurrency.code,
						text: value.defaultCurrency.code,
					}),
				);
				$.each(value.values, function (i, val) {
					if (value.defaultCurrency.code != val.code) {
						$select.append(
							$("<option />", { value: val.code, text: val.code }),
						);
					}
				});
			});

			api.cabinClasses().then(function (value) {
				let $select = $("#cabinClasses");
				$.each(value, function (i, val) {
					let $option = $("<option />", { value: val, text: val });
					if (val === "ECONOMY") {
						$option.attr("selected", true);
					}
					$select.append($option);
				});
			});

			let maxPassengerCount = 10;
			api.maxPassengerCount().then(function (value) {
				maxPassengerCount = value;
				for (let i = 0; i <= maxPassengerCount; i++) {
					$("#adult").append($("<option></option>").val(i).html(i));
					$("#child").append($("<option></option>").val(i).html(i));
					$("#infant").append($("<option></option>").val(i).html(i));
				}
				$("#adult").val(1);
			});

			function getDepPorts() {
				let depPort = "";
				let depPortList = $("[id^='depPort']:visible");
				depPortList.each(function (index, item) {
					depPort += $(item).val();
					if (index != depPortList.length - 1) {
						depPort += ",";
					}
				});
				return depPort;
			}

			function getArrPorts() {
				let arrPort = "";
				let arrPortList = $("[id^='arrPort']:visible");
				arrPortList.each(function (index, item) {
					arrPort += $(item).val();
					if (index != arrPortList.length - 1) {
						arrPort += ",";
					}
				});
				return arrPort;
			}

			$("#search").click(function () {
				let tripType = $("[name='tripType']:checked").val();
				let depPort = getDepPorts();
				let arrPort = getArrPorts();
				let depDate = "";
				let depDateList = $("[id^='departureDate']:visible");
				depDateList.each(function (index, item) {
					depDate += $(item).val();
					if (index != depDateList.length - 1) {
						depDate += ",";
					}
				});
				let retDate = $("#returnDate:visible").val();
				let adult = $("#adult").val();
				let child = $("#child").val();
				let infant = $("#infant").val();
				let currency = $("#currency").val();
				let cabinClass = $("#cabinClasses").val();
				// eslint-disable-next-line no-undef
				let request = new AvailabilityRequest();
				request.lang = "EN";
				request.currency = "NGN";
				request.cabinClass = cabinClass;
				request.tripType = tripType;
				request.depPort = depPort;
				request.arrPort = arrPort;
				request.departureDate = depDate;
				request.returnDate = retDate;
				let passengerQuantities = [];
				// eslint-disable-next-line no-undef
				passengerQuantities.push(new PassengerQuantity("ADULT", "", adult));
				// eslint-disable-next-line no-undef
				passengerQuantities.push(new PassengerQuantity("CHILD", "", child));
				// eslint-disable-next-line no-undef
				passengerQuantities.push(new PassengerQuantity("INFANT", "", infant));
				$("#additionalPassengers select").each(function () {
					let count = $(this).val();
					if (count > 0) {
						let pType = $(this).attr("pType");
						let pSubType = $(this).attr("pSubType");
						passengerQuantities.push(
							// eslint-disable-next-line no-undef
							new PassengerQuantity(pType, pSubType, count),
						);
					}
				});
				request.passengerQuantities = passengerQuantities;
				request.nationality = $("[name='nation']:checked").val();
				request.promoCode = $("#promoCode").val();
				api.searchV2(request);
			});

			var today = dateToFormatedDate(new Date(), $("#departureDate"));
			$("[id^='departureDate']").daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				showButtonPanel: false,
				minDate: today,
				locale: {
					format: inputDateFormat($("#departureDate")),
				},
			});
			let returnDateFormat = inputDateFormat($("#returnDate"));
			$("#returnDate").daterangepicker({
				singleDatePicker: true,
				showDropdowns: true,
				showButtonPanel: false,
				minDate: today,
				locale: {
					format: returnDateFormat,
				},
			});
			$("#departureDate").change(function () {
				var temp = $("#returnDate").val();
				$("#returnDate").daterangepicker({
					singleDatePicker: true,
					showDropdowns: true,
					showButtonPanel: false,
					minDate: $("#departureDate").val(),
					startDate: temp,
					locale: {
						format: returnDateFormat,
					},
				});
			});
		});

		function clearArrPort(arrPortElem) {
			arrPortElem
				.find("option")
				.remove()
				.end()
				.append('<option value="">Select an airport</option>');
			arrPortElem.find("optgroup").remove();
		}

		function fillArrPort(depPortElem, arrPortElem) {
			$(arrPortElem).empty();

			$.each(portMatrix[depPortElem.value], function (index, value) {
				$.each(value, function (key, cat) {
					let group = $("<optgroup>", { label: key });

					$.each(cat, function (i, item) {
						let option = $("<option/>", {
							value: item.code,
							text: item.cityName + " (" + item.code + ")",
						});
						if (item.code === "ABV" && item.cityName === "Abuja") {
							option.prop("selected", true);
						}
						option.appendTo(group);
					});
					group.appendTo(arrPortElem);
				});
			});
		}

		// function fillArrPort(depPortElem, arrPortElem) {
		// 	$.each(portMatrix[depPortElem.value], function (index, value) {
		// 		$.each(value, function (key, cat) {
		// 			let group = $("<optgroup>", { label: key });
		// 			$.each(cat, function (i, item) {
		// 				$("<option/>", {
		// 					value: item.code,
		// 					text: item.cityName + " (" + item.code + ")",
		// 				}).appendTo(group);
		// 			});
		// 			group.appendTo(arrPortElem);
		// 		});
		// 	});
		// }

		fillArrPort({ value: "yourDefaultValueHere" }, "#depPort");

		function dateToFormatedDate(date, dateRangePicker) {
			const format = dateRangePicker[0]
				.getAttribute("data-date-format")
				.toUpperCase();
			// eslint-disable-next-line no-undef
			return moment(date, format).format(format);
		}
		function inputDateFormat(dateRangePicker) {
			if (dateRangePicker.length !== 0) {
				const format = dateRangePicker[0]
					.getAttribute("data-date-format")
					.toUpperCase();
				return format;
			}
		}
	}, []);

	return (
		<div className='main-content'>
			<div
				className='needs-validation'
				id='searchForm'>
				<div className='customFormContainer'>
					{/* Radio buttons container */}
					<div className='trip-type customRadioContainer'>
						<div className='customRadioInputs'>
							<label className='radio-container'>
								<span>One Way</span>
								<input
									type='radio'
									name='tripType'
									id='oneWay'
									value='ONE_WAY'
									checked
									className='customFormCheck'
								/>
							</label>
						</div>

						<div className='customRadioInputs'>
							<label className='radio-container'>
								<span>Round Trip</span>
								<input
									className='customFormCheck'
									type='radio'
									name='tripType'
									id='roundTrip'
									value='ROUND_TRIP'
								/>
							</label>
						</div>

						{/* <div className='customRadioInputs'>
							<label className='radio-container'>
								<span>Multi Directional</span>
								<input
									className='customFormCheck'
									type='radio'
									name='tripType'
									id='multi_directional'
									value='MULTI_DIRECTIONAL'
								/>
							</label>
						</div> */}
					</div>

					{/* from and to trip container */}
					<div className='customDestinationInputContainerOne'>
						{/* input one from*/}
						<div className='customDestinationInput'>
							<label
								htmlFor='depPort'
								className='mb-0 label-text'>
								From
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={fromIcon}
										alt='from'
									/>
								</span>
								<select
									className='form-control reactInputGroupSelect'
									id='depPort'
									required='required'>
									<option value=''>Select an airport</option>
								</select>
							</div>
						</div>

						{/* input two to*/}

						<div className='customDestinationInput'>
							<label
								htmlFor='arrPort'
								className='mb-0 label-text'>
								To
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={toIcon}
										alt='to'
									/>
								</span>
								<select
									className='form-control reactInputGroupSelect'
									id='arrPort'
									required='required'>
									<option value=''>Select an airport</option>
									{/* <option value="ABV">Abuja (ABV)</option> */}
								</select>
							</div>
						</div>

						{/* input three Departure Date*/}
						<div className='customDestinationInput'>
							<label
								htmlFor='departureDate'
								className='mb-0 label-text'>
								Departure Date
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={groupIcon}
										alt='from'
									/>
								</span>
								<input
									id='departureDate'
									className='form-control reactInputGroupSelect ui-input__element shadow-none daterangepicker-single'
									type='text'
									required
									data-date-format='dd.MM.yyyy'
								/>
							</div>
						</div>

						{/* input four Return Date*/}

						<div
							className='customDestinationInput'
							id='returnGroup'
							style={{ display: "none" }}>
							<label
								htmlFor='returnDate'
								className='mb-0 label-text'>
								Return Date
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={groupIcon}
										alt='from'
										style={{ maxWidth: "100%" }}
									/>
								</span>
								<input
									id='returnDate'
									className='form-control reactInputGroupSelect ui-input__element shadow-none daterangepicker-single'
									type='Da'
									data-date-format='dd.MM.yyyy'
								/>
							</div>
						</div>

						{/* input cabin */}
						<div className='customDestinationInput'>
							<label
								htmlFor='cabinClasses'
								className='mb-0 label-text'>
								Cabin Classes
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={cabinIcon}
										alt='from'
									/>
								</span>
								<select
									className='form-control reactInputGroupSelect'
									id='cabinClasses'>
									<option value=''>ALL</option>
								</select>
							</div>
						</div>
					</div>

					{/* from and to trip container hidden */}
					<div
						id='multiCityGroup'
						style={{ display: "none" }}
						className='customMT'>
						<div className=' customDestinationInputContainerOne'>
							<div className='customDestinationInput '>
								<label
									htmlFor='depPort2'
									className='mb-0 label-text'>
									From
								</label>
								<select
									className='form-control '
									id='depPort2'
									required='required'>
									<option value=''>Select an airport</option>
								</select>
							</div>

							<div className='customDestinationInput   '>
								<label
									htmlFor='arrPort2'
									className='mb-0 label-text'>
									To
								</label>
								<select
									className='form-control'
									id='arrPort2'
									required='required'>
									<option value=''>Select an airport</option>
								</select>
							</div>

							<div className='customDestinationInput  '>
								<label
									htmlFor='departureDate2'
									className='mb-0 label-text'>
									Departure Date
								</label>
								<div className='input-group input-group-wide input-group-calendar'>
									<input
										id='departureDate2'
										className='form-control ui-input__element shadow-none daterangepicker-single'
										type='text'
										required
										data-date-format='dd.MM.yyyy'
									/>
								</div>
							</div>
						</div>

						<div className='form-row mb-3'></div>
					</div>

					{/* passangers input fields container */}
					<div
						className='customDestinationInputContainer '
						style={{ marginTop: "16px" }}>
						<div
							className='customPassangersInputContainer'
							style={{ marginTop: "0px" }}>
							{/* child +12 */}
							<div className='customDestinationInput  '>
								<label
									htmlFor='adult'
									className='mb-0 label-text'>
									Adult (12+)
								</label>
								<div className='input-group'>
									<select
										id='adult'
										name='adult'
										className='form-control reactInputGroupSelect'
										style={{ gridColumn: "1 / span 6" }}></select>
								</div>
							</div>
							{/* child 2-12 */}
							<div className='customDestinationInput  '>
								<label
									htmlFor='child'
									className='mb-0 label-text'>
									Child (2-12)
								</label>
								<div className='input-group'>
									<select
										id='child'
										name='child'
										className='form-control reactInputGroupSelect'
										style={{ gridColumn: "1 / span 6" }}></select>
								</div>
							</div>
							{/* child 0-2 */}
							<div className='customDestinationInput  '>
								<label
									htmlFor='infant'
									className='mb-0 label-text'>
									Infant (0-2)
								</label>
								<div className='input-group'>
									<select
										id='infant'
										name='infant'
										className='form-control reactInputGroupSelect'
										style={{ gridColumn: "1 / span 6" }}></select>
								</div>
							</div>
						</div>

						{/* currency */}
						<div
							className='customDestinationInput '
							style={{
								marginBottom: "8px",
								width: "fit-content",
								// border: "2px solid green",
							}}>
							<label
								htmlFor='currency'
								className='mb-0 label-text'>
								Currency
							</label>
							<select
								className='form-control reactInputGroupSelect'
								id='currency'
								style={{
									// gridColumn: "1 / span 6",
									// border: "2px solid green",
									borderRadius: "0",
									minWidth: "100px",
								}}>
								{/* <option value=''>ANY</option> */}
							</select>
						</div>

						<div className='customDestinationInput'>
							<label
								htmlFor='promoCode'
								className='mb-0 label-text'>
								Promo Code
							</label>
							<div className='input-group'>
								<span className='inputGroupText'>
									<img
										src={addIcon}
										alt='from'
									/>
								</span>
								<input
									className='form-control  reactInputGroupSelect'
									id='promoCode'
								/>
							</div>
						</div>

						<div className='customSearchButtonContainer '>
							<button
								id='search'
								class='customSearchButton  reactInputGroupSelect'>
								Search
							</button>
						</div>
					</div>

					<div id='additionalPassengers'></div>

					<div id='nations'></div>
				</div>
			</div>
		</div>
	);
};

export default FlightSearchingBooking;
