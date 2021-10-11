import React from 'react';
import './infopage.styles.css';
import InfoData from './infodata.js'

const InfoPage = () => {
	return (
		<div className="container">
			{InfoData.map(item => {
				return (
					<div className="item">
						<div className="lilhead">
							{item.title}
						</div>
						<div className="content">
							{item.content}
						</div>

						{item.lahteet
							? item.lahteet.map(ite => {
								return (
									<div className="lahdecontainer">
										<div className="lahdetitle">{ite.title}</div>
										<div className="lahdetext">{ite.infotext}</div>
									</div>
								)})
							: null
						}
					</div>
				)
			})
		}
		</div>
	)}

export default InfoPage;