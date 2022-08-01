import styled from "@emotion/styled";
import {useLocation} from 'react-router-dom';

export default function Location() {
	const location = useLocation();
 	const pathname = location.pathname;
	const whatRestaurant_1 = pathname.substring(12,13);
	const whatRestaurant_2 = pathname.substring(13,14);
	const whatTable = pathname.substring(26,27);
	
	if (pathname.length === 13) {
		return(
			<StyledWrapper>
				<div id="pathname">
					: { whatRestaurant_1 }번 식당 
			</div>
			</StyledWrapper>
		);
	} else if (pathname.length === 27) {
		return(
			<StyledWrapper>
				<div id="pathname">
				: { whatRestaurant_2 }번 식당 - { whatTable }번 테이블
				</div>
			</StyledWrapper>
		);
	}
};

const StyledWrapper = styled.div`
	#pathname {
		font-family: "BlackHanSans";
		font-size: 32px;
		margin: 8px;
	}
`;